import PropTypes from 'prop-types'

export default function SectionList({ sections, activeId, onNavigate }) {
  return (
    <ol className="section-list">
      {sections.map((section) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            aria-current={section.id === activeId ? 'location' : undefined}
            aria-label={section.label}
            onClick={onNavigate}
          >
            <span lang="hi">{section.hindiLabel}</span>
            <span className="section-list__line" lang="awa">
              {section.verses[0].lines[0]}
            </span>
          </a>
        </li>
      ))}
    </ol>
  )
}

SectionList.propTypes = {
  sections: PropTypes.array.isRequired,
  activeId: PropTypes.string,
  onNavigate: PropTypes.func,
}
