const express = require('express'); //import express
const Cors = require('cors'); // import  CORS package

const app = express();



// middleware global
app.use(Cors()); // enable  CORS untuk semua origin
// app.use(cors());  aktifkan cors (default: suemua origin di perbolehkan), 
// berguna saat frontend di origin berbeda
app.use(express.json()); //parse JSON body

// routes
const bidangRoutes = require('./routes/bidangRoutes');
const pelatihanRoutes = require('./routes/pelatihanRoutes');
const pesertaRoutes = require('./routes/pesertaRoutes');
const sertifikasiRoutes = require('./routes/sertifikasiRoutes');
const authUserRoutes = require('./routes/authUserRoutes');
const pesertaSertifRoutes = require('./routes/pesertaSertifRoutes');

// prefix api
app.use('/api/bidang', bidangRoutes);
app.use('/api/pelatihan', pelatihanRoutes);
app.use('/api/peserta', pesertaRoutes);
app.use('/api/sertifikasi', sertifikasiRoutes);
app.use('/api/user', authUserRoutes);
app.use('/api/pesertasertif', pesertaSertifRoutes);



// healt-check
app.get('/', (req, res) => {
    res.send('API berjalan - gunakan /api/movies dan /api/categories');
})


// buat jalanin server package.json
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server berjalan pada port ${PORT}`);
})


// mencoba di postman pake ini
// const express = require('express'); //import express
// const Cors = require('cors'); // import  CORS package

// const app = express();

// // middleware global
// app.use(Cors()); // enable  CORS untuk semua origin


// // routes
// const bidangRoutes = require('./routes/bidangRoutes');
// const pelatihanRoutes = require('./routes/pelatihanRoutes');
// const pesertaRoutes = require('./routes/pesertaRoutes');
// const sertifikasiRoutes = require('./routes/sertifikasiRoutes');
// const authUserRoutes = require('./routes/authUserRoutes');
// const pesertaSertifRoutes = require('./routes/pesertaSertifRoutes');

// app.use('/api/user', authUserRoutes);

// app.use(express.json()); //parse JSON body

// // prefix api
// app.use('/api/bidang', bidangRoutes);
// app.use('/api/pelatihan', pelatihanRoutes);
// app.use('/api/peserta', pesertaRoutes);
// app.use('/api/sertifikasi', sertifikasiRoutes);

// app.use('/api/pesertasertif', pesertaSertifRoutes);

// // healt-check
// app.get('/', (req, res) => {
//     res.send('API berjalan - gunakan /api/movies dan /api/categories');
// })


// // buat jalanin server package.json
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`server berjalan pada port ${PORT}`);
// })



