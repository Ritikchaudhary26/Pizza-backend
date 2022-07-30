const express = require('express')

const router = express.Router()
const { v4: uuidv4 } = require('uuid')
const stripe = require('stripe')(
  '',
)
const Order = require('../modals/orderModel')

router.post('/placeorder', async (req, res) => {
  const { token, subtotal, currentUser, cartItems } = req.body
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    }) 
    const payment = await stripe.charges.create( 
      {
        amount: subtotal * 100,
        currency: 'inr',
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      },
    )
    if (payment) {
      const neworder = new Order({
        name: currentUser.name,
        email: currentUser.email,
        userid: currentUser.userid,
        orderItems: cartItems,
        orderAmount: subtotal,
        shippindAddress: {},
      })

      res.send('Payment Done')
    } else {
      res.send('Payment failed')
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Something went wrong' })
  }
})

module.exports = router
