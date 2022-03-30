import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import './App.css';
import { Empty } from './pages/Empty';
import { Page1 } from './pages/page1';
import { Page2 } from './pages/page2';

function App() {
  return (
    <BrowserRouter basename='/app3'>
      <Routes>
        <Route path='page1' element={<Page1 />} />
        <Route path='page2' element={<Page2 />} />
        <Route path='' element={<Navigate to="page1" />} />
        <Route path='*' element={<Empty />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
