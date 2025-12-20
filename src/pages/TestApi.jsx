import { useEffect, useState } from 'react';
import { api } from '../api/http.js';

function TestApi() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle');
  const [testResults, setTestResults] = useState([]);

  async function testConnection() {
    setLoading(true);
    setError(null);
    setData(null);
    setStatus('testing');
    setTestResults([]);
    
    const results = [];
    
    // Test 1: Check login endpoint (OPTIONS to verify it exists)
    try {
      results.push({ name: 'Login Endpoint Check', endpoint: '/Auth/login', status: 'testing' });
      // Try OPTIONS to check CORS and endpoint existence
      await api.request({ method: 'OPTIONS', url: '/Auth/login' });
      results[results.length - 1] = { name: 'Login Endpoint Check', endpoint: '/Auth/login', status: 'success', note: 'Endpoint accessible' };
      setStatus('success');
    } catch (err) {
      console.error('Login endpoint test error:', err);
      // 405 means endpoint exists but OPTIONS not allowed (that's ok - endpoint exists!)
      if (err.response?.status === 405) {
        results[results.length - 1] = { name: 'Login Endpoint Check', endpoint: '/Auth/login', status: 'success', note: '✓ Endpoint exists and is accessible' };
        setStatus('success');
      } else if (err.response?.status === 404) {
        results[results.length - 1] = { name: 'Login Endpoint Check', endpoint: '/Auth/login', status: 'error', error: 'Endpoint not found (404)' };
        setStatus('error');
        setError('Login endpoint not found');
      } else if (err.response?.status === 500) {
        const errorData = err.response?.data;
        const errorMsg = typeof errorData === 'string' ? errorData : errorData?.message || errorData?.title || 'Server error';
        results[results.length - 1] = { name: 'Login Endpoint Check', endpoint: '/Auth/login', status: 'warning', note: `Endpoint exists but server error: ${errorMsg}` };
        setStatus('warning');
      } else if (err.code === 'ERR_NETWORK') {
        results[results.length - 1] = { name: 'Login Endpoint Check', endpoint: '/Auth/login', status: 'error', error: 'Network error - cannot reach backend' };
        setStatus('error');
        setError('Cannot reach backend');
      } else {
        results[results.length - 1] = { name: 'Login Endpoint Check', endpoint: '/Auth/login', status: 'warning', note: `Status: ${err.response?.status || 'unknown'}` };
        setStatus('warning');
      }
    }
    
    setTestResults(results);
    setLoading(false);
  }

  useEffect(() => {
    testConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-purple-900">Backend Connection Test</h1>
        <button
          onClick={testConnection}
          disabled={loading}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          {loading ? 'Testing...' : 'Test Again'}
        </button>
      </div>

      <div className="rounded-xl bg-gray-100 p-4">
        <p className="text-sm font-medium text-gray-700 mb-1">Testing endpoint:</p>
        <p className="text-sm text-gray-600 font-mono">{api.defaults.baseURL}/test</p>
      </div>
      
      {loading && (
        <div className="flex items-center gap-2 text-gray-600">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-purple-600 border-t-transparent"></div>
          <p className="text-sm">Connecting to backend...</p>
        </div>
      )}
      
      {status === 'error' && error && (
        <div className="rounded-2xl bg-rose-50 border border-rose-200 p-4">
          <p className="text-sm font-semibold text-rose-700 mb-1">✗ Connection Failed</p>
          <p className="text-sm text-rose-600">{error}</p>
          <p className="text-xs text-rose-500 mt-2">Check browser console (F12) for more details</p>
        </div>
      )}
      
      {testResults.length > 0 && (
        <div className="space-y-2">
          {testResults.map((result, idx) => (
            <div key={idx} className={`rounded-xl p-3 border ${
              result.status === 'success' ? 'bg-green-50 border-green-200' :
              result.status === 'error' ? 'bg-rose-50 border-rose-200' :
              result.status === 'warning' ? 'bg-yellow-50 border-yellow-200' :
              'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">{result.name}</p>
                  <p className="text-xs text-gray-500 font-mono">{api.defaults.baseURL}{result.endpoint}</p>
                </div>
                <div className="text-sm">
                  {result.status === 'success' && <span className="text-green-600">✓</span>}
                  {result.status === 'error' && <span className="text-rose-600">✗</span>}
                  {result.status === 'warning' && <span className="text-yellow-600">⚠</span>}
                  {result.status === 'testing' && <span className="text-gray-400">...</span>}
                </div>
              </div>
              {result.error && <p className="text-xs text-rose-600 mt-1">{result.error}</p>}
              {result.note && <p className="text-xs text-gray-600 mt-1">{result.note}</p>}
              {result.details && (
                <div className="mt-2 text-xs text-gray-600">
                  <p>Code: {result.details.code || 'N/A'}</p>
                  <p>Status: {result.details.status || 'N/A'}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {status === 'success' && data && (
        <div className="space-y-2">
          <div className="rounded-2xl bg-green-50 border border-green-200 p-4">
            <p className="text-sm font-semibold text-green-700">✓ Connection Successful!</p>
            <p className="text-xs text-green-600 mt-1">Backend is responding correctly</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Response Data:</p>
            <pre className="rounded-2xl bg-gray-900 p-4 text-xs text-gray-100 overflow-auto max-h-96">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {status === 'idle' && !loading && !error && !data && (
        <p className="text-sm text-gray-500">Click "Test Again" to test the connection</p>
      )}
    </div>
  );
}

export default TestApi;


