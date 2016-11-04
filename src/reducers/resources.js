
export default function (state = [], action) {
  switch (action.type) {
    case 'CREATE_RESOURCE_FULFILLED':
      return [...state, action.payload];
    case 'EDIT':
      let edited = action.payload;
      return state.map((cur) => cur.id === edited.id ? edited : cur);
    case 'DONE':
      return state.filter((cur) => cur.id !== action.payload);
    case 'FETCH_RESOURCES_FULFILLED':
      return action.payload;
    default:
      return state;
  }
}
