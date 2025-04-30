import fs from "fs";

class CartManager{
    constructor(pathFile) {
        this.pathFile = pathFile;
    }


    addCart = async() => {
        try{
            const fileData = await fs.promises.readFile(this.pathFile, 'utf-8');
            const carts = JSON.parse(fileData);

            const newId = carts.length > 0 ? carts[carts.length -1].id + 1 : 1;

            const newCart ={
                id: newId,
                products: []
            };
            carts.push(newCart);
            await fs.promises.writeFile(this.pathFile, JSON.stringify(carts, null, 2), 'utf-8' );
            return carts;
        } catch (error) {
            throw n
        }
    }

    getCartById = async(idCart) => {
        try{
            const fileData = await fs.promises.readFile(this.pathFile, 'utf-8');
            const carts = JSON.parse(fileData);

            const cart = carts.find(cart => cart.id === parseInt(idCart));
            
            if (!cart) throw new Error (`Carrito con id: ${idCart} no encontrado`);

            return cart.products;
        } catch (error) {
            throw new Error(`Error al obtener el carrito: ${error.message}`);
        }
    }

    addProductInCartById = async(idCart, product) => {
        try{
            const fileData= await fs.promises.readFile(this.pathFile, 'utf-8');
            const carts = JSON.parse(fileData);

            const cart = carts.find(cart => cart.id === parseInd(idCart));
                if(!cart) throw new Error(`Carrito con id: ${idCart} no encontrado`);
                
                cart.products.push(product);
                await fs.promises.writeFile(this.pathFile, JSON.stringify(carts, null, 2))

                return cart;
        } catch (error){
                throw new Error(`Error al añadir productos al carrito: ${error.message}`);
        }
    }
}

export default CartManager;