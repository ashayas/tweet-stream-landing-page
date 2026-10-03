import { test, expect } from "@playwright/test";

test("desktop rink loads without errors and every tool is selectable", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.locator("#arena")).toHaveAttribute("data-ready", "true");
  await expect(
    page.getByRole("heading", { name: "GIVE YOUR AGENT HOME ICE." }),
  ).toBeVisible();
  await expect(page.locator(".hotspot")).toHaveCount(6);
  await page
    .getByRole("button", { name: "Explore search_tweets", exact: true })
    .click();
  await expect(page.locator("#tool-title")).toHaveText(
    "Find your next opening.",
  );
  for (let i = 0; i < 6; i++) {
    await page.locator(`#tool-tab-${i}`).click();
    await expect(page.locator(`#tool-tab-${i}`)).toHaveAttribute(
      "aria-selected",
      "true",
    );
  }
  await page.locator("#tool-tab-5").press("ArrowRight");
  await expect(page.locator("#tool-tab-0")).toBeFocused();
  expect(errors).toEqual([]);
});
test("puck game counts shots, scores a goal, and recovers after misses", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("#arena")).toHaveAttribute("data-ready", "true");
  await page.locator("#play-mode").click();
  await page.locator("#aim").fill("0.7");
  await page.locator("#shoot").click();
  await expect(page.locator("#game-message")).toContainText("TOP SHELF");
  await expect(page.locator("#score-you")).toHaveText("01");
  await expect(page.locator("#shoot")).toBeEnabled();
  await page.locator("#aim").fill("1.5");
  await page.locator("#aim").press("Space");
  await expect(page.locator("#game-message")).toContainText("JUST WIDE");
  await expect(page.locator("#score-shots")).toHaveText("02");
  await expect(page.locator("#shoot")).toBeEnabled();
  await page.locator("#aim").fill("0");
  await page.locator("#shoot").click();
  await expect(page.locator("#game-message")).toContainText("GLOVE SAVE");
  await expect(page.locator("#score-shots")).toHaveText("03");
  await expect(page.locator("#score-you")).toHaveText("01");
  await page.locator("#explore-mode").click();
  await expect(page.locator("#game-controls")).toBeHidden();
  await expect(page.locator("#hotspots")).toBeVisible();
});
test("connection tabs and clipboard use the selected configuration", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.locator("#config-rest").click();
  await expect(page.locator("#config-code")).toContainText(
    "curl https://tweet.stream/api/v1/me",
  );
  await page.locator("#copy-config").click();
  await expect(page.locator("#copy-config")).toHaveText("Copied ✓");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "Authorization: Bearer",
  );
  await page.locator("#config-remote").click();
  await expect(page.locator("#config-code")).toContainText("/mcp/sse?key=");
});
test("policy routes, contact, and unknown route render directly", async ({
  page,
}) => {
  for (const [path, title] of [
    ["/privacy", "Privacy policy."],
    ["/tos", "Terms of service."],
    ["/contact", "Let’s talk."],
    ["/missing", "Out of play."],
  ]) {
    await page.goto(path);
    await expect(
      page.getByRole("heading", { name: title, exact: true }),
    ).toBeVisible();
    expect(await page.locator("canvas").count()).toBe(0);
  }
});
test("mobile stays within viewport and game controls remain usable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator("#arena")).toHaveAttribute("data-ready", "true");
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390);
  await page.screenshot({
    path: "/tmp/tweet-stream-mobile.png",
    fullPage: true,
  });
  await page.locator("#start-play").click();
  await expect(page.locator("#shoot")).toBeVisible();
  await page.locator("#aim").fill("1.5");
  await page.locator("#shoot").click();
  await expect(page.locator("#game-message")).toContainText("JUST WIDE");
  await page.locator(".questions summary").first().click();
  await expect(page.locator(".questions details").first()).toHaveAttribute(
    "open",
    "",
  );
});
test("reduced motion starts paused and animation can be explicitly resumed", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("#arena")).toHaveAttribute("data-ready", "true");
  await expect(page.locator("#motion")).toHaveAttribute("aria-pressed", "true");
  await page.locator("#motion").click();
  await expect(page.locator("#motion")).toHaveAttribute(
    "aria-pressed",
    "false",
  );
});
test("WebGL failure keeps the page and tool explorer usable", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (type.includes("webgl")) return null;
      return original.call(this, type, ...args);
    };
  });
  await page.goto("/");
  await expect(page.locator("#scene-loading")).toContainText(
    "The ice is taking a break.",
  );
  await expect(page.locator("#play-mode")).toBeDisabled();
  await page.locator("#tool-tab-3").click();
  await expect(page.locator("#call-name")).toHaveText("read_timeline");
});
