import React, { useEffect, useState } from "react";
import axios from "axios";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";
import ComponentCard from "../../components/common/ComponentCard";
import { backendUrl } from "../../App";
import BasicTableOne from "../../components/tables/BasicTableOne";

const UserManage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/users`, {
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

  const updateRole = async (id, newRole) => {
    try {
      await axios.put(
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

  // Inject action handlers into each user
  const enhancedUsers = users.map((user) => ({
    ...user,
    onDelete: deleteUser,
    onRoleChange: updateRole,
  }));

  return (
    <>
      <PageMeta title="User Management" description="Manage all users" />
      <PageBreadcrumb pageTitle="User Management" />
      <ComponentCard title="User List">
        <BasicTableOne data={enhancedUsers} />
      </ComponentCard>
    </>
  );
};

export default UserManage;
