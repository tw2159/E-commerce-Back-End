const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Find all tags
router.get('/', (req, res) => {
  Tag.findAll({
    attributes: ["id", "tag_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
        through: ProductTag,
        as: "products"
      }
    ]
  })
  .then(data => res.json(data))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

// Find a single tag based on its `id`
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
        through: ProductTag,
        as: "products"
      }
    ]
  })
  .then(data => {
    if(!data) {
      res.status(404).json({ message: "Sorry, no tag has been found with this ID!" });
      return;
    }
    res.json(data);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

// Create a new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(data => res.json(data))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

// Update a tag's name based on its `id`
router.put('/:id', (req, res) => {
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    }
  })
  .then(data => {
    if(!data) {
      res.status(404).json({ message: "Sorry, no tag has been found with this ID!" });
      return;
    }
    res.json(data);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

// Delete a tag based on its `id`
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(data => {
    if(!data) {
      res.status(404).json({ message: "Sorry, no tag has been found with this ID!" });
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
