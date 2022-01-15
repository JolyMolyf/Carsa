const techdb = require('../../database/models')

const getTechnicianById = async (id:string) => {
  return await techdb.Technicians.findByPk(id)
}

const getRandomTechnician = async () => {
    const technicians = await techdb.Technician.findAll();
    const randomTechnician =  technicians[Math.floor(Math.random() * technicians.length)];
    return randomTechnician;


}



module.exports = {
  getTechnicianById,
  getRandomTechnician,
}