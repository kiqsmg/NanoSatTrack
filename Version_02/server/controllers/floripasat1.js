import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Date from "../models/Date.js";
import getCountryIso3 from "country-iso-2-to-3";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        const productsWithStats = await Promise.all(
            products.map(async (product) => {
                const stat = await ProductStat.find({
                    productId: product._id,
                });
                return {
                    ...product._doc,
                    stat,
                };
            })
        );
        
        res.status(200).json(productsWithStats);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getCustomers = async (req, res) => {
    try {
        const customers = await User.find({ role: "user" }).select("-password");
        res.status(200).json(customers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


//Date query
export const getDate = async (req, res) => {  //route handler(fetch date)
    try {
        //sort should look like this: { "field": "userId", "sort": "desc"}
        const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;  //Parsing Request Parameters(extract parameters from the requesr query string)

        //formated sort should look like this {userId: -1}
        const generateSort = () => { //formats the sort to MongoDB sor format
            const sortParsed = JSON.parse(sort);
            const sortFormatted = {
                [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
            };

            return sortFormatted;
        };
        const sortFormatted = Boolean(sort) ? generateSort() : {};

        const date = await Date.find({ //consults the data base using the search criteria and pagination paramters
            $or: [
                { cost: { $regex: new RegExp(search, "i") } },
                { userId: { $regex: new RegExp(search, "i") } },          
            ],
        })
            .sort(sortFormatted)
            .skip(page * pageSize)
            .limit(pageSize);


        const total = await Date.countDocuments ({ //counts the number of documents in the collections based on the search
            name: { $regex: search, $options: "i" },
        });


        res.status(200).json({ //sends response
            date,
            total,
        });
    } catch (error) {  //error handling
        res.status(404).json({ message: error.message});
    }
};


export const getGeography = async (req, res) => {
    try {
        const users = await User.find();

        const mappedLocations = users.reduce((acc, { country }) => {
            const countryISO3 = getCountryIso3(country);
            
            if (!acc[countryISO3]) {
                acc[countryISO3] = 0;
            }
            acc[countryISO3]++;
            return acc;
        }, {});

        const formattedLocations = Object.entries(mappedLocations).map(
            ([country, count]) => {
                return { id: country, value: count }
            }
        );

        res.status(200).json(formattedLocations);
        
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}