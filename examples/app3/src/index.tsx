import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { defineApplication } from '../plaform/defineApplication';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Empty } from './pages/Empty';
import { Page1 } from './pages/page1';
import { Page2 } from './pages/page2';


defineApplication('app3', {
  selector: 'app3',
  bootstrap: (app: any, element: any, extra: any) => {
    ReactDOM.render(
      <React.StrictMode>
        <BrowserRouter basename='/app3'>
          <Routes>
            <Route path='page1' element={<Page1 />} />
            <Route path='page2' element={<Page2 />} />
            <Route path='' element={<Navigate to="page1" />} />
            <Route path='*' element={<Empty />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>,
      element
    );
  }
});

// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter basename='/app3'>
//       <Routes>
//         <Route path='page1' element={<Page1 />} />
//         <Route path='page2' element={<Page2 />} />
//         <Route path='' element={<Navigate to="page1" />} />
//         <Route path='*' element={<Empty />} />
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
