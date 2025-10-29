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


module.exports ={
    validationBodyBidang,
    validationBodyPelatihan
}