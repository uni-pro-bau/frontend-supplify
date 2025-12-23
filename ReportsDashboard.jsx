import { useEffect, useRef, useState } from 'react';
import { Button } from '../components/ui/button.jsx';
import FilterBar from '../components/FilterBar.jsx';
import KPIBox from '../components/KPIBox.jsx';
import ReportsTable from '../components/ReportsTable.jsx';
import PieChartCard from '../components/PieChartCard.jsx';
import BarChartCard from '../components/BarChartCard.jsx';
import { FileDown, FileText, Boxes, AlertTriangle, DollarSign, Truck } from 'lucide-react';
import { api } from '../api/http.js'; // تأكد من استيراد api هنا بدلاً من fetchDashboardData إذا كنت ستستخدمه للتصدير

const iconMap = {
  boxes: Boxes,
  alert: AlertTriangle,
  dollar: DollarSign,
  truck: Truck,
};

function ReportsDashboard() {
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false); // حالة جديدة لتعطيل الأزرار أثناء التحميل
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [activePreset, setActivePreset] = useState('Last 7 days');
  
  const [data, setData] = useState({
    kpis: [],
    barSeries: [],
    pieSeries: [],
    tableRows: [],
  });
  
  const tableRef = useRef(null);

  useEffect(() => {
    handlePreset('Last 7 days');
  }, []);

  async function loadData(filters = {}) {
    try {
      setLoading(true);
      setError(null);

      const params = {};
      if (filters.startDate) params.startDate = filters.startDate;
      if (filters.endDate) params.endDate = filters.endDate;

      // استخدام api.get مباشرة لجلب البيانات من الباك اند
      const response = await api.get('https://192.168.56.1:7035/api/ProductSchedule/schedule', { params });
      const result = response.data;

      setData({
        kpis: result.kpis || [],
        barSeries: result.barChartData || [],
        pieSeries: result.pieChartData || [],
        tableRows: result.tableRows || [],
      });

    } catch (err) {
      console.error(err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerate() {
    if (!startDate || !endDate) return;
    await loadData({ startDate, endDate });
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function handlePreset(preset) {
    setActivePreset(preset);
    if (preset === 'Custom') return;

    const today = new Date();
    const end = today.toISOString().slice(0, 10);
    const days = preset === 'Last 30 days' ? 30 : 7;
    const start = new Date(today);
    start.setDate(today.getDate() - days + 1);
    const startStr = start.toISOString().slice(0, 10);

    setStartDate(startStr);
    setEndDate(end);
    loadData({ startDate: startStr, endDate: end });
  }

  function handleChangeStart(value) {
    setStartDate(value);
    setActivePreset('Custom');
  }

  function handleChangeEnd(value) {
    setEndDate(value);
    setActivePreset('Custom');
  }

  // --- دوال التصدير الجديدة (Excel & PDF) ---

  // دالة مساعدة لإنشاء رابط التحميل
  const downloadFile = (data, filename, mimeType) => {
    const blob = new Blob([data], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  async function handleExportExcel() {
    try {
      setExporting(true);
      // طلب ملف الإكسل من الباك اند مع الفلاتر الحالية
      const response = await api.get('https://192.168.56.1:7035/api/Reports/export-to-excel', {
        params: { startDate, endDate },
        responseType: 'blob', // مهم جداً
      });
      
      const fileName = `Report_${startDate || 'all'}_${endDate || 'time'}.xlsx`;
      downloadFile(
        response.data, 
        fileName, 
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
    } catch (err) {
      console.error("Export Excel failed:", err);
      alert("فشل في تصدير ملف Excel");
    } finally {
      setExporting(false);
    }
  }

  async function handleExportPDF() {
    try {
      setExporting(true);
      // طلب ملف PDF من الباك اند
      const response = await api.get('https://192.168.56.1:7035/api/Reports/export-to-pdf', {
        params: { startDate, endDate },
        responseType: 'blob', // مهم جداً
      });
      
      const fileName = `Report_${startDate || 'all'}_${endDate || 'time'}.pdf`;
      downloadFile(
        response.data, 
        fileName, 
        'application/pdf'
      );
    } catch (err) {
      console.error("Export PDF failed:", err);
      alert("فشل في تصدير ملف PDF");
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 rounded-3xl bg-white p-8 shadow-card animate-in fade-in-50 slide-in-from-top-4 duration-500 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-purple-300">analytics</p>
          <h1 className="mt-2 text-4xl font-semibold text-purple-900">Reports Dashboard</h1>
          <p className="mt-2 text-sm text-gray-500">Generate and export inventory reports easily.</p>
        </div>
        
        {/* تم تعديل قسم الأزرار هنا */}
        <div className="flex flex-wrap gap-3">
          <Button 
            variant="outline" 
            className="border-purple-600 text-purple-600 disabled:opacity-50"
            onClick={handleExportExcel} // ربط دالة الإكسل
            disabled={exporting} // تعطيل الزر أثناء التحميل
          >
            <FileDown size={16} className="mr-2" />
            {exporting ? 'Exporting...' : 'Export to Excel'}
          </Button>

          <Button 
            variant="outline" 
            className="border-purple-600 text-purple-600 disabled:opacity-50"
            onClick={handleExportPDF} // ربط دالة الـ PDF
            disabled={exporting} // تعطيل الزر أثناء التحميل
          >
            <FileText size={16} className="mr-2" />
            {exporting ? 'Exporting...' : 'Export to PDF'}
          </Button>
        </div>
      </header>

      <FilterBar
        startDate={startDate}
        endDate={endDate}
        activePreset={activePreset}
        onChangeStart={handleChangeStart}
        onChangeEnd={handleChangeEnd}
        onSelectPreset={handlePreset}
        onGenerate={handleGenerate}
      />

      {loading && (
        <div className="rounded-3xl bg-white p-12 text-center shadow-card">
           <div className="m-auto h-8 w-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent"></div>
           <p className="mt-4 text-sm text-gray-500">Loading analytics data...</p>
        </div>
      )}

      {error && !loading && (
        <div className="rounded-3xl bg-rose-50 p-6 text-center text-sm font-medium text-rose-700 shadow-card">
          <AlertTriangle className="mx-auto mb-2 h-8 w-8 text-rose-500" />
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {data.kpis.map((kpi, index) => {
              const Icon = iconMap[kpi.iconKey] || Boxes;
              return (
                <KPIBox
                  key={index}
                  label={kpi.label}
                  value={kpi.value}
                  delta={kpi.delta}
                  icon={Icon}
                  trend={kpi.trend}
                />
              );
            })}
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <BarChartCard data={data.barSeries} />
            <PieChartCard data={data.pieSeries} />
          </section>

          <div ref={tableRef}>
            <ReportsTable rows={data.tableRows} />
          </div>
        </>
      )}
    </div>
  );
}

export default ReportsDashboard;