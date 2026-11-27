import PropTypes from 'prop-types'

export default function Toolbar({
  filter,
  onFilterChange,
  savedCount,
  showRoman,
  onToggleRoman,
  showEnglish,
  onToggleEnglish,
  textSize,
  textSizes,
  onTextSizeChange,
}) {
  const sizeIndex = textSizes.indexOf(textSize)

  return (
    <div className="toolbar" role="group" aria-label="Reading controls">
      <label className="toolbar__search">
        <span className="visually-hidden">Search in Devanagari, roman letters or English</span>
        <input
          type="search"
          name="q"
          autoComplete="off"
          placeholder="Search"
          value={filter.query}
          onChange={(event) => onFilterChange({ ...filter, query: event.target.value })}
        />
      </label>
      <button
        type="button"
        className="button"
        aria-pressed={filter.savedOnly}
        onClick={() => onFilterChange({ ...filter, savedOnly: !filter.savedOnly })}
      >
        Saved ({savedCount})
      </button>
      <button type="button" className="button" aria-pressed={showRoman} onClick={onToggleRoman}>
        Roman
      </button>
      <button type="button" className="button" aria-pressed={showEnglish} onClick={onToggleEnglish}>
        English
      </button>
      <div className="toolbar__sizes" role="group" aria-label="Text size">
        <button
          type="button"
          className="button"
          aria-label="A−, smaller text"
          disabled={sizeIndex === 0}
          onClick={() => onTextSizeChange(textSizes[sizeIndex - 1])}
        >
          A−
        </button>
        <button
          type="button"
          className="button"
          aria-label="A+, larger text"
          disabled={sizeIndex === textSizes.length - 1}
          onClick={() => onTextSizeChange(textSizes[sizeIndex + 1])}
        >
          A+
        </button>
      </div>
    </div>
  )
}

Toolbar.propTypes = {
  filter: PropTypes.shape({ query: PropTypes.string, savedOnly: PropTypes.bool }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  savedCount: PropTypes.number.isRequired,
  showRoman: PropTypes.bool.isRequired,
  onToggleRoman: PropTypes.func.isRequired,
  showEnglish: PropTypes.bool.isRequired,
  onToggleEnglish: PropTypes.func.isRequired,
  textSize: PropTypes.number.isRequired,
  textSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  onTextSizeChange: PropTypes.func.isRequired,
}
