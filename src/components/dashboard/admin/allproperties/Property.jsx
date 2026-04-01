function Property({ d, index, deleteProperty }) {
  const { title, location, author, property_details } = d;

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-100">
      <td className="px-4 py-3 text-gray-400 text-xs">{index + 1}</td>

      <td className="px-4 py-3 font-medium text-gray-800 max-w-[160px] truncate">
        {title}
      </td>

      <td className="px-4 py-3 text-gray-500 max-w-[120px] truncate">
        {location}
      </td>

      <td className="px-4 py-3">
        <span className="text-blue-600 text-xs bg-blue-50 px-2 py-0.5 rounded-full">
          {author?.contact}
        </span>
      </td>

      <td className="px-4 py-3 font-semibold text-gray-700">
        ${Number(property_details?.price).toLocaleString()}
      </td>

      <td className="px-4 py-3 text-center">
        <button
          onClick={() => deleteProperty(d._id)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-150"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default Property;
