const addImages = async (fileList: FileList | null) => {
  // Snapshot immediately — resetting the <input> value empties the live FileList
  const files = fileList ? Array.from(fileList) : [];
  if (!files.length) return;
  setError(null);
  const urls: string[] = [];
  try {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setUploading(`Uploading photo ${i + 1} of ${files.length}…`);
      const blob = await compressImage(file);
      const baseName = (file.name || `photo-${i}`).replace(/\.[^.]+$/, "") + ".jpg";
      urls.push(await uploadMedia(l.id, blob, baseName));
    }
    setL((p) => ({ ...p, images: [...p.images, ...urls] }));
  } catch (e) {
    setError(`Photo upload failed: ${(e as Error).message}`);
  }
  setUploading(null);
};
