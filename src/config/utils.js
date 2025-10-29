
// import class  prisma client
const {PrismaClient} = require('@prisma/client');

// inisialiasasi intance prisma yg terhubung k db  sesuai database_url
const prisma = new PrismaClient();








// export prisma
module.exports = prisma;
