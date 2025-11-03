import React, { useState, useEffect } from 'react';
import './pages-css/peserta.css';

export default function PesertaPelatihan({ searchQuery = '' }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sync dengan search dari navbar
  useEffect(() => {
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [searchQuery]);
  
  const participants = [
    {
      id: 1,
      nama: "Ahmad Fadli",
      email: "ahmad.fadli@email.com",
      perusahaan: "PT. Maju Jaya",
      pelatihan: "K3 Umum"
    },
    {
      id: 2,
      nama: "Siti Nurhaliza",
      email: "siti.nur@email.com",
      perusahaan: "CV. Sejahtera",
      pelatihan: "Fire Safety"
    },
    {
      id: 3,
      nama: "Budi Santoso",
      email: "budi.s@email.com",
      perusahaan: "PT. Karya Mandiri",
      pelatihan: "K3 Listrik"
    },
    {
      id: 4,
      nama: "Dewi Lestari",
      email: "dewi.l@email.com",
      perusahaan: "PT. Nusantara",
      pelatihan: "Working at Height"
    },
    {
      id: 5,
      nama: "Eko Prasetyo",
      email: "eko.p@email.com",
      perusahaan: "PT. Global Indo",
      pelatihan: "K3 Umum"
    },
    {
      id: 6,
      nama: "Fitri Handayani",
      email: "fitri.h@email.com",
      perusahaan: "CV. Berkah",
      pelatihan: "First Aid"
    }
  ];

  const filteredParticipants = participants.filter(p =>
    p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.perusahaan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.pelatihan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPeserta = participants.length;
  const aktif = 4;
  const pending = 1;
  const selesai = 1;

  return (
    <div className="page-container">
      <div className="header">
        <h1 className="header-title">Daftar Peserta Pelatihan</h1>
        <p className="header-subtitle">Kelola dan pantau data peserta pelatihan K3</p>
      </div>

      <div className="content-wrapper">
        <div className="action-buttons">
          <button className="btn-primary">
            <i className="bi bi-plus-lg"></i>
            Tambah Peserta
          </button>
        </div>

        <div className="search-container">
          <div className="search-wrapper">
            <i className="bi bi-search search-icon"></i>
            <input
              type="text"
              placeholder="Cari nama, email, perusahaan, atau pelatihan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card stat-card-total">
            <div className="stat-content">
              <div>
                <p className="stat-label">Total Peserta</p>
                <p className="stat-value">{totalPeserta}</p>
              </div>
              <i className="bi bi-people-fill stat-icon"></i>
            </div>
          </div>

          <div className="stat-card stat-card-aktif">
            <div className="stat-content">
              <div>
                <p className="stat-label">Aktif</p>
                <p className="stat-value">{aktif}</p>
              </div>
              <i className="bi bi-person-check-fill stat-icon"></i>
            </div>
          </div>

          <div className="stat-card stat-card-pending">
            <div className="stat-content">
              <div>
                <p className="stat-label">Pending</p>
                <p className="stat-value">{pending}</p>
              </div>
              <i className="bi bi-calendar-check stat-icon"></i>
            </div>
          </div>

          <div className="stat-card stat-card-selesai">
            <div className="stat-content">
              <div>
                <p className="stat-label">Selesai</p>
                <p className="stat-value">{selesai}</p>
              </div>
              <i className="bi bi-check-circle-fill stat-icon"></i>
            </div>
          </div>
        </div>

        <div className="table-container">
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Peserta</th>
                  <th>Email</th>
                  <th>Perusahaan</th>
                  <th>Pelatihan</th>
                </tr>
              </thead>
              <tbody>
                {filteredParticipants.length > 0 ? (
                  filteredParticipants.map((participant, index) => (
                    <tr key={participant.id}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="participant-name">{participant.nama}</div>
                      </td>
                      <td className="email-cell">{participant.email}</td>
                      <td className="company-cell">{participant.perusahaan}</td>
                      <td>
                        <span className="badge">
                          {participant.pelatihan}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="empty-state">
                      Tidak ada data peserta yang ditemukan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <div className="pagination-info">
              Menampilkan {filteredParticipants.length} dari {totalPeserta} peserta
            </div>
            <div className="pagination-buttons">
              <button className="pagination-btn">Previous</button>
              <button className="pagination-btn pagination-btn-active">1</button>
              <button className="pagination-btn">2</button>
              <button className="pagination-btn">Next</button>
            </div>
          </div>
        </div>

        <div className="footer">
          © 2025 PT. Geo Kreasi Mandiri. All Rights Reserved.
        </div>
      </div>
    </div>
  );
}