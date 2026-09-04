import { createBrowserHistory } from 'history';

// Для локального сервера — '/', для GitHub Pages — имя репозитория
const basename = process.env.NODE_ENV === 'production' ? '/Six-Cities-3' : '/';

// В history v5 параметры window и basename передаются внутри объекта
const browserHistory = createBrowserHistory({ window, basename });

export default browserHistory;
