function Products() {
  const products = [
    { name: 'A4 Copy Paper', category: 'Office supplies', price: '$4.20', stock: 120, status: 'In stock' },
    { name: 'Blue Ballpoint Pens (10-pack)', category: 'Stationery', price: '$2.60', stock: 34, status: 'Low stock' },
    { name: 'Laser Printer Toner', category: 'Printing', price: '$89.00', stock: 8, status: 'Critical' },
    { name: 'Shipping Boxes (M)', category: 'Packaging', price: '$0.80', stock: 260, status: 'In stock' },
  ];

  const handleEditProduct = (product) => {
    // TODO: replace this with real navigation / API integration
    // e.g. open edit modal or navigate to `/products/:id`
    console.log('Edit product clicked:', product);
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-purple-900">Products</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your product catalog, prices, and current stock levels.
        </p>
      </header>

      <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-purple-600">
                <th className="py-3">Product name</th>
                <th className="py-3">Category</th>
                <th className="py-3">Price</th>
                <th className="py-3">Stock</th>
                <th className="py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.name} className="border-t border-purple-50 text-purple-900">
                  <td className="py-3 font-semibold">{product.name}</td>
                  <td className="py-3">{product.category}</td>
                  <td className="py-3">{product.price}</td>
                  <td className="py-3">{product.stock}</td>
                  <td className="py-3">
                    <button
                      type="button"
                      className="text-xs font-medium text-purple-600 hover:text-purple-800"
                      onClick={() => handleEditProduct(product)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Products;


