import uuid from 'uuid';

export default function (state = [], action) {
  if (action.error) {
    return state;
  }

  switch (action.type) {
    case 'TOPIC_ADD':
      action.payload.id = uuid();
      return [... state, action.payload];
    case 'TOPIC_DELETE':
      return state.filter((cur) => cur.id !== action.payload);
    case 'TOPIC_EDIT':
      return state.map((cur) => cur.id === action.payload.id ? action.payload : cur);
    case 'FETCH_TOPICS_FULFILLED':
      return action.payload;
    default:
      return state;
  }
}
