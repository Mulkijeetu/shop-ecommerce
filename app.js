const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()
const app = express()
const path = require('path');
    // Middleware
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const cors = require('cors')

// Imports routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product');
const braintreeRoutes = require('./routes/braintree');
const orderRoutes = require('./routes/order')

//middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors());


//routes middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', braintreeRoutes);
app.use('/api', orderRoutes);

// db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('DB Connected'));

    if(process.env.NODE_ENV==='production'){
       app.use(express.static(path.join(__dirname,'/client/build')))
       
       app.get('*',(req,res)=>{

        res.sendFile(path.join(__dirname,'client','build','index.html'));
        
       })
    } else{
        app.get('/',(req,res)=>{
         res.send("Api running");
        })
    }

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})