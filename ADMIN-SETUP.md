# Admin setup (about 15 minutes, no coding)

The admin page lets you add, edit, hide and delete properties, upload photos and
videos (by choosing files), set the map pin and change every detail. Changes show
on the website straight away. Nothing runs on your own server: the website lives on
GitHub Pages and the data lives in a free Supabase database.

The admin page is at `/admin/` (for example `https://YOURNAME.github.io/REPO-NAME/admin/`).
It is not linked from anywhere on the public website.

## How it is secured

1. **No password in the code.** Your password exists only in your Supabase account. It is never in GitHub.
2. **Two-step sign-in.** Password first, then a 6-digit code from an authenticator app on your phone.
3. **Enforced by the database.** Only your admin email, signed in with the two-step code, can add, change or delete anything or upload files. Even if someone found the page, nothing can be changed without both.
4. **No public sign-up.** Nobody else can create an account.
5. **Lockout and timeout.** 5 wrong passwords lock the sign-in form for 15 minutes on that device, and you are signed out after 20 minutes of inactivity.
6. **Password reset goes to your Gmail** (ikorodurealtors@gmail.com) only.

## Step 1: Create the free database

1. Go to https://supabase.com and create a free account.
2. Click **New project**, give it a name (for example `ikorodu-realtors`) and a strong database password. Choose a region close to Nigeria (for example in Europe). Click **Create**. Wait about 2 minutes.

## Step 2: Create the tables and photo storage

1. Open **SQL Editor**, click **New query**.
2. Copy everything from `supabase/schema.sql` in this folder, paste it in and click **Run**. You should see "Success".

## Step 3: Create your admin account

1. Go to **Authentication > Users > Add user > Create new user**.
2. Email: **ikorodurealtors@gmail.com**. Choose a **new password of at least 12 characters** that you have never typed anywhere else (a short sentence works well). Tick **Auto Confirm User**.
   If you want a different admin email, change it in `supabase/schema.sql` and in `src/lib/admin-config.ts` first.
3. (Optional) Show your name on the dashboard. In **SQL Editor** run:
   `update auth.users set raw_user_meta_data = jsonb_build_object('full_name','Omotosho Victor IK') where email = 'ikorodurealtors@gmail.com';`
4. Go to **Authentication > Sign In / Providers** and turn **off** "Allow new users to sign up".
5. Go to **Authentication > Policies** (or Sign In / Providers > Email) and set **Minimum password length** to 12.
6. Go to **Authentication > URL Configuration**. Set **Site URL** to your website address (`https://YOURNAME.github.io/REPO-NAME/`) and add `https://YOURNAME.github.io/REPO-NAME/admin/` under **Redirect URLs**. This is needed for the password-reset email.
7. Go to **Authentication > Multi-Factor** and make sure **TOTP** is enabled.

## Step 4: Copy your two keys

1. Open **Project Settings > API**.
2. Copy the **Project URL** and the **anon public** key. Never use the `service_role` key anywhere.

## Step 5: Try it on your computer (optional)

1. Copy `.env.example` to a new file named `.env.local` and paste the two values.
2. Run `npm run dev` and open http://localhost:3000/admin
3. Sign in. The first time, you will see a QR code: scan it with Google Authenticator or Microsoft Authenticator, type the 6-digit code, and you are in. Next time you only type the code from the app.

## Step 6: Put it on GitHub

1. In your GitHub repo go to **Settings > Secrets and variables > Actions > New repository secret**.
2. Add `NEXT_PUBLIC_SUPABASE_URL` (your Project URL) and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (your anon public key).
3. Go to **Actions > Deploy to GitHub Pages > Run workflow**. When it is green, open your address plus `/admin/`.

## Using the admin

- **Add property:** fill in the form, choose photos and a video file, click the map for the pin, then **Publish property**.
- **Video:** choose a file (MP4 works best, up to 50 MB). Phone videos are often bigger: trim them, or compress them in your phone's editor first.
- **Hide / Sold:** use the table to change status or hide a property without deleting it.

## Good to know

- Until the two secrets are added, the website shows 100 built-in sample listings. Once connected it shows only what you add.
- Property pages open at `/property/?id=...`.
- A property without a map pin does not appear on the map page.
- Free Supabase projects can pause after a long period without use. If listings stop loading, open your Supabase dashboard and click Restore.
- Keep your authenticator app safe. If you lose the phone, remove the factor in Supabase (**Authentication > Users > your user > Factors**) and enrol again.
- GitHub Pages cannot add extra browser security headers. The database rules above are what protect your data.
- The old `/dashboard` pages are the earlier demo screens. They are not connected to this and have no password, so remove them or tell me to lock them before you go public.
