# a1haulaway.com setup (GitHub Pages + Cloudflare DNS)

The site is hosted on **GitHub Pages** with **custom domain a1haulaway.com** (DNS managed by Cloudflare).

- **Hosting:** GitHub Pages (builds from this repo via Actions)
- **Domain:** a1haulaway.com → Cloudflare DNS → points to GitHub Pages
- **Base path:** `/` (root) so assets load correctly on the custom domain

No Cloudflare env vars needed; the Vite base is set to `/` for the custom domain. Push to `main` and the GitHub Actions workflow will build and deploy; a1haulaway.com will update after the deployment finishes.
