import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { policies } from '../src/legal.js';
const index=await readFile('dist/index.html','utf8');
for(const [route,policy] of Object.entries(policies)){
  const content=`<header class="header"><a class="brand" href="/"><img src="/brand/bird.svg" width="38" height="38" alt=""/>tweet.stream</a></header><main id="main" class="legal"><a class="back" href="/">← Back to the rink</a><span class="eyebrow">${policy.eyebrow}</span><h1>${policy.title}</h1><p class="legal-intro">${policy.intro}</p><div class="legal-date">EFFECTIVE OCTOBER 3, 2026 · VARTABASE AI</div><article>${policy.sections.map(([title,body],i)=>`<section id="section-${i+1}"><h2>${title}</h2><p>${body}</p></section>`).join('')}</article><p><a href="/contact">Contact</a> · <a href="/privacy">Privacy policy</a> · <a href="/tos">Terms of service</a></p></main>`;
  const html=index.replace(/<title>.*?<\/title>/,`<title>${policy.title.slice(0,-1)} — tweet.stream</title>`).replace('href="https://tweet.stream/"',`href="https://tweet.stream/${route}"`).replace('content="https://tweet.stream/"',`content="https://tweet.stream/${route}"`).replace(/<meta name="description"[^>]*>/,`<meta name="description" content="${policy.intro}" />`).replace(/<meta property="og:title"[^>]*>/,`<meta property="og:title" content="${policy.title.slice(0,-1)} — tweet.stream" />`).replace(/<meta property="og:description"[^>]*>/,`<meta property="og:description" content="${policy.intro}" />`).replace('<div id="app"></div>',`<div id="app">${content}</div>`).replace(/<noscript>[\s\S]*?<\/noscript>/,'');
  await mkdir(`dist/${route}`,{recursive:true});await writeFile(`dist/${route}/index.html`,html);
}
await mkdir('dist/contact',{recursive:true});await writeFile('dist/contact/index.html',index.replace('<title>tweet.stream — Give your agent home ice.</title>','<title>Contact — tweet.stream</title>'));
await writeFile('dist/404.html',index.replace('<title>tweet.stream — Give your agent home ice.</title>','<title>Offside — tweet.stream</title>'));
console.log('Generated static /privacy and /tos pages, /contact, and 404.');
