import "@fontsource/barlow-condensed/latin-600.css";
import "@fontsource/barlow-condensed/latin-700.css";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/dm-sans/latin-700.css";
import "./style.css";
import { tools, configs, source } from "./content.js";
import { policies } from "./legal.js";

const arrow = '<span aria-hidden="true">↗</span>';
const github =
  '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.26-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.03a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.66.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.75c0 .26.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>';
const esc = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
const header = `<a class="skip" href="#main">Skip to content</a><header class="header"><a class="brand" href="/" aria-label="tweet.stream home"><img src="/brand/bird.svg" width="38" height="38" alt=""/>tweet<span>.stream</span></a><nav aria-label="Main navigation"><a href="/#rink-zones">Architecture</a><a href="/#playbook">Tools</a><a href="/#setup">Setup</a><a href="/#open-source">Open Source ${arrow}</a></nav><a class="source-link" href="${source}" target="_blank" rel="noopener">${github}<span>View source</span>${arrow}</a></header>`;
const footer = `<footer class="footer"><div class="footer-top"><a class="brand" href="/"><img src="/brand/bird.svg" width="35" height="35" alt=""/>tweet<span>.stream</span></a><p>Built in the open. Self-host anywhere.</p><a href="/#top">Back to the top ↑</a></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Vartabase AI</span><span>Independent open-source project. Not affiliated with X.</span><div><a href="/privacy">Privacy</a><a href="/tos">Terms</a><a href="/contact">Contact</a><a href="${source}">GitHub ${arrow}</a></div></div></footer>`;
const path = location.pathname.replace(/\/+$/, "") || "/";
const policy = policies[path.slice(1)];
const app = document.querySelector("#app");
const setTitle = (title) => {
  document.title = `${title} — tweet.stream`;
  document.querySelector('link[rel="canonical"]').href =
    `https://tweet.stream${path}`;
  document.querySelector('meta[property="og:url"]').content =
    `https://tweet.stream${path}`;
};
if (policy) {
  setTitle(policy.title.slice(0, -1));
  app.innerHTML = `${header}<main id="main" class="legal"><a class="back" href="/">← Back to home</a><span class="eyebrow">${policy.eyebrow}</span><h1>${policy.title}</h1><p class="legal-intro">${policy.intro}</p><div class="legal-date">EFFECTIVE OCTOBER 3, 2026 <span>·</span> VARTABASE AI</div><div class="legal-layout"><aside><p class="eyebrow">ON THIS PAGE</p>${policy.sections.map(([title], i) => `<a href="#section-${i + 1}">${String(i + 1).padStart(2, "0")} ${title}</a>`).join("")}<a href="/contact">Contact the maintainer ↗</a></aside><article>${policy.sections.map(([title, body], i) => `<section id="section-${i + 1}"><span class="eyebrow">${String(i + 1).padStart(2, "0")}</span><h2>${title}</h2><p>${body}</p></section>`).join("")}<p class="policy-links">Related: <a href="/privacy">Privacy policy</a> · <a href="/tos">Terms of service</a> · <a href="/contact">Contact</a> · <a href="https://x.com/en/privacy">X privacy policy</a> · <a href="https://docs.x.com/developer-terms/policy">X Developer Policy</a> · <a href="https://x.com/en/tos">X Terms</a> · <a href="https://help.x.com/en/rules-and-policies/x-automation">Automation rules</a></p></article></div></main>${footer}`;
} else if (path === "/contact") {
  setTitle("Contact");
  const contact = import.meta.env.VITE_CONTACT_EMAIL;
  app.innerHTML = `${header}<main id="main" class="legal contact"><a class="back" href="/">← Back to home</a><span class="eyebrow">SUPPORT &amp; INQUIRIES</span><h1>Let’s talk.</h1><p class="legal-intro">Questions, self-hosting help, contributions, or security reports.</p><div class="contact-grid"><section><span class="eyebrow">01 / PROJECT</span><h2>Build with us.</h2><p>Found an issue or want to contribute new tools to the MCP server? Open an issue or pull request.</p><a class="button primary" href="${source}/issues">Project issues ${arrow}</a></section><section><span class="eyebrow">02 / PRIVATE MATTERS</span><h2>Your account comes first.</h2><p>For privacy, account deletion, or security concerns, ${contact ? "email the maintainer directly." : "contact the maintainer through the contact details on their GitHub profile to arrange a private conversation."} Never put tokens or personal information in a public issue.</p><a class="button outline" href="${contact ? `mailto:${esc(contact)}` : "https://github.com/ashayas"}">${contact ? esc(contact) : "Contact the maintainer"} ${arrow}</a></section></div><p>To disconnect, revoke access in <a href="https://x.com/settings/connected_apps">X’s connected apps settings</a> and remove the session from your self-hosted token store.</p></main>${footer}`;
} else if (path !== "/") {
  setTitle("Not Found");
  app.innerHTML = `${header}<main id="main" class="legal contact"><span class="eyebrow">404 / ERROR</span><h1>Out of play.</h1><p class="legal-intro">That page isn’t on the ice.</p><a class="button primary" href="/">Back to home ↗</a></main>${footer}`;
} else {
  app.innerHTML = `${header}<main id="main">
  <section class="hero" id="top" aria-labelledby="hero-title">
    <div class="hero-grid" aria-hidden="true"></div><div class="hero-copy"><div class="eyebrow hero-eyebrow"><span class="live-dot"></span> OPEN-SOURCE X (TWITTER) MCP SERVER · SELF-HOSTED · BYOC</div><h1 id="hero-title">TWEET FROM<br><span>ANYWHERE.</span><i class="title-asterisk" aria-hidden="true">✳</i></h1><p class="hero-description">Connect your AI coding agents to X (Twitter) with Bring Your Own Credentials (BYOC).<br class="desktop-break"> 100% self-hosted, private credentials, zero shared usage bills.</p><div class="hero-actions"><a class="button primary" href="#setup">Get started ${arrow}</a><button class="text-button" id="start-play">Or shoot a puck on the rink <span aria-hidden="true">↗</span></button></div><div class="hero-meta"><span>100% SELF-HOSTED</span><i></i><span>APACHE 2.0</span><i></i><span>ZERO SHARED QUOTAS</span></div></div>
    <div class="arena-wrap"><div class="arena-top"><span><span class="live-dot"></span> THE TWEET.STREAM ARENA</span><span>EST. 2026 / OPEN TO EVERYONE</span></div><div id="arena" role="region" aria-label="Interactive 3D hockey rink"><div class="scene-loading" id="scene-loading"><span class="loading-puck"></span>Resurfacing the ice…</div><div id="hotspots" aria-label="Explore the six MCP tools"></div><div class="scene-caption"><span class="crosshair">+</span><span>INTERACTIVE MCP ARENA</span><span class="crosshair">+</span></div></div><div class="arena-overlay"><div class="score"><span>YOU</span><strong id="score-you">00</strong><span class="score-divider">:</span><strong id="score-shots">00</strong><span>SHOTS</span></div><div class="arena-view"><button id="rotate" aria-label="Rotate rink view" title="Rotate rink view">↻</button><button id="motion" aria-pressed="false" aria-label="Pause arena animation" title="Pause arena animation">Ⅱ</button><button id="sound" aria-pressed="false" aria-label="Enable game sound" title="Enable game sound">♪<span>off</span></button></div></div><div class="rink-mode"><div role="group" aria-label="Rink mode"><button class="active" id="explore-mode" aria-pressed="true">01 / EXPLORE</button><button id="play-mode" aria-pressed="false">02 / TAKE A SHOT ↗</button></div><span id="arena-hint">Pick a position. Meet your toolkit across the ice.</span></div><div class="game-controls" id="game-controls" hidden><label for="aim">AIM <span>←</span><input id="aim" type="range" min="-1.5" max="1.5" step="0.01" value="0.55"/><span>→</span></label><button id="shoot" class="button primary">Shoot <kbd>SPACE</kbd></button></div><p id="game-message" class="game-message" aria-live="polite"></p></div>
    <div class="hero-bottom"><span>SELF-HOSTED. OPEN SOURCE. PRIVATE.</span><a href="#rink-zones">SCROLL TO EXPLORE <span>↓</span></a><span class="coordinates">49.2827° N &nbsp; 123.1207° W</span></div>
  </section>
  <div class="compatibility"><span>WORKS SEAMLESSLY WITH</span><div><b>Claude</b><b class="cursor-word">◩ Cursor</b><b>Windsurf</b><b class="mcp-word">⌘ Any MCP client</b></div><span>ONE SERVER. YOUR AGENTS.</span></div>
  <section class="rink-zones section" id="rink-zones"><div class="section-heading"><div><span class="eyebrow">PARTS OF THE ICE</span><h2>THREE ZONES.<br><span>YOUR KEYS, YOUR RULES.</span></h2></div><p>Three ways to run tweet.stream with Bring Your Own Credentials (BYOC)—keeping your keys safe, rate limits isolated, and your agent ready to tweet from anywhere.</p></div><div class="zones-grid"><article class="zone-card"><div class="zone-header"><span class="zone-pill defensive">DEFENSIVE ZONE</span><span class="zone-coords">BYOC · DIRECT</span></div><h3>Your Credentials (BYOC)</h3><p>Zero middleman. Run directly with your personal X Developer keys (API Key &amp; Secret + Access Tokens). Zero centralized databases, zero keys stored on remote servers, and zero shared usage bills.</p><div class="zone-foot"><span class="zone-foot-label">STATIONED TOOLS</span><div class="zone-tool-tags"><span>post_tweet</span><span>read_timeline</span></div></div></article><article class="zone-card featured"><div class="zone-header"><span class="zone-pill neutral">NEUTRAL ZONE</span><span class="zone-coords">LOCAL DAEMON</span></div><h3>Local MCP Engine</h3><p>Run <code>npx -y tweet-stream</code> or a local daemon in Claude Desktop, Cursor, or Antigravity via standard stdio. Automatic OAuth 2.0 PKCE token management on your own machine.</p><div class="zone-foot"><span class="zone-foot-label">STATIONED TOOLS</span><div class="zone-tool-tags"><span>reply_to_tweet</span><span>search_tweets</span></div></div></article><article class="zone-card"><div class="zone-header"><span class="zone-pill attacking">ATTACKING ZONE</span><span class="zone-coords">EDGE SERVERLESS</span></div><h3>Autonomous Play</h3><p>Deploy your private instance to Cloudflare Workers + D1 or run Docker. Tweet from remote agents, mobile, or cloud workspaces with full rate limit autonomy.</p><div class="zone-foot"><span class="zone-foot-label">STATIONED TOOLS</span><div class="zone-tool-tags"><span>get_tweet</span><span>get_my_profile</span></div></div></article></div></section>
  <section class="playbook section" id="playbook"><div class="section-heading"><div><span class="eyebrow">01 / TOOLKIT</span><h2>SIX MCP TOOLS.<br><span>TWEET FROM ANYWHERE.</span></h2></div><p>Everything your AI agent needs to publish, search, and converse on X.</p></div><div class="tool-tabs" role="tablist" aria-label="MCP tools">${tools.map((t, i) => `<button role="tab" id="tool-tab-${i}" aria-controls="tool-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-tool="${i}"><span>0${i + 1}</span>${t.name}<span class="tab-arrow">↗</span></button>`).join("")}</div><div class="tool-detail" id="tool-panel" role="tabpanel" aria-labelledby="tool-tab-0" tabindex="0"><div class="tool-description"><div class="jersey-number" id="tool-number" aria-hidden="true">01</div><div class="tool-role-row"><span class="eyebrow" id="tool-role"></span><span class="zone-badge" id="tool-zone"></span></div><h3 id="tool-title"></h3><p id="tool-desc"></p><span class="tool-badge">● AVAILABLE VIA MCP + API</span></div><div class="terminal-card"><div class="terminal-top"><span><i></i><i></i><i></i></span><span>TOOL EXECUTION PREVIEW</span><span>↗</span></div><div class="terminal-body"><div class="code-label">TOOL CALL <span id="call-name"></span></div><pre id="tool-input"></pre><div class="code-label response-label">ILLUSTRATIVE RESPONSE</div><pre id="tool-output"></pre><div class="demo-note"><span>✓</span> A simulated play. No live X account connected.</div></div></div></div><p class="access-note">Your X API permissions and rate limits determine which tools you can use. <a href="https://docs.x.com/x-api/introduction">Check X’s current access options ↗</a></p></section>
  <section class="setup section" id="setup"><div class="setup-intro"><span class="eyebrow">02 / SETUP</span><h2>CONNECT IN<br><span>MINUTES.</span></h2><p>Run tweet.stream with Bring Your Own Credentials (BYOC). Your credentials stay private on your machine; X usage is billed directly to your own developer account.</p><ol class="setup-steps"><li><span>01</span><div><h3>Bring your own keys (BYOC)</h3><p>Generate your API Key, Secret, and Access Tokens on developer.x.com under your own developer account.</p></div></li><li><span>02</span><div><h3>Connect your MCP client</h3><p>Add the configuration directly to Claude Desktop, Cursor, or Antigravity's mcp.json. Zero servers to deploy.</p></div></li><li><span>03</span><div><h3>Start tweeting</h3><p>Start with a profile inspection; verify everything works without sharing keys or incurring hosted fees.</p></div></li></ol><a class="text-link" href="#x-app">Full X app setup, step by step ↓</a></div><div class="config-area"><div class="config-tabs" role="tablist" aria-label="Local connection options">${Object.entries(
    configs,
  )
    .map(
      ([key, v], i) =>
        `<button role="tab" id="config-${key}" data-config="${key}" aria-selected="${i === 0}" aria-controls="config-panel" tabindex="${i === 0 ? 0 : -1}">${v.label}</button>`,
    )
    .join(
      "",
    )}</div><div class="config-card" id="config-panel" role="tabpanel" aria-labelledby="config-local"><div class="config-top"><span id="config-file">mcp.json</span><button id="copy-config" aria-label="Copy configuration">Copy <span>⧉</span></button></div><pre><code id="config-code"></code></pre><p id="config-note"></p></div><div class="connect-note"><span>↳</span><p>Hosting tweet.stream? Route <code>/auth</code>, <code>/api</code>, and <code>/mcp</code> to your server. <a href="${source}#readme">Deployment guide ↗</a></p></div></div></section>
  <section class="app-guide section" id="x-app"><div class="app-guide-head"><div><span class="eyebrow">03 / YOUR KEYS. YOUR APP. YOUR CALL.</span><h2>REGISTER YOUR<br><span>OWN X APP.</span></h2></div><p>There is no shared hosted MCP. Run tweet.stream locally with an X Developer app you control. Its API usage is billed to your X developer project; review access and spending limits before connecting an agent.</p></div><div class="app-guide-grid"><article class="app-guide-card"><span class="eyebrow">01 / CREATE THE APP</span><h3>Set up OAuth 2.0</h3><ol><li>Open the <a href="https://developer.x.com/en/portal/dashboard" target="_blank" rel="noopener">X Developer Portal</a>, create or choose a Project, then create an App.</li><li>Open the App’s user authentication settings. Enable OAuth 2.0 with PKCE, choose <strong>Web App</strong> (confidential client), and set app permissions to <strong>Read and Write</strong>.</li><li>Add this exact local callback URL: <code>http://localhost:3030/auth/callback</code>. Set the website URL to <code>http://localhost:3030</code>.</li><li>Save, then copy the OAuth 2.0 Client ID and Client Secret. Keep the secret on your own server; never put it in MCP client settings or commit it.</li></ol><p class="guide-footnote">Enable the OAuth scopes <code>tweet.read</code>, <code>tweet.write</code>, <code>users.read</code>, <code>media.write</code>, and <code>offline.access</code>. <code>media.write</code> enables image uploads. <a href="https://docs.x.com/fundamentals/authentication/oauth-2-0/authorization-code" target="_blank" rel="noopener">X OAuth 2.0 / PKCE docs ↗</a></p></article><article class="app-guide-card"><span class="eyebrow">02 / RUN YOUR SERVER</span><h3>Connect your account once</h3><pre><code>git clone https://github.com/ashayas/tweetstream.git
