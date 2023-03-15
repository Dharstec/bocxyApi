// const express = require('express')
// const bodyParser = require('body-parser')
// const app = express()
// const PORT = 3000
// // Setup a webhook route
// var axios = require('axios');
// var qs = require('qs');
// var data = qs.stringify({
//     "token": "bl1akacg7e24qdth",
//     "to": "+919940537528",
//     "body": "your product is in the cart click and go to buy"
// });

// var config = {
//   method: 'post',
//   url: 'https://api.ultramsg.com/instance33802/messages/chat',
//   headers: {  
//     'Content-Type': 'application/x-www-form-urlencoded'
//   },
//   data : data
// };

// axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error);
// });
// app.use(bodyParser.json())
// app.post('/ultramsgwebhook', (req, res) => {
//   console.log(req.body) // print all response

//   //messageFrom=req.body['data']['from'] // sender number
//   //messageMsg=req.body['data']['body'] // Message text
//   res.status(200).end()
// })

// app.use(bodyParser.json())
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}🚀 `))


{/* <html>
  <body>
    {{customerName}}<br>
    {{customerPhoneNumber}} <br>
    {{customerEmailId}}  <br>
    ProductIds :{{productids}}<br>
    {{doorNoAndStreet}}<br>
    {{city}}<br>
    {{state}}<br>
    {{pincode}}<br>
    {{landmark}}<br>
    {{country}}
  </body>
</html> */}