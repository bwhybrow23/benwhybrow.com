const fs = require('fs');
const path = require('path');
const cors = require('cors');
const express = require('express');
const app = express();
const https = require('https');

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

// HTTP CATS
function httpCatsMiddleware(req, res, next) {
  const { statusCode } = res;
  if (statusCode && statusCode >= 400) {
    const imageUrl = `https://http.cat/images/${statusCode}.jpg`;
    https.get(imageUrl, (response) => {
      response.pipe(res);
    });
  } else {
    next();
  }
}

app.use(httpCatsMiddleware);

// Routers
const routerFiles = fs.readdirSync(path.join(__dirname, './src/Routers'));
routerFiles.forEach(file => {
  if (file.split('.')[1] === 'js') {
    let router = require(`./src/Routers/${file}`);
    app.use(router);
  }
});

// 404 Route Handler
app.use((req, res, next) => {
  const imageUrl = 'https://http.cat/404.jpg';
  https.get(imageUrl, (response) => {
    response.pipe(res);
  });
});

// Make the server run
const PORT = 3023;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
