import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table/index";
import Badge from "../ui/badge/Badge";

import { PencilIcon, TrashBinIcon } from "../../icons";

export default function BasicTableOne({ data, type = "user" }) {
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return { color: "success", label: "Admin" };
      case "user":
        return { color: "info", label: "User" };
      default:
        return { color: "light", label: role };
    }
  };

  const getBestSellerBadgeColor = (isBestSeller) => {
    return isBestSeller
      ? { color: "success", label: "Best Seller" }
      : { color: "light", label: "Standard" };
  };
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              {type === "user" ? (
                <>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Email
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Role{" "}
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Update Role
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Actions
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Image{" "}
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Category
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Sub Category
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Price
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Status
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                  >
                    Actions
                  </TableCell>
                </>
              )}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data.map((item) => {
              let badge = { color: "", label: "" };

              if (type === "user") {
                badge = getRoleBadgeColor(item.role);
              } else {
                badge = getBestSellerBadgeColor(item.bestSeller);
              }
              return (
                <TableRow key={item._id}>
                  {type === "user" ? (
                    <>
                      <TableCell className="px-5 py-4 text-start">
                        <span className="font-medium text-gray-800 dark:text-white/90">
                          {item.name}
                        </span>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start dark:text-gray-400">
                        {item.email}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start">
                        <Badge color={badge.color} variant="light">
                          {badge.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start">
                        <select
                          value={item.role}
                          onChange={(e) =>
                            item.onRoleChange(item._id, e.target.value)
                          }
                          className="px-2 py-1 text-sm border rounded-md bg-white dark:bg-gray-800"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start">
                        <button
                          onClick={() => item.onDelete(item._id)}
                          className="text-sm text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell className="px-5 py-4 text-start">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12"
                        />
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start dark:text-gray-400">
                        {item.name}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start">
                        <Badge color={badge.light} variant="light">
                          {item.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start">
                        <Badge color={badge.light} variant="light">
                          {item.subCategory}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start">
                        <Badge color={badge.light} variant="light">
                          {item.price}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start">
                        <Badge color={badge.color} variant="light">
                          {badge.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start">
                        <div className="flex items-center justify-end gap-3 h-full">
                          <button
                            onClick={item.onEdit}
                            className="text-blue-600"
                          >
                            <PencilIcon />
                          </button>
                          <button
                            onClick={() => item.onDelete(item._id)}
                            className="text-sm text-red-500 hover:underline"
                          >
                            <TrashBinIcon />
                          </button>
                        </div>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
