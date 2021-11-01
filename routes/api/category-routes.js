const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Find all categories
router.get('/', (req, res) => {
  Category.findAll({
    attributes: ["id", "category_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"]
      }
    ]
  })
  .then(data => res.json(data))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

// Find a single category based on its `id`
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: ["id", "category_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"]
      }
    ]
  })
  .then(data => {
    if(!data) {
      res.status(404).json({ message: "Sorry, no category has been found with this ID!" });
      return;
    }
    res.json(data);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

// Create a new category
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then(data => res.json(data))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

// Update a category's name based on its `id`
router.put('/:id', (req, res) => {
  Category.update({
    category_name: req.body.category_name
  },
  {
    where: {
      id: req.params.id
    }
  })
  .then(data => {
    if(!data) {
      res.status(404).json({ message: "Sorry, no category has been found with this ID!" });
      return;
    }
    res.json(data);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

// Delete a category based on its `id`
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(data => {
    if(!data) {
      res.status(404).json({ message: "Sorry, no category has been found with this ID!" });
      return;
    }
    res.json(data);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

module.exports = router;
