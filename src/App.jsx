import { useCallback, useEffect, useMemo, useState } from 'react'
import source from './data/sunderkand.json'
import Closing from './components/Closing.jsx'
import ContentsDialog from './components/ContentsDialog.jsx'
import Opening from './components/Opening.jsx'
import Passage from './components/Passage.jsx'
import SectionList from './components/SectionList.jsx'
import Toolbar from './components/Toolbar.jsx'
import { useActiveSection } from './hooks/useActiveSection.js'
import { useStoredState } from './hooks/useStoredState.js'
import { useUrlFilter } from './hooks/useUrlFilter.js'
import { buildSections, filterSections } from './lib/text.js'

const SECTIONS = buildSections(source)
const TEXT_SIZES = [0.875, 1, 1.15, 1.3, 1.5]

const isString = (value) => typeof value === 'string'
const isBoolean = (value) => typeof value === 'boolean'
const isStringList = (value) => Array.isArray(value) && value.every(isString)
const isTextSize = (value) => TEXT_SIZES.includes(value)

export default function App() {
  const [filter, setFilter] = useUrlFilter()
  const [savedIds, setSavedIds] = useStoredState('sundarkand:saved', [], isStringList)
  const [showRoman, setShowRoman] = useStoredState('sundarkand:roman', true, isBoolean)
  const [showEnglish, setShowEnglish] = useStoredState('sundarkand:english', true, isBoolean)
  const [textSize, setTextSize] = useStoredState('sundarkand:text-size', 1, isTextSize)
  const [lastSection, setLastSection] = useStoredState('sundarkand:last-section', '', isString)
  // Where the previous visit ended, held still while this visit scrolls.
  const [resumeId] = useState(lastSection)
  const [contentsOpen, setContentsOpen] = useState(false)

  const saved = useMemo(() => new Set(savedIds), [savedIds])
  const searching = filter.query.trim() !== ''
  const filtering = filter.savedOnly || searching
  const visible = useMemo(() => filterSections(SECTIONS, { ...filter, saved }), [filter, saved])
  const resultCount = visible.reduce((total, section) => total + section.verses.length, 0)
  const activeId = useActiveSection(visible)

  useEffect(() => {
    if (activeId && !filtering) setLastSection(activeId)
  }, [activeId, filtering, setLastSection])

  // The verses render after load, so the browser cannot resolve the hash itself.
  // Waiting for the fonts keeps the target from shifting afterwards.
  useEffect(() => {
    const target = document.getElementById(window.location.hash.slice(1))
    if (target) document.fonts.ready.then(() => target.scrollIntoView({ behavior: 'instant' }))
  }, [])

  // Passages off screen are drawn only when they come near (content-visibility
  // in index.css), so a long smooth scroll changes the page's height on the
  // way and lands short. Long jumps go instantly; short ones stay smooth.
  useEffect(() => {
    const onClick = (event) => {
      const link = event.target.closest?.('a[href^="#"]')
      const target = link && document.getElementById(decodeURIComponent(link.hash.slice(1)))
      if (!target || Math.abs(target.getBoundingClientRect().top) < window.innerHeight * 2) return
      const root = document.documentElement
      root.style.scrollBehavior = 'auto'
      requestAnimationFrame(() => requestAnimationFrame(() => root.style.removeProperty('scroll-behavior')))
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const toggleSaved = useCallback(
    (id) => setSavedIds((ids) => (ids.includes(id) ? ids.filter((other) => other !== id) : [...ids, id])),
    [setSavedIds],
  )
  const closeContents = useCallback(() => setContentsOpen(false), [])

  const changeFilter = (next) => {
    setFilter(next)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const resume = SECTIONS.find((section) => section.id === resumeId)
  const canResume = resume !== undefined && resume !== SECTIONS[0]
  const nothingSaved = filter.savedOnly && !searching

  return (
    <div className="app" id="top" style={{ '--reader-scale': textSize }}>
      <a className="skip-link" href="#verses">
        Skip to the verses
      </a>
      <header className="masthead">
        <div className="container masthead__row">
          <a className="masthead__title" href="#top">
            <span lang="hi">॥ श्री राम ॥</span>
            <span className="visually-hidden">, back to top</span>
          </a>
          <button type="button" className="button masthead__contents" onClick={() => setContentsOpen(true)}>
            Contents
          </button>
          <Toolbar
            filter={filter}
            onFilterChange={changeFilter}
            savedCount={saved.size}
            showRoman={showRoman}
            onToggleRoman={() => setShowRoman((value) => !value)}
            showEnglish={showEnglish}
            onToggleEnglish={() => setShowEnglish((value) => !value)}
            textSize={textSize}
            textSizes={TEXT_SIZES}
            onTextSizeChange={setTextSize}
          />
        </div>
      </header>

      {!filtering && (
        <Opening
          startHref={`#${canResume ? resume.id : SECTIONS[0].id}`}
          startLabel={canResume ? `Continue at ${resume.label}` : 'Begin the recitation'}
        />
      )}

      <div className="container layout">
        <nav className="rail" aria-label="Contents">
          <SectionList sections={visible} activeId={activeId} />
        </nav>

        <main id="verses" className="reader" tabIndex={-1}>
          <p className="reader__status" role="status">
            {filtering && resultCount > 0 ? `${resultCount} ${resultCount === 1 ? 'verse' : 'verses'} found` : ''}
          </p>

          {visible.map((section) => (
            <Passage
              key={section.id}
              section={section}
              saved={saved}
              showRoman={showRoman}
              showEnglish={showEnglish}
              showArt={!filtering}
              onToggleSaved={toggleSaved}
            />
          ))}

          {visible.length === 0 && (
            <div className="empty">
              <h2>{nothingSaved ? 'No saved verses' : 'No verses match'}</h2>
              <p>
                {nothingSaved
                  ? 'Press Save beside a verse and it will appear here.'
                  : 'Try Devanagari, an English word, or another roman spelling such as hanumana.'}
              </p>
              <button
                type="button"
                className="button"
                onClick={() => changeFilter({ query: '', savedOnly: false })}
              >
                Show all verses
              </button>
            </div>
          )}
        </main>
      </div>

      {!filtering && <Closing />}

      <ContentsDialog open={contentsOpen} onClose={closeContents} sections={visible} activeId={activeId} />
    </div>
  )
}
