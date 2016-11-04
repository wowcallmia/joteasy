const express = require('express');

const router = express.Router();

const Topic = require('../models/Topic');
const Resource = require('../models/Resource');

router.route('/')
  .get((req, res) => {
    Topic.find({})
    .populate('resources')
    .then((topic) => res.send(topic))
    .catch((err) => res.status(400).send(err));
  })
  .post((req, res) => {
    Topic.create(req.body)
    .then((topic) => res.send(topic))
    .catch(console.error);
  });

router.route('/:id')
  .get((req, res) => {
    Topic.findById(req.params.id)
    .populate('resources')
    .then((topic) => res.send(topic))
    .catch((err) => res.status(400).send(err));
  })
  .put((req, res) => {
    Topic.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((topic) => {
      topic.lastUpdated = Date.now();
      return topic.save();
    })
    .then((topic) => res.send(topic))
    .catch((err) => res.status(400).send(err));
  })
  .delete((req, res) => {
    Topic.findByIdAndRemove(req.params.id)
    .then((topic) => res.send(topic))
    .catch((err) => res.status(400).send(err));
  });

router.route('/:id/resources/:resourceId')
  .put((req, res) => {
    Topic.findById(req.params.id)
    .populate('resources')
    .then((topic) => {
      let rId = req.params.resourceId;
      console.log('topic: ', topic);
      let newResources = { resources: topic.resources };
      if (topic.resources.every((r) => r._id.toString() !== rId.toString())) {
        newResources = {
          resources: [...topic.resources, rId],
          lastUpdated: Date.now()
        };
      }

      return Topic.findByIdAndUpdate(req.params.id, { $set: newResources }, { new: true }).populate('resources');

    })
    .then((topic) => res.send(topic))
    .catch((err) => res.status(400).send(err));
  })
  .delete((req, res) => {
    Resource.findByIdAndRemove(req.params.resourceId)
      .then(() => Topic.findById(req.params.id).populate('resources'))
      .then(topic => {
        topic.resources = topic.resources.filter(r => r != req.params.resourceId);
        topic.lastUpdated = Date.now();
        return topic.save();
      })
      .then((topic) => res.send(topic))
      .catch((err) => res.status(400).send(err));
  });

module.exports = router;
