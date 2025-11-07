import ilustrasiPekerja from '../../images/ilustrasiPekerja.png'
import kelas from '../../images/kelas.png'
import proyek from '../../images/proyek.png'

export default function Carousel() {
  return (
    <>
      <div
        id="carouselExampleInterval"
        className="carousel slide mb-2"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="3000">
            <img src={ilustrasiPekerja} className="d-block w-100 heightCar" alt="..." />
            <div className="overlay position-absolute top-0 start-0 w-100 h-100" 
       style={{ backgroundColor: "rgba(0, 0, 0, 0.63)" }}></div>
            <div className="carousel-caption d-flex flex-column justify-content-center align-items-center h-100">
              <h2 className="display-4 text-white fw-bold pb-5">PT. Geo Mandiri Kreasi</h2>
              <p className="display-6 text-white">We Serve You Better In Safety</p>
            </div>

          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <img src={kelas} className="d-block w-100 heightCar" alt="..." />
            <div className="overlay position-absolute top-0 start-0 w-100 h-100" 
       style={{ backgroundColor: "rgba(0, 0, 0, 0.63)" }}></div>
            <div className="carousel-caption d-flex flex-column justify-content-center align-items-center h-100">
              <h2 className="display-4 text-white fw-bold pb-5">PT. Geo Mandiri Kreasi</h2>
              <p className="display-6 text-white">We Serve You Better In Safety</p>
            </div>

          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <img src={proyek} className="d-block w-100 heightCar" alt="..." />
            <div className="overlay position-absolute top-0 start-0 w-100 h-100" 
       style={{ backgroundColor: "rgba(0, 0, 0, 0.63)" }}></div>
            <div className="carousel-caption d-flex flex-column justify-content-center align-items-center h-100">
              <h2 className="display-4 text-white fw-bold pb-5">PT. Geo Mandiri Kreasi</h2>
              <p className="display-6 text-white">We Serve You Better In Safety</p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-label="true"></span>
          <span>Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-label="true"></span>
          <span>Next</span>
        </button>
      </div>
    </>
  );
}
