import { useRef } from "react";
import { Link } from "react-router-dom";
import { FaHelmetSafety, FaBolt } from "react-icons/fa6";
import { GrUserManager } from "react-icons/gr";
import { GiChemicalDrop } from "react-icons/gi";
import { FaBuilding } from "react-icons/fa";
import { FaBriefcaseMedical, FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

export default function ListBidang() {
  const scrolls = useRef();
  const bidang = [
    {
      icon: <FaHelmetSafety />,
      title: "KEAHLIAN K3 UMUM",
      training: "Ahli K3 Umum",
      button: "Detail",
      path: "/LBK3Umum",
      color: "warning",
    },
    {
      icon: <GrUserManager />,
      title: "SISTEM MANAJEMEN K3 (SMK3)",
      training: "Auditor SMK3",
      button: "Detail",
      path: "/LBSMK3",
      color: "warning",
    },
    {
      icon: <GiChemicalDrop />,
      title: "ERGONOMI, LINGKUNGAN KERJA & BAHAN BERBAHAYA",
      training:
      "Ahli K3 Kimia, Ahli K3 Muda Lingkungan Kerja, dsb",
      button: "Detail",
      path: "/LBErgonomi",
      color: "warning",
    },
    {
      icon: <FaBuilding />,
      title: "PEKERJAAN PADA KETINGGIAN",
      training:
      "TKBT Tingkat 2, TKPK Tingkat 1, TKPK Tingkat 2",
      button: "Detail",
      path: "/LBKetinggian",
      color: "warning",
    },
    {
      icon: <FaBriefcaseMedical />,
      title: "KESEHATAN KERJA",
      training:
      "Petugas P3K Di Tempat Kerja, Hyperkes Untuk Paramedis, dsb",
      button: "Detail",
      path: "/LBKesehatan",
      color: "warning",
    },
    {
      icon: <FaBolt />,
      title: "Listrik",
      training: "Ahli K3 Listrik, Teknisi Listrik",
      button: "Detail",
      path: "/LBlistrik",
      color: "warning",
    },
  ];

  const scroll = (direction) => {
    const container = scrolls.current;
    const scrollAmount = 300;

    if (direction === "right") {
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 10
      ) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    } else {
      if (container.scrollLeft <= 0) {
        container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <h1 data-aos="fade-up" className="display-6 pt-4 pb-3 titleColorOne fw-bold text-center">
        BIDANG PELATIHAN
      </h1>

      <div data-aos="fade-up" className="position-relative mt-3 px-5">
        {/* Tombol kiri */}
        <button
          onClick={() => scroll("left")}
          className="btn btn-light position-absolute top-50 start-0 translate-middle-y shadow"
        >
          <FaArrowAltCircleLeft />
        </button>

        {/* Container scroll */}
        <div
          ref={scrolls}
          className="d-flex gap-4 overflow-hidden justify-content-start align-items-stretch scrolling"
        >

        {/* cards list bidang */}
          {bidang.map((daftar, index) => (
            <div
              key={index}
              data-aos="fade-up"
              className="card text-bg-light border-info mb-3 text-center long"
            >
              <div className="card-body d-flex flex-column justify-content-between bgCard">
                <div className="icon fs-1 text-center mb-2">{daftar.icon}</div>
                <h5 className="card-title mb-2">{daftar.title}</h5>
                <p className="card-text mb-2">{daftar.training}</p>
                <Link to={daftar.path} className={`btn btn-${daftar.color}`}>
                  {daftar.button}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol kanan */}
        <button
          onClick={() => scroll("right")}
          data-aos="fade-up"
          className="btn btn-light position-absolute top-50 end-0 translate-middle-y shadow"
        >
          <FaArrowAltCircleRight />
        </button>
      </div>
    </>
  );
}






// import { useRef } from "react";
// import { Link } from "react-router-dom";
// import { FaHelmetSafety, FaBolt } from "react-icons/fa6";
// import { GrUserManager } from "react-icons/gr";
// import { GiChemicalDrop } from "react-icons/gi";
// import { FaBuilding } from "react-icons/fa";
// import { FaBriefcaseMedical, FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

// export default function ListBidang() {
//   const scrolls = useRef();
//   const bidang = [
//     {
//       icon: <FaHelmetSafety />,
//       title: "KEAHLIAN K3 UMUM",
//       training: "Ahli K3 Umum",
//       button: "Detail",
//       path: "taro link kesini",
//       color: "warning",
//     },
//     {
//       icon: <GrUserManager />,
//       title: "SISTEM MANAJEMEN K3 (SMK3)",
//       training: "Auditor SMK3",
//       button: "Detail",
//       path: "taro link kesini",
//       color: "warning",
//     },
//     {
//       icon: <GiChemicalDrop />,
//       title: "ERGONOMI, LINGKUNGAN KERJA & BAHAN BERBAHAYA",
//       training:
//       "Ahli K3 Kimia, Ahli K3 Muda Lingkungan Kerja, dsb",
//       button: "Detail",
//       path: "taro link kesini",
//       color: "warning",
//     },
//     {
//       icon: <FaBuilding />,
//       title: "PEKERJAAN PADA KETINGGIAN",
//       training:
//       "TKBT Tingkat 2, TKPK Tingkat 1, TKPK Tingkat 2",
//       button: "Detail",
//       path: "taro link kesini",
//       color: "warning",
//     },
//     {
//       icon: <FaBriefcaseMedical />,
//       title: "KESEHATAN KERJA",
//       training:
//       "Petugas P3K Di Tempat Kerja, Hyperkes Untuk Paramedis, dsb",
//       button: "Detail",
//       path: "taro link kesini",
//       color: "warning",
//     },
//     {
//       icon: <FaBolt />,
//       title: "Listrik",
//       training: "Ahli K3 Listrik, Teknisi Listrik",
//       button: "Detail",
//       path: "taro link kesini",
//       color: "warning",
//     },
//   ];

//   const scroll = (direction) => {
//     const container = scrolls.current;
//     const scrollAmount = 300;

//     if (direction === "right") {
//       if (
//         container.scrollLeft + container.clientWidth >=
//         container.scrollWidth - 10
//       ) {
//         container.scrollTo({ left: 0, behavior: "smooth" });
//       } else {
//         container.scrollBy({ left: scrollAmount, behavior: "smooth" });
//       }
//     } else {
//       if (container.scrollLeft <= 0) {
//         container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
//       } else {
//         container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
//       }
//     }
//   };

//   return (
//     <>
//       <h1 className="display-6 pt-4 pb-3 titleColorOne fw-bold text-center">
//         BIDANG PELATIHAN
//       </h1>

//       <div className="position-relative mt-3 px-5">
//         {/* Tombol kiri */}
//         <button
//           onClick={() => scroll("left")}
//           className="btn btn-light position-absolute top-50 start-0 translate-middle-y shadow"
//         >
//           <FaArrowAltCircleLeft />
//         </button>

//         {/* Container scroll */}
//         <div
//           ref={scrolls}
//           className="d-flex gap-4 overflow-hidden justify-content-start align-items-stretch scrolling"
//         >

//         {/* cards list bidang */}
//           {bidang.map((daftar, index) => (
//             <div
//               key={index}
//               className="card text-bg-light border-info mb-3 text-center long"
//             >
//               <div className="card-body d-flex flex-column justify-content-between bgCard">
//                 <div className="icon fs-1 text-center mb-2">{daftar.icon}</div>
//                 <h5 className="card-title mb-2">{daftar.title}</h5>
//                 <p className="card-text mb-2">{daftar.training}</p>
//                 <Link to={daftar.path} className={`btn btn-${daftar.color}`}>
//                   {daftar.button}
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Tombol kanan */}
//         <button
//           onClick={() => scroll("right")}
//           className="btn btn-light position-absolute top-50 end-0 translate-middle-y shadow"
//         >
//           <FaArrowAltCircleRight />
//         </button>
//       </div>
//     </>
//   );
// }
