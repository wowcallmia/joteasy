import axios from 'axios';

export function addTopic (data) {
  return {
    type: 'TOPIC_ADD',
    payload: axios.post('/api/topics/', data)
                  .then((res) => res.data)
  };
}

export function deleteTopic (id) {
  return {
    type: 'TOPIC_DELETE',
    payload: axios.delete(`/api/topics/${id}`)
                  .then((res) => res.data)
  };
}

export function editTopic (data) {
  return {
    type: 'TOPIC_EDIT',
    payload: axios.put(`/api/topics/${data._id}`, data)
                  .then((res) => res.data)
  };
}

export function fetchTopics () {
  return {
    type: 'FETCH_TOPICS',
    payload: axios.get('/api/topics/')
                  .then((res) => res.data)
  };
}

export function setCurrentTopic (topicId) {
  return {
    type: 'SET_CURRENT_TOPIC',
    payload: topicId
  };
}
