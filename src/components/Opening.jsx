import PropTypes from 'prop-types'
import darbar from '../assets/ram-darbar.webp'
import darbarSmall from '../assets/ram-darbar-700.webp'

export default function Opening({ startHref, startLabel }) {
  return (
    <div className="opening">
      <div className="container opening__row">
        <div className="opening__text">
          <p className="opening__invocation" lang="sa">
            ॥ श्रीजानकीवल्लभो विजयते ॥
          </p>
          <h1>
            <span className="opening__title" lang="hi">
              सुन्दरकाण्ड
            </span>
            <span className="opening__roman">Sundarkand</span>
          </h1>
          <p className="opening__lead">
            The fifth book of Tulsidas’s Ramcharitmanas: Hanuman’s leap to Lanka, his meeting with Sita, and his
            return to Ram.
          </p>
          <a className="button button--primary" href={startHref}>
            {startLabel}
          </a>
        </div>
        <figure className="opening__art">
          <img
            src={darbar}
            srcSet={`${darbarSmall} 700w, ${darbar} 1000w`}
            sizes="(max-width: 48rem) 360px, 425px"
            width="1000"
            height="1459"
            fetchPriority="high"
            alt="Ram and Sita enthroned in a pavilion as monkeys and bears greet them with folded hands."
          />
          <figcaption>Ram and Sita receive their monkey and bear allies, about 1765</figcaption>
        </figure>
      </div>
    </div>
  )
}

Opening.propTypes = {
  startHref: PropTypes.string.isRequired,
  startLabel: PropTypes.string.isRequired,
}
