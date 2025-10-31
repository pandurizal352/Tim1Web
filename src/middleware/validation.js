const validationBodyBidang = (req, res, next) =>{
    let { 
        nama_bidang, daftar_pelatihan,
    } = req.body;

    if (nama_bidang === undefined ||daftar_pelatihan === undefined){
        res.status(400).json({message: "title and years is required"});
    }else{
        next();
    }
}
const validationBodyPelatihan = (req, res, next) =>{
    let { biaya ,
  jangka_waktu,
  
        nama_bidang, 
    } = req.body;

    if (biaya === undefined || nama_bidang === undefined || jangka_waktu === undefined){
        res.status(400).json({message: "title and years is required"});
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
    let { Nama_dokumen, tanggal_dan_bulan,  id_pelatihan } = req.body;

    if (Nama_dokumen === undefined || tanggal_dan_bulan === undefined  || id_pelatihan === undefined) {
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
    validationBodyPesertaSertifikat
}