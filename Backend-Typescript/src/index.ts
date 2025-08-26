import express from 'express';

const app = express();


app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});

app.get('/hello', (req, res) => {
  res.send('Hello from the hello route');
});

app.use(express.json());

app.get('/test', (req, res) => {
  res.send('from the test route')
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

