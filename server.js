const fs = require('fs')
const express = require('express')

if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

console.log(stripePublicKey,stripeSecretKey)

const app = express()
app.set('view engine','ejs')
app.use(express.static('public'))
app.get('/store', function(req,resp){
    fs.readFile('items.json',function(error,data){
        if(error){
            resp.status(500).end()
        } else {
            resp.render('store.ejs',
            {
                items : JSON.parse(data),
                stripePublicKey : stripePublicKey
            }
            )
        }
    })
})
app.post('/purchase',function(req,resp){
    fs.readFile('items.json',function(error,data){
        if(error){
            resp.status(500).end()
        } else {
           const items = JSON.parse(data)
           const totalItems = items.music.concat(items.merch)
           req.body.items.forEach(item => {
               const chosenItem = totalItems.find(function(i){
                   return chosenItem.id == i.id
               })
               total += total + chosenItem.price * item.qte *100  
           })
        }
    })
})
app.listen(3000)