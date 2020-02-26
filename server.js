const fs = require('fs')
const express = require('express')

if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

const stripe = require('stripe')(stripeSecretKey)

const app = express()
app.use(express.json())
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
           const jsonItems = JSON.parse(data)
           const totalItems = jsonItems.music.concat(jsonItems.merch)
           let total = 0
           req.body.items.forEach(item => {
               const chosenItem = totalItems.find(function(i){
                   return item.id == i.id
               })
               total += total + chosenItem.price * item.qte *100  
           })
           stripe.charges.create({
               amount : total,
               source : req.body.stripeTokenId,
               currency : 'eur'
           }).then(function(){
                resp.json({ message : 'Items purchased successfully !'})
                console.log(resp)
           }).catch(function(){
                console.log('Charge fail')
                resp.status(500).end()
           })
      
      }
    })
})
app.listen(3000)