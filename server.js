const chatRouter = require('./routers/chatRouter')
const { app } = require('./utils/app')
const productRouter = require('./routers/productsRouter')
const viewsRouter = require('./routers/viewsRouter')
const cartRouter = require('./routers/cartRouter')

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

app.get('/products', (req, res) => {
    return res.render('products')
})

app.get('/api/products', (req, res) => {//Devuelve los productos en formato json
	return res.json(productos)
})
