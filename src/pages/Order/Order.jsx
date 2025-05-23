import { useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../../App";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { assets } from "../../assets/assets";
import { useAuth } from "../../context/AuthContext";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";

const Order = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return;
    }
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
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="All Orders" />
      <div className="space-y-6">
        <ComponentCard title={"All Orders"}>
          <div>
            <div>
              {orders.map((order, index) => (
                <div
                  className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 rounded-2xl"
                  key={index}
                >
                  <img className="w-12" src={assets.parcel_icon} alt="" />
                  <div>
                    <div>
                      {order.items.map((item, index) => {
                        if (index === order.items.length - 1) {
                          return (
                            <p className="py-0.5" key={index}>
                              {" "}
                              {item.name} X {item.quantity}{" "}
                              <span> {item.size} </span>
                            </p>
                          );
                        } else {
                          return (
                            <p className="py-0.5" key={index}>
                              {" "}
                              {item.name} X {item.quantity}{" "}
                              <span> {item.size} </span> ,
                            </p>
                          );
                        }
                      })}
                    </div>

                    <p className="mt-3 mb-2 font-medium">
                      {order.address.firstName + " " + order.address.lastName}
                    </p>
                    <div>
                      <p>{order.address.street + ", "}</p>
                      <p>
                        {order.address.city +
                          ", " +
                          order.address.state +
                          ", " +
                          order.address.country +
                          ", " +
                          order.address.zipcode}
                      </p>
                    </div>
                    <p>{order.address.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm sm:text-[15px]">
                      Items: {order.items.length}
                    </p>
                    <p className="mt-3">Method: {order.paymentMethod}</p>
                    <p>Payment: {order.payment ? "Done" : "Pending"}</p>
                    <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <p className="text-sm sm:text-[15px]">
                    {currency}
                    {order.amount}
                  </p>
                  <select
                    onChange={(event) => statusHandler(event, order._id)}
                    value={order.status}
                    className="p-2 font-semibold"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
};

export default Order;
