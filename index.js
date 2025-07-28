const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/dist/app.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'app.js'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log('Server is running on port 3000');
  });
}

module.exports = app;
