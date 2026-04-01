function ManageReview({ d, index, deleteReview }) {
    const { comment, name, image } = d;

    return (
        <tr className="hover:bg-gray-50 transition-colors duration-100">

            {/* # */}
            <td className="px-4 py-4 text-gray-400 text-xs align-top">{index + 1}</td>

            {/* Reviewer */}
            <td className="px-4 py-4 align-top">
                <div className="flex items-center gap-3">
                    {image ? (
                        <img src={image} alt={name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                            {name?.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <span className="font-medium text-gray-800 text-sm">{name}</span>
                </div>
            </td>

            {/* Comment */}
            <td className="px-4 py-4 align-top">
                <p className="text-sm text-gray-500 leading-relaxed max-w-md">{comment}</p>
            </td>

            {/* Action */}
            <td className="px-4 py-4 align-top text-center">
                <button
                    onClick={() => deleteReview(d._id)}
                    className="text-xs px-3 py-1.5 rounded-lg font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                >
                    Delete
                </button>
            </td>

        </tr>
    );
}

export default ManageReview;