import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '../App/App';
import NotExistPage from '../NotExistPage/NotExistPage';

const AppRouter = () => {
    return <Router basename="">
        <Routes>
            <Route key='/' path='/' element={<App />} />
            <Route key='/:id_agent' path='/:id_agent' element={<App />} />
            <Route key='*' path='*' element={<NotExistPage />} />
        </Routes>
    </Router>
};

export default AppRouter;
