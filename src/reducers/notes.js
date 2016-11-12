
export default function (state = [], action) {
  if (action.error) {
    return state;
  }

  switch (action.type) {
    case 'ADD_NOTE_FULFILLED':
      return [... state, action.payload];
    case 'DELETE_NOTE_FULFILLED':
      return state.filter((cur) => cur._id !== action.payload._id);
    case 'EDIT_NOTE_FULFILLED':
      return state.map((cur) => cur._id === action.payload._id ? action.payload : cur);
    case 'FETCH_NOTES_FULFILLED':
      return action.payload;
    default:
      return state;
  }
}
