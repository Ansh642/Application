import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Policies() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const policiesPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/get-policies");
        setPolicies(response.data.data);
      } catch (error) {
        console.error("Error fetching policies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPolicies();
  }, []);

  const detailPolicy = (id) => {
    navigate(`/policies/${id}`);
  };

  // Pagination Logic
  const indexOfLastPolicy = currentPage * policiesPerPage;
  const indexOfFirstPolicy = indexOfLastPolicy - policiesPerPage;
  const currentPolicies = policies.slice(indexOfFirstPolicy, indexOfLastPolicy);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="container mx-auto px-6">
          {/* Page Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 relative inline-block">
              Our Exclusive Policies
              <span className="absolute w-2/3 h-1 bg-blue-500 rounded-full left-1/2 transform -translate-x-1/2 bottom-0"></span>
            </h2>
            <p className="text-gray-500 mt-2 text-lg">Choose a plan that best fits your needs.</p>
          </div>

          {/* Loading Spinner */}
          {loading ? (
            <div className="flex flex-col gap-4 justify-center items-center min-h-[40vh]">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="ml-1">Please Wait...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                {currentPolicies?.map((policy, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-2xl w-[93%] mx-auto"
                  >
                    <img src={policy.imageUrl} alt={policy.policyName} className="w-full h-40 object-fill" />
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900">{policy.policyName}</h3>
                      <p className="text-gray-600 text-sm mt-2 h-16 overflow-hidden">{policy.policyDescription}</p>
                      <div className="mt-4 flex flex-col gap-1 text-sm text-gray-700">
                        <p>
                          <span className="font-bold text-blue-600 text-[15px]">Coverage:</span> Rs.
                          {policy.coverageAmount.toLocaleString() + "/-"}
                        </p>
                        <p>
                          <span className="font-bold text-gray-500 text-[15px]">Start Date:</span>{" "}
                          {new Date(policy.startDate).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => detailPolicy(policy._id)}
                        className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold transition-all duration-300"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Premium Pagination */}
              <ul className="flex space-x-5 justify-center font-[sans-serif] mt-16">
                <li
                  className={`flex items-center justify-center shrink-0 bg-gray-100 w-10 h-10 rounded-full ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                  onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-300" viewBox="0 0 55.753 55.753">
                    <path d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z" />
                  </svg>
                </li>
                {[...Array(Math.ceil(policies.length / policiesPerPage))].map((_, index) => (
                  <li
                    key={index}
                    className={`flex items-center justify-center shrink-0 w-10 h-10 rounded-full border-2 cursor-pointer text-base font-bold ${currentPage === index + 1 ? "bg-blue-500 text-white border-blue-500" : "hover:bg-gray-50 text-[#333]"}`}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </li>
                ))}
                <li
                  className={`flex items-center justify-center shrink-0 hover:bg-gray-50 border-2 cursor-pointer w-10 h-10 rounded-full ${currentPage === Math.ceil(policies.length / policiesPerPage) ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                  onClick={() => currentPage < Math.ceil(policies.length / policiesPerPage) && paginate(currentPage + 1)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-400 rotate-180" viewBox="0 0 55.753 55.753">
                    <path d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z" />
                  </svg>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
