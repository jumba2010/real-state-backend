const dotenv = require('dotenv');
const express = require('express');
const user = require('./routes/user');
const authenticate = require('./routes/middleware/auth');
const fileuploader = require('./routes/middleware/fileuploader');
const auth = require('./routes/auth');
const profile = require('./routes/profile');
const agent = require('./routes/agent');
const property = require('./routes/property');
const favoriteRouter = require('./routes/favorite');
const propertyOwner = require('./routes/propertyowner');
const path = require('path');
const smsntification = require('./routes/api/smsnotification');
const logininfo = require('./routes/logininfo');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const cors = require('cors');
var router = express.Router();
const app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

router.post('/', async (req,res)=>{
console.log(req.body.sucursal);

await sincronizeData(io,req.body.sucursal);


});

router.get('/count/:sucursalId', async (req,res)=>{
  const amount = await Student.count({
  where:{ sucursalId:req.params.sucursalId,syncStatus:{
  [Op.in]: [0,1]
  }}
  });
  res.json({ amount});
  });


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/public/files', express.static(__dirname + '/public/files'));
app.use(express.static(__dirname + '/public'));
app.use(authenticate);
app.use('/api/profile', profile);
app.use('/api/sucursal', sucursal);
app.use('/api/upload', fileuploader);
app.use('/api/agent', agent);
app.use('/api/property', property);
app.use('/api/property-owner', propertyOwner);
app.use('/api/smsntification', smsntification);
app.use('/api/logininfo', logininfo);
app.use('/favorite', favoriteRouter);

dotenv.config();

app.use(logger('dev'));
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

app.use(
  bodyParser.json()
);
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


server.listen(process.env.SERVER_PORT, '127.0.0.1',() => {
  console.log(`server running on port ${process.env.SERVER_PORT}`);

}
) ;



