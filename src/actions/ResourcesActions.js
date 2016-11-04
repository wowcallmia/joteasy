import axios from 'axios';

export function addRead (data, currTopicId) {
  console.log('currTopicId in Actions: ', currTopicId);
  return {
    type: 'CREATE_RESOURCE',
    payload: axios.post('/api/resources/', data)
                  .then((res) => res.data)
                  .then((newResource) => axios.put(`/api/topics/${currTopicId}/resources/${newResource._id}`))
  };
}

export function editRead (data) {
  return {
    type: 'EDIT',
    payload: data
  };
}

export function doneRead (_id) {
  console.log('_id:', _id);
  return {
    type: 'DELETE_RESOURCE',
    payload: _id
  };
}

export function fetchResources (currTopic) {
  return {
    type: 'FETCH_RESOURCES',
    payload: axios.get(`/api/topics/${currTopic}`)
                  .then((res) => res.data.resources)
  };
}
