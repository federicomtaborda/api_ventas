const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')

const routes = require('./routes/categorias')

const app = express()
app.set('port', process.env.PORT || 9000)
const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'tienda_control'
}

// middlewares -------------------------------------
app.use(myconn(mysql, dbOptions))
app.use(express.json())

// routes -------------------------------------------
app.get('/', (req, res)=>{
    res.send('Welcome to my API')
})
// Rutas
app.use( '/api/productos', require('./routes/productos') );
app.use( '/api/categorias', require('./routes/categorias') );

app.use( '/api/tipocliente', require('./routes/tipocliente') );
app.use( '/api/formaenvio', require('./routes/formaenvio') );
app.use( '/api/formapago', require('./routes/formapago') );

// server running -----------------------------------
app.listen(app.get('port'), ()=>{
    console.log('server running on port', app.get('port'))
})

