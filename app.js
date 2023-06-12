const fs = require('fs');
const path = require('path');
const cors = require('cors');
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cors());

app.use('/assets', express.static('Public/Assets'));
app.set('views', path.join(__dirname, 'Public/Views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

const PORT = 3023;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//Routers
fs.promises.readdir(path.join(__dirname, './src/Routers'))
  .then(files => {
    files.forEach(file => {
      if (file.split('.')[1] === 'js') {
        let router = require(`./src/Routers/${file}`);
        app.use(router);
      }
    });
  });