const prisma = require('../config/utils');

// read 
const getAllPelatihans = async(req, res)=>{
    try{
        const pelatihans = await prisma.pelatihan.findMany({
             include: {
        peserta: true,      // relasi ke Peserta
        bidang: true,       // relasi ke Bidang
        sertifikasi: true,  // relasi ke Sertifikasi
      },

        });
        return res.json(pelatihans);
    }catch(error){
        console.error(error);
        return res.status(500).json({Message : 'internal server error'}
        )

    }
}

const getPelatihanById = async (req, res) =>{
    try{
        const id = parseInt(req.params.id);
        const pelatihan = await prisma.pelatihan.findUnique({
            where: {id},
             include: {
        peserta: true,
        bidang: true,
        sertifikasi: true,
      },
        });
        if(!pelatihan) {return res.status(404).json({message : " pelatihan not found"});}
        return res.json(pelatihan)
    }catch(error){
         console.error(error);
        return res.status(500).json({message : 'internal server error'})
    }
}

// create
const createPelatihan = async (req, res) => {
  try {
    const { biaya, jangka_waktu, nama_pelatihan, id_bidang } = req.body;

    const pelatihan = await prisma.pelatihan.create({
      data: {
        biaya: parseInt(biaya),
        jangka_waktu,
        nama_pelatihan,
        // jika ingin hubungkan dengan bidang
        ...(id_bidang && {
          bidang: {
            connect: { id: parseInt(id_bidang) },
          },
        }),
      },
      include: {
        bidang: true,
        peserta: true, // meskipun relasi 1-nya di peserta, ini akan tetap bisa ditampilkan
      },
    });

    return res.status(201).json(pelatihan);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

// const createPelatihan = async (req, res) => {
//   try {
//     const { biaya, jangka_waktu, nama_bidang, id_peserta, id_Bidang } = req.body;

//     const pelatihan = await prisma.pelatihan.create({
//       data: {
//         biaya: parseInt(biaya),
//         jangka_waktu: new Date(jangka_waktu),
//         nama_bidang,
//         id_peserta: id_peserta ? parseInt(id_peserta) : null,
//         id_Bidang: id_Bidang ? parseInt(id_Bidang) : null,
//       },
//       include: {
//         peserta: true,
//         bidang: true,
//       },
//     });

//     return res.status(201).json(pelatihan);
//   } catch (error) {
//     console.error(error);
//     return res.status(400).json({ message: error.message });
//   }
// };


// update
const updatePelatihan = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { biaya, jangka_waktu, nama_pelatihan, id_bidang } = req.body;

    // Konversi waktu ke WIB (opsional)
    // const date = jangka_waktu ? new Date(jangka_waktu) : undefined;
    // if (date) date.setHours(date.getHours() + 7);

    const data = {
      ...(biaya && { biaya: parseInt(biaya) }),
      ...(jangka_waktu && { jangka_waktu }),
      ...(nama_pelatihan && { nama_pelatihan }),
    };

    // Update relasi bidang jika dikirim di body
    if ("id_bidang" in req.body) {
      if (id_bidang === null) {
        data.bidang = { disconnect: true };
      } else {
        data.bidang = { connect: { id: parseInt(id_bidang) } };
      }
    }

    const pelatihan = await prisma.pelatihan.update({
      where: { id },
      data,
      include: {
        bidang: true,
        peserta: true,
        sertifikasi: true,
      },
    });

    return res.json(pelatihan);
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Pelatihan not found" });
    }
    return res.status(500).json({ message: error.message });
  }
};


// const updatePelatihan = async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     const { biaya, jangka_waktu, nama_bidang, id_peserta, id_Bidang } = req.body;
//     const date = new Date(jangka_waktu);
// date.setHours(date.getHours() + 7); // Tambah 7 jam biar jadi WIB

//     const data = {
//       biaya: biaya ? parseInt(biaya) : undefined,
//       jangka_waktu: date ,
//       nama_bidang,
//       id_peserta: id_peserta ? parseInt(id_peserta) : null,
//       id_Bidang: id_Bidang ? parseInt(id_Bidang) : null,
//     };

//     const pelatihan = await prisma.pelatihan.update({
//       where: { id },
//       data,
//       include: {
//         peserta: true,
//         bidang: true,
//         sertifikasi: true,
//       },
//     });

//     return res.json(pelatihan);
//   } catch (error) {
//     console.error(error);
//     if (error.code === "P2025") {
//       return res.status(404).json({ message: "Pelatihan not found" });
//     }
//     return res.status(500).json({ message: error.message });
//   }
// };

//delete
const deletePelatihan = async(req,res)=>{
    try{
        const id = parseInt(req.params.id);
        await prisma.pelatihan.delete({where: {id}})
        return res.json({message : " data pelatihan terhapus"})
    }catch{
        console.error(error);
        if(error.code === 'P2025'){
            return res.status(404).json({Message: 'pelatihan not found'})
        }
        return res.status(500).json({Message: "internal server error"});

    }
}

module.exports ={
    getAllPelatihans,
    getPelatihanById,
    createPelatihan,
    updatePelatihan,
    deletePelatihan
}