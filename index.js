const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queriesPizza')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extend: true
    })
)

app.get('/',(request,response)=>{
    response.json({info: 'Node.js, Express, Postgres, y REST API'})
})

app.listen(port, ()=>{
    console.log(`App corriendo en puerto ${port}.`)
})

app.get('/pizza', db.getPizza)
app.get('/pizza/:id', db.getPizzaById)
app.post('/pizza', db.crearPizza)
app.put('/pizza/:id', db.actualizarPizza)
app.delete('/pizza/:id', db.eliminarPizza)

