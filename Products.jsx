import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { api } from '../api/http.js';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ productName: '', category: '', price: '', stock: '' });

  const categories = ['Office supplies', 'Stationery', 'Printing', 'Packaging', 'Electronics', 'Furniture'];

  useEffect(() => {
    loadData();
  }, []);

  // دالة لجلب البيانات من الـ API
  async function loadData() {
    try {
      const res = await api.get('https://192.168.56.1:7035/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  // فتح المودال للإضافة
  function openAdd() {
    setEditingId(null);
    setForm({ productName: '', category: '', price: '', stock: '' });
    setShowModal(true);
  }

  // فتح المودال للتعديل
  function openEdit(product) {
    setEditingId(product.id);
    setForm({
      productName: product.productName || '', 
      category: product.category || '',
      price: String(product.price).replace('$', ''),
      stock: String(product.stock),
    });
    setShowModal(true);
  }

  // إغلاق المودال
  function closeModal() {
    setShowModal(false);
    setEditingId(null);
    setForm({ productName: '', category: '', price: '', stock: '' });
  }

  // إرسال البيانات (إضافة أو تعديل)
  async function handleSubmit(e) {
    e.preventDefault();
    
    // 1. تجهيز البيانات وتحويل الأرقام
    const payload = {
        id: editingId ? editingId : 0,
        productName: form.productName,
        category: form.category,
        price: parseFloat(form.price), // تحويل لنوع float
        stock: parseInt(form.stock)    // تحويل لنوع int
    };

    try {
      if (editingId) {
        // تعديل
        await api.put(`https://192.168.56.1:7035/api/products/update/${editingId}`, payload);
      } else {
        // إضافة
        await api.post('https://192.168.56.1:7035/api/products/add', payload);
      }
      
      // 2. إعادة تحميل البيانات من السيرفر لضمان ظهور التعديلات فوراً
      await loadData();
      
      closeModal();
    } catch (err) {
      console.error("Error submitting form:", err);
      // في حال حدوث خطأ، نعيد تحميل البيانات أيضاً للتأكد من التزامن
      await loadData();
      closeModal();
    }
  }

  // حذف منتج
  async function handleDelete(id) {
    if (!confirm('Delete this product?')) return;
    try {
      await api.delete(`https://192.168.56.1:7035/api/products/delete/${id}`);
      // تحديث الحالة محلياً للحذف (لأنه عملية بسيطة لا تتطلب إعادة تحميل كاملة عادةً)
      // لكن لضمان الدقة يمكن أيضاً استبدال هذا السطر بـ loadData()
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      // في حال الفشل نعيد تحميل القائمة للتأكد
      loadData();
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-purple-900">Products</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your product catalog, prices, and current stock levels.</p>
        </div>
        <Button onClick={openAdd} className="bg-main-gradient text-white">
          <Plus size={18} className="mr-2" />
          Add Product
        </Button>
      </header>

      <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-card">
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-gray-400">No products found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-purple-600">
                  <th className="py-3">Product Name</th>
                  <th className="py-3">Category</th>
                  <th className="py-3">Price</th>
                  <th className="py-3">Stock</th>
                  <th className="py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t border-purple-50 text-purple-900">
                    <td className="py-3 font-semibold">{product.productName}</td>  
                    <td className="py-3">{product.category}</td>
                    <td className="py-3">${String(product.price).replace('$', '')}</td>
                    <td className="py-3">{product.stock}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <button
                          className="text-purple-600 hover:text-purple-800"
                          onClick={() => openEdit(product)}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="text-rose-600 hover:text-rose-800"
                          onClick={() => handleDelete(product.id)}
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
              <h2 className="text-2xl font-semibold text-purple-900">{editingId ? 'Edit Product' : 'Add Product'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-purple-900 mb-1 block">Product Name</label>
                <Input
                  value={form.productName} 
                  onChange={(e) => setForm({ ...form, productName: e.target.value })}
                  required
                />
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
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-purple-900 mb-1 block">Price</label>
                <Input
                  type="number"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-purple-900 mb-1 block">Stock</label>
                <Input
                  type="number"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
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

export default Products;