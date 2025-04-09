const Product = require('../models/product');

const sampleData = [
    {
        name: 'Laptop',
        category: 'Electronics',
        price: 999,
        inStock : true,
        tags:['computer','tech']
    },
    {
        name: 'Mobile',
        category: 'Electronics',
        price: 699,
        inStock : true,
        tags:['mobile','tech']
    },
    {
        name: 'Headphones',
        category: 'Electronics',
        price: 199,
        inStock : false,
        tags:['audio','tech']
    },
    {
        name: 'Running shoes',
        category: 'Sports',
        price: 89,
        inStock : true,
        tags:['footwear','tech']
    },
    {
        name: 'Novel',
        category: 'Boks',
        price: 99,
        inStock : true,
        tags:['computer','tech']
    }
];

const insertSampleModel = async(req,res)=>{
    try {
        const result = await Product.insertMany(sampleData);
        res.status(200).json({
            success: true,
            message:`Inserted ${result.length} documents`
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message:'Something went wrong....!!!'
        })
    }
}
const getProductStats = async(req,res)=>{
    try {
        const result = await Product.aggregate([
            {
                $match : {
                    category : 'Electronics',
                    price: {
                        $gte: 100
                    }
                }
            },
            //group docs
            {
                $group :{
                    _id: "$category",
                    avgPrice: {
                        $avg : "$price",
                    },
                    count:{
                        $sum: 1
                    }
                }
            }
        ])
        res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message:'Something went wrong....!!!'
        })
    }
}

const getproductsanalysis = async(req,res)=>{
    try {
        const result = await Product.aggregate([
            {
                $match : {
                    category : 'Electronics'
                }
            },
            //group docs
            {
                $group :{
                    _id: null,
                    avgPrice: {
                        $avg : "$price",
                    },
                    count:{
                        $sum: 1
                    },
                    totalRevenue:{$sum: "$price"},
                    averagePrice: {$avg :"$price"},
                    maxPrice: {$max:"$price"},
                    minPrice: {$min:"$price"} ,
                    //diff: { $subtract: ["$maxPrice", "$minPrice"] }
                   
                }
            },
            {
                $project : {
                    _id: 0
                }
            }
        ])
        res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message:`'Something went wrong....!!!'${error}`
        })
    }
}

module.exports = {insertSampleModel,getProductStats,getproductsanalysis};