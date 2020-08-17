const path = require('path')
const express = require('express')
const mongoose = require ('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')

const connectDB = require('./config/db')


// load config 
dotenv.config({path: './config/config.env'})

// passport config
require('./config/passport')(passport)


connectDB()
const app = express();


// body parser
// to accept from data
app.use(express.urlencoded({ extended:false }))
app.use(express.json())

// static folder
app.use(express.static(path.join(__dirname, 'public')))

// loggings
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// handlebar helpers
const { formatDate, stripTags, truncate } = require('./helpers/hbs')



// set engine
// this is the best method for 
// setting handlebars
// version 6.0
const handlebars = exphbs.create({helpers: {
  formatDate,
  stripTags, 
  truncate, 
},defaultLayout:'main', extname:'.hbs'});
app.engine('.hbs',handlebars.engine);
app.set('view engine', '.hbs');


// session midleware

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  //session expires after 3 hours
  cookie: { maxAge: 60 * 1000 * 60 * 3 },
}))




// passport midware
app.use(passport.initialize())
app.use(passport.session())

// routes
app.use('/',require('./routes/index'))

app.use('/auth', require('./routes/auth'))

app.use('/stories', require('./routes/stories'))

const PORT = process.env.PORT || 5000


app.listen(PORT,  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))

