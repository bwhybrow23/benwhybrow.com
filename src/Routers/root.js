const express = require('express');
const router = express.Router();
const path = require('path');

//Main page
router.get('/', (req, res) => {
  try {
    res.render('index.ejs');
  } catch (error) {
    res.status(500).send({
      error: true,
      data: error.message
    });
  }
});

//CV
router.get('/cv', (req, res) => {
  try {
    res.render('cv.ejs');
  } catch (error) {
    res.status(500).send({
      error: true,
      data: error.message
    });
  }
});

//Download CV
router.get('/cv/download', (req, res) => {
  const filePath = path.join(__dirname, '../..', 'Public', 'Assets', 'CV.pdf');
  res.download(filePath, 'Ben Whybrow CV.pdf', (err) => {
    if (err) {
      console.error('File download error: ', err);
      res.status(500).send('Error downloading file');
    }
  })
});

module.exports = router;