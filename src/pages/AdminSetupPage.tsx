import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Lock, AlertCircle } from 'lucide-react';

export function AdminSetupPage() {
  const [email, setEmail] = useState('admin@belarus-tourism.com');
  const [password, setPassword] = useState('AdminBelarusTourism2024');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [setupPassword, setSetupPassword] = useState('');
  const [showSetup, setShowSetup] = useState(false);

  const SETUP_KEY = 'setup123';

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (setupPassword !== SETUP_KEY) {
      setError('Неверный код доступа');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: 'admin',
          },
        },
      });

      if (signUpError) throw signUpError;

      if (data.user) {
        setSuccess(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка создания админа');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Админ создан!</h2>
          <div className="bg-green-50 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-700 mb-2">
              <strong>Email:</strong> {email}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Пароль:</strong> {password}
            </p>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Сохраните эти учетные данные в безопасном месте. Перейдите на страницу /admin для входа.
          </p>
          <button
            onClick={() => (window.location.href = '/admin')}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Перейти в админ-панель
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <Lock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">Инициализация администратора</h1>
          <p className="text-gray-600 mt-2 text-sm">Создание первого аккаунта администратора</p>
        </div>

        {!showSetup ? (
          <button
            onClick={() => setShowSetup(true)}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Начать создание админа
          </button>
        ) : (
          <form onSubmit={handleCreateAdmin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email администратора
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Код доступа <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={setupPassword}
                onChange={(e) => setSetupPassword(e.target.value)}
                placeholder="Введите код"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Требуется для создания администратора</p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-800 p-3 rounded-lg text-sm flex items-start gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 font-medium"
            >
              {loading ? 'Создание...' : 'Создать администратора'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
