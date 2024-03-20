import express from 'express';
import {createProduct,
    getAllProducts,
    getProductById,deleteProduct,getTopProducts} from "../controller/productController.js";
    import {protect} from "../controller/userController.js"

const router = express.Router();
router.route("/api/v1/products").post(protect,createProduct);
router.route("/").get(getAllProducts);
router.route("/api/v1/products/:id").get(getProductById);
router.route("/api/v1/productsDelete/:id").delete(protect,deleteProduct);
router.route("/top").get(getTopProducts);


export default router;