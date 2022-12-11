import express from "express"
import path from 'path'
import cors from 'cors'

const app = express()
const port = process.env.Port || 5001
console.log('hello world as module javascript')

app.use(cors());
app.use(express.json());

let products = [] // TODO connect with mongodb

app.post('/product', (req, res) => {
  const body = req.body;
  if ( //validation
    !body.name
    || !body.price
    || !body.description
  ) {
    res.status(400).send({
      message: 'required parameters missing'
    })
    return
  }
  console.log(body.name)
  console.log(body.price)
  console.log(body.description)

  products.push({
    id: `${newDate().getTime()}`,
    name: body.name,
    price: body.price,
    description: body.description
  })
  res.send({
    message: 'product added successfully'
  })
})

app.get('/products', (req, res) => {
  res.send({
    message: 'all products',
    data: products
  })
})

app.get('/product/id', (req, res) => {
  const id = req.params.id
  let isFound = false
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      res.send({
        message: `get product by id: ${products[i].id} success`,
        data: products[i]
      })
      isFound = true
      break;
    }
  }
  if (isFound === false) {
    res.status(404)
    res.send({
      message: 'product not found'
    })
  } return
})

app.delete('/product/:id', (req, res) => {
  const id = req.params.id
  let isFound = false
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      products.splice(i, 1)
      res.send({
        message: 'product deleted'
      })
      isFound = true
      break;
    }
  }
  if (isFound === false) {
    res.status(404)
    res.send({
      message: 'delete fail: product not found'
    })
  }
})

app.put('/product/:id', (req, res) => {
  const body = req.body;
  const id = req.params.id

  if ( //validation
    !body.name
    || !body.price
    || !body.description
  ) {
    res.status(400).send(
      {message: 'required parameters missing' })
    return
  }
  console.log(body.name)
  console.log(body.price)
  console.log(body.description)

  let isFound = false
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      products[i].name = body.name;
      products[i].price = body.price;
      products[i].description = body.description;

      res.send('product modified')
      isFound = true
      break;
    }
  }
  if (!isFound) {
    res.status(404)
    res.send('Edit fail: product not found')
  }
  res.send({
    message:'Product added'
  })
})

// const __dirname = path.resolve();
// app.use('/', express.static(path.join(__dirname, './web/build')))
// app.use('*', express.static(path.join(__dirname, './web/build')))

//Ip Address From Network properties
//http://192.168.43.166:3000

//cloud link
//https://good-lime-buffalo-gear.cyclic.app
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})