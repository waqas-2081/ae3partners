import './ValuesMotif.css';

const VALUES = ['Trust', 'Partnership', 'Results'];

/**
 * Recurring visual signature for AE3’s driving force.
 * Variants: band (section divider), hero (subtle footer line), footer (compact).
 */
export default function ValuesMotif({ variant = 'band', className = '' }) {
  return (
    <div
      className={`ae3-values ae3-values--${variant}${className ? ` ${className}` : ''}`}
      aria-label="Trust. Partnership. Results."
    >
      <div className="ae3-values__inner">
        {VALUES.map((word, index) => (
          <span className="ae3-values__item" key={word} style={{ '--i': index }}>
            <span className="ae3-values__word">{word}</span>
            {index < VALUES.length - 1 ? (
              <span className="ae3-values__dot" aria-hidden="true">
                .
              </span>
            ) : (
              <span className="ae3-values__dot ae3-values__dot--end" aria-hidden="true">
                .
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
