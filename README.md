# @logicballsai/family

The parts of the LogicBalls family brand that every product shares. Change them here once, bump the
version, and each product picks them up on its next install.

| Part | Function | Where |
|---|---|---|
| Brand mark: product logo + "by LogicBalls" under it | `brandMark({ product, logo, href?, spot? })` | Header and footer logo |
| "More from the LogicBalls family" row (the other 6 products) | `familyRow({ product })` | Footer |
| Bottom bar: "X is a LogicBalls product" · © year · address · Follow LogicBalls + socials | `bottomBar({ product, year? })` | Footer |
| Family row + bottom bar together | `familyFooter({ product, year? })` | Footer |

**Not in here (each product keeps its own):** menus, buttons, footer link columns, tagline, badges.

Product ids: `logicballs`, `kveeky`, `snapcorn`, `pdf7`, `gpt0`, `publish7`, `mojoindie`.
Every link out carries `utm_source=<product>&utm_medium=referral&utm_campaign=family_header|family_footer`.

## Install (GitHub Packages, private)

`.npmrc` in the product repo:

```
@logicballsai:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

Then `pnpm add @logicballsai/family`. In CI set `NODE_AUTH_TOKEN` to a token with `read:packages`
(for repos in the LogicBallsAI org, `secrets.GITHUB_TOKEN` works once the repo is given access in
the package settings).

## Use

Every function returns an HTML string. Import the CSS once.

Astro:

```astro
---
import "@logicballsai/family/family.css"
import { brandMark, familyFooter } from "@logicballsai/family"
import logo from "../assets/logo.svg?raw"
---
<Fragment set:html={brandMark({ product: "gpt0", logo })} />
...
<Fragment set:html={familyFooter({ product: "gpt0" })} />
```

React / Next:

```jsx
import "@logicballsai/family/family.css"
import { brandMark, familyFooter } from "@logicballsai/family"
<span dangerouslySetInnerHTML={{ __html: brandMark({ product: "pdf7", logo: '<img src="/logo.svg" alt="PDF7" height="28">' }) }} />
<div dangerouslySetInnerHTML={{ __html: familyFooter({ product: "pdf7" }) }} />
```

Colors can be tuned per site with CSS variables: `--lbf-text`, `--lbf-muted`, `--lbf-border`,
`--lbf-card`, `--lbf-accent` (hover color).

## Change something

- Names, links, one-liners, socials, address: `src/data.js`
- Icons: replace a file in `assets/`, run `npm run icons`
- Look: `src/family.css`
- Check: `npm test` and `npm run preview` (writes `preview.html`)
- Release: bump `version` in `package.json`, commit, then `git tag vX.Y.Z && git push --tags`.
  The publish workflow tests and publishes it.
