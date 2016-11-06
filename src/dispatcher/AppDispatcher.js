import { Dispatcher } from 'flux';
const flux = new Dispatcher();

export function register(callback) {
  return flux.register(callback);
}

export function waitFor(ids) {
  return flux.waitFor(ids);
}


/**
 * Dispatches a single action.
 */
export function dispatch(type, action = {}) {
  if (!type) {
    throw new Error('You forgot to specify type.');
  }
let test;
  flux.dispatch({ type, ...action });
}
/**
 * Dispatches three actions for an async operation represented by promise.
 */
export function dispatchAsync(promise, types, action = {}) {
  const { request, success, failure } = types;

  dispatch(request, action);

  //NB: unable to use Promise.catch() syntax here
  promise.then(
    //dispatches the action for the async-promise-resolved
    //with a hash of the async-promise params and the response body
    (body) => dispatch(success, { ...action, body }),
    (error) => dispatch(failure, { ...action, error })
  )
}
