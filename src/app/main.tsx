import { configureStore } from '@reduxjs/toolkit';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import saga from 'redux-saga';
import { rootSaga } from '@/sagas/rootSaga';
import App from './App';
import userReducer from './userSlice';
import textsReducer from './textsSlice';
import './i18n';
import './index.css';
import '@fontsource/open-sans/variable.css';
import '@fontsource/open-sans/variable-italic.css';

const sagaMiddleware = saga();

const store = configureStore({
  reducer: { user: userReducer, texts: textsReducer },
  middleware: (defaultMiddleware) =>
    defaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

export type rootState = ReturnType<typeof store.getState>;

sagaMiddleware.run(rootSaga);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
