const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

const generateBaseUrl = (apiKey) =>
  `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get('/',(req,res) => {
    res.send('welcome to amazon scrapper api');
});

// GET Product Details

app.get('/product/:productId', async (req, res) => {
    const {productId} = req.params;
    const { apiKey } = req.query

    try {
        const response = await request(
          `${generateBaseUrl(apiKey)}&url=https://www.amazon.in/dp/${productId}`
        );
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

// GET Product Reviews

app.get('/product/:productId/reviews', async (req, res) => {
  const { productId } = req.params
  const { apiKey } = req.query
  try {
    const response = await request(
      `${generateBaseUrl(
        apiKey
      )}&url=https://www.amazon.com/product-reviews/${productId}`
    )
    res.json(JSON.parse(response))
  } catch (error) {
    res.json(error)
  }
}) 

// GET search results

app.get('/search/:searchQuery', async (req, res) => {
    const {searchQuery} = req.params;
    const { apiKey } = req.query

  try {
    const response = await request(
      `${generateBaseUrl(apiKey)}&url=https://www.amazon.com/s?k=${searchQuery}`
    )
    res.json(JSON.parse(response))
  } catch (error) {
    res.json(error)
  }
})

// GET bestsellers results

app.get('/bestsellers/:bestsellersQuery', async (req, res) => {
    const {bestsellersQuery} = req.params;
    const { apiKey } = req.query

  try {
    const response = await request(
      `${baseUrl}&url=https://www.amazon.com/gp/bestsellers/${bestsellersQuery}`
    )
    res.json(JSON.parse(response))
  } catch (error) {
    res.json(error)
  }
})

app.listen(PORT,() => {
    console.log("server is running on port "+PORT);
});