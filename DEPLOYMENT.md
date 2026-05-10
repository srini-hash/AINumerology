# Deploy `soulmath.in` (GitHub → Vercel → GoDaddy DNS)

This project is a Next.js app with API routes. Host it on **Vercel**, then point your **GoDaddy** domain to Vercel using DNS.

---

## 1. Push this repo to GitHub

Your machine already has a local git repo with an initial commit.

### Create the remote repository

1. Sign in at [github.com](https://github.com) and click **New repository**.
2. Name it (e.g. `ai-numerology-next`), leave it **empty** (no README, no .gitignore).
3. Copy the HTTPS URL, e.g. `https://github.com/YOUR_USERNAME/ai-numerology-next.git`.

### Connect and push (run in this project folder)

Replace `YOUR_USERNAME` and repo name if different:

```bash
cd ~/Desktop/ai-numerology-next
git remote add origin https://github.com/YOUR_USERNAME/ai-numerology-next.git
git push -u origin main
```

If GitHub asks for a password, use a **Personal Access Token** (not your account password):  
GitHub → **Settings** → **Developer settings** → **Personal access tokens**.

---

## 2. Create the Vercel project

1. Go to [vercel.com](https://vercel.com) and sign in (GitHub login is easiest).
2. **Add New…** → **Project** → **Import** your GitHub repository.
3. Framework Preset should detect **Next.js**. Defaults are fine; click **Deploy**.

Wait until the first deployment finishes. You get a URL like `your-project.vercel.app`.

---

## 3. Environment variables (optional AI features)

The app works without OpenAI (fallback mode). For AI interpretation:

1. Vercel → your project → **Settings** → **Environment Variables**.
2. Add:
   - **Name:** `OPENAI_API_KEY`  
   - **Value:** your OpenAI API key  
   - **Environments:** Production, Preview, Development (as you prefer).
3. **Redeploy** (Deployments → … on latest → Redeploy) so the new env applies.

---

## 4. Connect **soulmath.in** on Vercel

1. Vercel → project → **Settings** → **Domains**.
2. Add `soulmath.in` and optionally `www.soulmath.in`.
3. Vercel will show **DNS records** you must add at GoDaddy (often something like):
   - **A** record for `@` (apex) pointing to Vercel’s IP(s), and/or  
   - **CNAME** for `www` pointing to `cname.vercel-dns.com` (exact values come from Vercel).

Keep Vercel’s page open for the next step.

---

## 5. DNS in GoDaddy

1. Log in at [godaddy.com](https://godaddy.com) → **My Products** → **DNS** for **soulmath.in** (or **Manage DNS**).
2. **Remove or replace** old records that conflict with what Vercel shows (duplicate `A` on `@` or wrong `CNAME` on `www`).
3. Add exactly the **A / AAAA / CNAME** records Vercel lists.

**Email:** If you use GoDaddy or Google/Microsoft mail on this domain, **do not delete `MX` records** or other mail-related records unless you know what you’re doing.

Propagation can take a few minutes to 48 hours. Vercel will provision **HTTPS** automatically once DNS resolves.

---

## 6. Verify

- Open `https://soulmath.in` (and `https://www.soulmath.in` if you added it).
- Vercel → **Deployments** should show **Ready** for production.

---

## Troubleshooting

| Issue | What to check |
|--------|----------------|
| Domain shows old GoDaddy parking | DNS still pointing at GoDaddy hosting; update records to match Vercel. |
| SSL pending | Wait for DNS; ensure no conflicting `A` records on `@`. |
| API errors after deploy | Redeploy after setting `OPENAI_API_KEY`; check Vercel **Functions** logs. |

---

## Optional: deploy from the CLI

After installing the Vercel CLI (`npm i -g vercel`), you can run `vercel` in this folder and follow the prompts. Importing from GitHub (above) is usually simpler for ongoing deploys on every `git push`.
