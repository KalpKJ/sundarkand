import { describe, expect, it } from 'vitest'
import source from '../data/sunderkand.json'
import { buildSections, filterSections, fold, toDevanagariNumber } from './text.js'

const sections = buildSections(source)
const verses = sections.flatMap((section) => section.verses)
const idsFor = (filter) => filterSections(sections, filter).flatMap((s) => s.verses.map((v) => v.id))

describe('the text', () => {
  it('has the invocation and all sixty dohas in order', () => {
    expect(source.map((s) => s.id)).toEqual([
      'invocation',
      ...Array.from({ length: 60 }, (_, i) => `doha-${i + 1}`),
    ])
  })
  it('closes every passage with a doha, and doha 12 with a sortha', () => {
    for (const section of sections.slice(1)) expect(section.verses.at(-1).closing).toBe(true)
    expect(sections[12].verses.at(-1).type).toBe('Sortha')
  })
  it('uses only Devanagari in the verse lines', () => {
    for (const verse of verses) {
      for (const line of verse.lines) expect(line).toMatch(/^[ऀ-ॿ ]+$/)
    }
  })
  it('romanises every line', () => {
    for (const verse of verses) {
      expect(verse.roman).toHaveLength(verse.lines.length)
      for (const line of verse.roman) expect(line).not.toMatch(/[ऀ-ॿ]/)
    }
  })
  it('has a clean English passage for every section', () => {
    for (const section of sections) {
      expect(section.english.length).toBeGreaterThan(0)
      for (const passage of section.english) expect(passage).toMatch(/^[A-Za-z ,.;:?!’‘“”()—-]+$/)
    }
  })
})

describe('buildSections', () => {
  it('numbers verses without gaps', () => {
    expect(verses.map((v) => v.number)).toEqual(verses.map((_, i) => i + 1))
  })
  it('labels passages in both scripts', () => {
    expect(sections[12]).toMatchObject({ label: 'Doha 12', hindiLabel: 'दोहा १२' })
  })
})

describe('filterSections', () => {
  it('returns everything without a filter', () => {
    expect(filterSections(sections, {})).toBe(sections)
  })
  it('finds Devanagari, and romanised text typed without diacritics', () => {
    expect(idsFor({ query: 'जामवंत के बचन' })).toEqual(['verse-4'])
    expect(idsFor({ query: 'JAMAVANTA KE BACHANA' })).toEqual(['verse-4'])
  })
  it('keeps the whole passage for an English match', () => {
    const [match, ...rest] = filterSections(sections, { query: 'mother of the serpent-race' })
    expect(rest).toEqual([])
    expect(match.verses).toHaveLength(sections[2].verses.length)
  })
  it('returns nothing when nothing matches', () => {
    expect(idsFor({ query: 'zzzz' })).toEqual([])
  })
  it('combines saved verses with a query', () => {
    const saved = new Set(['verse-4', 'verse-30'])
    expect(idsFor({ savedOnly: true, saved })).toEqual(['verse-4', 'verse-30'])
    expect(idsFor({ query: 'जामवंत के बचन', savedOnly: true, saved })).toEqual(['verse-4'])
  })
})

describe('helpers', () => {
  it('folds diacritics and nuktas', () => {
    expect(fold('Sītā')).toBe('sita')
    expect(fold('बड़')).toBe(fold('बड'))
  })
  it('writes Devanagari numerals', () => {
    expect(toDevanagariNumber(60)).toBe('६०')
  })
})
