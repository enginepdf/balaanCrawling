const { items, users } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs=require('fs');

module.exports = {
  items: {
    get: function (req, res) {
      fs.readFile('./db.txt', 'utf8', function(err, data){
        if(err) console.log(err);
        res.json(data);

      })

      // items.findAll({
      //   attribute: ["title", "description", "price", "descriptionUrl", "imageUrl"],
      //   order: [['id', 'desc']]
      // }).then((data, err) => {
      //   if (err) {
      //     return res.send(err);
      //   }
      //   res.json(data);
      // });
    },

    insert: async function (req, res) {
      
      items.destroy({
        where: {},
        truncate: true
      })
      fs.readFileSync('./db.json', 'utf8', function(err, data){
        for(let i=0; i<data.length ; i++){
          items
          .create({
           title:data[i].title,
           description:data[i].description,
           price:data[i].price,
           descriptionUrl:data[i].descriptionUrl,
           imageUrl:data[i].imageUrl
          })
          .then((data, err) => {
            if (err) {
              return res.send(err);
            }
          });
        }
        res.sendStatus(201);
      })

      
    }
  },

  users: {
    signin: function (req, res) {  
      const { email, password } = req.body
      users.findOne({where: {email : email}})
      .then(user => {
        // console.log(data);
        if(!user){  
          res.status(404);
          res.end('unvalid user');
        } else { 
          bcrypt
          .compare(password, user.password)
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
                console.log('token', token);
                // res.status(200).cookies('token', token);
                res.cookie('token', token);
                
                res.status(200).send('signin succeeded');
                res.redirect('/');
                res.end();
                // res.json({id: data.id, email: data.email});
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
            users.create({email:email, password:hashedPw, phone:phone})
            .then((data) => {
              res.status(201).send('signup completed');
              res.redirect('/');
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
      if(req.headers.cookie){
        res.clearCookie('token',{path:'/'});
        res.status(200).send('signed out');
        // res.redirect('/');
        res.end();
      } else{
        res.status(401).send('login first');
      }
    }
  }
};
