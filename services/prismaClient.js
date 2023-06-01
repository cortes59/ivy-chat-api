const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();
prisma.$connect()
.then(() => {
  console.log("============ Prisma Connected ============")
})
.catch(err => {
  console.log('Prisma connection error',err)
})

module.exports = prisma
