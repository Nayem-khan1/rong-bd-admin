import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { format } from "date-fns";
import {Link} from 'react-router'

// Accept recentOrders as a prop
export default function RecentOrders({ recentOrders }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Recent Orders
        </h3>

        <div className="flex items-center gap-3">
          <Link to="/orders">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            See all
          </button>
          </Link>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-y border-gray-100 dark:border-gray-800">
            <TableRow>
              <TableCell isHeader className="py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400">
                Products
              </TableCell>
              <TableCell isHeader className="py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400">
                Amount
              </TableCell>
              <TableCell isHeader className="py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400">
                Status
              </TableCell>
              <TableCell isHeader className="py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400">
                Date
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {recentOrders.map((order) => (
              <TableRow key={order._id}>
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    {order.items.length > 0 && (
                      <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                        <img
                          src={order.items[0].image[0]}
                          alt={order.items[0].name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-800 text-sm dark:text-white/90">
                        {order.items.map((item) => item.name).join(", ")}
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Qty: {order.items.reduce((sum, i) => sum + i.quantity, 0)}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-600 text-sm dark:text-gray-300">
                  ${order.amount.toLocaleString()}
                </TableCell>
                <TableCell className="py-3 text-sm text-gray-500 dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      order.status === "Delivered"
                        ? "success"
                        : order.status === "Pending"
                        ? "warning"
                        : order.status === "Canceled"
                        ? "error"
                        : "default"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 text-sm text-gray-500 dark:text-gray-400">
                  { order.createdAt || order.updatedAt ? `${format(new Date(order.createdAt || order.updatedAt), "MMM d, yyyy")}`: "" }
                  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
