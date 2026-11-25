import mahavir from '../assets/mahavir-hanuman.webp'

const MUSEUM = 'https://clevelandart.org/art/'

export default function Closing() {
  return (
    <footer className="closing">
      <div className="container closing__row">
        <figure className="closing__art">
          <img
            src={mahavir}
            width="900"
            height="1469"
            loading="lazy"
            alt="Hanuman, red-skinned and crowned, strides forward with Ram and Lakshman seated on his shoulders."
          />
          <figcaption>Hanuman with Ram and Lakshman, Kalighat, about 1890</figcaption>
        </figure>
        <div className="closing__text">
          <p className="closing__colophon" lang="sa">
            इति श्रीमद्रामचरितमानसे सकलकलिकलुषविध्वंसने पञ्चमः सोपानः समाप्तः
          </p>
          <p className="closing__jai" lang="hi">
            सियावर रामचन्द्र की जय
          </p>
          <p>
            <a href="#top">Back to the beginning</a>
          </p>
          <div className="closing__sources">
            <p>
              Verses from <a href="https://github.com/bhavykhatri/DharmicData">DharmicData</a>, under the Open Database
              License. English by F. S. Growse (1836–1893), <cite>The Ramayana of Tulsi Das</cite>, 1914 printing. His
              wording is kept, so it reflects its time.
            </p>
            <p>
              Paintings from the Cleveland Museum of Art, CC0: <a href={`${MUSEUM}2018.117`}>2018.117</a>,{' '}
              <a href={`${MUSEUM}2025.8`}>2025.8</a> and <a href={`${MUSEUM}2003.120`}>2003.120</a>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
