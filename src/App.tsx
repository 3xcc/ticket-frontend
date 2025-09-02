import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ScanPage from "./pages/ScanPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scanPage" element={<ScanPage />} />
      </Routes>
    </Router>
  );
}

export default App;
