const {Router} = require('express')
const CartManager = require('../dao/manager/cartManager')
const cartRouter = Router()

const cartManager = new CartManager()

cartRouter.get('/', async (req, res) => {
    const carts = await cartManager.getCarts()

    res.json(carts)
})

cartRouter.get('/:cid', async (req, res) => {
    const cid = req.params.cid

    const carts = await cartManager.getCartById(cid)

    res.json(carts)
})

cartRouter.post('/', async (req, res) => {
    const body = req.body

    const cart = await cartManager.addCart(body)

    res.status(201).json(cart)
})

cartRouter.put('/:cid', async (req, res) => {
    const { cid } = req.params
    const body = req.body
    
    const carts = await cartManager.updateCart(cid, body)

    res.json(carts)
})

cartRouter.put('/:cid/products/:pid', async (req, res) => {
    const { cid } = req.params
    const body = req.body
    
    const cart = await cartManager.updateCartProduct(cid, body)

    res.json(cart)
})

cartRouter.delete('/:cid', async (req, res) => {
    const { cid } = req.params

    try {
        const cart = await cartManager.deleteCart(cid)

        res.status(201).json(cart)
    } catch (e) {
        res.status(404).json({
            message: e.message
        })
    }
})

module.exports = cartRouter