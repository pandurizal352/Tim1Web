// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
// import { useNavigate, useParams } from "react-router-dom";

// export default function EditSiswa(){
//     const {id} = useParams();
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true); // buatuh kejalasan atau butuh loading
//   const [nama, setNama] = useState("");
//   const [email, setEmail] = useState("");
//   const [alamat, setAlamat] = useState("");

//   const handleUpdate = ()=>{
//      axios
//       .put(`https://mytechs.my.id/data_siswa_api/apiSiswa.php?id=${id}`,
//       {
//           nama_siswa: nama,
//         email_siswa: email,
//         alamat_siswa: alamat,
//       }
//     )
//       .then((response) => {
//         // setStudents(response.data);
//         // console.log(response.data);
//         console.log(response)
//         var message = response.data.message
//         if(message){
//             alert('data berhasil di update')
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });

//   }

//   useEffect(() => {
//     // alert ('hallo')
//     fecthDataByid();
//   }, []);

//   const fecthDataByid = () => {
//      axios
//       .get(`https://mytechs.my.id/data_siswa_api/apiSiswa.php?id=${id}`)
//       .then((response) => {
//         // setStudents(response.data);
//         // console.log(response.data);
//         const myData = response.data[0];
//         setNama(myData['nama_siswa'])
//         setEmail(myData['email_siswa'])
//         setAlamat(myData['alamat_siswa'])
//       })
//       .catch((error) => {
//         console.log(error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }
//     return(
//        <>
//          <div className="container">
//          <div className="card mt-2 p-3">
//          <div className="card-body">
//         <form onSubmit={handleUpdate}>
//                 {/* floating label */}

//                 <div className="form-floating mb-3">
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="floatingInput"
//                     placeholder="nama"
//                     value={nama}
//                     onChange={(e) => setNama(e.target.value)}
//                   ></input>
//                   <label htmlFor="floatingInput">Nama</label>
//                 </div>
//                 <div className="form-floating mb-3">
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="floatingPassword"
//                     placeholder="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   ></input>
//                   <label htmlFor="floatingEmail">Email</label>
//                 </div>
//                 <div className="form-floating mb-3">
//                   <textarea
//                     className="form-control"
//                     placeholder="Leave a comment here"
//                     id="floatingTextarea"
//                     style={{ height: "100px" }}
//                     value={alamat}
//                     onChange={(e) => setAlamat(e.target.value)}
//                   ></textarea>
//                   <label htmlFor="floatingTextarea">Alamat</label>
//                 </div>
//                 <button type="submit" className="btn btn-primary col-12"> simpan</button>
//               </form>
//               </div>
//               </div>
//               </div>
       
//        </>
        
//     )
// }