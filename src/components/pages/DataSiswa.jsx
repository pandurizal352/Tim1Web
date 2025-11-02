// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
// import { useNavigate } from "react-router-dom";
// export default function DataSiswa() {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true); // buatuh kejalasan atau butuh loading
//   const [nama, setNama] = useState("");
//   const [email, setEmail] = useState("");
//   const [alamat, setAlamat] = useState("");
//   const navigate = useNavigate();

//   const fecthData = () => {
//     axios
//       .get("https://mytechs.my.id/data_siswa_api/apiSiswa.php")
//       .then((response) => {
//         setStudents(response.data);
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     // alert ('hallo')
//     fecthData();
//   }, []);

//   const handleDelete = (id) => {
//     const confirmDelete = window.confirm("Apakah kamu yakin akan menghapus data ini?"); // ✅ konfirmasi dulu

//   if (!confirmDelete) {
//     return; // kalau user pilih "Cancel", hentikan proses
//   }
//     axios
//       .delete(`https://mytechs.my.id/data_siswa_api/apiSiswa.php?id=${id}`)
//       .then((response) => {
//         console.log(response.data);
//         fecthData();
//       })
//       .catch((error) => {
//         console.log("gagal menghapus data",error);
//       })
//       .finally(() => {
        
//         setLoading(false);
//       });
//   };
//   const handleEdit = (id) =>{
//     navigate(`/edit-siswa/${id}`)
  
//   }

//   // const handleEdit = () =>{
//   //   axios
//   //     .put(`https://mytechs.my.id/data_siswa_api/apiSiswa.php?id=${id}`)
//   //     .then((response) => {
//   //       console.log(response.data);
//   //       fecthData();
//   //     })
//   //     .catch((error) => {
//   //       console.log("gagal menghapus data",error);
//   //     })
//   //     .finally(() => {
        
//   //       setLoading(false);
//   //     });

//   // }

//   const handleSubmit = (e) => {
//     // mencegah aksi dari default submit
//     e.preventDefault();
//     axios
//       .post("https://mytechs.my.id/data_siswa_api/apiSiswa.php", {
//         nama_siswa: nama,
//         email_siswa: email,
//         alamat_siswa: alamat,
//       })
//       .then((response) => {
//         setNama("");
//         setEmail("");
//         setAlamat("");
//         console.log(response);
//         fecthData();
//       })
//       .catch((error) => {
//         console.error("gagal menambahkan data", error);
//       })
//       .finally(() => {
//         const modalEl = document.getElementById("exampleModal");
//         const modalInstance = Modal.getOrCreateInstance(modalEl);
//         modalInstance.hide();
//         document.body.classList.remove("modal-open");
//         const backdrops = document.querySelectorAll(".modal-backdrop");
//         backdrops.forEach((bd) => bd.remove());
//         setLoading(false);
//       });
//   };
//   if (loading) {
//     return (
//       <div className="spinner-border text-primary" role="status">
//         <span className="visually-hidden">Loading...</span>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="container  text-center">
//         <div className="card mt-2">
//           <h1>ini halaman Data siswa</h1>
//           <div className="cardbody">
//             <button
//               type="button"
//               className="btn btn-primary container"
//               data-bs-toggle="modal"
//               data-bs-target="#exampleModal"
//             >
//               Tambah Data
//             </button>
//             <hr />
//             <br />
//             <table className="table table-secondary table-striped">
//               <thead>
//                 <tr>
//                   <th scope="col">Nomer</th>
//                   <th scope="col">Nama</th>
//                   <th scope="col">Email</th>
//                   <th scope="col">Alamat</th>
//                   <th scope="col">Aksi</th>
//                 </tr>
//               </thead>
//               <tbody className="table-group-divider">
//                 {students.map((students, index) => (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>{students.nama_siswa}</td>
//                     <td>{students.email_siswa}</td>
//                     <td>{students.alamat_siswa}</td>
//                     <td>
//                       <button
//                         className="btn btn-danger btn-sm"
//                         onClick={() => handleDelete(students.id_siswa)} // sesuaikan id sesuai API
//                       >
//                         Hapus
//                       </button>
//                         <br/>
//                        <button
//                         className="btn btn-warning btn-sm"
//                         onClick={() => handleEdit(students.id_siswa) }
//                         // onClick={() => handleDelete(students.id_siswa)} // sesuaikan id sesuai API
//                       >
//                         Edit
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//       <div
//         className="modal fade"
//         id="exampleModal"
//         tabIndex="-1"
//         aria-labelledby="exampleModalLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h1 className="modal-title fs-5" id="exampleModalLabel">
//                 Modal title
//               </h1>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body">
//               <form onSubmit={handleSubmit}>
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
//                 <button className="btn btn-primary col-12"> simpan</button>
//               </form>
//             </div>

//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 data-bs-dismiss="modal"
//               >
//                 Close
//               </button>
//               <button type="button" className="btn btn-primary">
//                 Save changes
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
