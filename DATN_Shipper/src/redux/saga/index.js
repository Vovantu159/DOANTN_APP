import {createSagas} from 'redux-toolkit-saga';
import authSaga from './authenticationSaga';
const rootSaga = createSagas([authSaga]);
export default rootSaga;
