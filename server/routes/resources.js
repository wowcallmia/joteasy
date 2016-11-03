const express = require('express');

const router = express.Router();

const Resource = require('../models/Resource');

router.route('/')
  .get((req, res) => {
    Resource.find({})
    .populate('notes')
    .then(r => res.send(r))
    .catch(err => res.status(400).send(err));
  })
  .post((req, res) => {
    Resource.create(req.body)
    .then(r => res.send(r))
    .catch(console.error);
  });

router.route('/:id')
  .get((req, res) => {
    Resource.findById(req.params.id)
    .populate('notes')
    .then(r => res.send(r))
    .catch(err => res.status(400).send(err));
  })
  .put((req, res) => {
    Resource.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then(r => res.send(r))
    .catch(err => res.status(400).send(err));
  })
  .delete((req, res) => {
    Resource.findByIdAndRemove(req.params.id)
    .then(r => res.send(r))
    .catch(err => res.status(400).send(err));
  });

router.route('/:id/notes/:noteId')
  .put((req, res) => {
    Resource.findById(req.params.id)
    .populate('notes')
    .then(resource => {
      let rId = req.params.noteId;
      let newNotes = { notes: resource.notes };
      if (resource.notes.every(r => r._id.toString() !== rId.toString())) {
        newNotes = { notes: [...resource.notes, rId] };
      }
      return Resource.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true })
    })
    .then(resource => res.send(resource))
    .catch(err => res.status(400).send(err));
  })
  .delete((req, res) => {
    Resource.findById(req.params.id)

      .then(resource => {
        resource.notes = resource.notes.filter(r => r != req.params.noteId);
        return resource.save();
      })
      .then(resource => res.send(resource))
      .catch(err => res.status(400).send(err));
  })

module.exports = router;
