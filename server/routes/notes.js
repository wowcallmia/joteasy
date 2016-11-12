const express = require('express');

const router = express.Router();

const Note = require('../models/Note');
const Resource = require('../models/Resource');

router.route('/')
  .get((req, res) => {
    Note.find({})
    .populate('resources')
    .then(note => res.send(note))
    .catch(err => res.status(400).send(err));
  })
  .post((req, res) => {
    Note.create(req.body)
    .then(note => res.send(note))
    .catch(err => res.status(400).send(err));
  });

router.route('/addToResource/:resourceId')
  .post((req, res) => {
    let noteRef;
    Note.create(req.body)
    .then(note => {
      noteRef = note;
      return Resource.findById(req.params.resourceId)
    })
    .then(resource => {
      resource.notes.push(noteRef._id);
      return resource.save();
    })
    .then(() => res.send(noteRef))
    .catch(err => res.status(400).send(err));
  });

router.route('/:id')
  .get((req, res) => {
    Note.findById(req.params.id)
    .populate('resources')
    .then(note => res.send(note))
    .catch(err => res.status(400).send(err));
  })
  .put((req, res) => {
    Note.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((note) => {
      note.lastUpdated = Date.now();
      return note.save();
    })
    .then(note => res.send(note))
    .catch(err => res.status(400).send(err));
  })
  .delete((req, res) => {
    Note.findByIdAndRemove(req.params.id)
    .then(note => res.send(note))
    .catch(err => res.status(400).send(err));
  });

module.exports = router;