cd tweetstream
npm ci
npm run build
cp .env.example .env</code></pre><p>In <code>.env</code>, set your client ID and secret, plus these local callback values:</p><pre><code>PORT=3030
BASE_URL=http://localhost:3030
X_REDIRECT_URI=http://localhost:3030/auth/callback
X_CLIENT_ID=your_client_id
X_CLIENT_SECRET=your_client_secret</code></pre><p>Start the local server with <code>npm start</code>, then open <a href="http://localhost:3030/auth/login"><code>http://localhost:3030/auth/login</code></a> and authorize your account. The local success page gives you a <code>ts_live_...</code> key once.</p></article><article class="app-guide-card"><span class="eyebrow">03 / ADD THE MCP</span><h3>Use the local connection</h3><p>Copy the local stdio configuration above into your MCP client. Replace both absolute paths with the path to your checkout and paste the one-time key from the local authorization page. Keep the key private. Restart your MCP client after saving.</p><p>Start with <code>get_my_profile</code>. A call to <code>post_tweet</code> publishes to your real account immediately; only try it when you mean to post. You can include an image with <code>image_base64</code> and its MIME type.</p><p>For a minimal check that does not publish, call <code>get_my_profile</code>. It still makes a metered X API request.</p></article></div><p class="app-guide-source">Prefer Cloudflare Workers + D1? The <a href="${source}#cloudflare-workers-api-worker-d1">public README</a> includes a Worker self-hosting path. Configure it with your own X app, domain, and secrets.</p></section>
  <section class="open-source section" id="open-source"><div class="open-heading"><span class="eyebrow">04 / BUILT IN THE OPEN</span><span class="license-stamp">APACHE<br><strong>2.0</strong></span></div><h2>100% OPEN SOURCE.<br><span>SELF-HOST ANYWHERE.</span></h2><div class="open-bottom"><p>Read the code. Run your own server. Make it better.<br>The core API and MCP server are open source.<br>No lock-in. No shared quotas. No monthly platform markup.</p><a class="button dark" href="${source}" target="_blank" rel="noopener">${github} ashayas / tweetstream ${arrow}</a></div><div class="source-details"><span>FORK IT</span><span>SELF-HOST IT</span><span>BUILD ON IT</span><span>MAKE IT YOURS ↗</span></div></section>
  <section class="faq section"><div><span class="eyebrow">05 / FAQ</span><h2>FREQUENTLY<br><span>ANSWERED.</span></h2></div><div class="questions"><details><summary>Why Bring Your Own Credentials (BYOC)?<span>+</span></summary><p>Under X’s API pricing, requests are billed to the app owner. BYOC ensures you use your own free or paid X developer tier, your private keys never leave your machine or touch third-party servers, and the open-source maintainers don’t pay for user traffic.</p></details><details><summary>Do I have to pay tweet.stream to use this?<span>+</span></summary><p>No. tweet.stream is 100% open-source (Apache 2.0) and completely free. You only provide your own X Developer account credentials, so there are no subscription fees, markups, or middlemen.</p></details><details><summary>Is tweet.stream really open source?<span>+</span></summary><p>Yes. The core X API and MCP server is designated Apache-2.0. Inspect, modify, and self-host the code from <a href="${source}">ashayas/tweetstream</a>. This landing page and its branding are maintained separately.</p></details><details><summary>Do I need an X developer account?<span>+</span></summary><p>For self-hosted bring-your-own-key use, you need your own X API access. The recommended route is to register your own X Developer App and run tweet.stream locally. You run the server yourself and use your own app, permissions, and usage budget.</p></details><details><summary>Does open source mean free X API access?<span>+</span></summary><p>No. tweet.stream’s core code is open source, but X sets its own API access, pricing, and rate limits. Your infrastructure and AI client may also have costs. Check the current terms of each provider.</p></details><details><summary>Will my agent post without asking me?<span>+</span></summary><p>A write tool call can publish directly to your connected account. Set approval rules in your AI client and review its behavior before allowing write access. The puck game on this page is only a simulation and never posts anything.</p></details><details><summary>Can I use it with my existing agent?<span>+</span></summary><p>Use a compatible MCP client with the local stdio configuration shown above. The local stdio connection uses your own server and X app. Never put API keys in URL query strings.</p></details><details><summary>How do I disconnect or delete my data?<span>+</span></summary><p>Revoke access in <a href="https://x.com/settings/connected_apps">X’s connected apps settings</a>. Delete the session from the token store on the machine where you run the server. See our <a href="/privacy">privacy policy</a> and <a href="/contact">contact page</a> for details.</p></details></div></section>
  <section class="final-cta"><img src="/brand/bird.svg" alt="" width="100" height="100"/><div><span class="eyebrow">READY TO DEPLOY?</span><h2>TWEET FROM ANYWHERE.</h2></div><a class="button primary" href="#setup">Get started ${arrow}</a></section></main>${footer}`;
  let selectedConfig = "local";
  function selectTool(index, fromRink = false) {
    const tool = tools[index];
    document.querySelectorAll("[data-tool]").forEach((el) => {
      const selected = Number(el.dataset.tool) === index;
      el.setAttribute("aria-selected", String(selected));
      el.tabIndex = selected ? 0 : -1;
    });
    document
      .querySelector("#tool-panel")
      .setAttribute("aria-labelledby", `tool-tab-${index}`);
    for (const [id, val] of Object.entries({
      "tool-number": `0${index + 1}`,
      "tool-role": tool.role,
      "tool-zone": tool.zone,
      "tool-title": tool.title,
      "tool-desc": tool.description,
      "call-name": tool.name,
      "tool-input": tool.input,
      "tool-output": tool.output,
    }))
      document.getElementById(id).textContent = val;
    document
      .querySelectorAll(".hotspot")
      .forEach((el) =>
        el.classList.toggle("selected", Number(el.dataset.index) === index),
      );
    window.dispatchEvent(new CustomEvent("tool-selected", { detail: index }));
    if (fromRink)
      document.querySelector("#playbook").scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  }
  document
    .querySelectorAll("[data-tool]")
    .forEach((el) =>
      el.addEventListener("click", () => selectTool(Number(el.dataset.tool))),
    );
  document.querySelectorAll("[data-config]").forEach((el) =>
    el.addEventListener("click", () => {
      selectedConfig = el.dataset.config;
      renderConfig();
    }),
  );
  function renderConfig() {
    const config = configs[selectedConfig];
    document.querySelectorAll("[data-config]").forEach((el) => {
      const selected = el.dataset.config === selectedConfig;
      el.setAttribute("aria-selected", String(selected));
      el.tabIndex = selected ? 0 : -1;
    });
    document
      .querySelector("#config-panel")
      .setAttribute("aria-labelledby", `config-${selectedConfig}`);
    document.querySelector("#config-code").textContent = config.code;
    document.querySelector("#config-file").textContent = config.file;
    document.querySelector("#config-note").textContent = config.note;
    document.querySelector("#copy-config").innerHTML = "Copy <span>⧉</span>";
  }
  document.querySelectorAll('[role="tablist"]').forEach((list) =>
    list.addEventListener("keydown", (e) => {
      if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
      e.preventDefault();
      const tabs = [...list.querySelectorAll('[role="tab"]')];
      let n = tabs.indexOf(document.activeElement);
      n =
        e.key === "Home"
          ? 0
          : e.key === "End"
            ? tabs.length - 1
            : (n + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) %
              tabs.length;
      tabs[n].focus();
      tabs[n].click();
    }),
  );
  document.querySelector("#copy-config").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(configs[selectedConfig].code);
      document.querySelector("#copy-config").textContent = "Copied ✓";
    } catch {
      document.querySelector("#copy-config").textContent =
        "Select & copy below";
      const range = document.createRange();
      range.selectNodeContents(document.querySelector("#config-code"));
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
    }
  });
  selectTool(0);
  renderConfig();
  import("./rink.js")
    .then(({ initRink }) => initRink(selectTool))
    .catch((error) => {
      console.error("Rink unavailable", error);
      document.querySelector("#scene-loading").innerHTML =
        '<img src="/brand/bird.svg" width="80" height="80" alt=""/><p>The ice is taking a break.</p><p>Explore all six tools in the playbook below.</p>';
      document.querySelector("#arena").classList.add("fallback");
      document
        .querySelectorAll("#play-mode,#start-play,#rotate,#motion,#sound")
        .forEach((el) => (el.disabled = true));
    });
}
