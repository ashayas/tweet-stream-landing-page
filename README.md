# tweet.stream — Open Ice

A small, independently versioned marketing app for **tweet.stream**. Vite, vanilla JavaScript, CSS, and Three.js; no backend, analytics, cookies, external fonts, or live X calls.

- **Private website repository:** `ashayas/tweet-stream-landing-page`
- **Public core API / MCP repository:** https://github.com/ashayas/tweetstream
- **Local website checkout:** `tweet_stream/landing-page` (ignored by the parent repository)

## Run locally

```sh
npm ci
npm run dev
# http://127.0.0.1:5173
```

```sh
npm run build
npm run preview
# http://127.0.0.1:4173
```

`dist/` is a static deployable site. `/privacy` and `/tos` have generated HTML and remain readable with JavaScript disabled. `/contact` also includes readable static HTML. The homepage loads the 3D module lazily; legal pages do not load it.

## The experience

- Procedural ice arena, rounded boards, safety glass, seats, netted goals, ice scratches, center-ice bird, and scoreboard.
- Slow orbit, pointer/touch camera controls, six numbered tool positions, and synchronized tool descriptions.
- Play mode: aim slider, Space or Shoot, moving goalie, goals/saves/wide shots, score, and particles.
- Sound is opt-in. Motion follows `prefers-reduced-motion`, with a manual pause control. Offscreen rendering is suspended. WebGL failure leaves the rest of the site usable.
- Keyboard-accessible tabs, visible focus states, skip link, mobile layout, and local font files.
- No real account, token, or X access is needed to play.

## Editable 3D and brand assets

- `src/scene-model.js` is the browser scene’s source of truth. It generates meshes and ice/scoreboard textures without remote assets.
- `assets/open-ice-arena.blend` is an **actual native Blender scene**, with packed textures, individually named parts, studio lights, and an editorial camera. Generated and opened using Blender 4.5.9 LTS.
- `assets/open-ice-arena.glb` is the portable scene, importable into Blender or other 3D tools. These editing assets are not included in the web payload.
- `public/brand/` contains the original geometric blue bird, app icons, favicon, Apple icon, MCP icons, and social card. The bird is an original mark, not the Twitter logo.

To rebuild editing assets while the dev server is running:

```sh
node scripts/export-arena.mjs # requires installed Google Chrome
blender --background --python scripts/build-blend.py -- "$PWD"
```

Rebuild PNG brand sizes with `node scripts/brand-assets.mjs`.

## Content and policies

Product/tool copy and connection snippets: `src/content.js`. Policy copy: `src/legal.js`. Layout: `src/main.js`. The policies reflect the current core code, including operator-held OAuth token files and the lack of automatic record deletion. They do not claim an unimplemented deletion endpoint or token encryption.

**Before production:** confirm the operator’s legal name (currently Vartabase AI from the core README) and set a real private contact email. An optional `VITE_CONTACT_EMAIL` populates the contact page. Until configured, it links to the maintainer’s GitHub profile to arrange private contact, not to a public issue for sensitive requests. Confirm the actual host’s log retention and processing arrangements against the policy before operating OAuth in production.

The static site does not deploy the hosted API. Connection snippets for `tweet.stream` become usable only when that API is configured and routed. The local MCP snippet uses a built checkout instead of assuming an npm publication exists.

## Cloudflare deployment

`tweet-stream-landing-page.pages.dev` is the static Pages deployment. A small Worker in `router/` serves the homepage, policies, contact page, and public site assets at `https://tweet.stream`. It does not change DNS. It forwards requests that do not match those paths to the configured zone origin, so the existing `/auth/*`, `/api/*`, `/mcp/*`, and `/health` routes continue to reach the core server.

Sign in with `npx wrangler login`, copy `.env.example` to `.env`, and run `npm run deploy`. This builds and publishes Pages first, then attaches the narrow hostname routes in `router/wrangler.toml`. Direct Upload is intentional; this Pages project is not attached to GitHub Actions. The repositories remain independent.

To publish just the static Pages site, run `npm run build`, then `npx wrangler pages deploy dist --project-name tweet-stream-landing-page --branch main --env-file .env`. Publishing the main hostname routes is a separate `npx wrangler deploy --config router/wrangler.toml --env-file .env` step.

The static site and its route Worker do not deploy the core API. A reverse-proxy example for hosting the core server is in `deploy/Caddyfile.example`. Configure TLS at the host; set the X callback to `https://tweet.stream/auth/callback` in the core service.

Use directory indexes / clean URLs. Return `dist/404.html` with status 404 for unknown static paths. `public/_headers` is provided for static hosts supporting that convention. Apply equivalent response headers on other hosts. `robots.txt`, `sitemap.xml`, Open Graph tags, favicon and web manifest are included.

Local development does not publish files or change Worker routes.

## Validation

```sh
npm test
npx playwright test # local Google Chrome; starts or reuses Vite on 5173
npm run build
npm run test:production # checks the built site and JavaScript-disabled legal pages
```

Tests cover shot outcomes, six tool selectors, keyboard tab navigation, scoring and misses, clipboard configurations, direct legal routes, mobile overflow, reduced motion, and WebGL failure.

## Ownership

This private landing-page repository and its artwork are separate from the Apache-2.0 core server. All rights reserved unless separately granted. The shared bird artwork may be used to identify tweet.stream and its MCP server. Third-party dependency and font licenses continue to apply.
