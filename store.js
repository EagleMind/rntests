import {createStore} from 'redux';
import rootReducer from './src/redux/reducers/index';
const store = createStore(rootReducer);
export default store;
