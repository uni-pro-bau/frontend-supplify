import { useEffect, useState } from 'react';
import { api } from '../api/http.js';

function TestApi() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get('/test')
      .then((res) => {
        setData(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to reach backend.');
      });
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-purple-900">Backend test response</h1>
      {error && <p className="text-sm text-rose-600">{error}</p>}
      <pre className="rounded-2xl bg-gray-900 p-4 text-xs text-gray-100">
        {data ? JSON.stringify(data, null, 2) : 'Loading...'}
      </pre>
    </div>
  );
}

export default TestApi;


