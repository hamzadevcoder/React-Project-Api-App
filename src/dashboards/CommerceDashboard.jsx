import React from 'react';
import KPICard from '../components/UI/KPICard';
import DataTable from '../components/UI/DataTable';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ShoppingCart, Package, DollarSign } from 'lucide-react';

const mockRevenueData = Array.from({ length: 7 }).map((_, i) => ({
  day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i],
  revenue: Math.floor(Math.random() * 5000) + 1000
}));

const mockOrders = [
  { id: '#ORD-7829', product: 'Wireless Noise-Cancelling Headphones', status: 'Delivered', amount: '$299.99', date: 'Oct 12, 2023' },
  { id: '#ORD-7830', product: 'Smart Fitness Watch Series 5', status: 'Shipped', amount: '$199.50', date: 'Oct 14, 2023' },
  { id: '#ORD-7831', product: 'Ergonomic Office Chair', status: 'Pending', amount: '$349.00', date: 'Oct 15, 2023' },
  { id: '#ORD-7832', product: 'Mechanical Gaming Keyboard', status: 'Delivered', amount: '$129.99', date: 'Oct 15, 2023' },
  { id: '#ORD-7833', product: 'USB-C Hub Multiport Adapter', status: 'Pending', amount: '$45.00', date: 'Oct 16, 2023' },
];

const mockProducts = [
  { name: 'Wireless Headphones', price: '$299.99', stock: 45, image: 'bg-purple-100 dark:bg-purple-900/30 text-purple-500' },
  { name: 'Smart Watch', price: '$199.50', stock: 12, image: 'bg-blue-100 dark:bg-blue-900/30 text-blue-500' },
  { name: 'Office Chair', price: '$349.00', stock: 0, image: 'bg-red-100 dark:bg-red-900/30 text-red-500' },
  { name: 'Gaming Keyboard', price: '$129.99', stock: 89, image: 'bg-green-100 dark:bg-green-900/30 text-green-500' },
  { name: 'USB-C Hub', price: '$45.00', stock: 124, image: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-500' },
  { name: '4K Monitor', price: '$499.00', stock: 8, image: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-500' },
];

const CommerceDashboard = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Revenue" value="$45,290" trend="up" trendValue="+14%" icon={DollarSign} color="facebook-blue" />
        <KPICard title="Total Orders" value="1,245" trend="up" trendValue="+5%" icon={ShoppingCart} color="purple" />
        <KPICard title="Active Products" value="482" trend="up" trendValue="+2%" icon={Package} color="orange" />
        <KPICard title="Out of Stock" value="14" trend="down" trendValue="-3%" icon={Package} color="facebook-green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl p-5 shadow-sm">
          <h3 className="font-medium mb-4 text-gray-700 dark:text-gray-300">Revenue (Last 7 Days)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockRevenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} tickFormatter={(val) => `$${val}`} />
                <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={{ borderRadius: '8px', border: 'none' }} formatter={(value) => `$${value}`} />
                <Bar dataKey="revenue" fill="#1877F2" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl p-5 shadow-sm">
          <h3 className="font-medium mb-4 text-gray-700 dark:text-gray-300">Inventory Status</h3>
          <div className="space-y-4">
            {mockProducts.map((product, i) => (
              <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-dark-bg rounded-lg transition-colors">
                <div className={`w-10 h-10 rounded-md flex items-center justify-center font-bold ${product.image}`}>
                  {product.name.charAt(0)}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="text-sm font-semibold dark:text-white truncate">{product.name}</div>
                  <div className="text-xs text-gray-500">{product.price}</div>
                </div>
                <div className="text-right">
                  <div className={`text-xs font-bold ${product.stock === 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {product.stock === 0 ? 'Out of Stock' : `${product.stock} in stock`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3 text-gray-700 dark:text-gray-300">Recent Orders</h3>
        <DataTable 
          columns={[
            { header: 'Order ID', accessor: 'id', cell: (row) => <span className="font-mono text-facebook-blue text-xs">{row.id}</span> },
            { header: 'Product', accessor: 'product' },
            { 
              header: 'Status', 
              accessor: 'status',
              cell: (row) => (
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  row.status === 'Delivered' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' :
                  row.status === 'Shipped' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' :
                  'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
                }`}>
                  {row.status}
                </span>
              )
            },
            { header: 'Amount', accessor: 'amount' },
            { header: 'Date', accessor: 'date' }
          ]}
          data={mockOrders}
        />
      </div>
    </div>
  );
};

export default CommerceDashboard;
