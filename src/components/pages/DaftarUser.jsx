import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../cssnya/daftarUser.css";

export default function DeliveryForm() {

 

  return (
    <div className="delivery-wrapper">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10} xl={9}>
            <div className="delivery-container">
              
              {/* CONTENT KIRI */}
              <div className="left-content">
                <h2 className="fw-bold mb-3">Daftar</h2>
                <p className="welcome-text">
                  Daftarkan diri Anda untuk mengikuti<br />
                  pelatihan pembinaan K3 kami
                </p>
              </div>

              {/* CARD KANAN (FORM PESERTA) */}
              <div className="right-card">
                <h4 className="text-center mb-4 fw-bold">Daftar Peserta</h4>
                <Form >
                  <Row className="mb-3">
                    <Col>
                      <Form.Control 
                        type="text" 
                        placeholder="Nama Lengkap"
                        name="nama_peserta"
                       
                        required
                      />
                    </Col>
                    <Col>
                      <Form.Control 
                        type="email" 
                        placeholder="Email"
                        name="email_peserta"
                       
                        required
                      />
                    </Col>
                  </Row>
                  
                  <Row className="mb-3">
                    <Col>
                      <Form.Control 
                        type="tel" 
                        placeholder="No. Telepon"
                        name="telpn_peserta"
                       
                        required
                      />
                    </Col>
               
                  </Row>

                  <Row className="mb-3">
                    <Col>
                      <Form.Control 
                        as="textarea"
                        rows=""
                        placeholder="Alamat Lengkap"
                        name="alamat_peserta"
                       
                        required
                      />
                    </Col>
                   
                  </Row>

                  <div className="text-end">
                    <Button type="submit" className="place-order-btn">
                      DAFTAR SEKARANG
                    </Button>
                  </div>
                </Form>
              </div>

            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}








// import React, { useState } from "react";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../cssnya/daftarUser.css";

// export default function DeliveryForm() {

 

//   return (
//     <div className="delivery-wrapper">
//       <Container>
//         <Row className="justify-content-center">
//           <Col lg={10} xl={9}>
//             <div className="delivery-container">
              
//               {/* CONTENT KIRI */}
//               <div className="left-content">
//                 <h2 className="fw-bold mb-3">Daftar</h2>
//                 <p className="welcome-text">
//                   Daftarkan diri Anda untuk mengikuti<br />
//                   pelatihan pembinaan K3 kami
//                 </p>
//               </div>

//               {/* CARD KANAN (FORM PESERTA) */}
//               <div className="right-card">
//                 <h4 className="text-center mb-4 fw-bold">Daftar Peserta</h4>
//                 <Form >
//                   <Row className="mb-3">
//                     <Col>
//                       <Form.Control 
//                         type="text" 
//                         placeholder="Nama Lengkap"
//                         name="nama_peserta"
                       
//                         required
//                       />
//                     </Col>
//                     <Col>
//                       <Form.Control 
//                         type="email" 
//                         placeholder="Email"
//                         name="email_peserta"
                       
//                         required
//                       />
//                     </Col>
//                   </Row>
                  
//                   <Row className="mb-3">
//                     <Col>
//                       <Form.Control 
//                         type="tel" 
//                         placeholder="No. Telepon"
//                         name="telpn_peserta"
                       
//                         required
//                       />
//                     </Col>
               
//                   </Row>

//                   <Row className="mb-3">
//                     <Col>
//                       <Form.Control 
//                         as="textarea"
//                         rows=""
//                         placeholder="Alamat Lengkap"
//                         name="alamat_peserta"
                       
//                         required
//                       />
//                     </Col>
                   
//                   </Row>

//                   <div className="text-end">
//                     <Button type="submit" className="place-order-btn">
//                       DAFTAR SEKARANG
//                     </Button>
//                   </div>
//                 </Form>
//               </div>

//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }




