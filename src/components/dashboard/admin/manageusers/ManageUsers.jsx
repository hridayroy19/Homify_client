import { useEffect, useState } from "react";
import useAxiosPublic from "../../../../hooks/axiosPublic/useAxiosPublic";
import User from "./User";
import toast from "react-hot-toast";

function ManageUsers() {
  const [users, setUsers] = useState(null);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic
      .get("/users/all/users")
      .then((e) => setUsers(e.data))
      .catch((e) => console.log(e.message));
  }, [axiosPublic]);

  const handleDelete = (id) => {
    axiosPublic
      .delete(`/users/all/deleteuser?id=${id}`)
      .then(() => {
        toast.success("User deleted");
        setUsers((prev) => prev.filter((d) => d._id !== id));
      })
      .catch((e) => console.log(e.message));
  };

  const makeAdmin = (id) => {
    axiosPublic
      .patch(`/users/all/makeadmin?id=${id}`)
      .then(() => {
        toast.success("User is now an Admin");
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, role: "admin" } : u)),
        );
      })
      .catch((e) => console.log(e.message));
  };

  if (!users) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-3">
        <span className="loading loading-bars loading-lg text-blue-500" />
        <p className="text-sm text-gray-400">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-800">Manage Users</h2>
        <p className="text-sm text-gray-400 mt-0.5">
          {users.length} registered users
        </p>
      </div>

      {/* Empty state */}
      {users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mb-3 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 20h5v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2h5M12 12a4 4 0 100-8 4 4 0 000 8z"
            />
          </svg>
          <p className="text-sm">No users found</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-500 w-10">
                    #
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-500">
                    Name
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-500">
                    Email
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-500">
                    Role
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-500 text-center">
                    Make Admin
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-500 text-center">
                    Make Agent
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-500 text-center">
                    Mark Fraud
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-500 text-center">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((d, index) => (
                  <User
                    key={d._id}
                    handleDelete={handleDelete}
                    makeAdmin={makeAdmin}
                    index={index}
                    d={d}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageUsers;
