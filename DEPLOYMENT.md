# Cloudflare Pages Deployment Guide

This guide walks you through deploying `a1haulaway.com` to Cloudflare Pages.

## Prerequisites

- ✅ GitHub repository: `thedunces/A1-Junk-Haulers`
- ✅ Cloudflare account with domain `a1haulaway.com` added
- ✅ Domain DNS managed by Cloudflare

## Step 1: Connect Repository to Cloudflare Pages

1. **Go to Cloudflare Dashboard**:
   - Navigate to **Pages** → **Create a project**
   - Click **Connect to Git**

2. **Authorize GitHub**:
   - Select **GitHub** as your Git provider
   - Authorize Cloudflare to access your repositories
   - Select repository: `thedunces/A1-Junk-Haulers`

3. **Configure Build Settings**:
   ```
   Framework preset: Vite
   Build command: npm run build
   Build output directory: dist
   Root directory: / (leave as default)
   Node version: 20
   ```

4. **Environment Variables** (optional):
   - `VITE_CONTACT_EMAIL`: Override default email (defaults to `Mdchaulaway@gmail.com`)
   - `VITE_CONTACT_ENDPOINT`: Use API endpoint instead of mailto

5. **Click "Save and Deploy"**

## Step 2: Add Custom Domain

After the first deployment succeeds:

1. Go to your Pages project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter: `a1haulaway.com`
4. Cloudflare will automatically:
   - Create DNS records (CNAME for www, A/AAAA for apex)
   - Configure SSL certificate
   - Set up redirects

5. **Optional**: Add `www.a1haulaway.com` as well
   - Cloudflare will auto-redirect www → apex (or vice versa)

## Step 3: Verify DNS

Check that DNS records are correct in Cloudflare:

- **Apex domain** (`a1haulaway.com`): Should have A/AAAA records pointing to Cloudflare Pages
- **WWW** (`www.a1haulaway.com`): Should have CNAME to Pages

You can verify with:
```bash
dig a1haulaway.com
dig www.a1haulaway.com
```

## Step 4: Enable HTTPS

Cloudflare automatically provisions SSL certificates. After DNS propagates (5-30 minutes):

1. Go to **SSL/TLS** → **Overview**
2. Ensure mode is **Full** or **Full (strict)**
3. Your site should be accessible at `https://a1haulaway.com`

## Troubleshooting

### Build Fails

- Check **Build logs** in Cloudflare Pages dashboard
- Ensure Node version is set to **20**
- Verify `package.json` has all dependencies

### Domain Not Working

- Wait 5-30 minutes for DNS propagation
- Check DNS records in Cloudflare dashboard
- Verify domain is added to Pages project → Custom domains

### Assets Not Loading

- Ensure `vite.config.ts` has `base: '/'` (already configured)
- Check browser console for 404 errors
- Verify `_redirects` file exists in `dist/` (it should)

### SPA Routing Issues

- The `public/_redirects` file handles this automatically
- All routes redirect to `/index.html` with 200 status

## Manual Deployment (Alternative)

If you prefer CLI deployment:

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build
npm run build

# Deploy
wrangler pages deploy dist --project-name=a1-junk-haulers
```

## Continuous Deployment

Once connected, **every push to `main` branch** automatically:
1. Triggers a new build
2. Deploys to Cloudflare Pages
3. Updates your live site

No manual steps needed! 🚀
