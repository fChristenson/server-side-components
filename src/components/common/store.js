let state = {};
const callbacks = [];
const reducers = [];

const subscribe = onUpdate => {
  callbacks.push(onUpdate);
};

module.exports.subscribe = subscribe;

const dispatch = action => {
  state = reducers.reduce((state, reducer) => {
    return reducer(state, action);
  }, state);

  callbacks.forEach(fn => {
    fn(state, action);
  });
};

module.exports.dispatch = dispatch;

const addModule = (name, reducer) => {
  state[name] = {};
  reducers.push(reducer);
};

module.exports.addModule = addModule;
