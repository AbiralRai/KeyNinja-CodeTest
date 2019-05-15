const express = require('express');
const customerRouter = express.Router();
const Customer = require('../models/customer.model');
const stringCapitalizeName = require('string-capitalize-name');

//Get one customer from db
customerRouter.get('/:id', (req, res) => {
    Customer.findById(req.params.id)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(500).json({ success: false, msg: `Something went wrong. ${err}` })
        })
})

// Get list of all customers from db
customerRouter.get('/', (req, res) => {
    Customer.find({})
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(500).json({ success: false, msg: `Something went wrong. ${err}` })
        });
});

// Add a customer to the db
customerRouter.post('/', (req, res, err) => {

    let newCustomer = new Customer({
        firstname: sanitizeFirstname(req.body.firstname),
        lastname: sanitizeLastname(req.body.lastname),
        email: sanitizeEmail(req.body.email)
    });
    newCustomer
      .save()
      .then(result => {
        res.json({
          success: true,
          msg: `Successfully added!`,
          result: {
            _id: result._id,
            firstname: result.firstname,
            lastname: result.lastname,
            email: result.email
          }
        });
      })
      .catch(err => {
        if (err.errors) {
          if (err.errors.firstname) {
            res
              .status(400)
              .json({ success: false, msg: err.errors.firstname.message });
            return;
          }
          if (err.errors.lastname) {
            res
              .status(400)
              .json({ success: false, msg: err.errors.lastname.message });
            return;
          }
          if (err.errors.email) {
            res
              .status(400)
              .json({ success: false, msg: err.errors.email.message });
            return;
          }
          // Show failed if all else fails for some reasons
          res
            .status(500)
            .json({ success: false, msg: `Something went wrong. ${err}` });
        }
      });
})

//Update a customer from the db
customerRouter.put('/:id', (req, res) => {

    let newCustomer = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: sanitizeEmail(req.body.email)
    };
    Customer.findOneAndUpdate({ _id: req.params.id }, newCustomer, { runValidators: true, context: 'query' })
        .then(() => {
            Customer.findOne({ _id: req.params.id })
                .then(result => {
                    res.json({
                        success: true,
                        message: 'Successfully updated!',
                        result: {
                            _id: result._id,
                            firstname: result.firstname,
                            lastname: result.lastname,
                            email: result.email
                        }
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        success: false,
                        msg: `Something went wrong. ${err}`
                    });
                    return;
                });
        })
        .catch(err => {
            if (err.errors) {
                if (err.errors.firstname) {
                    res.status(400).json({
                        success: false,
                        msg: err.errors.firstname.message
                    });
                    return;
                }
                if (err.errors.lastname) {
                    res.status(400).json({
                        success: false,
                        msg: err.errors.lastname.message
                    });
                    return;
                }
                if (err.errors.email) {
                    res.status(400).json({
                        success: false,
                        msg: err.errors.email.message
                    });
                    return;
                }
                // Show failed if all else fails for some reasons
                res.status(500).json({
                    success: false,
                    msg: `Something went wrong. ${err}`
                });
            }
        });
})

//Delete a customer from the db
customerRouter.delete('/:id', (req, res, next) => {

    Customer.findByIdAndRemove(req.params.id)
        .then(result => {
            res.json({
                success: true,
                msg: "It has been deleted",
                result: {
                    _id: result._id,
                    firstname: result.firstname,
                    lastname: result.lastname,
                    email: result.email
                }
            })
        })
        .catch(err => {
            res.status(404).json({
                success: false,
                msg: 'Nothing to delete.'
            });
            res.status(404).json({ success: false, msg: 'Nothing to delete.' });

        })
})

module.exports = customerRouter;

sanitizeFirstname = (firstname) => {
    return stringCapitalizeName(firstname);
}
sanitizeLastname = (lastname) => {
    return stringCapitalizeName(lastname);
}
sanitizeEmail = (email) => {
    return email.toLowerCase();
}