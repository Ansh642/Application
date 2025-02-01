import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";

export default function MyClaims() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserClaims = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/my-claims");
        setClaims(response.data.data);
      } catch (error) {
        console.error("Error fetching claims:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserClaims();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white py-12">
        <div className="container mx-auto px-6 flex flex-col items-center">
          
          {/* Page Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 relative inline-block">
              My Claims
              <span className="absolute w-2/3 h-1 bg-blue-600 rounded-full left-1/2 transform -translate-x-1/2 bottom-0"></span>
            </h2>
            <p className="text-gray-500 mt-2 text-lg">Track the status of your claims.</p>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col justify-center items-center min-h-[40vh]">
              <ClipLoader color="#2563eb" loading={loading} size={40} />
              <p className="text-lg font-semibold text-blue-600 mt-3">Fetching your claims...</p>
            </div>
          ) : claims.length === 0 ? (
            <div className="text-center text-gray-500 text-lg font-semibold py-10">
              You have no claims yet.
            </div>
          ) : (
            <div className="flex flex-col gap-6 w-full md:w-2/3">
              {claims?.map((claim) => (
                <div
                  key={claim._id}
                  className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col md:flex-row items-center md:items-start w-full p-5"
                >
                  {/* Policy Image */}
                  <img
                    src={claim.policyId?.imageUrl || "https://via.placeholder.com/150"}
                    alt={claim.policyId?.policyName || "Policy"}
                    className="w-full md:w-48 h-40 object-cover rounded-md"
                  />

                  {/* Claim Details */}
                  <div className="md:ml-6 flex-1">
                    <h3 className="text-xl font-bold text-gray-900">
                      {claim.policyId?.policyName || "Unknown Policy"}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2">
                      {claim.policyId?.policyDescription || "No description available."}
                    </p>

                    <div className="mt-4 text-gray-700 space-y-1 text-sm">
                      <p>
                        <span className="font-semibold text-blue-600">Claim Amount:</span> Rs.
                        {claim.claimAmount.toLocaleString()}/-
                      </p>
                      <p>
                        <span className="font-semibold text-gray-500">Claim Date:</span>{" "}
                        {new Date(claim.claimDate).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Status Indicator */}
                    <div className="mt-4">
                      <span
                        className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                          claim.status === "Pending"
                            ? "bg-yellow-500 text-white"
                            : claim.status === "Approved"
                            ? "bg-green-600 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {claim.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
