const axios = require('axios');
const express = require("express");

const app = express();

const prefix = "Fun thing to do: "

const randomItem = (items) => items[Math.floor(Math.random()*items.length)];

const generateFunThing = async () => {
  const data = await axios
    .get(process.env.GOOGLE_SHEET_ENDPOINT)
    .then(response => {
      return response.data.list
    })
    .catch(error => console.log(error));
  
  if(data){
    const funThing = prefix + randomItem(data).item;

    return funThing
  }
  
  return "Go to the park of summat m8"
}

app.get("/", (req, res) => {
  res.send(generateFunThing());
});

app.listen(5000, () => {
  console.log("Running on port 5000.");
});

// Export the Express API
module.exports = app;