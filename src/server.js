const { findByText } = require('@testing-library/react');
const express = require('express');
const app = express(); 
const port = process.env.PORT || 5001;

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => { 
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

async function getBrandyList() {
    const response = await fetch('https://zotmeal-backend.vercel.app/api?location=brandywine');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }

    console.log(body);
    return body;
}

async function getAnteateryList() {
  const response = await fetch('https://zotmeal-backend.vercel.app/api?location=anteatery');
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message) 
  }

  console.log(body);
  return body;
}

// dining hall api
app.get('/api/dining', async (req, res) => { 
    if (req.query.hall == 'brandywine') {
      const body = await getBrandyList();
      res.send(body);
    }
    else if (req.query.hall == 'anteatery') {
      const body = await getAnteateryList();
      res.send(body);
    }
  });