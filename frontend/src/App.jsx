import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Import các trang
import ServiceListPage from './pages/ServiceListPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ServiceCreatePage from './pages/ServiceCreatePage';
import ServiceEditPage from './pages/ServiceEditPage';
import NoPage from './pages/NoPage';

// Component kiểm soát quyền truy cập
const ProtectedRoute = ({ element, requiredRole }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (requiredRole && (!user || !user.roles.includes(requiredRole))) {
    return <Navigate to="/services" />;
  }
  
  return element;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/services" />} />
          <Route path="/services" element={<ServiceListPage />} />
          <Route path="/services/:id" element={<ServiceDetailPage />} />
          <Route 
            path="/services/create" 
            element={<ProtectedRoute element={<ServiceCreatePage />} requiredRole="staff" />}
          />
          <Route 
            path="/services/:id/edit" 
            element={<ProtectedRoute element={<ServiceEditPage />} requiredRole="staff" />}
          />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
