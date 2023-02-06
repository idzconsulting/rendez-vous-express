import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles.css';
import 'antd/dist/reset.css'
import AppRouter from './components/AppRouter/AppRouter';
import {ConfigProvider} from 'antd';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <ConfigProvider
        theme={{
            token: {
                colorPrimary: '#52c41a',
            },
        }}>
        <AppRouter/>
    </ConfigProvider>
);

