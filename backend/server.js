const path = require('path')
const express=require('express')
const colors=require('colors')
const dotenv=require('dotenv').config()

const {errorhandler}=require('./middleware/errorMiddleWare')
const connectDB=require('./config/db')
const PORT=process.env.PORT || 5000
connectDB()
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/users',require('./routes/userRoutes'))
app.use('/api/tickets',require('./routes/ticketRoutes'))
if (process.env.NODE_ENV === 'production') {
    // Set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')))
  
    // FIX: below code fixes app crashing on refresh in deployment
    app.get('*', (_, res) => {
      res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
    })
  } else {
    app.get('/', (_, res) => {
      res.status(200).json({ message: 'Welcome to the Support Desk API' })
    })
  }
  
app.use(errorhandler)
app.listen(PORT,()=>console.log(`server started ${PORT}`))
