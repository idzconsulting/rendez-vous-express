import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import App from '../App/App';
import NotExistPage from '../NotExistPage/NotExistPage';

const AppRouter = () => {
    return <Router>
        <Routes>
            <Route key='/' path='/' element={<App/>}/>
            <Route key='*' path='*' element={<NotExistPage/>}/>
        </Routes>
    </Router>
};

export default AppRouter;
