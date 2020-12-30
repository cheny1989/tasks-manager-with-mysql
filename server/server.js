const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const wsHandler = require('./utils/webSockets');

const app = express()
const server = require('http').createServer(app);
wsHandler.initialize(server);

app.use(cors());
app.use(morgan('tiny'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
	secret: "lkdnklsndflksandfa",
	resave: true,
	saveUninitialized: true
}));

app.use('/api', require('./apiRouter'));

const port = 8080;
server.listen(port, () => console.log(`Server is running on port ${port}`))
