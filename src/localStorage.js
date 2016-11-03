export function loadState () {
  try {
    let serializedState = localStorage.getItem('reading');
    if (!serializedState) throw new Error();
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

export function saveState (state) {
  let serializedState = JSON.stringify(state);
  localStorage.setItem('reading', serializedState);
}
