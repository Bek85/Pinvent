import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from 'pinvent/pages/Home/Home';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  );
}
