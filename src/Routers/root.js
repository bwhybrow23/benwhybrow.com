const express = require('express');
const router = express.Router();

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

module.exports = router;