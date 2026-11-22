// LogicBalls family parts. Framework-free: each function returns an HTML string, so the same code
// works in Astro (<Fragment set:html={...} />) and React/Next (dangerouslySetInnerHTML).
// Import the styles once per site: import "@logicballsai/family/family.css"
//
// What lives here is only what every product shares:
//   brandMark()  product logo + "by LogicBalls" (header and footer)
//   familyRow()  "The LogicBalls family": all seven products, current one marked
//   bottomBar()  "<Product> is a LogicBalls product" · © year · address · Follow LogicBalls + socials
//   familyFooter() = familyRow() + bottomBar()
// Each product keeps its own menu, buttons, footer columns, tagline and badges.

import { PARENT, ADDRESS, PRODUCTS, SOCIAL, productById } from "./data.js"
import { ICONS } from "./icons.js"

export { PARENT, ADDRESS, PRODUCTS, SOCIAL, ICONS, productById }

const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }
export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ESC[c])

// Adds UTM tags so GA shows which product and which spot sent the visit.
export function withUtm(href, from, spot) {
  const u = new URL(href)
  u.searchParams.set("utm_source", from)
  u.searchParams.set("utm_medium", "referral")
  u.searchParams.set("utm_campaign", `family_${spot}`)
  return u.toString()
}

const lbIcon = (size) => `<img src="${ICONS.logicballs}" alt="" width="${size}" height="${size}" class="lbf-lb">`

/**
 * Product logo with "by LogicBalls" under it (TinyWow style).
 * @param {object} o
 * @param {string} o.product  product id, e.g. "kveeky"
 * @param {string} o.logo     the product's own logo as trusted HTML (an <img> or inline <svg>)
 * @param {string} [o.href]   where the logo links, default "/"
 * @param {"header"|"footer"} [o.spot] used for UTM tags, default "header"
 */
export function brandMark({ product, logo, href = "/", spot = "header" }) {
  const p = productById(product)
  return `<span class="lbf-brand">` +
    `<a class="lbf-brand-logo" href="${esc(href)}" aria-label="${esc(p.name)} home">${logo}</a>` +
    `<a class="lbf-by" href="${esc(withUtm(PARENT.href, p.id, spot))}" rel="noopener">by ${lbIcon(12)}<strong>${PARENT.name}</strong></a>` +
    `</span>`
}

/** "The LogicBalls family": all seven products. The current one is marked, not linked. */
export function familyRow({ product }) {
  const p = productById(product)
  const items = PRODUCTS.map((x) => {
    const body = `<img src="${ICONS[x.id]}" alt="" width="28" height="28" loading="lazy">` +
      `<span><strong>${esc(x.name)}</strong><small>${esc(x.line)}</small></span>`
    return x.id === p.id
      ? `<li><span class="lbf-here" aria-current="page">${body}</span></li>`
      : `<li><a href="${esc(withUtm(x.href, p.id, "footer"))}" rel="noopener">${body}</a></li>`
  }).join("")
  return `<div class="lbf-family"><h2 class="lbf-h">The ${PARENT.name} family</h2><ul>${items}</ul></div>`
}

/** Bottom bar: endorsement, © year, address, LogicBalls social accounts. */
export function bottomBar({ product, year = new Date().getFullYear() }) {
  const p = productById(product)
  const isParent = p.id === "logicballs"
  const endorse = isParent ? "" :
    `<a class="lbf-endorse" href="${esc(withUtm(PARENT.href, p.id, "footer"))}" rel="noopener">${lbIcon(16)}<span>${esc(p.name)} is a ${PARENT.name} product</span></a>`
  const social = SOCIAL.map((s) =>
    `<li><a href="${esc(s.href)}" rel="noopener" target="_blank" aria-label="${PARENT.name} on ${esc(s.label)}" title="${esc(s.label)}">` +
    `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${s.icon}"/></svg></a></li>`).join("")
  return `<div class="lbf-bottom">` +
    `<p class="lbf-legal">${endorse}<span>© ${Number(year)} ${PARENT.name}</span><span>${ADDRESS}</span></p>` +
    `<div class="lbf-follow"><span>Follow ${PARENT.name}</span><ul>${social}</ul></div>` +
    `</div>`
}

/** The shared part of the footer: family row + bottom bar, in one wrapper. */
export function familyFooter({ product, year }) {
  return `<div class="lbf">${familyRow({ product })}${bottomBar({ product, year })}</div>`
}
