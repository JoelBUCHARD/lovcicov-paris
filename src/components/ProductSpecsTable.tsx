import type { ProductSpecs } from '@/data/products';

const SANS = "'Inter', 'Instrument Sans', Arial, sans-serif";

/* Schéma technique du vêtement — repères A (demi-poitrine), B (longueur dos), C (manche) */
const GarmentSchema = () => (
  <svg
    viewBox="0 0 220 170"
    role="img"
    aria-label="Schéma technique du vêtement : A demi-poitrine, B longueur dos, C longueur de manche"
    className="w-full max-w-[220px] mb-6"
    style={{ height: 'auto' }}
  >
    <g fill="none" stroke="#B9B4AA" strokeWidth="1.1" strokeLinejoin="round">
      <path d="M78 26 L60 34 L26 58 L44 80 L62 68 L62 148 L158 148 L158 68 L176 80 L194 58 L160 34 L142 26 L128 34 A22 12 0 0 1 92 34 Z" />
    </g>
    <g stroke="#1A1A1A" strokeWidth="0.8" fill="none">
      <path d="M62 74 L158 74" strokeDasharray="3 3" />
      <path d="M168 68 L168 148" strokeDasharray="3 3" />
      <path d="M46 42 L36 62" strokeDasharray="3 3" />
    </g>
    <g style={{ fontFamily: SANS, fontSize: 10, fill: '#1A1A1A' }}>
      <text x="106" y="69" textAnchor="middle">A</text>
      <text x="174" y="112">B</text>
      <text x="30" y="46">C</text>
    </g>
  </svg>
);

interface Props {
  specs: ProductSpecs;
  withSchema?: boolean;
}

const ProductSpecsTable = ({ specs, withSchema = true }: Props) => {
  const { sizes, rows } = specs.sizeChart;
  return (
    <div>
      {withSchema && <GarmentSchema />}

      {/* Desktop / tablette — tableau avec scroll horizontal */}
      <div className="hidden sm:block overflow-x-auto -mx-1 px-1">
        <table
          className="w-full border-collapse"
          style={{ fontFamily: SANS, fontSize: 12.5, color: '#5F5E5A' }}
        >
          <caption className="sr-only">Grille de tailles en centimètres</caption>
          <thead>
            <tr>
              {['Mesure', ...sizes].map((h, i) => (
                <th
                  key={h}
                  scope="col"
                  className="border-b border-[#E8E4DD] py-2 pr-3"
                  style={{
                    textAlign: i === 0 ? 'left' : 'center',
                    fontSize: 10,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#1A1A1A',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <td
                  className="border-b border-[#EFEDE8] py-2 pr-3"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {row.label}
                </td>
                {row.values.map((v, i) => (
                  <td
                    key={i}
                    className="border-b border-[#EFEDE8] py-2 pr-3"
                    style={{ textAlign: 'center', whiteSpace: 'nowrap' }}
                  >
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile — une ligne par taille, sans débordement */}
      <ul className="sm:hidden list-none p-0 m-0">
        {sizes.map((size, si) => (
          <li key={size} className="border-b border-[#EFEDE8] py-3">
            <p
              className="mb-1"
              style={{
                fontFamily: SANS,
                fontSize: 10,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#1A1A1A',
                fontWeight: 500,
              }}
            >
              {size}
            </p>
            {rows.map((row) => (
              <p
                key={row.label}
                className="flex items-baseline justify-between gap-4 m-0"
                style={{ fontFamily: SANS, fontSize: 12.5, color: '#5F5E5A' }}
              >
                <span>{row.label}</span>
                <span>{row.values[si]} cm</span>
              </p>
            ))}
          </li>
        ))}
      </ul>

      <p className="mt-4 mb-0" style={{ fontFamily: SANS, fontSize: 12.5, color: '#888780' }}>
        Mesures du vêtement à plat, en centimètres.
      </p>
    </div>
  );
};

export default ProductSpecsTable;
