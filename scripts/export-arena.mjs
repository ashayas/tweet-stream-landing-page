import {chromium} from '@playwright/test';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
  const page=await browser.newPage();await page.goto(process.env.PREVIEW_URL||'http://127.0.0.1:5173');await page.waitForSelector('#arena[data-ready="true"]');
  const glb=await page.evaluate(async()=>{const {exportArena}=await import('/src/rink.js');return Array.from(new Uint8Array(await exportArena()));});
  await writeFile('assets/open-ice-arena.glb',Buffer.from(glb));console.log(`Exported editable rink: ${glb.length} bytes.`);
}finally{await browser.close();}
