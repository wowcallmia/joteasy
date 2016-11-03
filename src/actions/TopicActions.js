export function addTopic (data) {
  return {
    type: 'TOPIC_ADD',
    payload: data
  };
}

export function deleteTopic (id) {
  return {
    type: 'TOPIC_DELETE',
    payload: id
  };
}

export function editTopic (data) {
  return {
    type: 'TOPIC_EDIT',
    payload: data
  };
}
