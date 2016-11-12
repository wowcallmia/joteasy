import { combineReducers } from 'redux';
import resources from './resources';
import topics from './topics';
import currentTopic from './currentTopic';
import currentResource from './currentResource';
import notes from './notes';

export default combineReducers({ resources, topics, currentTopic, currentResource, notes });
