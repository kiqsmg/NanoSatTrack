
import Date from "../models/Date.js";


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
