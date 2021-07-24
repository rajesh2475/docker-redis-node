const express = require('express')
const app = express()
const port = 3000
const schema = "http"
const domain = "localhost"
const bodyParser = require('body-parser')
app.use(bodyParser.json());
const redis = require('redis');


const client = redis.createClient({
    host: 'redis-server',
    port: 6379,
  });

var jsonParser = bodyParser.json({ type: 'application/*+json' })


app.get("/", (req, res)=>{
    client.get("username", function (error, value) { res.send("Hello "+value) })
    
})


app.post('/user', jsonParser, function (req, res) {
    client.set("username", req.body.username, redis.print);
    res.send('welcome, ' + req.body.username)
  })

app.listen(port, () => {
    console.log(`Lesioning at : ${schema}://${domain}:${port}`)
})