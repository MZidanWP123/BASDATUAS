'use client'
import React, { useState, useEffect } from 'react';

const RoleManagementPage = () => {
  const [roles, setRoles] = useState([]);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleId, setNewRoleId] = useState('');
  const [editingRole, setEditingRole] = useState(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetch('/api/role');
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const createRole = async () => {
    try {
      const response = await fetch(`/api/role?nama=${newRoleName}&role_id=${newRoleId}`, {
        method: 'POST',
      });
      const newRole = await response.json();
      setRoles([...roles, newRole]);
      setNewRoleName('');
      setNewRoleId('');
    } catch (error) {
      console.error('Error creating role:', error);
    }
  };

  const deleteRole = async (roleId) => {
    try {
      await fetch(`/api/role?role_id=${roleId}`, {
        method: 'DELETE',
      });
      setRoles(roles.filter((role) => role.role_id !== roleId));
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  const updateRole = async () => {
    try {
      const response = await fetch(`/api/role?nama=${editingRole.name}&role_id=${editingRole.role_id}`, {
        method: 'PATCH',
      });
      const updatedRole = await response.json();
      setRoles(
        roles.map((role) => (role.role_id === updatedRole.role_id ? updatedRole : role))
      );
      setEditingRole(null);
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Role Management</h1>

      <div className="mb-4">
        <h2 className="text-lg font-medium mb-2">Create New Role</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Role Name"
            value={newRoleName}
            onChange={(e) => setNewRoleName(e.target.value)}
            className="border rounded px-3 py-2 flex-1"
          />
          <input
            type="text"
            placeholder="Role ID"
            value={newRoleId}
            onChange={(e) => setNewRoleId(e.target.value)}
            className="border rounded px-3 py-2 flex-1"
          />
          <button
            onClick={createRole}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2"
          >
            Create Role
          </button>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Role ID</th>
            <th className="border px-4 py-2 text-left">Role Name</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.role_id}>
              <td className="border px-4 py-2">{role.role_id}</td>
              <td className="border px-4 py-2">
                {editingRole?.role_id === role.role_id ? (
                  <input
                    type="text"
                    value={editingRole.name}
                    onChange={(e) =>
                      setEditingRole({ ...editingRole, name: e.target.value })
                    }
                    className="border rounded px-3 py-2 w-full"
                  />
                ) : (
                  role.name
                )}
              </td>
              <td className="border px-4 py-2">
                {editingRole?.role_id === role.role_id ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={updateRole}
                      className="bg-green-500 hover:bg-green-600 text-white rounded px-4 py-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setEditingRole(null)}
                      className="bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingRole(role)}
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteRole(role.role_id)}
                      className="bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleManagementPage;