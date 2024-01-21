import { Middleware } from '@reduxjs/toolkit';

const logger: Middleware = (store) => (next) => (action) => {
  console.log('State before:', store.getState());
  console.log('Action:', action);
  const result = next(action);
  console.log('State after:', store.getState());

  return result;
};

export default logger;
