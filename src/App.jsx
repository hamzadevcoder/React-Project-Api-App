import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FacebookDataProvider } from './context/FacebookDataContext';
import Layout from './components/Layout/Layout';
import LoginPage from './pages/auth/LoginPage';
import VerifyEmailPage from './pages/auth/VerifyEmailPage';
import FacebookCallbackPage from './pages/auth/FacebookCallbackPage';

import UserDashboard from './pages/UserDashboard';
import ScopePage from './pages/ScopePage';
import NotFound from './pages/NotFound';
import OverviewPage from './pages/docs/OverviewPage';
import StatusPage from './pages/docs/StatusPage';
import GetStartedPage from './pages/docs/GetStartedPage';
import BatchRequestsPage from './pages/docs/BatchRequestsPage';
import DebugRequestsPage from './pages/docs/DebugRequestsPage';
import HandleErrorsPage from './pages/docs/HandleErrorsPage';
import FieldExpansionPage from './pages/docs/FieldExpansionPage';
import SecureRequestsPage from './pages/docs/SecureRequestsPage';
import UploadPage from './pages/docs/UploadPage';
import ChangelogPage from './pages/docs/ChangelogPage';

// Guard: redirect to login if not authenticated
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, authReady } = useAuth();
  if (!authReady) {
    return <div className="min-h-screen bg-[#F0F2F5] dark:bg-dark-bg" />;
  }
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public: login & OAuth callbacks */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/auth/facebook/callback" element={<FacebookCallbackPage />} />

      {/* All protected routes live inside Layout (sidebar visible) */}
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<OverviewPage />} />
        <Route path="status" element={<StatusPage />} />
        <Route path="get-started" element={<GetStartedPage />} />
        <Route path="batch-requests" element={<BatchRequestsPage />} />
        <Route path="debug-requests" element={<DebugRequestsPage />} />
        <Route path="handle-errors" element={<HandleErrorsPage />} />
        <Route path="field-expansion" element={<FieldExpansionPage />} />
        <Route path="secure-requests" element={<SecureRequestsPage />} />
        <Route path="upload" element={<UploadPage />} />
        <Route path="changelog" element={<ChangelogPage />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="scope/:scopeId" element={<ScopePage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <FacebookDataProvider>
        <Router>
          <AppRoutes />
        </Router>
      </FacebookDataProvider>
    </AuthProvider>
  );
}

export default App;
