import express from "express";
import productsRouter from "./routes/productRouter.js";
import ProductManager from "./manager/ProductManager.js";
import cartRouter from "./routes/cartRouter.js";
import viewsRouter from "./routes/viewsRouter.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import http from "html";


const app = express();
const server = http.createServer(app);
const io = new Server(server);

//handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//puerto del servidor
const PORT = 8080;
//habilitamos poder recibir json
app.use(express.json());
//habilitamos la carpeta public
app.use(express.static("public"));

//Endpoints
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use("/", viewsRouter);

//websockets
const productManager = new ProductManager("./products.json");
io.on("connection", (socket)=> {
  console.log("Nuevo usuario conectado");

  socket.on("newProduct", async(productData)=> {
    try {
      const newProduct = await productManager.addProduct(productData);

      io.emit("productAdded", newProduct);
    } catch (error) {
      console.error("Error al añadir el producto");
    }
  });

  //eliminar producctos
  socket.on("deleteProduct", async(id) => {  
    try {  
      await productManager.deleteProduct(id);  
      io.emit("productDeleted", id);  
    } catch (error) {  
      console.error("Error al eliminar el producto");  
    }  
  });  
});

server.listen(PORT, ()=> {
    console.log("servidor iniciado en puerto 8080");
});
