import React from "react";

export default function TopCustomersTable({ topCustomers }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white mt-5 sm:mt-6 p-5 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white/90">
        Top Customers by Revenue
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
          <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Total Spent</th>
              <th className="px-4 py-2">Orders</th>
            </tr>
          </thead>
          <tbody>
            {topCustomers.slice(0,4).map((customer, i) => (
              <tr key={i} className="border-t border-gray-100 dark:border-gray-700">
                <td className="px-4 py-2 font-medium">{customer.name}</td>
                <td className="px-4 py-2">{customer.email}</td>
                <td className="px-4 py-2 font-semibold text-green-600 dark:text-green-400">
                  $ {customer.totalSpent.toLocaleString()}
                </td>
                <td className="px-4 py-2">{customer.totalOrders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
