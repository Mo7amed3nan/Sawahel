import React from 'react';
import { Routes, Route } from 'react-router';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import DoctorsCreatePage from './features/doctors/pages/DoctorsCreatePage';
import DoctorsListPage from './features/doctors/pages/DoctorsListPage';
import DoctorsDetailsPage from './features/doctors/pages/DoctorsDetailsPage';
import DoctorsEditPage from './features/doctors/pages/DoctorsEditPage';
import MainLayout from './components/layout/MainLayout';
import About from './pages/About';

const App = () => {
  return (
    <div data-theme="aqua" className="min-h-screen">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/doctors/create" element={<DoctorsCreatePage />} />
          <Route path="/doctors" element={<DoctorsListPage />} />
          <Route path="/doctors/:id" element={<DoctorsDetailsPage />} />
          <Route path="/doctors/:id/edit" element={<DoctorsEditPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
