// Imports: Dependencies
import { combineReducers } from 'redux';
// Imports: Reducers
import listReducer from './listReducer';
import { reducer as reduxFormReducer } from 'redux-form';
// Redux: Root Reducer
const rootReducer = combineReducers({
  list: listReducer,
  form: reduxFormReducer,
});
// Exports
export default rootReducer;