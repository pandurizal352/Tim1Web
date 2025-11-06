export default function Testimoni() {
  return (
    <>
      <h1 className="display-6 pt-4 pb-3 titleColorTwo fw-bold text-center">
        TESTIMONI
      </h1>

      <figure className="d-flex align-items-center gap-3 ms-4 p-3 rounded shadow-sm pb-3 quote">
        <img
          src="https://www.geomandiri.co.id/uploads/testimoni/6.jpg"
          alt="Testi 1"
          className="rounded-circle picTest"
        />
        <blockquote className="blockquote mb-0">
          <p className="mb-2 pb-3 me-3 pe-3">
            "Training seperti ini mesti harus banyak dilakukan agar SDM menjadi
            lebih berkualitas"
          </p>
          <figcaption className="blockquote-footer mb-0">
            PUJO WARSITO <br />
            <cite title="Source Title">PT. Triteguh Manunggal Sejati</cite>
          </figcaption>
        </blockquote>
      </figure>

      <figure className="text-end d-flex flex-row-reverse align-items-center gap-3 ms-auto me-4 p-3 rounded shadow-sm quote">
        <img
          src="https://www.geomandiri.co.id/uploads/testimoni/3.jpg"
          alt="Testi 1"
          className="rounded-circle picTest"
        />
        <blockquote className="blockquote mb-0">
          <p className="mb-2 pb-3">
            "Instruktur sangat berpengalaman di bidangnya, membuat pelatihan P3K
            yang saya ikuti menjadi sangat menyenangkan dan mendapatkan ilmu
            yang luar biasa."
          </p>
          <figcaption className="blockquote-footer mb-0">
            LUTFI ULPAH <br />
            <cite title="Source Title">PT. Happy Indonesia</cite>
          </figcaption>
        </blockquote>
      </figure>

      <figure className="d-flex align-items-center gap-3 ms-4 p-3 rounded shadow-sm quote">
        <img
          src="https://www.geomandiri.co.id/uploads/testimoni/5.jpg"
          alt="Testi 2"
          className="rounded-circle picTest"
        />
        <blockquote className="blockquote mb-0">
          <p className="mb-2 pb-3 mx-3 pe-5">
            "Setelah mengikuti Training Teknisi K3 Perancah, saya semakin sadar
            akan pentingnya kesehatan dan keselamatan dalam bekerja. Salam
            "Safety First"."
          </p>
          <figcaption className="blockquote-footer mb-0">
            LUHFI A ROSALDY <br />
            <cite title="Source Title">PT. Pupuk Kaltim Timur</cite>
          </figcaption>
        </blockquote>
      </figure>
    </>
  );
}
