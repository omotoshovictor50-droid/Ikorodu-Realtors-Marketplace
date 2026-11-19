import { supabase } from "@/lib/supabase";
import { Listing, listingToRow, rowToListing, clearListingsCache } from "@/lib/listings";

export const BUCKET = "listing-media";
const db = () => {
  if (!supabase) throw new Error("Database is not connected");
  return supabase;
};

export async function adminList(): Promise<Listing[]> {
  const { data, error } = await db().from("listings").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(rowToListing);
}

export async function saveListing(l: Listing, isNew: boolean) {
  const row = listingToRow(l);
  const q = isNew
    ? db().from("listings").insert(row)
    : db().from("listings").update(row).eq("id", l.id);
  const { error } = await q;
  if (error) throw error;
  clearListingsCache();
}

export async function quickUpdate(id: string, patch: Record<string, unknown>) {
  const { error } = await db().from("listings").update({ ...patch, updated_at: new Date().toISOString() }).eq("id", id);
  if (error) throw error;
  clearListingsCache();
}

export async function deleteListing(l: Listing) {
  const { error } = await db().from("listings").delete().eq("id", l.id);
  if (error) throw error;
  const { data } = await db().storage.from(BUCKET).list(l.id);
  if (data?.length) await db().storage.from(BUCKET).remove(data.map((f) => `${l.id}/${f.name}`));
  clearListingsCache();
}

export async function compressImage(file: File, max = 1600, quality = 0.82): Promise<Blob> {
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
    const c = document.createElement("canvas");
    c.width = Math.round(bmp.width * scale);
    c.height = Math.round(bmp.height * scale);
    c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height);
    return await new Promise((res, rej) =>
      c.toBlob((b) => (b ? res(b) : rej(new Error("fail"))), "image/jpeg", quality)
    );
  } catch {
    return file; // unsupported format: upload as it is
  }
}

export async function uploadMedia(listingId: string, file: Blob, name: string): Promise<string> {
  const safe = name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const path = `${listingId}/${Date.now()}-${safe}`;
  const { error } = await db().storage.from(BUCKET).upload(path, file, {
    contentType: file.type || "application/octet-stream",
    cacheControl: "31536000",
  });
  if (error) throw error;
  return db().storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}
