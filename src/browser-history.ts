import { createBrowserHistory } from 'history';

// В history v5 параметры window и basename передаются внутри объекта
// В версии 5.x createBrowserHistory вызывается без параметров
const browserHistory = createBrowserHistory();

export default browserHistory;
