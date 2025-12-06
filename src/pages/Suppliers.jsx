import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { api } from '../api/http.js';

const mockData = [
  { id: 1, name: 'LogiTrans', company: 'LogiTrans Shipping LLC', phone: '+1 (555) 201-4455', email: 'support@logitrans.io' },
  { id: 2, name: 'PaperPlus', company: 'PaperPlus Wholesale', phone: '+1 (555) 874-2210', email: 'sales@paperplus.com' },
  { id: 3, name: 'PackRight', company: 'PackRight Packaging', phone: '+44 20 7946 0011', email: 'hello@packright.co.uk' },
  { id: 4, name: 'OfficeOne', company: 'OfficeOne Supplies', phone: '+971 4 123 9876', email: 'orders@officeone.ae' },
];

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', company: '', phone: '', email: '' });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const res = await api.get('/suppliers');
      setSuppliers(res.data);
    } catch (err) {
      console.error(err);
      setSuppliers(mockData);
    } finally {
      setLoading(false);
    }
  }

  function openAdd() {
    setEditingId(null);
    setForm({ name: '', company: '', phone: '', email: '' });
    setShowModal(true);
  }

  function openEdit(supplier) {
    setEditingId(supplier.id);
    setForm({
      name: supplier.name,
      company: supplier.company,
      phone: supplier.phone,
      email: supplier.email,
    });
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingId(null);
    setForm({ name: '', company: '', phone: '', email: '' });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editingId) {
        const res = await api.put(`/suppliers/${editingId}`, form);
        setSuppliers(suppliers.map((s) => (s.id === editingId ? res.data : s)));
      } else {
        const res = await api.post('/suppliers', form);
        setSuppliers([...suppliers, res.data]);
      }
      closeModal();
    } catch (err) {
      console.error(err);
      if (editingId) {
        setSuppliers(suppliers.map((s) => (s.id === editingId ? { ...form, id: editingId } : s)));
      } else {
        setSuppliers([...suppliers, { ...form, id: Date.now() }]);
      }
      closeModal();
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this supplier?')) return;
    try {
      await api.delete(`/suppliers/${id}`);
      setSuppliers(suppliers.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
      setSuppliers(suppliers.filter((s) => s.id !== id));
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-purple-900">Suppliers</h1>
          <p className="mt-1 text-sm text-gray-500">Keep track of your key supplier contacts and update their details when needed.</p>
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
                  <td className="py-3">{supplier.phone}</td>
                  <td className="py-3">{supplier.email}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <button
                        className="text-purple-600 hover:text-purple-800"
                        onClick={() => openEdit(supplier)}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="text-rose-600 hover:text-rose-800"
                        onClick={() => handleDelete(supplier.id)}
                      >
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
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-purple-900 mb-1 block">Name</label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-purple-900 mb-1 block">Company</label>
                <Input
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-purple-900 mb-1 block">Phone</label>
                <Input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-purple-900 mb-1 block">Email</label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1 bg-main-gradient text-white">
                  {editingId ? 'Update' : 'Add'}
                </Button>
                <Button type="button" variant="outline" onClick={closeModal} className="flex-1">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Suppliers;
