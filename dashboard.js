import { api } from './http.js';

const mockData = {
  kpis: [
    { label: 'Total Stocks', value: '24,581', delta: '+18% vs last week', iconKey: 'boxes', trend: 'up' },
    { label: 'Low stock products', value: '142', delta: '+4 new', iconKey: 'alert', trend: 'down' },
    { label: 'Total inventory value', value: '$1.6M', delta: '+3%', iconKey: 'dollar', trend: 'up' },
    { label: 'Active suppliers', value: '320', delta: '+12 this month', iconKey: 'truck', trend: 'up' },
  ],  
  barSeries: [
    { name: 'Mon', received: 180 },
    { name: 'Tue', received: 260 },
    { name: 'Wed', received: 320 },
    { name: 'Thu', received: 210 },
    { name: 'Fri', received: 380 },
    { name: 'Sat', received: 140 },
    { name: 'Sun', received: 90 },
  ],
  pieSeries: [
    { name: 'In stock', value: 48 },
    { name: 'Reserved', value: 22 },
    { name: 'On order', value: 18 },
    { name: 'Low stock', value: 12 },
  ],
};

export async function fetchDashboardData() {
  try {
    const res = await api.get('https://192.168.56.1:7035/api/Dashboard');
    return res.data;
  } catch (err) {
    console.error(err);
    await new Promise((resolve) => setTimeout(resolve, 400));
    return mockData;
  }
}


