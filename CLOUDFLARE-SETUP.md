# a1haulaway.com setup (GitHub Pages + Cloudflare DNS)

The site is hosted on **GitHub Pages** with **custom domain a1haulaway.com** (DNS managed by Cloudflare).

- **Hosting:** GitHub Pages (builds from this repo via Actions)
- **Domain:** a1haulaway.com → Cloudflare DNS → points to GitHub Pages
- **Base path:** `/` (root) so assets load correctly on the custom domain

No Cloudflare env vars needed; the Vite base is set to `/` for the custom domain. Push to `main` and the GitHub Actions workflow will build and deploy; a1haulaway.com will update after the deployment finishes.

---

## Optional: Deploy with Wrangler (Cloudflare Pages)

If you switch to **Cloudflare Pages** for hosting, use the Wrangler files in this repo:

- **wrangler.toml** — project name `a1-junk-haulers`, output dir `dist`
- **.dev.vars.example** — copy to `.dev.vars` for local env vars (gitignored)

### Commands

```bash
# Install (includes wrangler)
npm install

# Build and deploy to Cloudflare Pages
npm run pages:deploy

# Or manually
npm run build
npx wrangler pages deploy dist
```

First-time deploy: run `npx wrangler login` to authenticate. Then link the project in the Cloudflare dashboard or let Wrangler create it.
