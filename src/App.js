import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home/Home';
import Projects from './pages/Projects/Projects';
import ProjectDetailPage, { LIBERATION_PARK_DETAIL_PATH } from './pages/Projects/ProjectDetailPage';
import Home2 from './pages/Home/Home2';
import Studio from './pages/Studio/Studio';
import Expertise from './pages/Expertise/Expertise';
import Contact from './pages/Contact/Contact';
import Insights from './pages/Insights/Insights';
import InsightDetail from './pages/Insights/InsightDetail';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home2" element={<Home2 />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/expertise" element={<Expertise />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/insights/:slug" element={<InsightDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/projects/dublin-alameda-county-sheriffs-office"
          element={<Navigate to={LIBERATION_PARK_DETAIL_PATH} replace />}
        />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
