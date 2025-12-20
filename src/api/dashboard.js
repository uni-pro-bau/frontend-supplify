import { api } from './http.js';

const mockData = {
  kpis: [
    { label: 'Total products', value: '24,581', delta: '+18% vs last week', iconKey: 'boxes', trend: 'up' },
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
  tableRows: [
    // Add simple dates and supplier names so we can demo filtering in the UI
    {
      name: 'A4 Copy Paper',
      category: 'Office supplies',
      qty: 120,
      status: 'Healthy',
      supplierName: 'PaperPlus Wholesale',
      date: '2025-03-01',
    },
    {
      name: 'Blue Ballpoint Pens',
      category: 'Stationery',
      qty: 34,
      status: 'Warning',
      supplierName: 'OfficeOne Supplies',
      date: '2025-03-05',
    },
    {
      name: 'Laser Printer Toner',
      category: 'Printing',
      qty: 8,
      status: 'Critical',
      supplierName: 'PrintPerfect Co.',
      date: '2025-03-10',
    },
    {
      name: 'Shipping Boxes (M)',
      category: 'Packaging',
      qty: 260,
      status: 'Healthy',
      supplierName: 'PackRight Packaging',
      date: '2025-03-15',
    },
  ],
};

export async function fetchDashboardData(filters = {}) {
  try {
    const res = await api.get('/dashboard', { params: filters });
    const base = res.data || {};

    let supplierRows = [];
    try {
      const suppliersRes = await api.get('/suppliers');
      const suppliers = suppliersRes.data || [];
      supplierRows = suppliers.map((s) => ({
        name: s.name,
        category: s.company,
        qty: s.totalProducts ?? '-',
        supplierName: s.name,
        status: s.status || 'Healthy',
        date: s.lastUpdated,
      }));
    } catch {
      // fallback to mock
    }

    return {
      ...mockData,
      ...base,
      tableRows: supplierRows.length > 0 ? supplierRows : base.tableRows || mockData.tableRows,
    };
  } catch (err) {
    console.error(err);

    const { startDate, endDate } = filters;
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const filteredRows = mockData.tableRows.filter((row) => {
        const rowDate = new Date(row.date);
        return rowDate >= start && rowDate <= end;
      });

      return {
        ...mockData,
        tableRows: filteredRows.length > 0 ? filteredRows : mockData.tableRows,
      };
    }

    return mockData;
  }
}

