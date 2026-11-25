import { memo } from 'react'
import PropTypes from 'prop-types'
import Verse from './Verse.jsx'
import grove from '../assets/hanuman-finds-sita.webp'

/** Doha 8 is where Hanuman reaches the grove and sees Sita. */
const ART_SECTION = 'doha-8'

function Passage({ section, saved, showRoman, showEnglish, showArt, onToggleSaved }) {
  return (
    <section
      id={section.id}
      className={showEnglish ? 'passage' : 'passage passage--verse-only'}
      aria-labelledby={`${section.id}-title`}
    >
      {showArt && section.id === ART_SECTION && (
        <figure className="plate">
          <img
            src={grove}
            width="1400"
            height="947"
            loading="lazy"
            alt="Sita sits by a white shrine in the Ashoka grove among Ravan’s guards, while Hanuman watches from a tree."
          />
          <figcaption>Hanuman finds Sita in the Ashoka grove. “Shangri” Ramayana, about 1700–25</figcaption>
        </figure>
      )}
      <h2 id={`${section.id}-title`}>
        <span lang="hi">{section.hindiLabel}</span>
        <span className="visually-hidden">{section.label}</span>
      </h2>
      <div className="passage__columns">
        <div>
          {section.verses.map((verse) => (
            <Verse
              key={verse.id}
              verse={verse}
              saved={saved.has(verse.id)}
              showRoman={showRoman}
              onToggleSaved={onToggleSaved}
            />
          ))}
        </div>
        {showEnglish && (
          <div className="passage__english" lang="en">
            {section.english.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

Passage.propTypes = {
  section: PropTypes.object.isRequired,
  saved: PropTypes.instanceOf(Set).isRequired,
  showRoman: PropTypes.bool.isRequired,
  showEnglish: PropTypes.bool.isRequired,
  showArt: PropTypes.bool.isRequired,
  onToggleSaved: PropTypes.func.isRequired,
}

export default memo(Passage)
