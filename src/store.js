
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
function loadState() {
        try {
            let serializedState = localStorage.getItem("Contacts");

            if (serializedState === null) {
                return [];
            }

            return JSON.parse(serializedState);
        }
        catch (err) {
            return [];
        }
}
function saveState(state) {
        try {
            let serializedState = JSON.stringify(state);
            localStorage.setItem("Contacts", serializedState);

        }
        catch (err) {
        }
}
const store = createStore(rootReducer, loadState());
store.subscribe(() => {
    //this is just a function that saves state to localStorage
    saveState(store.getState());
}); 
export {
  store
}
