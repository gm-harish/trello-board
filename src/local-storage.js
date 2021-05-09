export const loadState = () => {
  try {
    const normalizedState = localStorage.getItem('state');
    if (normalizedState === null) {
      return undefined;
    }
    return JSON.parse(normalizedState);
  } catch (err) {
    return undefined;
  }
};

export const savedState = (state) => {
  try {
    const normalizedState = JSON.stringify(state);
    localStorage.setItem('state', normalizedState);
  } catch (err) {
    console.log(err);
  }
};
