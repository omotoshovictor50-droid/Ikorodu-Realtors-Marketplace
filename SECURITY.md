# Security

No website can honestly be promised "hack-proof". This site is built to be hard to attack and to limit the damage if something goes wrong.

## What is built in

1. **No passwords or secret keys in the files.** The only key in the site is Supabase's *publishable* key, which is designed to be public. Your admin password exists only in your Supabase account.
2. **Two-step admin sign-in.** Password, then a 6-digit code from an authenticator app.
3. **The database enforces it.** Only your admin email, signed in with the two-step code, can add, change or delete listings or upload files. A stolen password alone cannot change anything.
4. **No public sign-up**, so strangers cannot create accounts.
5. **Login lockout** after 5 wrong passwords (15 minutes) and **automatic sign-out** after 20 minutes of inactivity.
6. **Content Security Policy.** The browser only loads scripts, images, video and connections from approved places. This blocks most injected code.
7. **No page runs in someone else's frame** (the admin page refuses), which stops click-jacking.
8. **No raw HTML is ever inserted from data.** Everything entered in the admin page is displayed as plain text.
9. **Dependencies checked.** `npm audit` found 0 known vulnerabilities on the day this was built, and `.github/dependabot.yml` asks GitHub to warn you about future ones.
10. **The old demo dashboard (no password) is not part of the live site.**
11. The admin page is not linked from the website and is marked "do not index" for search engines.

## What you must do

1. Turn on **two-factor authentication on your GitHub account** (Settings > Password and authentication). Whoever controls the repo controls the website.
2. Turn on two-step verification on **ikorodurealtors@gmail.com**, because it receives your password-reset link.
3. Choose a **new admin password of 12+ characters**, used nowhere else. Do not share it in chats.
4. Never put the Supabase **secret / service_role** key anywhere in GitHub or the website.
5. Keep your authenticator phone safe. If you lose it, remove the factor in Supabase (Authentication > Users > your user > Factors) and enrol again.
6. Export your listings regularly (Supabase > Table Editor > listings > Export) as a backup.
7. Accept the Dependabot update pull requests when GitHub sends them.

## Limits to know about

- GitHub Pages cannot add some extra security headers, so protection relies on the database rules and the browser policy above.
- The anyone-can-read part is deliberate: published listings are public. Hidden (unpublished) listings are not.
