const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Pastikan folder upload tersedia
const dirPdf = "uploads/sertifikasi";
if (!fs.existsSync(dirPdf)) fs.mkdirSync(dirPdf, { recursive: true });

const dir = "uploads/bukti_pembayaran";
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });


// ========= pdf

// Konfigurasi penyimpanan file
const storagePdf = multer.diskStorage({
  destination: (req, file, cb) => cb(null, dirPdf),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, `sertifikat_${uniqueSuffix}`);
  },
});

const fileFilterPdf = (req, file, cb) => {
  if (file.mimetype === "application/pdf") cb(null, true);
  else cb(new Error("Hanya file PDF yang diperbolehkan!"), false);
};

const uploadPdf = multer({
  storage: storagePdf,
  fileFilter: fileFilterPdf,
}).single("file_pdf");



// ========= foto (image)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `bukti_${Date.now()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpg|jpeg|png/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.test(ext)) cb(null, true);
  else cb(new Error("Format file harus JPG, JPEG, atau PNG"));
};

// export middleware upload single file
const uploadBukti = multer({ storage, fileFilter }).single("bukti_pembayaran");



// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "uploads/bukti_pembayaran/"); // Pastikan folder ini sudah ada
//     },
//     filename: (req, file, cb) => {
//       const ext = path.extname(file.originalname);
//       cb(null, `bukti_${Date.now()}${ext}`);
//     },
//   }),
//   fileFilter: (req, file, cb) => {
//     const allowed = /jpg|jpeg|png/;
//     const ext = path.extname(file.originalname).toLowerCase();
//     if (allowed.test(ext)) cb(null, true);
//     else cb(new Error("Format file harus JPG, JPEG, atau PNG"));
//   },
// });

const validationBodyBidang = (req, res, next) =>{
    let { 
        nama_bidang, 
    } = req.body;

    if (nama_bidang === undefined ){
        res.status(400).json({message: "all column is required"});
    }else{
        next();
    }
}
const validationBodyPelatihan = (req, res, next) =>{
    let { biaya ,
  jangka_waktu,
  
        nama_pelatihan, 
    } = req.body;

    if (biaya === undefined || nama_pelatihan === undefined || jangka_waktu === undefined){
        res.status(400).json({message: "all column is required"});
    }else{
        next();
    }
}

const validationBodyPeserta = (req, res, next) => {
    let { nama_peserta, email_peserta, telpn_peserta, alamat_peserta } = req.body;

    if (nama_peserta === undefined || email_peserta === undefined || telpn_peserta === undefined || alamat_peserta === undefined) {
        res.status(400).json({message : "all column is required"});
    } else {
        next();
    }
}

const validationBodySertifikasi = (req, res, next) => {
    let { tanggal_dan_bulan,  id_pelatihan } = req.body;

    if ( tanggal_dan_bulan === undefined  || id_pelatihan === undefined) {
        res.status(400).json({message : "all column is required"});
    } else {
        next();
    }
}

const validationBodyPesertaSertifikat = (req, res, next) => {
    let {id_peserta } = req.body;

    if (id_peserta === undefined ) {
        res.status(400).json({message : "minimal harus isi id_peserta"});
    } else {
        next();
    }
}


module.exports ={
    validationBodyBidang,
    validationBodyPelatihan,
    validationBodyPeserta,
    validationBodySertifikasi,
    validationBodyPesertaSertifikat,
    uploadBukti,
    uploadPdf
}