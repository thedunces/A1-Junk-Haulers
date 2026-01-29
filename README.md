# A1 Junk Haulers Landing Page

Modern landing page built with React + TypeScript + Vite + Tailwind CSS, featuring a 3D carousel of before/after images.

**Live site**: [a1haulaway.com](https://a1haulaway.com)

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** for fast builds
- **Tailwind CSS v4** with custom animations
- **Cloudflare Pages** for hosting

## Development

```bash
npm install
npm run dev
```

## Deployment

This site is deployed to **Cloudflare Pages** via GitHub integration.

### Cloudflare Pages Setup

1. **Connect Repository**:
   - Cloudflare Dashboard → **Pages** → **Create a project**
   - Connect your GitHub repo (`thedunces/A1-Junk-Haulers`)
   - Select the repository

2. **Build Settings**:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (leave default)
   - **Node version**: 20

3. **Custom Domain**:
   - After first deployment, go to **Custom domains**
   - Add `a1haulaway.com` and `www.a1haulaway.com`
   - Cloudflare will auto-configure DNS

4. **Environment Variables** (optional):
   - `VITE_CONTACT_EMAIL`: Override default contact email
   - `VITE_CONTACT_ENDPOINT`: Use API endpoint instead of mailto

### Manual Deployment

```bash
npm run build
npx wrangler pages deploy dist
```

## Project Structure

```
src/
├── components/       # React components
│   ├── Hero.tsx
│   ├── BeforeAfterCarousel3D.tsx
│   ├── Services.tsx
│   ├── ContactForm.tsx
│   └── ...
├── lib/             # Utilities
│   ├── useInView.ts  # Scroll reveal hook
│   └── contactSubmit.ts
└── assets/          # Images (logo, before/after photos)
```

---

## Original Template Notes

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
