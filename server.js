require('dotenv').config()


const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

const app = express()

app.use((req,res,next)=>{
// enable all sources
  res.setHeader("Access-Control-Allow-Origin","*")
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  next()

})

app.get('/saveTokens',(req,res,next)=>{
    console.log("test")
})


app.use('/', serveStatic(path.join(__dirname,'/dist')))

app.get('/*',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'/dist/index.html'))
})

var cookieParser = require('cookie-parser');
var session = require('cookie-session');
 
app.use(cookieParser('keyboard cat'))
app.use(session({ 
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { maxAge: 60000 }
}))

const port = process.env.PORT || 8080
app.listen(port)
console.log(`app is listening on port ${port}`)