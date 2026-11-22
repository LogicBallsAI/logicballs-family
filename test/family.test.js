import { test } from "node:test"
import assert from "node:assert/strict"
import { brandMark, familyRow, bottomBar, familyFooter, PRODUCTS, ICONS, withUtm } from "../src/index.js"

test("every product has an icon", () => {
  for (const p of PRODUCTS) assert.ok(ICONS[p.id]?.startsWith("data:image/"), p.id)
})

test("family row lists the other six products, not the current one", () => {
  const html = familyRow({ product: "kveeky" })
  assert.equal((html.match(/<li>/g) || []).length, 6)
  assert.ok(!html.includes(">Kveeky<"))
  for (const n of ["LogicBalls", "Snapcorn", "PDF7", "GPT0", "Publish7", "MojoIndie"]) assert.ok(html.includes(`>${n}<`), n)
})

test("links carry UTM tags naming the sending product", () => {
  const html = familyRow({ product: "pdf7" })
  assert.ok(html.includes("utm_source=pdf7&amp;utm_medium=referral&amp;utm_campaign=family_footer"))
  assert.equal(withUtm("https://logicballs.com", "gpt0", "header"), "https://logicballs.com/?utm_source=gpt0&utm_medium=referral&utm_campaign=family_header")
})

test("bottom bar: endorsement, year, address, follow", () => {
  const html = bottomBar({ product: "snapcorn", year: 2026 })
  assert.ok(html.includes("Snapcorn is a LogicBalls product"))
  assert.ok(html.includes("© 2026 LogicBalls"))
  assert.ok(html.includes("415 Mission St"))
  assert.ok(html.includes("Follow LogicBalls"))
  assert.equal((html.match(/aria-label="LogicBalls on /g) || []).length, 5)
})

test("LogicBalls itself gets no 'is a LogicBalls product' line", () => {
  assert.ok(!bottomBar({ product: "logicballs", year: 2026 }).includes("is a LogicBalls product"))
})

test("brand mark keeps the product logo and adds 'by LogicBalls'", () => {
  const html = brandMark({ product: "gpt0", logo: '<img src="/logo.svg" alt="GPT0">' })
  assert.ok(html.includes('<img src="/logo.svg" alt="GPT0">'))
  assert.ok(html.includes('aria-label="GPT0 home"'))
  assert.ok(html.includes("<strong>LogicBalls</strong>"))
  assert.ok(html.includes("utm_campaign=family_header"))
})

test("unknown product id fails loudly", () => {
  assert.throws(() => familyFooter({ product: "nope" }), /unknown product/)
})
