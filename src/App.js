import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Projects from './pages/Projects/Projects';
import ProjectDetailPage, { DUBLIN_SHERIFF_DETAIL_PATH } from './pages/Projects/ProjectDetailPage';
import Home2 from './pages/Home/Home2';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home2" element={<Home2 />} />
        <Route path={DUBLIN_SHERIFF_DETAIL_PATH} element={<ProjectDetailPage />} />
        <Route
          path="/projects/dublin-alameda-county-sheriffs-office"
          element={<Navigate to={DUBLIN_SHERIFF_DETAIL_PATH} replace />}
        />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
