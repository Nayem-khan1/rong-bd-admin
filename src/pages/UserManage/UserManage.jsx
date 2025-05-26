import React, { useEffect, useState } from "react";
import axios from "axios";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";
import ComponentCard from "../../components/common/ComponentCard";
import { backendUrl } from "../../App";
import BasicTableOne from "../../components/tables/BasicTableOne";
import Notification from "../../components/ui/notification/Notification";
import ConfirmModal from "../../components/ui/alert/ConfirmModal";
import Loader from "../../components/common/Loader";

const UserManage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [notification, setNotification] = useState(null);

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

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id) => setConfirmDeleteId(id);

  const confirmDelete = async () => {
    try {
      await axios.delete(`${backendUrl}/api/users/${confirmDeleteId}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setUsers(users.filter((user) => user._id !== confirmDeleteId));
      setNotification({
        type: "success",
        message: "User deleted successfully.",
      });
    } catch (error) {
      console.error(error);
      setNotification({ type: "error", message: "Failed to delete user." });
    } finally {
      setConfirmDeleteId(null);
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
      setNotification({ type: "success", message: "User role updated." });
    } catch (error) {
      console.error(error);
      setNotification({ type: "error", message: "Failed to update role." });
    }
  };

  if (loading) return <Loader />;

  // Inject action handlers into each user
  const enhancedUsers = users.map((user) => ({
    ...user,
    onDelete: handleDelete,
    onRoleChange: updateRole,
  }));

  return (
    <>
      <PageMeta title="User Management" description="Manage all users" />
      <PageBreadcrumb pageTitle="User Management" />
      <ComponentCard title="User List">
        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        )}
        <BasicTableOne data={enhancedUsers} type="user" />
      </ComponentCard>
      <ConfirmModal
        show={!!confirmDeleteId}
        title="Confirm Delete"
        message="Are you sure you want to delete this user?"
        onConfirm={confirmDelete}
        onCancel={() => setConfirmDeleteId(null)}
      />
    </>
  );
};

export default UserManage;
