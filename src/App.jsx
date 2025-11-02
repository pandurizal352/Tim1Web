import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import Navbar from "./components/Navbar"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Beranda from "./components/pages/Beranda";
import Bidang from "./components/pages/Bidang";
import Pelatihan from "./components/pages/Pelatihan";
import EditBidang from "./components/pages/EditBidang";

// import BukuTamu from "./components/pages/BukuTamu";
import Footer from "./components/footer";
// import DataSiswa from "./components/pages/DataSiswa";

// import EditSiswa from "./components/pages/EditSiswa";

export default function App(){

    return(
      <React.StrictMode> 
        {/* untuk memastikan bahwa kalau di dalam nya  */}
        <BrowserRouter>
            <div>
              {/* navbar  memberikan detail url */}
              <Navbar/>
              {/* menangkap url dan menyesuaikan ke halaman boddy
               */}
              <Routes>
                <Route path="/" element={<Beranda/>}/>
                <Route path="/bidang" element={<Bidang/>}/>
                <Route path="/pelatihan" element={<Pelatihan/>}/>
                <Route path="/edit-bidang/:id" element={<EditBidang/>}/>
                {/* <Route path="/bukutamu" element={<BukuTamu/>}/> */}
                {/* <Route path="/siswa" element={<DataSiswa/>}/> */}
               {/* <Route path="/edit-siswa/:id" element={<EditSiswa/>}/> */}
              </Routes>
              <br></br>
              <Footer/>
            </div>
        </BrowserRouter>
      </React.StrictMode>
      

    )




}