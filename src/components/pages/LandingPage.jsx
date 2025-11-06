import Carousel from "./Carousel";
import ListBidang from "./ListBidang";
import Testimoni from "./Testimoni";
import AlurDaftar from "./AlurPendaftaran";
import Mitra from "./Mitra";
import '../../Global.css'

export default function LandingPage() {
  return (
    <>
    <div className="bgFirst mb-3 mt-3">
      <Carousel/>
    </div>

    <div className="bgSecond mb-3 mt-3">
      <ListBidang />
    </div>

    <div className="bgFirst mb-5 mt-3">
      <Testimoni />
    </div>

    <div className="bgSecond mb-3 mt-5">
      <AlurDaftar />
    </div>

    <div className="bgFirst mb-3 mt-3">
      <Mitra />
    </div>

    </>
  );
}
