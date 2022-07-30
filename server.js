const express = require('express')
const db = require('./db')
const Pizza = require('./modals/pizzaModel')
 
const app = express()
app.use(express.json())

const pizzasRoute = require('./routes/PizzasRoute')
const userRoute = require('./routes/userRoute')
const ordersRoute = require('./routes/ordersRoute')

app.use('/api/pizzas/', pizzasRoute)
app.use('/api/users/', userRoute)
app.use('/api/orders/', ordersRoute)

app.get('/', (req, res) => {
  res.send('Hello World!')
}) 
 
const port = process.env.port || 5000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
