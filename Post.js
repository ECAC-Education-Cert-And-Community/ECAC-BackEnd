const express = require('express');
const app = express();
app.use(express.json());

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

app.listen(8082, () => {
  console.log('Server listening on port 8082');
});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


//TypeError: Do not know how to serialize a BigInt 해결코드
BigInt.prototype.toJSON = function() {       
  return this.toString()
}

