import fs from "fs";

class ProductManager {
    constructor() {
        this.path = './src/products.json';
    }

getAllProducts = async () => {
    const productsJson = await fs.promises.readFile(this.path, 'utf-8');
    return JSON.parse(productsJson);
}

getProductById = async (pid) => {
    const productsJson = await fs.promises.readFile(this.path, 'utf-8');
    const products = JSON.parse(productsJson);
    return products.find((product) => product.id === parseInt(pid));
}

createProduct = async (product) => {
    const productsJson = await fs.promises.readFile(this.path, 'utf-8');
    const products = JSON.parse(productsJson);

    const id = this.generateNewId(products);
    product.id = id;
    products.push(product);

    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');
    return product;
}

updateProductById = async (id, updateData) => {
    const productsJson = await fs.promises.readFile(this.path, 'utf-8');
    const products = JSON.parse(productsJson);
    const product = products.find((product) => product.id === id);
    if (product) {
        Object.assign(product, updateData);
        
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');
        return product;
    }
    return null;
}

deleteProductById = async (id) => {
    const productsJson = await fs.promises.readFile(this.path, 'utf-8');
    const products = JSON.parse(productsJson);
    const updatedProducts = products.filter((product) => product.id !== id);
   
    await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts, null, 2), 'utf-8');
    return updatedProducts;
}

generateNewId = (products) => {
    if (products.length > 0) {
        return products[products.length - 1].id + 1;
    } else {
        return 1;
    }
}
};

export default ProductManager;