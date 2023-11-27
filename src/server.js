const chatRouter = require('./routers/chatRouter')
const { app } = require('./utils/app')
const productRouter = require('./routers/productsRouter')
const viewsRouter = require('./routers/viewsRouter')
const cartRouter = require('./routers/cartRouter')
const cartModel = require('./dao/models/cart.model')
const productModel = require('./dao/models/product.model')

app.use(chatRouter)
app.use('/api/products' ,productRouter)
app.use(viewsRouter)
app.use('/api/cart', cartRouter)

app.get('/healtcheck', (req, res) => {
	return res.json ({
		Status: 'Running',
		date: new Date()
	})
})

app.get('/home', (req, res) => {
    return res.render('home')
})

app.get('/realTimeProducts', (req, res) => {
    return res.render('realtimeproducts')
})

app.get('/products', async (req, res) => {
	const page = req.query.page || 1
	const limit = req.query.limit || 10

	const params = { limit, page }

	if (req.params.sort) {
		params.sort = { username: 1 }
	}

	const products = await productModel.paginate({}, params )
    return res.render('products', { products})
})

app.get('/api/products', (req, res) => {//Devuelve los productos en formato json
	return res.json(productos)
})