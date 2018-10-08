const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb')

const url = 'mongodb://localhost:27017';
const dbName = 'test';

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.get('/', (req, res) => {
  MongoClient.connect(url,{ useNewUrlParser: true }, (err, client) => {
    if(err) throw err
    const db = client.db(dbName)
    db.collection('users').find({}).toArray((err, result) => {
      if(err) throw err
      res.json(result)
      client.close()
    })
  })
})
app.post('/', (req, res) => {
  const { id, name, age } = req.body
  const user = { id: id, name: name, age: age }
  MongoClient.connect(url,{ useNewUrlParser: true }, (err, client) => {
    if(err) throw err
    const db = client.db(dbName)
    db.collection('users').insertOne(user)
    .then(data => res.json(data))
    .catch(err => res.status(500).json({msg: err}))
  })
})

app.listen(3000, () => console.log('This server has been started'))