// ─── Cyrillic → Latin map ────────────────────────────────────────────────────
const cyrillicToLatinMap: Record<string, string> = {
  // Uppercase
  А: "A",  Б: "B",  В: "V",  Г: "G",  Ғ: "Gʻ", Д: "D",
  Е: "E",  Ё: "Yo", Ж: "J",  З: "Z",  И: "I",  Й: "Y",
  К: "K",  Қ: "Q",  Л: "L",  М: "M",  Н: "N",
  О: "O",  П: "P",  Р: "R",  С: "S",  Т: "T",  У: "U",
  Ў: "Oʻ", Ф: "F",  Х: "X",  Ц: "Ts", Ч: "Ch", Ш: "Sh",
  Щ: "Sh", Ъ: "ʼ",  Ы: "I",  Ь: "",   Э: "E",  Ю: "Yu",
  Я: "Ya", Ҳ: "H",
  // Lowercase
  а: "a",  б: "b",  в: "v",  г: "g",  ғ: "gʻ", д: "d",
  е: "e",  ё: "yo", ж: "j",  з: "z",  и: "i",  й: "y",
  к: "k",  қ: "q",  л: "l",  м: "m",  н: "n",
  о: "o",  п: "p",  р: "r",  с: "s",  т: "t",  у: "u",
  ў: "oʻ", ф: "f",  х: "x",  ц: "ts", ч: "ch", ш: "sh",
  щ: "sh", ъ: "ʼ",  ы: "i",  ь: "",   э: "e",  ю: "yu",
  я: "ya", ҳ: "h",
};

// ─── Latin → Cyrillic map ────────────────────────────────────────────────────
// Ordered longest-first so multi-char sequences match before single chars.
// Apostrophe variants: ' (U+0027), ʻ (U+02BB), ’ (U+2019).
const latinToCyrillicPairs: [string, string][] = [
  // 4-char
  ["shch", "щ"],
  // 2-char
  ["sh", "ш"],
  ["ch", "ч"],
  ["ts", "ц"],
  ["yo", "ё"],
  ["yu", "ю"],
  ["ya", "я"],
  ["gʻ", "ғ"], ["g'", "ғ"], ["g’", "ғ"],
  ["oʻ", "ў"], ["o'", "ў"], ["o’", "ў"],
  // 1-char
  ["a", "а"], ["b", "б"], ["v", "в"], ["g", "г"], ["d", "д"],
  ["f", "ф"], ["h", "ҳ"], ["i", "и"], ["j", "ж"], ["k", "к"],
  ["l", "л"], ["m", "м"], ["n", "н"], ["o", "о"], ["p", "п"],
  ["q", "қ"], ["r", "р"], ["s", "с"], ["t", "т"], ["u", "у"],
  ["w", "в"], ["x", "х"], ["y", "й"], ["z", "з"],
  ["'", "ъ"], ["ʼ", "ъ"], ["’", "ъ"],
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function isCyrillic(text: string): boolean {
  return /[Ѐ-ӿ]/.test(text);
}

function isLetter(ch: string | undefined): boolean {
  return !!ch && /[a-zA-Zа-яА-ЯёЁўЎқҚғҒҳҲ]/.test(ch);
}

// ─── Cyrillic → Latin ────────────────────────────────────────────────────────

export function cyrillicToLatin(text: string): string {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    let lat = cyrillicToLatinMap[ch] ?? ch;
    // If multi-char mapping and in uppercase context, make all letters uppercase (e.g. SH, CH, TS, YO, YU, YA)
    if (lat.length > 1 && ch >= "А" && ch <= "Я") {
      const next = text[i + 1];
      const prev = text[i - 1];
      const isNextUpper = !!next && /[А-ЯЁЎҚҒҲA-Z]/.test(next);
      const isPrevUpper = !!prev && /[А-ЯЁЎҚҒҲA-Z]/.test(prev);
      if (isNextUpper || isPrevUpper) {
        lat = lat.toUpperCase();
      }
    }
    result += lat;
  }
  return result;
}

// ─── Latin → Cyrillic ────────────────────────────────────────────────────────

