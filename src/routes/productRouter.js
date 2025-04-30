import  express  from 'express';
import ProductManager from '../manager/ProductManager.js'

const productsRouter = express.Router();

const productManager = new ProductManager("./src/data/products.json");

// listar todos los productos.
productsRouter.get('/', async (req, res) => {
  try {
    const data = await productManager.getProducts();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

// trae solo el producto con el id proporcionado.
productsRouter.get(':pid', async (req, res) => {
  try {
    const products = await productManager.getAProductById(req.params.pid);
    res.status(200).send(products);
      } catch (error) {
        res.status(404).send({ message: error.message });
    }
});

//agrega un nuevo producto
productsRouter.post("/", async (req, res) => {
  try {
    const newProduct = req.body;
    const product = await productManager.addProduct(newProduct);
    res.status(201).send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//actualiza un producto
productsRouter.put('/:pid', async (req, res) => {
  try {
    const updatedProduct = req.body;
    const products = await productManager.setProductById(req.params.pid, updatedProduct);
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//elimina el producto con el pid indicado
productsRouter.delete("/:pid", async (req, res) => {
  try {
    await productManager.deleteProductById(req.params.pid);
    res.status(200).send({ message: `Producto con id: ${req.params.pid} eliminado` });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

export default productsRouter;