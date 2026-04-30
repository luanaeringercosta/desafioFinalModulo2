const express = require ('express')
const { criarBanco } = require ('./database')
const { criarTabela } = require ('./database')

const app = express ()
app.use(express.json())
