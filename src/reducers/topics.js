
export default function (state = [], action) {
  if (action.error) {
    return state;
  }

  switch (action.type) {
    case 'TOPIC_ADD_FULFILLED':
      return [... state, action.payload];
    case 'TOPIC_DELETE_FULFILLED':
      return state.filter((cur) => cur._id !== action.payload._id);
    case 'TOPIC_EDIT_FULFILLED':
      return state.map((cur) => cur._id === action.payload._id ? action.payload : cur);
    case 'FETCH_TOPICS_FULFILLED':
      return action.payload;
    default:
      return state;
  }
}
