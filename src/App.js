import React from 'react'

import 'antd/dist/antd.css';

import MainRouter from './router/mainRouter';
import { Provider } from 'react-redux';
import store from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <MainRouter></MainRouter>
    </Provider>
  )
}
