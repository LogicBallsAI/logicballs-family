// Translated text for the family parts. Pass `locale` ("de", "es", "pt-BR", ...) to any part;
// a language not listed here falls back to English. Product names and the address are never translated.
// {p} = product name, {s} = social network name.

const T = {
  en: {
    by: "by", family: "The LogicBalls family", endorse: "{p} is a LogicBalls product",
    follow: "Follow LogicBalls", on: "LogicBalls on {s}", home: "{p} home",
    lines: { logicballs: "The AI community", kveeky: "AI voiceovers", snapcorn: "AI image tools", pdf7: "PDF tools", gpt0: "AI detector", publish7: "Marketing research", mojoindie: "Get named by AI" },
  },
  de: {
    by: "von", family: "Die LogicBalls-Familie", endorse: "{p} ist ein Produkt von LogicBalls",
    follow: "LogicBalls folgen", on: "LogicBalls auf {s}", home: "{p} Startseite",
    lines: { logicballs: "Die KI-Community", kveeky: "KI-Voiceovers", snapcorn: "KI-Bildtools", pdf7: "PDF-Tools", gpt0: "KI-Detektor", publish7: "Marktforschung", mojoindie: "Von KI empfohlen werden" },
  },
  es: {
    by: "por", family: "La familia LogicBalls", endorse: "{p} es un producto de LogicBalls",
    follow: "Sigue a LogicBalls", on: "LogicBalls en {s}", home: "Inicio de {p}",
    lines: { logicballs: "La comunidad de IA", kveeky: "Locuciones con IA", snapcorn: "Herramientas de imagen con IA", pdf7: "Herramientas PDF", gpt0: "Detector de IA", publish7: "Investigación de marketing", mojoindie: "Que la IA te recomiende" },
  },
  fr: {
    by: "par", family: "La famille LogicBalls", endorse: "{p} est un produit LogicBalls",
    follow: "Suivre LogicBalls", on: "LogicBalls sur {s}", home: "Accueil {p}",
    lines: { logicballs: "La communauté IA", kveeky: "Voix off IA", snapcorn: "Outils d'image IA", pdf7: "Outils PDF", gpt0: "Détecteur d'IA", publish7: "Études marketing", mojoindie: "Être cité par l'IA" },
  },
  it: {
    by: "di", family: "La famiglia LogicBalls", endorse: "{p} è un prodotto LogicBalls",
    follow: "Segui LogicBalls", on: "LogicBalls su {s}", home: "Home di {p}",
    lines: { logicballs: "La community dell'IA", kveeky: "Voiceover con IA", snapcorn: "Strumenti immagine IA", pdf7: "Strumenti PDF", gpt0: "Rilevatore di IA", publish7: "Ricerche di marketing", mojoindie: "Fatti citare dall'IA" },
  },
  pt: {
    by: "por", family: "A família LogicBalls", endorse: "{p} é um produto LogicBalls",
    follow: "Siga a LogicBalls", on: "LogicBalls no {s}", home: "Início do {p}",
    lines: { logicballs: "A comunidade de IA", kveeky: "Locuções com IA", snapcorn: "Ferramentas de imagem com IA", pdf7: "Ferramentas PDF", gpt0: "Detector de IA", publish7: "Pesquisa de marketing", mojoindie: "Seja citado pela IA" },
  },
}

export const LOCALES = Object.keys(T)

/** Text for a locale: "pt-BR" -> pt, unknown -> en. */
export function text(locale = "en") {
  const base = String(locale || "en").toLowerCase().split(/[-_]/)[0]
  return T[base] ?? T.en
}

export const fill = (s, vars) => s.replace(/\{(\w)\}/g, (_, k) => vars[k] ?? "")
