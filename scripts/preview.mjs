// Writes preview.html: header mark + shared footer for every product. Open it in a browser.
import { readFileSync, writeFileSync } from "node:fs"
import { brandMark, familyFooter, PRODUCTS, ICONS } from "../src/index.js"
const css = readFileSync(new URL("../src/family.css", import.meta.url), "utf8")
const blocks = PRODUCTS.filter((p) => p.id !== "logicballs").map((p) => {
  const logo = `<img src="${ICONS[p.id]}" alt="" width="28" height="28" style="margin-right:8px"><b style="font:600 21px Inter,system-ui">${p.name}</b>`
  return `<section><header>${brandMark({ product: p.id, logo })}<nav>Menu · Pricing · Blog</nav></header>` +
    `<footer><div class="own">${brandMark({ product: p.id, logo, spot: "footer" })}<p>(${p.name}'s own columns stay here)</p></div>${familyFooter({ product: p.id })}</footer></section>`
}).join("")
writeFileSync(new URL("../preview.html", import.meta.url), `<!doctype html><meta charset="utf-8"><title>Family preview</title>
<style>${css}
body{margin:0;background:#eef0f3;font-family:Inter,system-ui,sans-serif}section{margin:24px auto;max-width:1200px;background:#fff;border:1px solid #e5e7eb;border-radius:10px}
header{display:flex;align-items:center;justify-content:space-between;padding:16px 32px;border-bottom:1px solid #e5e7eb}nav{color:#374151;font-size:15px}
footer{padding:32px;background:#f9fafb}.own p{color:#9ca3af;font-size:13px}</style>${blocks}`)
console.log("wrote preview.html")
