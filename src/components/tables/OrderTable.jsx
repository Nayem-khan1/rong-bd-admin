import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table/index";
import Badge from "../ui/badge/Badge";

import { PencilIcon, TrashBinIcon } from "../../icons";

const OrderTable = ({ data }) => {
  console.log(data);
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Order Items
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Customer details
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Amount
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Payment
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Method
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Date
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data.map((order, index) => (
              <TableRow key={index}>
                <TableCell className="px-5 py-3 text-gray-500 dark:text-gray-400">
                  {order.items.map((item, index) => (
                    <div key={index}>
                      <p className="">
                        <span>{index + 1}. </span> {item.name} × {item.quantity}
                      </p>
                    </div>
                  ))}
                </TableCell>
                <TableCell className="px-5 py-3 text-gray-500 dark:text-gray-400">
                  <p>
                    {order.address.firstName + " " + order.address.lastName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {order.address.street}, {order.address.city},{" "}
                    {order.address.state}, {order.address.country},{" "}
                    {order.address.zipcode}
                  </p>
                  <p className="text-xs">{order.address.phone}</p>
                </TableCell>
                <TableCell className="px-5 py-3 text-gray-500 dark:text-gray-400">
                  <Badge>${order.amount}</Badge>
                </TableCell>
                <TableCell className="px-5 py-3 text-gray-500 dark:text-gray-400">
                  {order.payment ? <Badge color="success">Paid</Badge> : <Badge color="error">Pending</Badge>}
                </TableCell>
                <TableCell className="px-5 py-3 text-gray-500 dark:text-gray-400">
                  <Badge color="info">{order.paymentMethod}</Badge>
                </TableCell>
                <TableCell className="px-5 py-3 text-gray-500 dark:text-gray-400">
                  {new Date(order.date).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell className="px-5 py-3 text-gray-500 dark:text-gray-400">
                  <select
                    onChange={(e) => order.onStatusChange(e, order._id)}
                    value={order.status}
                    className="bg-white border border-gray-300 px-2 py-1 text-xs rounded"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrderTable;
