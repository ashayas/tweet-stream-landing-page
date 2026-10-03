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
const header = `<a class="skip" href="#main">Skip to content</a><header class="header"><a class="brand" href="/" aria-label="tweet.stream home"><img src="/brand/bird.svg" width="38" height="38" alt=""/>tweet<span>.stream</span></a><nav aria-label="Main navigation"><a href="/#playbook">The playbook</a><a href="/#setup">Get connected</a><a href="/#open-source">Open source ${arrow}</a></nav><a class="source-link" href="${source}" target="_blank" rel="noopener">${github}<span>View source</span>${arrow}</a></header>`;
const footer = `<footer class="footer"><div class="footer-top"><a class="brand" href="/"><img src="/brand/bird.svg" width="35" height="35" alt=""/>tweet<span>.stream</span></a><p>Built in the open. Played your way.</p><a href="/#top">Back to the top ↑</a></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Vartabase AI</span><span>Independent project. Not affiliated with X.</span><div><a href="/privacy">Privacy</a><a href="/tos">Terms</a><a href="/contact">Contact</a><a href="${source}">GitHub ${arrow}</a></div></div></footer>`;
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
  app.innerHTML = `${header}<main id="main" class="legal"><a class="back" href="/">← Back to the rink</a><span class="eyebrow">${policy.eyebrow}</span><h1>${policy.title}</h1><p class="legal-intro">${policy.intro}</p><div class="legal-date">EFFECTIVE OCTOBER 3, 2026 <span>·</span> VARTABASE AI</div><div class="legal-layout"><aside><p class="eyebrow">ON THIS PAGE</p>${policy.sections.map(([title], i) => `<a href="#section-${i + 1}">${String(i + 1).padStart(2, "0")} ${title}</a>`).join("")}<a href="/contact">Contact the maintainer ↗</a></aside><article>${policy.sections.map(([title, body], i) => `<section id="section-${i + 1}"><span class="eyebrow">${String(i + 1).padStart(2, "0")}</span><h2>${title}</h2><p>${body}</p></section>`).join("")}<p class="policy-links">Related: <a href="/privacy">Privacy policy</a> · <a href="/tos">Terms of service</a> · <a href="/contact">Contact</a> · <a href="https://x.com/en/privacy">X privacy policy</a> · <a href="https://docs.x.com/developer-terms/policy">X Developer Policy</a> · <a href="https://x.com/en/tos">X Terms</a> · <a href="https://help.x.com/en/rules-and-policies/x-automation">Automation rules</a></p></article></div></main>${footer}`;
} else if (path === "/contact") {
  setTitle("Contact");
  const contact = import.meta.env.VITE_CONTACT_EMAIL;
  app.innerHTML = `${header}<main id="main" class="legal contact"><a class="back" href="/">← Back to the rink</a><span class="eyebrow">OFF THE ICE</span><h1>Let’s talk.</h1><p class="legal-intro">Questions, contributions, or something that needs fixing.</p><div class="contact-grid"><section><span class="eyebrow">01 / PROJECT</span><h2>Build with us.</h2><p>Found a bug or have an idea for the core API? Open an issue or contribute to the project.</p><a class="button primary" href="${source}/issues">Project issues ${arrow}</a></section><section><span class="eyebrow">02 / PRIVATE MATTERS</span><h2>Your account comes first.</h2><p>For privacy, account deletion, or security concerns, ${contact ? "email the maintainer directly." : "contact the maintainer through the contact details on their GitHub profile to arrange a private conversation."} Never put tokens or personal information in a public issue.</p><a class="button outline" href="${contact ? `mailto:${esc(contact)}` : "https://github.com/ashayas"}">${contact ? esc(contact) : "Contact the maintainer"} ${arrow}</a></section></div><p>To disconnect immediately, revoke access in <a href="https://x.com/settings/connected_apps">X’s connected apps settings</a>. This revokes access; deletion of a stored hosted record must be requested separately.</p></main>${footer}`;
} else if (path !== "/") {
  setTitle("Offside");
  app.innerHTML = `${header}<main id="main" class="legal contact"><span class="eyebrow">404 / OFFSIDE</span><h1>Out of play.</h1><p class="legal-intro">That page isn’t on the ice.</p><a class="button primary" href="/">Back to the rink ↗</a></main>${footer}`;
} else {
  app.innerHTML = `${header}<main id="main">
  <section class="hero" id="top" aria-labelledby="hero-title">
    <div class="hero-grid" aria-hidden="true"></div><div class="hero-copy"><div class="eyebrow hero-eyebrow"><span class="live-dot"></span> OPEN-SOURCE X API & MCP SERVER</div><h1 id="hero-title">GIVE YOUR<br>AGENT<br><span>HOME ICE.</span><i class="title-asterisk" aria-hidden="true">✳</i></h1><p class="hero-description">From the first prompt to the final post.<br>Connect your AI agent to X, with an open-source<br class="desktop-break"> toolkit that puts you in control.</p><div class="hero-actions"><a class="button primary" href="#setup">Put your agent in play ${arrow}</a><button class="text-button" id="start-play">Or, just shoot a puck <span aria-hidden="true">↗</span></button></div><div class="hero-meta"><span>APACHE 2.0</span><i></i><span>SELF-HOSTABLE</span><i></i><span>BUILT FOR MCP</span></div></div>
    <div class="arena-wrap"><div class="arena-top"><span><span class="live-dot"></span> THE TWEET.STREAM ARENA</span><span>EST. 2026 / OPEN TO EVERYONE</span></div><div id="arena" role="region" aria-label="Interactive 3D hockey rink"><div class="scene-loading" id="scene-loading"><span class="loading-puck"></span>Resurfacing the ice…</div><div id="hotspots" aria-label="Explore the six MCP tools"></div><div class="scene-caption"><span class="crosshair">+</span><span>YOUR AGENT’S NEW HOME GROUND</span><span class="crosshair">+</span></div></div><div class="arena-overlay"><div class="score"><span>YOU</span><strong id="score-you">00</strong><span class="score-divider">:</span><strong id="score-shots">00</strong><span>SHOTS</span></div><div class="arena-view"><button id="rotate" aria-label="Rotate rink view" title="Rotate rink view">↻</button><button id="motion" aria-pressed="false" aria-label="Pause arena animation" title="Pause arena animation">Ⅱ</button><button id="sound" aria-pressed="false" aria-label="Enable game sound" title="Enable game sound">♪<span>off</span></button></div></div><div class="rink-mode"><div role="group" aria-label="Rink mode"><button class="active" id="explore-mode" aria-pressed="true">01 / EXPLORE</button><button id="play-mode" aria-pressed="false">02 / TAKE A SHOT ↗</button></div><span id="arena-hint">Pick a position. Meet your toolkit.</span></div><div class="game-controls" id="game-controls" hidden><label for="aim">AIM <span>←</span><input id="aim" type="range" min="-1.5" max="1.5" step="0.01" value="0.55"/><span>→</span></label><button id="shoot" class="button primary">Shoot <kbd>SPACE</kbd></button></div><p id="game-message" class="game-message" aria-live="polite"></p></div>
    <div class="hero-bottom"><span>NO BLACK BOX. JUST OPEN ICE.</span><a href="#playbook">SCROLL TO EXPLORE <span>↓</span></a><span class="coordinates">49.2827° N &nbsp; 123.1207° W</span></div>
  </section>
  <div class="compatibility"><span>PLAYS WELL WITH YOUR LINEUP</span><div><b>Claude</b><b class="cursor-word">◩ Cursor</b><b>Windsurf</b><b class="mcp-word">⌘ Any MCP client</b></div><span>ONE SERVER. YOUR STACK.</span></div>
  <section class="playbook section" id="playbook"><div class="section-heading"><div><span class="eyebrow">01 / THE PLAYBOOK</span><h2>SIX TOOLS.<br><span>ONE UNFAIR ADVANTAGE.</span></h2></div><p>Every great play starts with the right position.<br>Meet the tools that connect your agent to X.</p></div><div class="tool-tabs" role="tablist" aria-label="MCP tools">${tools.map((t, i) => `<button role="tab" id="tool-tab-${i}" aria-controls="tool-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-tool="${i}"><span>0${i + 1}</span>${t.name}<span class="tab-arrow">↗</span></button>`).join("")}</div><div class="tool-detail" id="tool-panel" role="tabpanel" aria-labelledby="tool-tab-0" tabindex="0"><div class="tool-description"><div class="jersey-number" id="tool-number" aria-hidden="true">01</div><span class="eyebrow" id="tool-role"></span><h3 id="tool-title"></h3><p id="tool-desc"></p><span class="tool-badge">● AVAILABLE VIA MCP + API</span></div><div class="terminal-card"><div class="terminal-top"><span><i></i><i></i><i></i></span><span>THE PLAY, IN PRACTICE</span><span>↗</span></div><div class="terminal-body"><div class="code-label">TOOL CALL <span id="call-name"></span></div><pre id="tool-input"></pre><div class="code-label response-label">ILLUSTRATIVE RESPONSE</div><pre id="tool-output"></pre><div class="demo-note"><span>✓</span> A simulated play. No live X account connected.</div></div></div></div><p class="access-note">Your X API permissions and rate limits determine which tools you can use. <a href="https://docs.x.com/x-api/introduction">Check X’s current access options ↗</a></p></section>
  <section class="setup section" id="setup"><div class="setup-intro"><span class="eyebrow">02 / SUIT UP</span><h2>FROM BENCH<br>TO <span>FIRST STRING.</span></h2><p>Your infrastructure or a configured hosted server.<br>Pick your setup. Keep control of your keys.</p><ol class="setup-steps"><li><span>01</span><div><h3>Choose your home ice</h3><p>Clone and build the server, or connect to a hosted instance.</p></div></li><li><span>02</span><div><h3>Bring your credentials</h3><p>Use your own X keys locally, or authorize a hosted connection with X.</p></div></li><li><span>03</span><div><h3>Make the first play</h3><p>Add the configuration to your client. Start with a profile read.</p></div></li></ol><a class="text-link" href="${source}#readme">Read the full setup guide ${arrow}</a></div><div class="config-area"><div class="config-tabs" role="tablist" aria-label="Connection method">${Object.entries(
    configs,
  )
    .map(
      ([key, v], i) =>
        `<button role="tab" id="config-${key}" data-config="${key}" aria-selected="${i === 0}" aria-controls="config-panel" tabindex="${i === 0 ? 0 : -1}">${v.label}</button>`,
    )
    .join(
      "",
    )}</div><div class="config-card" id="config-panel" role="tabpanel" aria-labelledby="config-local"><div class="config-top"><span id="config-file">mcp.json</span><button id="copy-config" aria-label="Copy configuration">Copy <span>⧉</span></button></div><pre><code id="config-code"></code></pre><p id="config-note"></p></div><div class="connect-note"><span>↳</span><p>Hosting tweet.stream? Route <code>/auth</code>, <code>/api</code>, and <code>/mcp</code> to your server. <a href="${source}#readme">Deployment guide ↗</a></p></div></div></section>
  <section class="open-source section" id="open-source"><div class="open-heading"><span class="eyebrow">03 / BUILT IN THE OPEN</span><span class="license-stamp">APACHE<br><strong>2.0</strong></span></div><h2>THE ICE<br>BELONGS TO <span>EVERYONE.</span></h2><div class="open-bottom"><p>Read the code. Run your own server. Make it better.<br>The core API and MCP server are open source.<br>No mystery playbook. No permission to innovate.</p><a class="button dark" href="${source}" target="_blank" rel="noopener">${github} ashayas / tweetstream ${arrow}</a></div><div class="source-details"><span>FORK IT</span><span>SELF-HOST IT</span><span>BUILD ON IT</span><span>MAKE IT YOURS ↗</span></div></section>
  <section class="faq section"><div><span class="eyebrow">04 / BEFORE THE FACEOFF</span><h2>GOOD QUESTIONS.<br><span>STRAIGHT ANSWERS.</span></h2></div><div class="questions"><details><summary>Is tweet.stream really open source?<span>+</span></summary><p>Yes. The core X API and MCP server is designated Apache-2.0. Inspect, modify, and self-host the code from <a href="${source}">ashayas/tweetstream</a>. This landing page and its branding are maintained separately.</p></details><details><summary>Do I need an X developer account?<span>+</span></summary><p>For self-hosted bring-your-own-key use, you need your own X API access. A configured hosted service can use OAuth so users connect an X account without managing app credentials themselves. Available tools still depend on the host’s X access.</p></details><details><summary>Does open source mean free X API access?<span>+</span></summary><p>No. tweet.stream’s core code is open source, but X sets its own API access, pricing, and rate limits. Your infrastructure and AI client may also have costs. Check the current terms of each provider.</p></details><details><summary>Will my agent post without asking me?<span>+</span></summary><p>A write tool call can publish directly to your connected account. Set approval rules in your AI client and review its behavior before allowing write access. The puck game on this page is only a simulation and never posts anything.</p></details><details><summary>Can I use it with my existing agent?<span>+</span></summary><p>Use a compatible MCP client over local stdio or the server’s remote SSE transport. You can also call the REST API from your own application. Client support for remote SSE varies.</p></details><details><summary>How do I disconnect or delete my data?<span>+</span></summary><p>Revoke access in <a href="https://x.com/settings/connected_apps">X’s connected apps settings</a>. Ask your server operator to delete stored connection records. See our <a href="/privacy">privacy policy</a> and <a href="/contact">contact page</a> for details.</p></details></div></section>
  <section class="final-cta"><img src="/brand/bird.svg" alt="" width="100" height="100"/><div><span class="eyebrow">YOUR NEXT GREAT PLAY STARTS HERE.</span><h2>LET’S BREAK THE ICE.</h2></div><a class="button primary" href="#setup">Get started ${arrow}</a></section></main>${footer}`;
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
      document
        .querySelector("#playbook")
        .scrollIntoView({
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
