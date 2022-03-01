import React from 'react';
import { render } from 'react-dom'
import rootReducer from './reducers'
import gtag from 'ga-gtag'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';



Object.values = (obj) => Object.keys(obj).map(key => obj[key]);

//ReactDOM.render(<App />, document.getElementById('root'));
function handleFirstTab(e) {
  if (e.keyCode === 9) { // the "I am a keyboard user" key
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
  }
}

gtag('event', `react app version: ${process.env.REACT_APP_VERSION}`, {
  webappversion: `${process.env.REACT_APP_VERSION}`,
})
console.log(`version: ${process.env.REACT_APP_VERSION}`)

window.addEventListener('keydown', handleFirstTab);
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



serviceWorkerRegistration.register();
