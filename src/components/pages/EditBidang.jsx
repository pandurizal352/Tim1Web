import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate, useParams } from "react-router-dom";

export default function EditSiswa(){
    const {id} = useParams();
  const [bidangs, setBidangs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nama_bidang, setNama_bidang] = useState("");
  const [daftar_pelatihan, setDaftar_pelatihan] = useState("");
   const navigate = useNavigate();

//   const handleUpdate = ()=>{
     const handleUpdate = (e)=>{
    e.preventDefault();
     axios
      .put(`http://localhost:3000/api/bidang/${id}`,
      {
          nama_bidang: nama_bidang,
        // daftar_pelatihan: daftar_pelatihan,
      }
    )
      // .then((response) => {
      //   // setStudents(response.data);
      //   // console.log(response.data);
      //   console.log(response)
      //   var message = response.data.message
      //   if(message){
      //       alert('data berhasil di update')
      //       navigate("/bidang");
      //   }
      // })
      .then((response) => {
  alert("Data berhasil diupdate");
  navigate("/bidang");
})

      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });

  }

  useEffect(() => {
    // alert ('hallo')
    fecthDataByid();
  }, []);

  const fecthDataByid = () => {
     axios
      .get(`http://localhost:3000/api/bidang/${id}`)
      .then((response) => {
        // setStudents(response.data);
        // console.log(response.data);
        const myData = response.data;
        setNama_bidang(myData['nama_bidang'])
        // setDaftar_pelatihan(myData['daftar_pelatihan'])
        
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
    return(
       <>
         <div className="container">
         <div className="card mt-2 p-3">
         <div className="card-body">
        <form onSubmit={handleUpdate}>
                {/* floating label */}

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control text-black"
                    id="floatingInput"
                    placeholder="nama bidang"
                    value={nama_bidang}
                    onChange={(e) => setNama_bidang(e.target.value)}
                  ></input>
                  <label htmlFor="floatingInput">Nama bidang</label>
                </div>
                {/* <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="daftar_pelatihan"
                    value={daftar_pelatihan}
                    onChange={(e) => setDaftar_pelatihan(e.target.value)}
                  ></input>
                  <label htmlFor="floatingEmail">Daftar pelatihan</label>
                </div> */}
             
                <button type="submit" className="btn btn-primary col-12"> simpan</button>
              </form>
              </div>
              </div>
              </div>
       
       </>
        
    )
}