import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";

export default function MyApprovals() {
  const [claims, setClaims] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingClaims = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/pending-claims");

        // Destructure the claims and userDetails from the response
        const { claims, userDetails } = response.data;

        setClaims(claims);
        setUserDetails(userDetails);
      } catch (error) {
        console.error("Error fetching claims:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingClaims();
  }, []);

  const handleUpdateClaim = async (claimId, status) => {
    try {
      toast.loading("Processing...");

      const response = await axios.post("http://localhost:5000/api/update-claim-status", {
        claimId,
        status,
      });

      toast.dismiss(); 
      if (response.data.success) {
        toast.success(`Claim ${status} successfully!`);
        
        // Remove the updated claim from the UI
        setClaims((prevClaims) => prevClaims.filter(claim => claim._id !== claimId));
      } else {
        toast.error("Failed to update claim status.");
      }
    } catch (error) {
      toast.dismiss();
      console.error("Error updating claim status:", error);
      toast.error("Something went wrong while processing the claim.");
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
              Approve Claims
              <span className="absolute w-2/3 h-1 bg-red-600 rounded-full left-1/2 transform -translate-x-1/2 bottom-0"></span>
            </h2>
            <p className="text-gray-500 mt-2 text-lg">Review and approve user claim requests.</p>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col justify-center items-center min-h-[40vh]">
              <ClipLoader color="#e11d48" loading={loading} size={40} />
              <p className="text-lg font-semibold text-red-600 mt-3">Fetching claims...</p>
            </div>
          ) : claims?.length === 0 ? (
            <div className="text-center text-gray-500 text-lg font-semibold py-10">
              No pending claims for approval.
            </div>
          ) : (
            <div className="flex flex-col gap-6 w-full md:w-2/3">
              {claims?.map((claim, index) => (
                <div
                  key={claim._id}
                  className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col md:flex-row items-center md:items-start w-full p-5"
                >
                  {/* Policy Image */}
                  <img
                    src={claim.policyId.imageUrl || "https://via.placeholder.com/150"}
                    alt={claim.policyId.policyName}
                    className="w-full md:w-48 h-40 object-cover rounded-md"
                  />

                  {/* Claim Details */}
                  <div className="md:ml-6 flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{claim.policyId.policyName}</h3>
                    <p className="text-gray-600 text-sm mt-2">{claim.policyId.policyDescription}</p>

                    <div className="mt-4 text-gray-700 space-y-1 text-sm">
                      <p>
                        <span className="font-semibold text-red-600">Claim Amount:</span> Rs.
                        {claim.claimAmount.toLocaleString()}/-
                      </p>
                      <p>
                        <span className="font-semibold text-gray-500">User:</span> {claim.claimholderId.name} ({claim.claimholderId.email})
                      </p>
                      <p>
                        <span className="font-semibold text-gray-500">Request Date:</span>{" "}
                        {new Date(claim.claimDate).toLocaleDateString()}
                      </p>

                      <p>
                        <span className="font-semibold text-gray-500 capitalize">Claim reason: </span>{" "}
                        {claim.claimReason}
                      </p>

                    </div>

                    {/* Additional User Details */}
                    {userDetails[index] && (
                      <div className="mt-4 text-gray-700 space-y-1 text-sm">
                        <p>
                          <span className="font-semibold text-gray-500">Age:</span> {userDetails[index].age}
                        </p>
                        <p>
                          <span className="font-semibold text-gray-500">Gender:</span> {userDetails[index].gender}
                        </p>
                        <p>
                          <span className="font-semibold text-gray-500 ">Medical History:</span> {userDetails[index].medicalHistory.charAt(0).toUpperCase() + userDetails[index].medicalHistory.slice(1).toLowerCase()}
                        </p>
                        {/* <p>
                          <span className="font-semibold text-gray-500">Policy Start Date:</span> {new Date(userDetails[index].startDate).toLocaleDateString()}
                        </p>
                        <p>
                          <span className="font-semibold text-gray-500">Policy End Date:</span> {new Date(userDetails[index].endDate).toLocaleDateString()}
                        </p> */}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => handleUpdateClaim(claim._id, "Approved")}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleUpdateClaim(claim._id, "Rejected")}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
                      >
                        Reject
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
