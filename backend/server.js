const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// 获取所有 MOD
app.get('/api/mods', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM mods');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 添加新的 MOD
app.post('/api/mods', async (req, res) => {
  const { name, release_date, demo_url, download_url } = req.body;
  try {
    const [result] = await db.query('INSERT INTO mods (name, release_date, demo_url, download_url) VALUES (?, ?, ?, ?)', [name, release_date, demo_url, download_url]);
    res.status(201).json({ id: result.insertId, name, release_date, demo_url, download_url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 删除 MOD
app.delete('/api/mods/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM mods WHERE id = ?', [id]);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
