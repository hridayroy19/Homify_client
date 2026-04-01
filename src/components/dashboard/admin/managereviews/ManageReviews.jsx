import { useEffect, useState } from "react";
import useAxiosPublic from "../../../../hooks/axiosPublic/useAxiosPublic";
import ManageReview from "./Review";
import toast from "react-hot-toast";

function ManageReviews() {
  const [reviews, setReviews] = useState(null);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic
      .get("/home/reviews")
      .then((e) => setReviews(e.data))
      .catch((e) => console.log(e.message));
  }, [axiosPublic]);

  const deleteReview = (id) => {
    axiosPublic
      .delete(`/admin/review/delete?id=${id}`)
      .then((e) => {
        if (e.data.deletedCount) {
          toast.success("Review deleted");
          setReviews((prev) => prev.filter((a) => a._id !== id));
        }
      })
      .catch((e) => console.log(e.message));
  };

  if (!reviews) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-3">
        <span className="loading loading-bars loading-lg text-blue-500" />
        <p className="text-sm text-gray-400">Loading reviews...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-800">Manage Reviews</h2>
        <p className="text-sm text-gray-400 mt-0.5">
          {reviews.length} total reviews
        </p>
      </div>

      {/* Empty state */}
      {reviews.length === 0 ? (
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
              d="M8 10h.01M12 10h.01M16 10h.01M21 16a2 2 0 01-2 2H7l-4 4V6a2 2 0 012-2h14a2 2 0 012 2v10z"
            />
          </svg>
          <p className="text-sm">No reviews found</p>
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
                    Reviewer
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-500">
                    Property
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-500">
                    Review
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reviews.map((d, index) => (
                  <ManageReview
                    key={d._id}
                    deleteReview={deleteReview}
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

export default ManageReviews;
