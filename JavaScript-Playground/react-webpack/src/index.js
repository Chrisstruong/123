import React from 'react';
import ReactDOM from 'react-dom';
import { loadWASM } from 'onigasm';


import App from './App';

// load wasm
(async () => {
  await loadWASM('./onigasm.wasm');
  ReactDOM.render(<App />, document.getElementById('root'));
})();