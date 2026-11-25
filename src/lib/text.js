const DEVANAGARI_DIGITS = '०१२३४५६७८९'
const CLOSING_TYPES = new Set(['Doha', 'Sortha'])

export function toDevanagariNumber(number) {
  return String(number).replace(/\d/g, (digit) => DEVANAGARI_DIGITS[digit])
}

/** Lower-cases and drops Latin diacritics and Devanagari nuktas, so "sita" finds "sītā". */
export function fold(text) {
  return text
    .normalize('NFD')
    .replace(/[̀-़ͯ]/g, '')
    .toLowerCase()
}

/** Numbers the verses, labels each passage and prepares the text that search looks in. */
export function buildSections(source) {
  let number = 0

  return source.map((section, index) => ({
    id: section.id,
    label: index === 0 ? 'Invocation' : `Doha ${index}`,
    hindiLabel: index === 0 ? 'मङ्गलाचरण' : `दोहा ${toDevanagariNumber(index)}`,
    english: section.english,
    searchText: fold(section.english.join(' ')),
    verses: section.verses.map((verse) => {
      number += 1
      return {
        ...verse,
        id: `verse-${number}`,
        number,
        closing: CLOSING_TYPES.has(verse.type),
        searchText: fold([...verse.lines, ...verse.roman].join(' ')),
      }
    }),
  }))
}

/**
 * Keeps the verses that match. English belongs to a whole passage, so an English
 * match keeps every verse of that passage.
 */
export function filterSections(sections, { query = '', savedOnly = false, saved = new Set() }) {
  const needle = fold(query.trim())
  if (!needle && !savedOnly) return sections

  return sections
    .map((section) => {
      const passageMatches = section.searchText.includes(needle)
      return {
        ...section,
        verses: section.verses.filter((verse) => {
          if (savedOnly && !saved.has(verse.id)) return false
          return passageMatches || verse.searchText.includes(needle)
        }),
      }
    })
    .filter((section) => section.verses.length > 0)
}
