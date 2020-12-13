const { items, users } = require('../models');

module.exports = {
  items: {
    get: function (req, res) {
      items.findAll({
        attribute: ["title", "description", "price", "descriptionUrl", "imageUrl"],
        order: [['id', 'desc']]
      }).then((data, err) => {
        if (err) {
          return res.send(err);
        }
        res.json(data);
      });
    },

    post: async function (req, res) {
      const { title, description, price, descriptionUrl, imageUrl } = req.body;

      // let itemId = await items.findOne({
      //   attribute: ["title"],
      //   where: { title: title }
      // }).then(result => result.dataValues.id)

      items
        .create({
         title,
         description,
         price,
         descriptionUrl,
         imageUrl
        })
        .then((data, err) => {
          if (err) {
            return res.send(err);
          }
          res.sendStatus(201);
        });
    }
  },

  users: {
    get: function (req, res) {
      users.findAll({
        attribute: ["id", "email"],
        include: [{
          model: items,
          required: false,
          attribute: ["id"]
        }],
        order: [['id', 'desc']]
      })
      .then((data, err) => {
        if (err) {
          return res.send(err);
        }
        res.json(data);
      });
    },
    post: function (req, res) {
      const { email, password, phone } = req.body;
      users
        .create({
          email,
          password,
          phone
        })
        .then((data, err) => {
          if (err) {
            return res.send(err);
          }
          res.sendStatus(201);
        });
    }
  }
};
