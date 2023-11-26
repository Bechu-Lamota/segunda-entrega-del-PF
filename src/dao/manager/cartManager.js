const cartModel = require('../models/cart.model')

class cartManager {
    constructor() {
        this.model = cartModel
    }
    
    async getCart() {
        try{
            const carts = await this.model.find()
 
            return carts.map(p => p.toObject())
            
         } catch (e) {
             console.log('Error al obtener los carritos', e )
             return []
         }
     }

    async getCartById(cid) {
        try{
            return this.model.findById(cid)
        } catch (e) {
            console.log('Error al obtener el carrito', e )
        }
    }

    async addCart() {
        try{
            return this.model.create({
                products: []
            })
        } catch (e) {
            console.log('Error al obtener el producto', e )
        }
    }

    async updateCart(cid, pid) {
        const cart = await this.getProductById(cid)

        if (!cart) {
            throw new Error('Carrito inexistente')
        }

        const cartUpdate = {
            _id: cart._id,
            products: { products: pid }
        }
        await this.model.updateOne({ _id: cid }, cartUpdate)

        return cartUpdate
    }

    async updateCartProduct(cid, pid, quantity) {
        const cart = await this.getProductById(cid)

        try {
            await this.model.updateOne({ _id: cart._id , 'products.product':pid}, {'products.quantity': quantity})
        } catch (e) {
            throw e
        }
    }

    async getCartProductById() {

    }

    async deleteCart(id) {
        const cart = await this.getCartById(id)

        if (!cart) {
            throw new Error('Carrito inexistente')
        }

        await this.model.deleteOne({ _id: id })
        return true
    }







}

module.exports = cartManager