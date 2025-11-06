export default function Mitra() {
  const image = [
    {
      src: "https://www.geomandiri.co.id/uploads/mitra/1.png",
      alt: "PT. Henkel Indonesia",
    },
    {
      src: "https://karir-production.nos.jkt-1.neo.id/logos/04/1207104/BT_COCOA.jpg",
      alt: "PT. Bumitangerang Mesindotama",
    },
    {
      src: "https://www.geomandiri.co.id/uploads/mitra/4.jpg",
      alt: "PT. Jasa Marga Tbk",
    },
    {
      src: "https://www.geomandiri.co.id/uploads/mitra/6.jpg",
      alt: "PT. Riau Andalan Pulp and Paper (RAPP)",
    },
    {
      src: "https://www.geomandiri.co.id/uploads/mitra/5.jpg",
      alt: "K3",
    },
    {
      src: "https://www.geomandiri.co.id/uploads/mitra/7.jpg",
      alt: "PT. Bukit Muria Jaya (BMJ)",
    },
  ];

  return (
    <>
      <h1 className="display-6 pt-4 pb-3 titleColorTwo fw-bold text-center">
        MITRA KERJA
      </h1>

      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
          {image.map((item, index) => (
            <div key={index} className="col">
              <div className="d-flex align-items-center justify-content-center p-3 mitra">
                <img src={item.src} className="pic img-fluid" alt={item.alt} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
