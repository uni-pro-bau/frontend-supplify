import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { api } from '../api/http.js';

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', company: '', phone: '', email: '', category: '' });

  // تأكد أن هذه القائمة تطابق ما يقبله السيرفر
  const categories = ['Office supplies', 'Stationery', 'Printing', 'Packaging', 'Electronics', 'Furniture'];

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const res = await api.get('https://192.168.56.1:7035/api/Suppliers');
      setSuppliers(res.data);
    } catch (err) {
      console.error(err);
      setSuppliers([]);
    } finally {
      setLoading(false);
    }
  }

  function openAdd() {
    setEditingId(null);
    setForm({ name: '', company: '', phone: '', email: '', category: '' });
    setShowModal(true);
  }

  function openEdit(supplier) {
    setEditingId(supplier.id);
    
    // قراءة الفئة سواء كانت مكتوبة بحرف كبير أو صغير من السيرفر
    const currentCategory = supplier.category || supplier.Category || '';

    setForm({
      name: supplier.name || '',
      company: supplier.company || '',
      phone: supplier.phone || '',
      email: supplier.email || '',
      category: currentCategory, 
    });
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingId(null);
    setForm({ name: '', company: '', phone: '', email: '', category: '' });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // --- تعديل هام: إرسال المفاتيح بحروف كبيرة (PascalCase) ---
    // هذا يضمن أن السيرفر (C#) سيفهم الحقول حتى لو كان حساساً لحالة الأحرف
    const payload = {
        Id: editingId ? editingId : 0,
        Name: form.name,
        Company: form.company,
        Phone: form.phone,
        Email: form.email,
        Category: form.category 
    };

    try {
      if (editingId) {
        // التأكد من وجود الشرطة المائلة /
        await api.put(`https://192.168.56.1:7035/api/Suppliers/update/${editingId}`, payload);
      } else {
        await api.post('https://192.168.56.1:7035/api/Suppliers/add', payload);
      }
      
      // إعادة تحميل البيانات فوراً
      await loadData();
      closeModal();
    } catch (err) {
      console.error("Error saving:", err);
      await loadData(); // إعادة التحميل حتى عند الخطأ لضمان التزامن
      closeModal();
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this supplier?')) return;
    try {
      await api.delete(`https://192.168.56.1:7035/api/Suppliers/delete/${id}`);
      await loadData();
    } catch (err) {
      console.error(err);
      await loadData();
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-purple-900">Suppliers</h1>
          <p className="mt-1 text-sm text-gray-500">Keep track of your key supplier contacts.</p>
        </div>
        <Button onClick={openAdd} className="bg-main-gradient text-white">
          <Plus size={18} className="mr-2" />
          Add Supplier
        </Button>
      </header>

      <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-card">
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading suppliers...</div>
        ) : suppliers.length === 0 ? (
          <div className="text-center py-12 text-gray-400">No suppliers found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-purple-600">
                  <th className="py-3">Name</th>
                  <th className="py-3">Company</th>
                  <th className="py-3">Category</th>
                  <th className="py-3">Phone</th>
                  <th className="py-3">Email</th>
                  <th className="py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier) => (
                  <tr key={supplier.id} className="border-t border-purple-50 text-purple-900">
                    <td className="py-3 font-semibold">{supplier.name}</td>
                    <td className="py-3">{supplier.company}</td>
                    {/* عرض الفئة سواء كانت بحرف كبير أو صغير */}
                    <td className="py-3">{supplier.category || supplier.Category || '-'}</td>
                    <td className="py-3">{supplier.phone}</td>
                    <td className="py-3">{supplier.email}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <button className="text-purple-600 hover:text-purple-800" onClick={() => openEdit(supplier)}>
                          <Edit size={16} />
                        </button>
                        <button className="text-rose-600 hover:text-rose-800" onClick={() => handleDelete(supplier.id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-purple-900">{editingId ? 'Edit Supplier' : 'Add Supplier'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-purple-900 mb-1 block">Name</label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <label className="text-sm font-medium text-purple-900 mb-1 block">Company</label>
                <Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} required />
              </div>
              <div>
                <label className="text-sm font-medium text-purple-900 mb-1 block">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-fuchsia-200"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-purple-900 mb-1 block">Phone</label>
                <Input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
              </div>
              <div>
                <label className="text-sm font-medium text-purple-900 mb-1 block">Email</label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1 bg-main-gradient text-white">{editingId ? 'Update' : 'Add'}</Button>
                <Button type="button" variant="outline" onClick={closeModal} className="flex-1">Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Suppliers;