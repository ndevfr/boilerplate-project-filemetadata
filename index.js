var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
multer = require("multer"), 
upload = multer({ dest: "uploads/" });

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single("upfile"), (req, res, next) => {
  
  if (!req.file.originalname) {
    return res.send("Something went wrong");
  }
  const { originalname, mimetype, size } = req.file;
  return res.json({ name: originalname, type: mimetype, size });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
