// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// // 🔽 Import komponen footer
// import Footer from './Footer'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <nav class="navbar navbar-expand-lg bg-body-tertiary">
//   <div class="container-fluid">
//     <a class="navbar-brand" href="#">Navbar</a>
//     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
//       <span class="navbar-toggler-icon"></span>
//     </button>
    
//     <div class="collapse navbar-collapse" id="navbarNavDropdown">
//       <ul class="navbar-nav">
//         <li class="nav-item">
//           <a class="nav-link active" aria-current="page" href="#">Home</a>
//         </li>
//         <li class="nav-item">
//           <a class="nav-link" href="#">Features</a>
//         </li>
//         <li class="nav-item">
//           <a class="nav-link" href="#">Pricing</a>
//         </li>
//         <li class="nav-item dropdown">
//           <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//             Dropdown link
//           </a>
//           <ul class="dropdown-menu">
//             <li><a class="dropdown-item" href="#">Action</a></li>
//             <li><a class="dropdown-item" href="#">Another action</a></li>
//             <li><a class="dropdown-item" href="#">Something else here</a></li>
//           </ul>
//         </li>
//       </ul>

     
//       <div class="d-flex ms-auto gap-2">
//         <a href="#" class="btn btn-outline-primary">Login</a>
//         <a href="#" class="btn btn-primary">Register</a>
//       </div>
//     </div>
//   </div>
// </nav>

//       </div>

//       {/* 🔽 Footer ditampilkan di bagian bawah halaman */}
//       <Footer />
//     </>
//   )
// }

// export default App


import React from "react";
import LoginPage from "./components/loginPage"; // 🔹 Import komponen login page

function App() {
  return <LoginPage />; // 🔹 Langsung tampilkan login page
}

export default App;
