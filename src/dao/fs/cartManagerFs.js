const fs = require('fs')

class cartManagerFs  {
    constructor (path) {
        this.path = path
        console.log("Ruta del cart.json:", path); // Agregar esta línea para imprimir la ruta
    }

    async getCart () {
        try {
            const cartString = await fs.promises.readFile(this.path, 'utf-8')
                const carts = JSON.parse(cartString)
                console.log(carts, 'Archivo obtenido satisfactoriamente')
                return carts
        } catch (error) { console.log('Error al leer el archivo', error )
            return []
        }
    }

    async getCartById (id) {
        const carts = await this.getCart();
        const existCart = carts.find(cart => cart.id === id);
        if (!existCart) {
            const error = 'Error al obtener el producto'
            return error
        }
        return existCart
      }

async addCart() {
    const cart = await this.getCart();

    const newCart = {
        id: cart.length + 1,
        products: [], //Se crea un carrito nuevo con un array vacío.
    };

    cart.push(newCart);

    try {
        await fs.promises.writeFile(this.path, JSON.stringify(cart, null, 2), 'utf-8');
        console.log("Carrito agregado satisfactoriamente");
    } catch (err) {
        console.log("Error al agregar el carrito:", err);
        throw err;
    }

    return newCart;
}

//Busco que el producto exista
async getExistProduct(pdId) {
const listProduct = await fs.promises.readFile('./entrega/products.json', 'utf-8')
    try {
        return JSON.parse(listProduct)
    } catch(e) {
        throw e
    }
}

async updateCart(id, actualizo) {
    const cart = await this.getCart();
    const products = await this.getExistProduct()
    try {
        // Busco si el carrito existe.
        const cartExistIndex = cart.findIndex(c => c.id === id);
        if (cartExistIndex === -1) {
            console.log("Cart not found");
            return { error: 'Cart not found' }; // Si no existe
        }
        // Obtener el carrito existente
        const cartExist = cart[cartExistIndex];
        console.log("Found cart:", cartExist);

        // Si existe el carrito, busco si el producto a agregar existe
        const existProduct = products.findIndex((p) => p.id === actualizo)
        if ( existProduct === -1 ) {
            const newProduct = {
                productId: productId,
                quantity: actualizo.quantity
            }
            cartExist.products.push(newProduct)
            console.log("Se ha agregado un nuevo producto al carrito: ", newProduct)
        } else {
            cartExist.products[existProduct].quantity += actualizo.quantity
            console.log("Updated existing product:", cartExist.products[existProduct]);
        }
        
        // Guardo el carrito actualizado en el archivo
        await this.writeProductsCartToFile(cart);
        console.log("Cart updated:", cartExist);

        return "Producto actualizado correctamente";
    } catch (error) { 
        console.error("Internal server error:", error);
        return { error: 'Internal server error' };
    }
}


    async getCartProductById(productId) {
        const cart = await this.getCart();
        const product = cart.products.find(p => p.productId === productId);
        if (!product) {
            return { error: 'Cart Product not found' };
        }
        return product;
    }

    async writeProductsCartToFile(cart) {
        try {
            const pString = JSON.stringify(cart, null, 2);
            await fs.promises.writeFile(this.path, pString);
        } catch (err) {
            throw err;
        } 
}

}

module.exports = cartManagerFs