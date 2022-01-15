const express = require('express')
const dab = require('./database/models')
const corsMiddleware = require('./app/middlewares/cors')
const router = require('./app/routes')
// const passport = require("./app/auth/passport")
// const upload = require('./app/middlewares/multer')
require('dotenv').config()


const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.disable('x-powered-by')


if(process.env.NODE_ENV === "production"){
    app.use(express.static("./client/build"))
}
// app.use(passport.initialize())
// Setup CORS Logic
app.options('*', corsMiddleware)
app.use(corsMiddleware)
// Connecting routes
app.use(router)


app.get("*", (req:any, res:any)=> {
    // res.json({ 
    //     message: 'The page you have tried to reach does not exist',
    //     status: '404',
    //     success: false
    // })
    res.sendFile("./client/build/index.html")
})

dab.sequelize.sync().then(() => {
    app.listen(PORT|| 3000, () => {
        console.log('Server is listening on port', PORT || 3000)
    })
})
