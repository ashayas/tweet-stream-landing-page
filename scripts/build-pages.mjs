import { readFile, writeFile, mkdir } from "node:fs/promises";
import { loadEnv } from "vite";
import { policies } from "../src/legal.js";
const index = await readFile("dist/index.html", "utf8");
const escape = (text) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
const header =
  '<header class="header"><a class="brand" href="/"><img src="/brand/bird.svg" width="38" height="38" alt=""/>tweet.stream</a></header>';
const footer =
  '<p><a href="/contact">Contact</a> · <a href="/privacy">Privacy policy</a> · <a href="/tos">Terms of service</a></p>';
function render(route, title, description, content) {
  return index
    .replace(
      /<title>[\s\S]*?<\/title>/,
      `<title>${title} — tweet.stream</title>`,
    )
    .replace(
      'href="https://tweet.stream/"',
      `href="https://tweet.stream/${route}"`,
    )
    .replace(
      'content="https://tweet.stream/"',
      `content="https://tweet.stream/${route}"`,
    )
    .replace(
      /<meta\s+name="description"[^>]*>/,
      `<meta name="description" content="${escape(description)}" />`,
    )
    .replace(
      /<meta\s+property="og:title"[^>]*>/,
      `<meta property="og:title" content="${title} — tweet.stream" />`,
    )
    .replace(
      /<meta\s+property="og:description"[^>]*>/,
      `<meta property="og:description" content="${escape(description)}" />`,
    )
    .replace(
      '<div id="app"></div>',
      `<div id="app">${header}<main id="main" class="legal">${content}${footer}</main></div>`,
    )
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript\s*>/, "");
}
for (const [route, policy] of Object.entries(policies)) {
  const content = `<a class="back" href="/">← Back to the rink</a><span class="eyebrow">${policy.eyebrow}</span><h1>${policy.title}</h1><p class="legal-intro">${policy.intro}</p><div class="legal-date">EFFECTIVE OCTOBER 3, 2026 · VARTABASE AI</div><article>${policy.sections.map(([title, body], i) => `<section id="section-${i + 1}"><h2>${title}</h2><p>${body}</p></section>`).join("")}</article>`;
  await mkdir(`dist/${route}`, { recursive: true });
  await writeFile(
    `dist/${route}/index.html`,
    render(route, policy.title.slice(0, -1), policy.intro, content),
  );
}
const env = loadEnv("production", process.cwd(), "VITE_");
const email = process.env.VITE_CONTACT_EMAIL || env.VITE_CONTACT_EMAIL;
const contactLink = email
  ? `<a href="mailto:${escape(email)}">${escape(email)}</a>`
  : '<a href="https://github.com/ashayas">Contact details on the maintainer’s GitHub profile</a>';
await mkdir("dist/contact", { recursive: true });
await writeFile(
  "dist/contact/index.html",
  render(
    "contact",
    "Contact",
    "Contact the tweet.stream maintainer about the project, privacy, or account deletion.",
    `<a class="back" href="/">← Back to the rink</a><h1>Let’s talk.</h1><h2>Project questions</h2><p><a href="https://github.com/ashayas/tweetstream/issues">Open a project issue</a> for bugs or ideas.</p><h2>Privacy, deletion, and security</h2><p>${contactLink}. Arrange private contact before sharing account information. Never include tokens or personal information in a public issue.</p><p>You can immediately revoke access through <a href="https://x.com/settings/connected_apps">X’s connected apps settings</a>. Request deletion of a stored account record separately.</p>`,
  ),
);
await writeFile(
  "dist/404.html",
  render(
    "404",
    "Offside",
    "That page is not on the ice.",
    '<span class="eyebrow">404 / OFFSIDE</span><h1>Out of play.</h1><p>That page isn’t on the ice.</p><a class="button primary" href="/">Back to the rink ↗</a>',
  ),
);
console.log("Generated static /privacy, /tos, /contact, and 404 pages.");
