import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './components/store';
import {Provider} from "react-redux"

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log(store.getState());
store.subscribe(()=>{
    console.log("updated",store.getState());
    
})
root.render(
  <Provider store={store}><App /></Provider>
);