export function latinToCyrillic(text: string): string {
  let result = "";
  let i = 0;
  const lower = text.toLowerCase();

  while (i < text.length) {
    // Word-initial / post-vowel "e" → "э"; otherwise "е"
    if (lower[i] === "e") {
      const prev = text[i - 1];
      const atStart =
        !isLetter(prev) ||
        /[aeiouAEIOUаеиоуэыюяёАЕИОУЭЫЮЯЁ]/.test(prev ?? "");
      const cyr = atStart ? "э" : "е";
      const isUpper = text[i] === "E";
      result += isUpper ? cyr.toUpperCase() : cyr;
      i++;
      continue;
    }

    let matched = false;
    for (const [lat, cyr] of latinToCyrillicPairs) {
      if (lower.startsWith(lat, i)) {
        const src = text.slice(i, i + lat.length);
        // For uppercase detection, only count alphabetic chars (skip apostrophes).
        const letters = src.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, "");
        const allUpper =
          letters.length > 0 &&
          letters === letters.toUpperCase() &&
          letters !== letters.toLowerCase();
        const firstChar = src[0];
        const firstUpper =
          firstChar === firstChar.toUpperCase() &&
          firstChar !== firstChar.toLowerCase();

        if (allUpper && lat.length > 1) {
          result += cyr.toUpperCase();
        } else if (firstUpper) {
          result += cyr.charAt(0).toUpperCase() + cyr.slice(1);
        } else {
          result += cyr;
        }
        i += lat.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      result += text[i];
      i++;
    }
  }

  return result;
}

// ─── Three Scripts Support ───────────────────────────────────────────────────

export type Script = "cyrillic" | "latin-old" | "latin-new";

export function detectScript(text: string): Script {
  if (isCyrillic(text)) {
    return "cyrillic";
  }
  // Check for characters specific to new Latin (Ö, ö, Ğ, ğ, Ş, ş, Ç, ç)
  if (/[öÖğĞşŞçÇ]/.test(text)) {
    return "latin-new";
  }
  return "latin-old";
}

// ─── Latin Old ↔ Latin New ───────────────────────────────────────────────────

export function latinOldToLatinNew(text: string): string {
  // 1. G' and O' variants with all types of apostrophes/modifiers:
  // ' (U+0027), ʻ (U+02BB), ’ (U+2019), ‘ (U+2018), ` (U+0060), ʼ (U+02BC)
  let result = text
    .replace(/G['ʻ’‘`ʼ]/g, "Ğ")
    .replace(/g['ʻ’‘`ʼ]/g, "ğ")
    .replace(/O['ʻ’‘`ʼ]/g, "Ö")
    .replace(/o['ʻ’‘`ʼ]/g, "ö");

  // 2. SH / Sh / sh
  result = result
    .replace(/SH/g, "Ş")
    .replace(/Sh/g, "Ş")
    .replace(/sh/g, "ş");

  // 3. CH / Ch / ch
  result = result
    .replace(/CH/g, "Ç")
    .replace(/Ch/g, "Ç")
    .replace(/ch/g, "ç");

  return result;
}

export function latinNewToLatinOld(text: string): string {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === "Ğ") {
      result += "Gʻ";
    } else if (ch === "ğ") {
      result += "gʻ";
    } else if (ch === "Ö") {
      result += "Oʻ";
    } else if (ch === "ö") {
      result += "oʻ";
    } else if (ch === "Ş") {
      const next = text[i + 1];
      const prev = text[i - 1];
      const isNextUpper = next && /[A-Z]/.test(next);
      const isPrevUpper = prev && /[A-Z]/.test(prev);
      result += isNextUpper || isPrevUpper ? "SH" : "Sh";
    } else if (ch === "ş") {
      result += "sh";
    } else if (ch === "Ç") {
      const next = text[i + 1];
      const prev = text[i - 1];
      const isNextUpper = next && /[A-Z]/.test(next);
      const isPrevUpper = prev && /[A-Z]/.test(prev);
      result += isNextUpper || isPrevUpper ? "CH" : "Ch";
    } else if (ch === "ç") {
      result += "ch";
    } else {
      result += ch;
    }
  }
  return result;
}

// ─── Universal Converter (Any Script to Any Script) ──────────────────────────

export function convertText(text: string, from: Script, to: Script): string {
  if (!text || from === to) return text;

  // 1. From Cyrillic
  if (from === "cyrillic") {
    const oldLat = cyrillicToLatin(text);
    return to === "latin-old" ? oldLat : latinOldToLatinNew(oldLat);
  }

  // 2. From Latin Old
  if (from === "latin-old") {
    if (to === "cyrillic") return latinToCyrillic(text);
    if (to === "latin-new") return latinOldToLatinNew(text);
  }

  // 3. From Latin New
  if (from === "latin-new") {
    const oldLat = latinNewToLatinOld(text);
    return to === "latin-old" ? oldLat : latinToCyrillic(oldLat);
  }

  return text;
}
