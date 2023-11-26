const {Router} = require('express')
const ProductManager = require('../dao/manager/productManager')
const productsViewsRouter = Router()

const productManager = new ProductManager()


productsViewsRouter.get('/products', async (req, res) => {
    const products = await productManager.getProducts()

    res.render('products', {products})
})

module.exports = productsViewsRouter