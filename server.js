let express = require("express");
let dbCon = require("./db/connection");
var cors = require('cors');
let app = express();

//var app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
const bodyParser = require('body-parser');
const projectRouter = require('./routes/project');
const providingRouter = require('./routes/providing');
const res = require("express/lib/response");

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use('/api/project', projectRouter);
app.use('/api/providing', providingRouter);
app.use(cors());

//Test
app.get("/add/:n1/:n2", function (request, response){
  //response.sendStatus(200);
  const first = parseInt(request.params.n1);
  const second = parseInt(request.params.n2);
  const sum = first + second || null;

  console.log(sum);
  if (sum == null) {
    response.status(300).json({error: "Invalid inputs, should be 2 numbers"});
  } 
  else {
    response.json({result : sum});
  }
})

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

dbCon.connectToDatabase(function (err) {

  if (err) {
    console.error(err);
    process.exit();
  }
  http.listen(port,() => {
    console.log("Listening on port ", port);
  });
});

//this is only needed for Cloud foundry 
require("cf-deployment-tracker-client").track();
