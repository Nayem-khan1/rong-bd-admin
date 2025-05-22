import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";
import ComponentCard from "../../components/common/ComponentCard";
import { backendUrl } from "../../App";

const UserManage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/users", {
        headers: { token: localStorage.getItem("token") },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching users", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`${backendUrl}/api/users/${id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      alert("Failed to delete user");
    }
  };

  const toggleRole = async (id, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    try {
      const res = await axios.put(
        `${backendUrl}/api/users/${id}/role`,
        { role: newRole },
        { headers: { token: localStorage.getItem("token") } }
      );
      setUsers(
        users.map((user) =>
          user._id === id ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      alert("Failed to update role");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  return (
    <>
      <PageMeta
        title="This is User management page"
        description="This is User management description"
      />
      <PageBreadcrumb pageTitle="Users" />
      <ComponentCard title="User List">
        <div className="max-w-4xl mx-auto mt-10 p-4">
          <h1 className="text-2xl font-bold mb-6">User Management</h1>
          <div className="grid gap-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between p-4"
              >
                <div className="p-0">
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-sm text-blue-500">Role: {user.role}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toggleRole(user._id, user.role)}>
                    {user.role === "admin"
                      ? "Demote to User"
                      : "Promote to Admin"}
                  </button>
                  <button onClick={() => deleteUser(user._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ComponentCard>
    </>
  );
};

export default UserManage;
