Use this complete Next.js + TypeScript + Tailwind CSS codebase as supplied. Preserve its original reference layout, CSS, text, fonts, images, and animations. Do not redesign, browse, scaffold, convert frameworks, regenerate assets, install extra packages, or scan every file.

1. Read only `README.md` and `lib/site-config.ts` initially.
2. If I provide my CA, set it in `.env.local` as `NEXT_PUBLIC_TOKEN_CA`. If I provide my PNG logo, replace `public/assets/logo.png`. Never invent either. Change the reference X URL only if I supply mine.
3. Run `npm ci`, then `npm run dev`. Keep the server running for preview. Fix only observed errors. No dependency upgrades.
4. Run `npm run build` only when I ask for a production build; deployable static files are generated in `out/`.

The code and assets are already complete. Avoid rewriting files that work.
