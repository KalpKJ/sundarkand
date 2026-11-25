import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import SectionList from './SectionList.jsx'

/** Contents for narrow screens. The native dialog traps focus and closes on Escape. */
export default function ContentsDialog({ open, onClose, sections, activeId }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className="contents-dialog"
      aria-labelledby="contents-title"
      onClose={onClose}
      onClick={(event) => event.target === ref.current && onClose()}
    >
      <div className="contents-dialog__body">
        <div className="contents-dialog__head">
          <h2 id="contents-title">Contents</h2>
          <button type="button" className="button" onClick={onClose}>
            Close
          </button>
        </div>
        <SectionList sections={sections} activeId={activeId} onNavigate={onClose} />
      </div>
    </dialog>
  )
}

ContentsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  sections: PropTypes.array.isRequired,
  activeId: PropTypes.string,
}
