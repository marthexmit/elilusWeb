const Category = require('../models/Category');
const Product = require('../models/Product');
const Favorite = require('../models/Favorite');

const jwt_decode = require('jwt-decode');

module.exports = {
    listAll: async function (req, res) {
        const productss = await Product.findAll({
            attributes: { 
                exclude: ['createdAt', 'updatedAt']}, 
                include: [{model: Category,
                        as: 'category',
                        attributes: ['description']}]
            });
            const products = JSON.parse(JSON.stringify(productss)); 
            ///Tentativa para verificar quais produtos estao favoritados
            const token = req.header('authorization-token');
            if(token!='null' && token!=null){
                const userId = jwt_decode( req.header('authorization-token'));

                products.forEach(async product => {
                    product.fav=false;
                    const selectFavorite =  await Favorite.findOne({where: {id_product: product.id, id_user: userId.userId}});
                    if(selectFavorite)
                        product.fav = true;
                });
            }
        setTimeout(function teste () {
                return res.json(products);
        }, 500);   
    },

}