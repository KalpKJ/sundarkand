import { memo } from 'react'
import PropTypes from 'prop-types'
import { toDevanagariNumber } from '../lib/text.js'

function Verse({ verse, saved, showRoman, onToggleSaved }) {
  const language = verse.type === 'Shlok' ? 'sa' : 'awa'
  const lastLine = verse.lines.length - 1

  return (
    <article
      id={verse.id}
      className={verse.closing ? 'verse verse--closing' : 'verse'}
      aria-label={`${verse.type}, verse ${verse.number}`}
    >
      <a className="verse__number" href={`#${verse.id}`}>
        {toDevanagariNumber(verse.number)}
        <span className="visually-hidden">, link to verse {verse.number}</span>
      </a>
      <div className="verse__text">
        <p className="verse__devanagari" lang={language}>
          {verse.lines.map((line, index) => (
            <span key={index}>
              {line} {index === lastLine ? '॥' : '।'}
            </span>
          ))}
        </p>
        {showRoman && (
          <p className="verse__roman" lang={`${language}-Latn`}>
            {verse.roman.map((line, index) => (
              <span key={index}>{line}</span>
            ))}
          </p>
        )}
      </div>
      <button
        type="button"
        className="button button--save"
        aria-pressed={saved}
        aria-label={`Save verse ${verse.number}`}
        onClick={() => onToggleSaved(verse.id)}
      >
        {saved ? 'Saved' : 'Save'}
      </button>
    </article>
  )
}

Verse.propTypes = {
  verse: PropTypes.object.isRequired,
  saved: PropTypes.bool.isRequired,
  showRoman: PropTypes.bool.isRequired,
  onToggleSaved: PropTypes.func.isRequired,
}

export default memo(Verse)
