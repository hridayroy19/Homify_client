import useAxiosPublic from "../../../../hooks/axiosPublic/useAxiosPublic";
import toast from "react-hot-toast";

const roleBadge = {
  admin: "bg-purple-50 text-purple-700",
  agent: "bg-blue-50 text-blue-700",
  fraud: "bg-red-50 text-red-600",
  user: "bg-gray-100 text-gray-600",
};

function User({ d, index, handleDelete, makeAdmin }) {
  const { name, email, role } = d;
  const axiosPublic = useAxiosPublic();

  const makeAgent = () => {
    axiosPublic
      .patch(`/users/all/makeagent?id=${d._id}`)
      .then(() => toast.success("User is now an Agent"))
      .catch((e) => console.log(e.message));
  };

  const markFraud = () => {
    axiosPublic
      .patch(`/users/all/makefraud?id=${d._id}`)
      .then(() => toast.success("User marked as Fraud"))
      .catch((e) => console.log(e.message));
  };

  const isFraud = role === "fraud";

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-100">
      {/* # */}
      <td className="px-4 py-3 text-gray-400 text-xs">{index + 1}</td>

      {/* Name */}
      <td className="px-4 py-3 font-medium text-gray-800">{name}</td>

      {/* Email */}
      <td className="px-4 py-3 text-gray-500 text-xs">{email}</td>

      {/* Role badge */}
      <td className="px-4 py-3">
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${roleBadge[role] || roleBadge.user}`}
        >
          {role || "user"}
        </span>
      </td>

      {/* Make Admin */}
      <td className="px-4 py-3 text-center">
        <button
          onClick={() => makeAdmin(d._id)}
          disabled={isFraud || role === "admin"}
          className="text-xs px-3 py-1.5 rounded-lg font-medium bg-purple-50 text-purple-700 hover:bg-purple-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Make Admin
        </button>
      </td>

      {/* Make Agent */}
      <td className="px-4 py-3 text-center">
        <button
          onClick={makeAgent}
          disabled={isFraud || role === "agent"}
          className="text-xs px-3 py-1.5 rounded-lg font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Make Agent
        </button>
      </td>

      {/* Mark Fraud */}
      <td className="px-4 py-3 text-center">
        <button
          onClick={markFraud}
          disabled={isFraud}
          className="text-xs px-3 py-1.5 rounded-lg font-medium bg-orange-50 text-orange-600 hover:bg-orange-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Mark Fraud
        </button>
      </td>

      {/* Delete */}
      <td className="px-4 py-3 text-center">
        <button
          onClick={() => handleDelete(d._id)}
          className="text-xs px-3 py-1.5 rounded-lg font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default User;
