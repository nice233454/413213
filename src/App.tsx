import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { TripProvider } from './contexts/TripContext';
import { MainPage } from './pages/MainPage';
import { AdminPage } from './pages/AdminPage';
import { AdminLogin } from './components/AdminLogin';
import { AdminSetupPage } from './pages/AdminSetupPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      (async () => {
        await checkAuth();
      })();
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
    setLoading(false);
  };

  const pathname = window.location.pathname;
  const isAdminRoute = pathname === '/admin';
  const isAdminSetupRoute = pathname === '/admin-setup';

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (isAdminSetupRoute) {
    return <AdminSetupPage />;
  }

  if (isAdminRoute) {
    if (!isAuthenticated) {
      return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
    }
    return <AdminPage />;
  }

  return (
    <TripProvider>
      <MainPage />
    </TripProvider>
  );
}

export default App;
