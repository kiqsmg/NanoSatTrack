import Product from "../models/Product";
import ProductStat from "../models/ProductStat";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        const productsWithStats = await Promise.all(
            product.map(async (product) => {
                const stat = await ProductStat.find({
                    productId: product._id
                })
                return {
                    ...product._doc,
                    stat,
                }
            })
        )

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
