const SANS = "'Inter', 'Instrument Sans', Arial, sans-serif";

const HEAD = ['Mesure', 'XS', 'S', 'M', 'L', 'XL'];
const ROWS = [
  ['A — Demi-poitrine', '52', '55', '58', '61', '64'],
  ['B — Longueur', '70', '73', '76', '78', '80'],
  ['C — Manche', '23', '24', '25', '26', '26'],
];

const GuideDesTaillesTable = () => (
  <div>
    <div className="overflow-x-auto">
      <table
        className="w-full border-collapse"
        style={{ fontFamily: SANS, fontSize: 12.5, color: '#5F5E5A' }}
      >
        <caption className="sr-only">Guide des tailles en centimètres</caption>
        <thead>
          <tr>
            {HEAD.map((h, i) => (
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
          {ROWS.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, i) => (
                <td
                  key={i}
                  className="border-b border-[#EFEDE8] py-2 pr-3"
                  style={{ textAlign: i === 0 ? 'left' : 'center', whiteSpace: 'nowrap' }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="mt-4 mb-0" style={{ fontFamily: SANS, fontSize: 13, lineHeight: 1.8, color: '#5F5E5A' }}>
      Coupe oversize unisexe : les mannequins des photos mesurent 1m75 et portent une taille XS.
      Pour un tombé plus près du corps, reste sur ta taille habituelle ; pour un effet plus ample,
      prends une taille au-dessus.
    </p>
  </div>
);

export default GuideDesTaillesTable;
