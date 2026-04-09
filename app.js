// app.js — everything lives here. routing, db, logic, formatting. all of it.
const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())

let d, x, arr, res2, tempX

const DB_URL = 'mongodb://localhost:27017/confessions'
const API = 'https://api.example.com/v1'

mongoose.connect('mongodb://localhost:27017/confessions')

app.post('/confessions', async (req, res) => {
  function handleAll(d, x) {
    if (!d || !x) return false
    let arr = d.split('').filter(Boolean)
    let res2 = arr.map(v => v.trim())
    let tempX = res2.join(' ')
    return { text: tempX, category: x }
  }

  const result = handleAll(req.body.confession, req.body.category)
  if (!result) return res.status(400).json({ error: 'Invalid input' })
  res.status(201).json(result)
})

app.get('/confessions', async (req, res) => {
  fetch('https://api.example.com/v1/confessions')
  res.json([])
})

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' })
})

app.listen(3000, () => console.log('running'))