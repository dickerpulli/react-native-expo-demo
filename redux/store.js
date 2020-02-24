import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './rootReducer';
import { persistStore, persistReducer } from 'redux-persist';
import { createNetworkMiddleware, offlineActionTypes } from 'react-native-offline';
import storage from 'redux-persist/lib/storage'; // defaults to AsyncStorage
import config from '../config';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const stateTransformer = (state) => {
  return JSON.stringify(state, (key, value) => {
    if (value
      && typeof value === 'string'
      && value.length > 64) {
      return value.substring(0, 64) + '...';
    }
    return value;
  }, 2);
};

const logger = createLogger({
  predicate: (getState, action) => false, // can be used to log only certain actions or nothing
  stateTransformer
});

const networkMiddleware = createNetworkMiddleware();
export function configureStore(rehydratedCallback) {
  var store;
  if (__DEV__) {
    store = createStore(persistedReducer, applyMiddleware(networkMiddleware, thunk, logger));
  } else {
    store = createStore(persistedReducer, applyMiddleware(networkMiddleware, thunk));
  }
  persistStore(
    store,
    {},
    () => {
      // After rehydration completes, we detect initial connection
      isNetworkConnected().then(isConnected => {
        console.log('isNetworkConnected: ' + isConnected);
        store.dispatch({
          type: offlineActionTypes.CONNECTION_CHANGE,
          payload: isConnected,
        });
      });
    },
  );
  return store;
}

function isNetworkConnected() {
  return new Promise(resolve => {
    fetch(config.url, {
      method: 'HEAD',
      timeout: 10000,
    }).then(() => {
      resolve(true);
    }).catch((e) => {
      resolve(false);
    });
  });
}
