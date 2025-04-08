import  express  from 'express';
import ProductManager from '../manager/productsManager.js'

const app = express();
const productManager = new ProductManager();

// listar todos los productos.
app.get('/api/products', async (req, res) => {
  const products = await productManager.getAllProducts();
  res.json({ products: products, message: "Lista de productos" });
});

// trae solo el producto con el id proporcionado.
app.get('/api/products/:pid', async (req, res) => {
  const product = await productManager.getAProductById(req.params.pid);
  if (product) {
      res.json({ product: product, message: "Producto encontrado" });
  } else {
      res.status(404).json({ message: "Producto no encontrado" });
  }
});

//agrega un nuevo producto
app.post('/api/products', async (req, res) => {
  const { title, description, code, price, status, stock, category, thumbnails } = req.body;
  const newProduct = await productManager.createProduct({ title, description, code, price, status, stock, category, thumbnails });
  res.status(201).json({ product: newProduct, message: "Nuevo producto creado" });
});

//actualiza un producto
app.put('/api/products/:id', async (req, res) => {
  const productId = parseInt(req.params.id, 10); 
  const updateData = req.body;
  const updatedProduct = await productManager.updateProductById(productId, updateData);
  if (updatedProduct) {
      res.status(200).json({ updatedProduct: updatedProduct, message: "Producto actualizado" });
  } else {
      res.status(404).json({ message: "Producto no encontrado" });
  }
});

//elimina el producto con el pid indicado
app.delete('/api/products/:id', async (req, res) => {
  const productId = parseInt(req.params.id, 10); 
  const products = await productManager.deleteProductById(productId);
  if (products) {
      res.status(200).json({ products: products, message: "Producto eliminado" });
  } else {
      res.status(404).json({ message: "Producto no encontrado" });
  }
});

export default app;