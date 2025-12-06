function Suppliers() {
  const suppliers = [
    { name: 'LogiTrans', company: 'LogiTrans Shipping LLC', phone: '+1 (555) 201-4455', email: 'support@logitrans.io' },
    { name: 'PaperPlus', company: 'PaperPlus Wholesale', phone: '+1 (555) 874-2210', email: 'sales@paperplus.com' },
    { name: 'PackRight', company: 'PackRight Packaging', phone: '+44 20 7946 0011', email: 'hello@packright.co.uk' },
    { name: 'OfficeOne', company: 'OfficeOne Supplies', phone: '+971 4 123 9876', email: 'orders@officeone.ae' },
  ];

  const handleEditSupplier = (supplier) => {
    // TODO: replace this with real navigation / API integration
    // e.g. open edit modal or navigate to `/suppliers/:id`
    console.log('Edit supplier clicked:', supplier);
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-purple-900">Suppliers</h1>
        <p className="mt-1 text-sm text-gray-500">
          Keep track of your key supplier contacts and update their details when needed.
        </p>
      </header>

      <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-card">
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
                <tr key={supplier.email} className="border-t border-purple-50 text-purple-900">
                  <td className="py-3 font-semibold">{supplier.name}</td>
                  <td className="py-3">{supplier.company}</td>
                  <td className="py-3">{supplier.phone}</td>
                  <td className="py-3">{supplier.email}</td>
                  <td className="py-3">
                    <button
                      type="button"
                      className="text-xs font-medium text-purple-600 hover:text-purple-800"
                      onClick={() => handleEditSupplier(supplier)}
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

export default Suppliers;


