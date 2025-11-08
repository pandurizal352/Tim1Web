import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

import Carousel from "./Carousel";
import ListBidang from "./ListBidang";
import Testimoni from "./Testimoni";
import AlurDaftar from "./AlurPendaftaran";
import Mitra from "./Mitra";
import '../../Global.css'

export default function LandingPage() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  
  return (
    <>
    <div>
      <Carousel/>
    </div>

    <div className="bgSecond">
      <ListBidang />
    </div>

    <div  data-aos="fade-up" className="bgFourth">
      <Testimoni />
    </div>

    <div className="bgFirst">
      <AlurDaftar />
    </div>

    <div data-aos="fade-up" className="bgThird">
      <Mitra />
    </div>

    </>
  );
}





// import Carousel from "./Carousel";
// import ListBidang from "./ListBidang";
// import Testimoni from "./Testimoni";
// import AlurDaftar from "./AlurPendaftaran";
// import Mitra from "./Mitra";
// import '../../Global.css'

// export default function LandingPage() {
//   return (
//     <>
//     <div className="bgFirst mb-3 mt-3">
//       <Carousel/>
//     </div>

//     <div className="bgSecond mb-3 mt-3">
//       <ListBidang />
//     </div>

//     <div className="bgFirst mb-5 mt-3">
//       <Testimoni />
//     </div>

//     <div className="bgSecond mb-3 mt-5">
//       <AlurDaftar />
//     </div>

//     <div className="bgFirst mb-3 mt-3">
//       <Mitra />
//     </div>

//     </>
//   );
// }
