import React, { useState, useEffect } from "react";
import {
  Row,Col,Form,Button,ListGroup,Card,Alert,Spinner,
} from "react-bootstrap";
import { FaClock, FaTimes } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../cssnya/pesertaUser.css";

const API_BASE_URL = "http://localhost:3000/api/peserta";

export default function ParticipantSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [hasilPencarian, setHasilPencarian] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setSearchHistory(saved);
  }, []);

  // --- Fungsi utama pencarian ---
  const cariPeserta = async (query) => {
    const q = query.trim();
    if (q.length === 0) {
      setHasilPencarian([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${API_BASE_URL}/search?q=${encodeURIComponent(q)}`
      );
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();

      console.log("🔍 DATA DARI BACKEND:", data);

      setHasilPencarian(data.data || data);
    } catch (err) {
      console.error("Error Fetching Data:", err);
      setError(`Gagal memuat data: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Auto-search tiap kali mengetik ---
  useEffect(() => {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    if (!searchQuery.trim()) {
      setHasilPencarian([]);
      return;
    }

    const timeout = setTimeout(() => {
      cariPeserta(searchQuery);
    }, 500); // delay 0.5 detik

    setDebounceTimeout(timeout);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  // --- History pencarian ---
  const addToHistory = (query) => {
    if (query.trim() && !searchHistory.includes(query)) {
      const newHistory = [query, ...searchHistory].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    }
  };

  const selectFromHistory = (query) => {
    setSearchQuery(query);
    setShowHistory(false);
    cariPeserta(query);
  };

  const removeFromHistory = (query, e) => {
    e.stopPropagation();
    const newHistory = searchHistory.filter((h) => h !== query);
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  // --- Render ---
  return (
    <div className="participant-search-wrapper">
      <div className="full-width-container">
        <Card className="search-card">
          <Card.Header className="search-header">
            <h4 className="mb-0">Pencarian Peserta</h4>
          </Card.Header>

          <Card.Body className="search-body">
            <Form>
              <Row className="g-3">
                <Col>
                  <div className="search-input-wrapper">
                    <Form.Control
                      type="text"
                      placeholder="Nama Peserta"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowHistory(true);
                      }}
                      onFocus={() => setShowHistory(true)}
                      onBlur={() =>
                        setTimeout(() => setShowHistory(false), 200)
                      }
                      className="search-input text-black"
                    />

                    {showHistory && searchHistory.length > 0 && (
                      <Card className="history-dropdown">
                        <Card.Header className="history-header">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-2">
                              <FaClock size={16} color="#456882" />
                              <small className="history-title">
                                Riwayat Pencarian
                              </small>
                            </div>
                            <Button
                              variant="link"
                              size="sm"
                              onClick={clearHistory}
                              className="clear-history-btn"
                            >
                              <small>Hapus Semua</small>
                            </Button>
                          </div>
                        </Card.Header>

                        <ListGroup variant="flush" className="history-list">
                          {searchHistory.map((query, index) => (
                            <ListGroup.Item
                              key={index}
                              action
                              onClick={() => selectFromHistory(query)}
                              className="history-item d-flex justify-content-between align-items-center"
                            >
                              <div className="d-flex align-items-center gap-2">
                                <FaClock size={16} color="#9ca3af" />
                                <span className="history-text">{query}</span>
                              </div>
                              <span
                                role="button"
                                tabIndex={0}
                                onClick={(e) => removeFromHistory(query, e)}
                                onKeyDown={(e) =>
                                  e.key === "Enter" &&
                                  removeFromHistory(query, e)
                                }
                                className="remove-history-btn p-0 text-muted"
                                style={{ cursor: "pointer" }}
                              >
                                <FaTimes size={16} color="#9ca3af" />
                              </span>
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      </Card>
                    )}
                  </div>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>

        {/* --- HASIL PENCARIAN --- */}
        <div className="search-results-area mt-4">
          <Card>
            <Card.Header className="bg">
              <h5>
                Hasil Pencarian:
                {!isLoading &&
                  searchQuery.trim() &&
                  ` Ditemukan ${hasilPencarian.length} hasil`}
              </h5>
            </Card.Header>
            <Card.Body>
              {error && (
                <Alert variant="danger" className="text-center">
                  {error}
                </Alert>
              )}

              {isLoading ? (
                <div className="d-flex justify-content-center align-items-center p-3">
                  <Spinner animation="border" size="sm" className="me-2" />
                  <p className="mb-0">Sedang mencari peserta...</p>
                </div>
              ) : hasilPencarian.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-striped table-hover align-middle text-center">
                    <thead className="table-primary">
                      <tr>
                        <th>No</th>
                        <th>Nama Peserta</th>
                        <th>Instansi</th>
                        <th>Pelatihan</th>

                        <th>Sertifikat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hasilPencarian.map((peserta, index) => (
                        <tr key={peserta.id}>
                          <td>{index + 1}</td>
                          <td>
                            <strong>{peserta.nama_peserta}</strong>
                          </td>
                          <td>{peserta.user?.nama_institusi || "-"}</td>
                          <td>{peserta.pelatihan?.nama_pelatihan || "-"}</td>

                          <td>
                            {peserta.pesertaSertifikat?.[0]?.sertifikat
                              ?.nama_dokumen ? (
                              <a
                                href={`http://localhost:3000/uploads/sertifikasi/${peserta.pesertaSertifikat[0].sertifikat.nama_dokumen}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary text-decoration-none fw-semibold"
                              >
                                Unduh di sini
                              </a>
                            ) : (
                              <span className="text-muted fst-italic">
                                Belum tersedia
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : searchQuery.trim() && !isLoading && !error ? (
                <p className="text-center text-danger p-3">
                  Tidak ada peserta yang cocok dengan <b>“{searchQuery}”.</b>
                </p>
              ) : (
                <p className="text-center text-muted p-3">
                  Silakan masukkan nama peserta untuk mencari.
                </p>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}





// import React, { useState, useEffect } from "react";
// import { Row, Col, Form, Button, ListGroup, Card } from "react-bootstrap";
// import { FaSearch, FaClock, FaTimes } from "react-icons/fa";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../cssnya/pesertaUser.css";

// export default function ParticipantSearch() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchHistory, setSearchHistory] = useState([]);
//   const [showHistory, setShowHistory] = useState(false);

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("searchHistory") || "[]");
//     setSearchHistory(saved);
//   }, []);

//   const addToHistory = (query) => {
//     if (query.trim() && !searchHistory.includes(query)) {
//       const newHistory = [query, ...searchHistory].slice(0, 5);
//       setSearchHistory(newHistory);
//       localStorage.setItem("searchHistory", JSON.stringify(newHistory));
//     }
//   };

//   const handleSearchClick = () => {
//     if (searchQuery.trim()) {
//       addToHistory(searchQuery);
//       setShowHistory(false);
//       alert(`Mencari: ${searchQuery}`);
//     }
//   };

//   const selectFromHistory = (query) => {
//     setSearchQuery(query);
//     setShowHistory(false);
//   };

//   const removeFromHistory = (query, e) => {
//     e.stopPropagation();
//     const newHistory = searchHistory.filter((h) => h !== query);
//     setSearchHistory(newHistory);
//     localStorage.setItem("searchHistory", JSON.stringify(newHistory));
//   };

//   const clearHistory = () => {
//     setSearchHistory([]);
//     localStorage.removeItem("searchHistory");
//   };

//   return (
//     <div className="participant-search-wrapper">
//       <div className="full-width-container">
//         <Card className="search-card">
//           <Card.Header className="search-header">
//             <h4 className="mb-0">Pencarian Peserta</h4>
//           </Card.Header>

//           <Card.Body className="search-body">
//             <Form>
//               <Row className="g-3">
//                 <Col>
//                   <div className="search-input-wrapper">
//                     <Form.Control
//                       type="text"
//                       placeholder="Nama Peserta"
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       onFocus={() => setShowHistory(true)}
//                       onBlur={() => setTimeout(() => setShowHistory(false), 200)}
//                       className="search-input text-black"
//                     />

//                     {showHistory && searchHistory.length > 0 && (
//                       <Card className="history-dropdown">
//                         <Card.Header className="history-header">
//                           <div className="d-flex justify-content-between align-items-center">
//                             <div className="d-flex align-items-center gap-2">
//                               <FaClock size={16} color="#456882" />
//                               <small className="history-title">
//                                 Riwayat Pencarian
//                               </small>
//                             </div>
//                             <Button
//                               variant="link"
//                               size="sm"
//                               onClick={clearHistory}
//                               className="clear-history-btn"
//                             >
//                               <small>Hapus Semua</small>
//                             </Button>
//                           </div>
//                         </Card.Header>

//                         <ListGroup variant="flush" className="history-list">
//                           {searchHistory.map((query, index) => (
//                             <ListGroup.Item
//                               key={index}
//                               action
//                               onClick={() => selectFromHistory(query)}
//                               className="history-item"
//                             >
//                               <div className="d-flex align-items-center gap-2">
//                                 <FaClock size={16} color="#9ca3af" />
//                                 <span className="history-text">{query}</span>
//                               </div>
//                               <Button
//                                 variant="link"
//                                 size="sm"
//                                 onClick={(e) => removeFromHistory(query, e)}
//                                 className="remove-history-btn"
//                               >
//                                 <FaTimes size={16} color="#9ca3af" />
//                               </Button>
//                             </ListGroup.Item>
//                           ))}
//                         </ListGroup>
//                       </Card>
//                     )}
//                   </div>
//                 </Col>

//                 <Col xs="auto">
//                   <Button onClick={handleSearchClick} className="search-button">
//                     <FaSearch size={20} />
//                   </Button>
//                 </Col>
//               </Row>
//             </Form>
//           </Card.Body>
//         </Card>
//       </div>
//     </div>
//   );
// }
