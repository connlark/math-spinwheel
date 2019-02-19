import React from 'react';
import { render } from 'react-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import ReactGA from 'react-ga';

function initializeReactGA() {
  ReactGA.initialize('UA-108987250-2');
  ReactGA.pageview('/homepage');
}

//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
const store = createStore(rootReducer, {},  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )


initializeReactGA()
serviceWorker.unregister();
