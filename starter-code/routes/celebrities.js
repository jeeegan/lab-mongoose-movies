const express = require('express');
const router  = express.Router();

const Celebrity = require('../models/celebrity');

router.get('/', (req, res, next) => {
  Celebrity.find()
    .then(celebs => {
      res.render('celebrities/index', {celebs})
    })
    .catch(e => console.log(`Error retreiving celebrities: ${e}`))
});

router.get('/new', (req, res, next) => {
  res.render('celebrities/new');
});

router.post('/:id', (req, res, next) => {
  const {name, occupation, catchphrase} = req.body;
  Celebrity.findByIdAndUpdate(req.params.id, {$set: {name, occupation, catchphrase}})
    .then(celeb => {
      res.redirect('/celebrities');
    })
    .catch(e => console.log(`Error updating celebrity: ${e}`))
});

router.post('/', (req, res, next) => {
  const {name, occupation, catchphrase} = req.body;
  const newCelebrity = new Celebrity({name, occupation, catchphrase});
  newCelebrity.save()
    .then(celeb => {
      res.redirect('/celebrities');
    })
    .catch(e => console.log(`Error saving new celebrity: ${e}`))
});

router.post('/:id/delete', (req, res, next) => {
  Celebrity.findByIdAndRemove(req.params.id)
    .then(celeb => {
      res.redirect('/celebrities');
    })
    .catch(e => console.log(`Error deleting celebrity: ${e}`))
});

router.get('/:id/edit', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then(celeb => {
      res.render('celebrities/edit', {celeb})
    })
    .catch(e => console.log(`Error retreiving celebrity for edit: ${e}`))
});

router.get('/:id', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then(celeb => {
      res.render('celebrities/show', {celeb})
    })
    .catch(e => {
      res.redirect('celebrities/new');
      console.log(`Error finding celebrity: ${e}`)
    })
});

module.exports = router;