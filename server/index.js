require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI;

// Připojení k MongoDB
const client = new MongoClient(mongoUri, { useUnifiedTopology: true });

// Servírování statických souborů (frontend)
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// API endpoint – získání seznamu "příspěvků" z MongoDB
app.get('/api/posts', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('webnews');  // Příklad: Můžete použít webnews / cokoliv
    const collection = db.collection('posts');  // Případně "idnes" nebo jinou
    const posts = await collection.find({}).limit(20).toArray();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Chyba při načítání dat z databáze' });
  }
});

// Pro jakýkoli jiný route vrátíme index.html (abychom mohli např. řešit SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server běží na portu ${port} a připojuje se k: ${mongoUri}`);
});
