import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import Home from '../Home/Home';
import NotExistPage from '../NotExistPage/NotExistPage';

const AppRouter = () => {
    return <Router>
        <Routes>
            <Route key='/' path='/' element={<Home/>}/>
            <Route key='*' path='*' element={<NotExistPage/>}/>
        </Routes>
    </Router>
};

export default AppRouter;
