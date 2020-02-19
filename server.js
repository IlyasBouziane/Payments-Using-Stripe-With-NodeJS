if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

console.log(stripePublicKey,stripeSecretKey)

const express = require('express')

const app = express()

app.set('view engine','ejs')
app.use(express.static('public'))

app.listen(3000)