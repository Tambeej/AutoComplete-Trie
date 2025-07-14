import express from 'express';

const app = express();
const port = 3000;

// GET /message route
app.get('/message', (req, res) => {
  res.send('🤫 The secret message is: "Node.js is awesome!"');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
