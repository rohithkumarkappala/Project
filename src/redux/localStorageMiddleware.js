// src/redux/localStorageMiddleware.js
const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  localStorage.setItem('items', JSON.stringify(state.items.items));
  localStorage.setItem('otherCosts', JSON.stringify(state.otherCosts.otherCosts));
  return result;
};

export default localStorageMiddleware;