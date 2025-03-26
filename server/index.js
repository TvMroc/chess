const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;
app.use(cors());

const COC_API_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjE0NWRkNDQxLTRmZWUtNGI2My1iZTdiLTBiODc0ODUyODRkZiIsImlhdCI6MTc0MTY5MDI5Miwic3ViIjoiZGV2ZWxvcGVyL2QzZjg1NzcwLTk1ZWItZmZhYS0zMTI5LTZiMDdjZGI0MjIyZCIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjE5NS4xNjkuMTUzLjE1NyJdLCJ0eXBlIjoiY2xpZW50In1dfQ.ECIdNrBTTLmaRUYOz01vXHaVMH5kJLXXnkI0T7YgX0aKVb9BBZrVDDLT7X1nnodWZZ8yRkphGyQ1z_1WENkasA"  ;

app.use('/v1', async (req, res) => {
  try {
    const cocApiUrl = `https://api.clashofclans.com/v1${req.path}${req.query ? '?' + URLSearchParams(req.query).toString() : ''}`;
    const response = await axios({
      method: req.method,
      url: cocApiUrl,
      headers: {
        "Authorization": `Bearer ${COC_API_TOKEN}`,
        'Accept': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Full error:', error);
    
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data
    });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
