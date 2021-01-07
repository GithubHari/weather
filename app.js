//jshint esversion:6

const express = require('express');
const https = require('https');
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));


app.get('/', function(req, res){
  res.sendFile(__dirname+"/index.html")
})
app.post('/', function(req, res) {
  const city = req.body.cityName
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=ab50950960cdd1e6fdc53ae13bf7df8c"


  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on('data', function(data) {


      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const img = weatherData.weather[0].icon;
      const correspondingImage = "http://openweathermap.org/img/wn/"+img+"@2x.png"


      res.write("<h1>The temperature at " +city+ " is "+ Math.round(temp-273) + " degree celcius</h1>")
      res.write("<img src = "+correspondingImage+">")
      res.write("<h2>Description of the weather: "+ description + " <h2>")


    });


  });

});

app.listen(3000, function() {
  console.log("running weather app");
});
