const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
    const search = "ab";
    const products = await Product.find({ price: { $gt: 30 } })
        .sort("price")
        .select("name price")
        .limit(10);
    res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query;
    const queryObject = {};
    if (featured) {
        queryObject.featured = featured === "true";
    }
    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: "i" };
    }

    // filtering is only for numbers - price, rating
    if (numericFilters) {
        // queryObject.numericFilters = numericFilters;
        const operatorMap = {
            ">": "$gt",
            ">=": "$gte",
            "=": "$eg",
            "<": "$lt",
            "<=": "$lte",
        };

        /* regex theory with practice
            https://regexlearn.com/
            https://regexone.com/
        */
        const regEx = /\b(<|<=|=|>|>=)\b/g;
        let filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
        );

        const options = ["price", "rating"];
        filters = filters.split(",").forEach((item) => {
            const [field, operator, value] = item.split("-");
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) };
            }
        });
    }
    // console.log(queryObject);

    let result = Product.find(queryObject);

    /*
    How can this work? Isn’t Product.find asynchronous? The reason it works is that Product.find doesn’t return a Promise. It returns something that works like a Promise, but has extended capabilities. This is called a “then-able”. In this case, the thenable allows the search to be further defined. The Product.find call does not immediately send anything to the Mongo database, until await (or .then) is called on the thenable. Only then is the fully qualified search is sent to the database, and the Promise is resolved, and the products found by the search are returne
    */

    // sort result
    if (sort) {
        const sortList = sort.split(",").join(" ");
        result = result.sort(sortList);
    } else {
        result = result.sort("createdAt");
    }

    // display only selected fields
    if (fields) {
        const fieldsList = fields.split(",").join(" ");
        result = result.select(fieldsList);
    }

    // limit (display certain number of items per page)
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    // logic of the skip formula is:
    // suppose 23 items in total
    // let limit=7: 7 items per page
    // then: 7 7 7 2 => 4 pages in total
    // for example: second page
    // then: skip = (2 - 1) * 7 = 1 * 7 = 7 items
    // we'll skip 7 items before second page

    result = result.skip(skip).limit(limit);

    const products = await result;
    res.status(200).json({ products, nbHits: products.length });
};
module.exports = { getAllProducts, getAllProductsStatic };
