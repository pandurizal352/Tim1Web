import { FaArrowRight, FaArrowDown, FaArrowLeft } from 'react-icons/fa';

export default function AlurDaftar() {
  const alur = [
    {
      head: "Buat Akun",
      p: "Daftarkan nama, email, dan password.",
    },
    {
      head: "Login Akun",
      p: "Masukkan nama, email, dan password.",
    },
    {
      head: "Daftarkan Peserta",
      p: "Masukkan data peserta yang didaftarkan.",
    },
    {
      head: "Pilih Bidang Pelatihan",
      p: "Pilih bidang pelatihan yang dibutuhkan.",
    },
    {
      head: "Pilih Pelatihan",
      p: "Tentukan pelatihan yang ingin diikutkan.",
    },
    {
      head: "Pilih Metode Pembayaran",
      p: "Pilih metode pembayaran yang diinginkan.",
    },
    {
      head: "Lakukan Pembayaran",
      p: "Lakukan pembayaran sesuai dengan metode yang telah dipilih.",
    },
    {
      head: "SELESAI !!!",
      p: "Selamat mengikuti pelatihan anda.",
    },
  ];

  return (
    <>
      <h1 className="display-6 pt-4 pb-3 titleColorOne fw-bold text-center">
        ALUR PENDAFTARAN
      </h1>

      {/* Baris 1 */}
      <div className="d-flex align-items-center justify-content-center gap-3 mb-3 mt-3">
        {alur.slice(0, 3).map((alur, index) => (
          <div key={index} className="d-flex align-items-center">
            <div
              className="card d-flex justify-content-around short text-center"
            >
              <div className="card-header bgHead">{alur.head}</div>
              <div className="card-body bgCard">
                <p className="card-text">{alur.p}</p>
              </div>
            </div>
            {index < 2 && (
              <FaArrowRight
                className="mx-2 arrow ms-3"
              />
            )}
          </div>
        ))}
      </div>

      {/* Panah turun */}
      <div
        className="d-flex justify-content-end mb-3 mt-3 arrowRight"
      >
        <FaArrowDown className="arrow" />
      </div>

      {/* Baris 2 */}
      <div className="d-flex align-items-center justify-content-center gap-3 flex-row-reverse">
        {alur.slice(3, 6).map((alur, index) => (
          <div
            key={index + 4}
            className="d-flex align-items-center flex-row-reverse"
          >
            <div
              className="card d-flex justify-content-around text-bg-light short text-center"
            >
              <div className="card-header bgHead">{alur.head}</div>
              <div className="card-body bgCard">
                <p className="card-text">{alur.p}</p>
              </div>
            </div>
            {index < 2 && (
              <FaArrowLeft
                className="mx-2 arrow me-3"
                />
            )}
          </div>
        ))}
      </div>

      {/* Panah turun */}
      <div
        className="d-flex justify-content-start mb-3 mt-3 arrowLeft"
      >
        <FaArrowDown className="arrow" />
      </div>

      {/* Baris 3 */}
      <div className="d-flex align-items-center justify-content-start gap-3 mb-3 pb-5 pad">
        {alur.slice(6, 8).map((alur, index) => (
          <div key={index} className="d-flex align-items-center">
            <div
              className="card d-flex justify-content-start bgCard short text-center"
            >
              <div className="card-header bgHead">{alur.head}</div>
              <div className="card-body bgCard">
                <p className="card-text">{alur.p}</p>
              </div>
            </div>
            {index < 1 && (
              <FaArrowRight
                className="mx-2 arrow ms-3"
                />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
