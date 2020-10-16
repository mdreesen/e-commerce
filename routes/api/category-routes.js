const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', (req, res) => {
    // find all categories
    Category.findAll()
        .then(dbCategoryData => res.json(dbCategoryData))
        .catch(err => res.json(err))

    // be sure to include its associated Products

});

router.get('/:id', (req, res) => {
    // find one category by its `id` value
    Category.findOne({
            where: {
                id: req.param.id
            },
            include: {
                model: Product,
                attributes: ['id', 'product_name', 'price', 'stock']
            }
        })
        // be sure to include its associated Products
        .then(dbCategoryData => {
            if (!dbCategoryData) {
                res.status(404).json({ message: 'There are no categories listed' })
                return;
            }
            res.json(dbCategoryData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
});

router.post('/', (req, res) => {
    // create a new category
    Category.create({
            id: req.body.id
        })
        .then(dbCategoryData => req.json(dbCategoryData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.put('/:id', (req, res) => {
    // update a category by its `id` value
    Category.update({

    })
});

router.delete('/:id', (req, res) => {
    // delete a category by its `id` value
});

module.exports = router;