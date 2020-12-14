const { items, users } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

    // post: async function (req, res) {
    //   const { title, description, price, descriptionUrl, imageUrl } = req.body;

    //   // let itemId = await items.findOne({
    //   //   attribute: ["title"],
    //   //   where: { title: title }
    //   // }).then(result => result.dataValues.id)

    //   items
    //     .create({
    //      title,
    //      description,
    //      price,
    //      descriptionUrl,
    //      imageUrl
    //     })
    //     .then((data, err) => {
    //       if (err) {
    //         return res.send(err);
    //       }
    //       res.sendStatus(201);
    //     });
    // }
  },

  users: {
    signin: function (req, res) {  
      const { email, password } = req.body
      users.findOne({where: {email : email}})
      .then(data => {
        // console.log(data);
        if(!data){  
          res.status(404);
          res.end('unvalid user');
        } else { 

          bcrypt
          .compare(password, data.dataValues.password)
          .then(matched => {
            if(matched){
            let payload = {
              email : email
            }
            let secretKey =process.env.SECRET_KEY;
            let options = {
              expiresIn: 300  //유효시간 300초
            }
            jwt.sign(payload, secretKey, options, (err, token) => {
              if(err){
                res.status(500);
                res.end();
              } else {
                console.log('token', token)
                // res.status(200).cookies('token', token);
                res.cookie('token', token)
                res.redirect('/');
                // res.json({id: data.dataValues.id, email: data.dataValues.email});
                res.end();
              }
            })
            // res.status(200).send(data.dataValues);
            // res.end();
          } else { 
            res.status(404);
            res.end('unvalid user');
          }
       })
      }
     })
    },
    
    signup: function (req, res) { // signup
      const { email, password, phone } = req.body;
      
      bcrypt
      .hash(password, 12)
      .then(hashedPw => {
        users.findOne({where: { email: email }})
        .then((data) => {
          if(data){
            res.status(409).send('email already exists');
            res.end();
          } else {
            users.create({email, password:hashedPw, phone})
            .then((data) => {
              res.redirect('/');
              res.status(200).send('signup completed');
              res.end();
            })
            .catch(err => {
              console.log(err);
            });
          }
        });
      });
    },

    signout: function (req, res) {
      res.clearCookie('token',{path: '/'});
      res.redirect('/');
      res.end();
    }
  }
};
