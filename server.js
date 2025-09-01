const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('API do Interakt tá funcionando');
});

app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}`);
});