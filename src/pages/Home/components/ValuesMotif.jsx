import './ValuesMotif.css';

const P = process.env.PUBLIC_URL || '';
const MARK = `${P}/assets/newimages/ae3-values-mark.png`;
const MARK_WHITE = `${P}/assets/newimages/ae3-values-mark-white.png`;
const VALUES = ['Trust', 'Partnership', 'Results'];
const DARK_VARIANTS = new Set(['band-dark', 'hero', 'footer']);

/**
 * Recurring visual signature for AE3’s driving force.
 * Variants: band (section divider), hero (subtle footer line), footer (compact).
 */
export default function ValuesMotif({ variant = 'band', className = '' }) {
  const markSrc = DARK_VARIANTS.has(variant) ? MARK_WHITE : MARK;

  return (
    <div
      className={`ae3-values ae3-values--${variant}${className ? ` ${className}` : ''}`}
      aria-label="Trust. Partnership. Results."
    >
      <div className="ae3-values__inner">
        {VALUES.map((word, index) => (
          <span className="ae3-values__item" key={word} style={{ '--i': index }}>
            <span className="ae3-values__word">{word}</span>
            <img
              className={`ae3-values__mark${index === VALUES.length - 1 ? ' ae3-values__mark--end' : ''}`}
              src={markSrc}
              alt=""
              aria-hidden="true"
              width={18}
              height={18}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
