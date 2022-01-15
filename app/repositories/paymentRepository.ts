const pamentDb = require('../../database/models')
import { OrderType } from '../../types/order'
import { PaymentType } from '../../types/payment'

const getAllPayemnts = async () => {
  return await pamentDb.Payment.findAll()
}

const getAllPaymentsByOrderId = async (orderId:string) => {
  const payments = pamentDb.Payment.findAll({ include: [ { model: pamentDb.Order } ], where: { order_id: orderId } })
  return payments;
}

const getAllClientPayments =  async (clientId: string) => {
  const clientOrders = await pamentDb.Order.findAll( { include: [{ model: pamentDb.Payment, include: [ { model: pamentDb.CardPayment }, { model: pamentDb.CashPayment }, { model: pamentDb.Order } ] }],  where: { client_id: clientId } })
  console.log(clientOrders, ' orders')
  return clientOrders
  
}

const getPaymentById = async (id:string) => {
  return await pamentDb.Payemnt.findByPk(id)
}

const addPayment = (payment:any) => {

}

const updatePayment = (payment:any) => {

}

const deletePayment = (paymentId:string) => {
  pamentDb.Payment.destroy({ where: {id: paymentId}})
}

const getCardPaymentByPaymentId = async (id:string) => {
  return await pamentDb.CardPayment.findByPk(id, { include: [ pamentDb.Payment ] })
}

const getCashPaymentByPaymentId = async (id:string) => {
  return await pamentDb.CashPayment.findByPk(id, { include: [ pamentDb.Payment ] })
}

const createPayment = async ( paymentBody:any ) => {
  const paymentBodyPrepared:PaymentType = {
    date: new Date(),
    amount: paymentBody?.amount || 0,
    sum: paymentBody?.sum || 0,
    order_id: paymentBody?.order_id
  }

  const createdPayment = await pamentDb.Payment.create(paymentBodyPrepared);
  return createdPayment;

}


module.exports = {
  getAllPayemnts, 
  getPaymentById,
  getCardPaymentByPaymentId,
  getCashPaymentByPaymentId,
  getAllPaymentsByOrderId,
  getAllClientPayments,
  addPayment, 
  updatePayment,
  deletePayment,
  createPayment,

}