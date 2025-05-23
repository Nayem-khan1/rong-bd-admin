import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table/index";
import Badge from "../ui/badge/Badge";

export default function BasicTableOne({ data }) {
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return { color: "success", label: "Admin" };
      case "user":
        return { color: "info", label: "User" };
      case "manager":
        return { color: "warning", label: "Manager" };
      default:
        return { color: "light", label: role };
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Name</TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Email</TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Role </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Update Role</TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Actions</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data.map((user) => {
              const { color, label } = getRoleBadgeColor(user.role);
              return (
                <TableRow key={user._id}>
                  <TableCell className="px-5 py-4 text-start">
                    <span className="font-medium text-gray-800 dark:text-white/90">{user.name}</span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start dark:text-gray-400">
                    {user.email}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <Badge color={color} variant="light">{label}</Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <select
                      value={user.role}
                      onChange={(e) => user.onRoleChange(user._id, e.target.value)}
                      className="px-2 py-1 text-sm border rounded-md bg-white dark:bg-gray-800"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                    </select>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <button
                      onClick={() => user.onDelete(user._id)}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
