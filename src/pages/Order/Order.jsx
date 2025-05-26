import { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl, currency } from "../../App";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";
import Loader from "../../components/common/Loader";
import OrderTable from "../../components/tables/OrderTable";

const Order = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  if (loading) return <Loader />;

  return (
    <>
      <PageMeta title="All Orders" description="Manage customer orders" />
      <PageBreadcrumb pageTitle="All Orders" />

      <ComponentCard title="All Orders">
        <OrderTable data={orders}/>
      </ComponentCard>
    </>
  );
};

export default Order;
