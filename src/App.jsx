import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
