const express= require('express');
const bodyParser = require('body-parser');
const session= require('express-session');
require('dotenv').config();
const flash = require('connect-flash');
var MongoDBStore = require('connect-mongodb-session')(session);
const connectDB = require('./mongoDB');
const app= express();
require('ejs');
// Connect to MongoDB
connectDB();
const port= process.env.PORT || 8080;


app.use(bodyParser.urlencoded({extended: false}));
app.use(flash());
app.use(bodyParser.json());
var store = new MongoDBStore({
	uri: process.env.MONGO
  });
app.use(session({
	key: 'traffic_iccc',
	secret: 'secret_iccc',
	store: store,
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false }
}));
// Middleware to handle errors
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something went wrong!');
  });

app.use(express.static('public'));

app.set('view engine', 'ejs');

require('./module/router').routes(app);

const server = app.listen(port, () => {
    console.log(`listensing on port ${port}`);
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.error('Unhandled Rejection:', err);
});

