import uuid from 'uuid';

export default function (state = [], action) {
  switch (action.type) {
    case 'CREATE':
      action.payload.id = uuid();
      return [...state, action.payload];
    case 'EDIT':
      let edited = action.payload;
      return state.map((cur) => cur.id === edited.id ? edited : cur);
    case 'DONE':
      return state.filter((cur) => cur.id !== action.payload);
    default:
      return state;
  }
}
