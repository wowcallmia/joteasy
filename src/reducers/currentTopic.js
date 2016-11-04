
export default function (state = '', action) {
  if (action.error) {
    return state;
  }

  switch (action.type) {
    case 'SET_CURRENT_TOPIC':
      return action.payload;
    default:
      return state;
  }
}
