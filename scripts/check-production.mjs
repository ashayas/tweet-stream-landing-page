import { preview } from "vite";
import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
const server = await preview({
  preview: { host: "127.0.0.1", port: 4173, strictPort: true },
});
let browser;
try {
  browser = await chromium.launch({ channel: "chrome", headless: true });
  const noJS = await browser.newContext({ javaScriptEnabled: false });
  const page = await noJS.newPage();
  for (const [route, title] of [
    ["privacy", "Privacy policy."],
    ["tos", "Terms of service."],
  ]) {
    const response = await page.goto(`http://127.0.0.1:4173/${route}/`);
    assert.equal(response.status(), 200);
    assert.equal(await page.locator("h1").innerText(), title);
    assert.equal(await page.locator("article section").count(), 10);
    assert.ok(
      (await page.locator("link[rel=canonical]").getAttribute("href")).endsWith(
        `/${route}`,
      ),
    );
  }
  await page.goto("http://127.0.0.1:4173/contact/");
  assert.equal(await page.locator("h1").innerText(), "Let’s talk.");
  assert.ok(
    (
      await page.locator("meta[name=description]").getAttribute("content")
    ).includes("maintainer"),
  );
  const web = await browser.newPage();
  const failures = [];
  const requests = [];
  web.on("pageerror", (e) => failures.push(e.message));
  web.on("request", (r) => requests.push(r.url()));
  await web.goto("http://127.0.0.1:4173/privacy/");
  await web.waitForSelector(".legal-layout");
  assert.equal(
    requests.some((url) => url.includes("/three-")),
    false,
    "Legal page must not load Three.js",
  );
  await web.goto("http://127.0.0.1:4173/");
  await web.waitForSelector('#arena[data-ready="true"]');
  assert.deepEqual(failures, []);
  for (const asset of [
    "/favicon.svg",
    "/brand/mcp-icon.png",
    "/brand/social.png",
    "/robots.txt",
    "/sitemap.xml",
    "/site.webmanifest",
  ]) {
    const response = await fetch(`http://127.0.0.1:4173${asset}`);
    assert.equal(response.status, 200, asset);
  }
  console.log(
    "Production checks passed: static legal HTML without JavaScript, canonical URLs, isolated 3D loading, home rendering, and all metadata assets.",
  );
} finally {
  if (browser) await browser.close();
  await new Promise((resolve) => server.httpServer.close(resolve));
}
