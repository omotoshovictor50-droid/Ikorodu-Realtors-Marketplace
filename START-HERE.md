# START HERE: Ikorodu Realtors website (complete package)

Everything is in this one zip:

| Folder / file | What it is |
|---|---|
| `docs/` | **The finished website** (HTML, CSS, JavaScript, logo, videos, admin page). This is what GitHub publishes. Your Supabase connection is already built in. |
| `src/`, `public/`, `package.json`, ... | The full source code, so the site can be changed and rebuilt. |
| `supabase/schema.sql` | The database tables and security rules (you run it once in Supabase). |
| `ADMIN-SETUP.md` | How to create the admin login and use the admin page. |
| `SECURITY.md` | What protects the site, and what you must do to keep it safe. |
| `LEGAL-CHECKLIST.md` | Things to check to reduce legal risk. **Read before going public.** |
| `extras/` | The old demo dashboard (removed from the live site because it had no password) and an optional automatic-build file. |

## Put it online (about 15 minutes)

1. **Database.** If you have not yet, do steps 2 to 3 of `ADMIN-SETUP.md`: run `supabase/schema.sql` in Supabase, then create your admin user (new password of 12+ characters).
2. **Install GitHub Desktop** (free, desktop.github.com) and sign in. It handles hidden files and big uploads that the website cannot.
3. In GitHub Desktop choose **File > Clone repository**, pick your repo `Ikorodu-Realtors-Marketplace`, and clone it.
4. Open the cloned folder on your computer. **Delete everything inside it** except the hidden `.git` folder. Then **unzip this package and copy everything from it into that folder**, including the hidden items (in File Explorer: View > Show > Hidden items).
5. Back in GitHub Desktop you will see the changes. Type a message such as "Final site" and click **Commit to main**, then **Push origin**.
6. On GitHub open **Settings > Pages**. Under Source choose **Deploy from a branch**. Set Branch to **main** and the folder to **/docs**. Click **Save**. (The repo must be Public on a free account.)
7. If your repo still has an old workflow file, delete it so you do not get red crosses: in the repo open `.github/workflows`, open the file, click the three dots, **Delete file**.
8. Wait 1 to 2 minutes, then open `https://YOURUSERNAME.github.io/Ikorodu-Realtors-Marketplace/`.
9. Open the same address plus `admin/`. Sign in with `Omotosho Victor IK` and your new password. The first time, scan the QR code with Google Authenticator. Then click **+ Add property**.

Until you add your first property the homepage shows "No properties have been listed yet". That is correct: no fake listings are published.

The site was built for a repository called **Ikorodu-Realtors-Marketplace**. If you rename the repository, tell me so the site can be rebuilt for the new name.
