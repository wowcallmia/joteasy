export function addRead (data) {
  return {
    type: 'CREATE',
    payload: data
  };
}

export function editRead (data) {
  return {
    type: 'EDIT',
    payload: data
  };
}

export function doneRead (id) {
  console.log('id:', id);
  return {
    type: 'DONE',
    payload: id
  };
}
