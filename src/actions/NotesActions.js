import axios from 'axios';
export function addNote (note, id) {
  return {
    type: 'ADD_NOTE',
    payload: axios.post(`/api/notes/addToResource/${id}`, note)
                  .then((res) => {
                  return res.data;
                  })
  };
}

export function editNote (data) {
  return {
    type: 'EDIT_NOTE',
    payload: axios.put(`/api/notes/${data._id}`, data)
                  .then((res) => res.data)

  };
}

export function deleteNote (_id) {
  console.log('_id of note in Actions:', _id);
  return {
    type: 'DELETE_NOTE',
    payload: axios.delete(`/api/notes/${_id}`)
                  .then((res) => res.data)
  };
}

export function fetchNotes (resourceId) {
  console.log('resourceId in actions:', resourceId);
  return {
    type: 'FETCH_NOTES',
    payload: axios.get(`/api/resources/${resourceId}`)
                  .then((res) => {
                    // console.log('res:', res);
                    return res.data.notes})
  }
}
