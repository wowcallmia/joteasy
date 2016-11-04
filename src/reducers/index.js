import { combineReducers } from 'redux';
import resources from './resources';
import topics from './topics';
import currentTopic from './currentTopic';
import currentResource from './currentResource';

export default combineReducers({ resources, topics, currentTopic, currentResource });
