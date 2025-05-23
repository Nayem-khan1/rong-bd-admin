import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";

import PageMeta from "../../components/common/PageMeta";
import { useAuth } from "../../context/AuthContext";
import { backendUrl } from "../../App";
import EcommerceMetrics from "./../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "./../../components/ecommerce/MonthlySalesChart";
import OrdersByStatusChart from "../../components/ecommerce/OrdersByStatusChart";
import ProductCategoryChart from "../../components/ecommerce/ProductCategoryChart";
import NewUsersLineChart from "../../components/ecommerce/NewUsersLineChart";
import TopSellingProductsChart from "../../components/ecommerce/TopSellingProductsChart";
import TopCustomersTable from "../../components/ecommerce/TopCustomersTable";
import RecentOrders from "../../components/ecommerce/RecentOrders";

export default function Home() {
  const { token } = useAuth();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orders, revenue, users, products, top] = await Promise.all([
          axios.get(backendUrl + "/api/analytics/order", {
            headers: { token },
          }),
          axios.get(backendUrl + "/api/analytics/revenue", {
            headers: { token },
          }),
          axios.get(backendUrl + "/api/analytics/users", {
            headers: { token },
          }),
          axios.get(backendUrl + "/api/analytics/products", {
            headers: { token },
          }),
          axios.get(backendUrl + "/api/analytics/top-performers", {
            headers: { token },
          }),
        ]);
        setData({
          orders: orders.data.data,
          revenue: revenue.data.data,
          users: users.data.data,
          products: products.data.data,
          top: top.data.data,
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  let orderByStatusData;

  if (data?.orders) {
    const ordersByStatus = data.orders.ordersByStatus;
    const totalOrders = data.orders.totalOrders;
    orderByStatusData = {
      totalOrders,
      ordersByStatus,
    }
  }

  if (loading) return <div className="text-center p-10">Loading...</div>;

  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics
            totalOrders={data.orders.totalOrders}
            totalRevenue={data.revenue.totalRevenue}
            totalUsers={data.users.totalUsers}
            totalProducts={data.products.totalProducts}
          />

          {data.orders?.monthlyRevenue && (
            <MonthlySalesChart monthlyRevenue={data.orders.monthlyRevenue} />
          )}
          <TopSellingProductsChart
            topSellingProducts={data.top.topSellingProducts}
          />
        </div>

        <div className="col-span-12 xl:col-span-5">
          {
            orderByStatusData && <OrdersByStatusChart data={orderByStatusData} />
          }
          <ProductCategoryChart categoryCount={data.products.categoryCount} />
          <TopCustomersTable topCustomers={data.top.topCustomersByRevenue} />
        </div>
        <div className="col-span-12 xl:col-span-5">
          <NewUsersLineChart newUsersPerDay={data.users.newUsersPerDay} />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders recentOrders={data.orders.recentOrders} />
        </div>
      </div>
    </>
  );
}
