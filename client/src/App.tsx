import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./layout/ProtectedRoute";
import UserRegisterPage from "./pages/UserRegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout showHero>{<HomePage />}</Layout>} />
      <Route path="/login" element={<Layout showHero={false}>{<LoginPage />}</Layout>} />
      <Route path="/register" element={<Layout showHero={false}>{<UserRegisterPage />}</Layout>} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route element={<ProtectedRoute/>}>
        
      </Route>
    </Routes>
  );
}

export default App;
