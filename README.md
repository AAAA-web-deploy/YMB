# YMB — Next.js reference reproduction

Complete **Next.js 16.4.3 + React 19.3.1 + TypeScript + Tailwind CSS 4.3.3** codebase, converted from the downloaded public files of https://www.ymboneth.lol/ captured October 23, 2026. No database, API keys, or runtime backend needed.

## Fastest start

Requires Node.js 20.9 or newer. Node.js 22 or 24 LTS is suitable.

```bash
npm ci
npm run dev
```

Open the URL printed by Next.js, normally http://localhost:3000. Paste `CURSOR_PROMPT.md` into Cursor. Cursor only needs to install and launch this project; the implementation is complete.

## Your CA, logo, and social account

Your CA and replacement logo were not supplied. The CA starts as `TBA`; no buy/chart link points to the reference token. The reference logo and X account remain.

1. Copy `.env.example` to `.env.local`. Set `NEXT_PUBLIC_TOKEN_CA` to your Ethereum token address. This must be `0x` plus 40 hexadecimal characters. You can alternatively set `contractAddress` directly in `lib/site-config.ts`.
2. Replace `public/assets/logo.png` with your PNG logo. The same file supplies the nav image and favicon. Original sizing/cropping is preserved.
3. Set your X URL in `lib/site-config.ts` if required. Otherwise the reference X account remains visible.
4. Set `NEXT_PUBLIC_SITE_URL` to your final domain for social-sharing image URLs.

Restart the dev server after environment changes. Rebuild before deployment. All displayed CA text, clipboard contents, Uniswap destinations, chart links, and chart iframe share the same configuration. Address syntax checking does not establish token ownership or deployment.

## Fidelity

- The original section order, HTML structure, text, 27 KB stylesheet, media queries, gradients, crop settings, dimensions, hover effects, and inline X icon are retained.
- Original PNG assets are bundled byte-for-byte: logo 1254×1254; hero 1024×1536; banner 2172×724.
- Anton and Inter weights 400/500/600/700 are served locally, with their font licenses. No Google Fonts network request is needed.
- Original reveal animations, mobile navigation, Escape handling, active nav, copy feedback, and parallax are ported into a typed client component, with listener/observer cleanup.
- Most markup is a server component. Only interaction setup is a client component.
- Tailwind utilities and theme are enabled. Tailwind Preflight is intentionally omitted to preserve the original stylesheet's rendering.
- Your two uploaded images differ from the reference site's originals. They are preserved in `provided-images/` as optional alternatives; the live-reference versions are used by default.

The intentional differences before you supply a CA are the pending address/status and blank chart. The video and live chart are third-party embeds and require internet; their source content is not downloaded. Browser rendering and embed availability can vary. This is a faithful source conversion, not a guarantee of pixel-identical output in every browser.

## Files to know

| File | Purpose |
| --- | --- |
| `components/ReferenceSite.tsx` | Reference page markup |
| `components/SiteEffects.tsx` | Typed interaction and animation setup |
| `app/globals.css` | Original reference styles plus Tailwind imports |
| `lib/site-config.ts` | Shared CA, URLs, and asset prefix |
| `app/layout.tsx` | Metadata, favicon, local font stylesheet |
| `public/assets/` | Original website images and local fonts |
| `CURSOR_PROMPT.md` | Minimal build/preview prompt |

## Production / GitHub Pages

```bash
npm run build
```

The complete static export is written to `out/`. Upload its **contents** to any static host. `next start` is not used for this static export. For local development use `npm run dev`.

For GitHub project Pages (URL ends in a repository name), set `NEXT_PUBLIC_BASE_PATH=/YOUR_REPOSITORY_NAME` before building. For a custom domain or account root Pages site, leave it empty. Local images, fonts, and Next.js assets support this prefix. A `.nojekyll` file is included in public assets for Pages.

## Validation

Production compilation, TypeScript checking, and static export were run successfully before delivery. Additional source/output checks cover local assets, placeholder CA, and centralized token destinations. Browser visual comparison was unavailable because the managed preview service passed unsupported Vite flags to Next.js; it is not claimed as completed. Dependency lockfile is included; `node_modules`, build caches, and generated output are excluded to keep the ZIP smaller.

Reference assets/text retain their existing ownership and license terms. This package does not grant additional rights to those materials.
