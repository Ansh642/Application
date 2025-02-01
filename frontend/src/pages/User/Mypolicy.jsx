import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function MyPolicies() {

  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserPolicies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/my-policies");
        
        setPolicies(response.data.data);
      } 
      catch (error) {
        console.error("Error fetching policies:", error);
      } 
      finally {
        setLoading(false);
      }
    };

    fetchUserPolicies();
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/policies/${id}`);
  };

  const handleClaimPolicy = async (policyId) => {
    try {
      toast.loading("Processing your claim...");

      const response = await axios.post("http://localhost:5000/api/create-claim", {
        policyId: policyId,
      });

      toast.dismiss(); // Remove loading toast
      if (response.data.success) 
        {
        toast.success("Claim request submitted successfully!");
      } 
      else {
        toast.error(response.data.message || "Failed to submit claim.");
      }
    } 
    catch (error) {
      toast.dismiss(); // Remove loading toast
      console.error("Error submitting claim:", error);
      toast.error("Something went wrong while processing your claim.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white py-12">
  <div className="container mx-auto px-6 flex flex-col items-center">
    
    {/* Page Header */}
    <div className="text-center mb-10">
      <h2 className="text-3xl font-extrabold text-gray-900 relative inline-block">
        My Policies
        <span className="absolute w-2/3 h-1 bg-blue-600 rounded-full left-1/2 transform -translate-x-1/2 bottom-0"></span>
      </h2>
      <p className="text-gray-500 mt-2 text-lg">Here are your active policies.</p>
    </div>

    {/* Loading State */}
    {loading ? (
      <div className="flex flex-col justify-center items-center min-h-[40vh]">
        <ClipLoader color="#2563eb" loading={loading} size={40} />
        <p className="text-lg font-semibold text-blue-600 mt-3">Fetching your policies...</p>
      </div>
    ) : policies.length === 0 ? (
      <div className="text-center text-gray-500 text-lg font-semibold py-10">
        You have no active policies.
      </div>
    ) : (
      <div className="flex flex-col gap-6 w-full md:w-2/3">
        {policies?.map((policy) => (
          <div
            key={policy._id}
            className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col md:flex-row items-center md:items-start w-full p-5"
          >
            {/* Policy Image */}
            <img
              src={policy.imageUrl}
              alt={policy.policyName}
              className="w-full md:w-48 h-40 object-cover rounded-md"
            />

            {/* Policy Details */}
            <div className="md:ml-6 flex-1">
              <h3 className="text-xl font-bold text-gray-900">{policy.policyName}</h3>
              <p className="text-gray-600 text-sm mt-2">{policy.policyDescription}</p>

              <div className="mt-4 text-gray-700 space-y-1 text-sm">
                <p>
                  <span className="font-semibold text-blue-600">Coverage:</span> Rs.
                  {policy.coverageAmount.toLocaleString()}/-
                </p>
                <p>
                  <span className="font-semibold text-gray-500">Start Date:</span>{" "}
                  {new Date(policy.startDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold text-gray-500">End Date:</span>{" "}
                  {new Date(policy.endDate).toLocaleDateString()}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleViewDetails(policy._id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleClaimPolicy(policy._id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
                >
                  Claim Policy
                </button>
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


