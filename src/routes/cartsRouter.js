import  express  from 'express';
import CartManager from '../manager/cartManager.js'


const app = express();
const cartManager = new CartManager();

//crea un nuevo carrito vacío
app.post('/api/carts', async (req, res) => {
    const cart = await cartManager.addCart();
    res.status(201).json({ cart: cart, message: "Nuevo carrito creado" });
})

//Debe listar los productos que pertenecen al carrito
app.get('/api/carts/:cid', async(req, res) => {
    const cid = req.params.cid;
    const products = await cartManager.getProductsInCartById(cid);
    res.status(200).json({ products, message: "Lista de productos en el carrito" });
});

//Debe agregar el producto al carrito indicado
app.post('/api/carts/:cid/product/:pid', async (req, res) => {
    const cid = req.params.cid;
    const pid = parseInt(req.params.pid);
    const quantity = req.body.quantity;

    const carts = await cartManager.addProductInCart(cid, pid, quantity);
    res.status(200).json({ carts, message: "Producto añadido al carrito" });
});

export default app;