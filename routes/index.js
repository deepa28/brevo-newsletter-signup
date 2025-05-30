var express = require('express');
var router = express.Router();
const axios = require('axios');
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/subscribe', async function(req, res, next) {
  const email = req.body.email;
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).send('<h2>Invalid email format. Please enter a valid email address.</h2>');
  }
  try {
    const API_KEY = process.env.BREVO_API_KEY;
    const LIST_ID = process.env.BREVO_LIST_ID;
    await axios.post('https://api.brevo.com/v3/contacts', {
      email: email,
      listIds: [parseInt(LIST_ID)]
    }, {
      headers: {
        'api-key': API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    // Redirect to thank you page on success
    res.redirect('/thankyou.html');
  } catch (error) {
    if (error.response && error.response.data && error.response.data.code === 'duplicate_parameter') {
      const msg = encodeURIComponent('This email is already subscribed to the newsletter.');
      return res.redirect(`/error.html?msg=${msg}`);
    } else if (error.response && error.response.data && error.response.data.message) {
      const msg = encodeURIComponent('Subscription failed: ' + error.response.data.message);
      return res.redirect(`/error.html?msg=${msg}`);
    } else {
      const msg = encodeURIComponent('Subscription failed. Please try again later.');
      return res.redirect(`/error.html?msg=${msg}`);
    }
  }
});

module.exports = router;
