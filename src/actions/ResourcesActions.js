import axios from 'axios';

export function addRead (data, currTopicId) {

  console.log('currTopicId in Actions: ', currTopicId);


  return {
    type: 'CREATE_RESOURCE',
    payload: axios.post('/api/resources/', data)
                  .then((res) => res.data)
                  .then((newResource) => axios.put(`/api/topics/${currTopicId}/resources/${newResource._id}`))
                  .then((res) => res.data.resources.pop())
  };
}

export function editSource (data) {
  return {
    type: 'EDIT_RESOURCE',
    payload: axios.put(`/api/resources/${data._id}`, data)
                  .then((res) => res.data)

  };
}

export function deleteResource (_id) {
  console.log('_id:', _id);
  return {
    type: 'DELETE_RESOURCE',
    payload: axios.delete(`/api/resources/${_id}`)
                  .then((res) => res.data)
  };
}

export function fetchResources (currTopic) {
  return {
    type: 'FETCH_RESOURCES',
    payload: axios.get(`/api/topics/${currTopic}`)
                  .then((res) => res.data.resources)
  };
}

export function setCurrentResource (currResource) {
  console.log('currResource in actions: ', currResource);
  return {
    type: 'SET_CURRENT_RESOURCE',
    payload: currResource
  };
}
