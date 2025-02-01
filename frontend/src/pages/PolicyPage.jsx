import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AppContext } from "../context/User";
import toast from 'react-hot-toast';

export default function PolicyDetail() {
  const { id } = useParams(); // Get the policy ID from URL
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false); // New state to track buy process
  const { auth, setauth } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/get-policy/${id}`);
        setPolicy(response.data.data);
      } 
      catch (error) {
        console.error("Error fetching policy details:", error);
      } 
      finally {
        setLoading(false);
      }
    };

    fetchPolicy();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
        {/* Spinner Animation */}
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-opacity-50"></div>
  
        {/* Loading Text */}
        <p className="text-lg font-semibold text-blue-700 mt-4 animate-pulse">
          Fetching Policy Details...
        </p>
      </div>
    );
  }
  

  if (!policy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-red-600">Policy Not Found!</p>
      </div>
    );
  }

  const buyPolicy = async () => {
    if (!auth.user) {
      toast.error("Please Login first");
      return;
    }

    if(auth.user.role ==1)
    {
      toast.error("Only a user can buy policies");
      return;
    }

    setBuying(true); // Start the buying process, disable the button

    try {
      const response = await axios.post(`http://localhost:5000/api/buy-policy/${id}`);
      if (response.data.data) {
        toast.success("Policy was successfully bought!");
        navigate('/');
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setBuying(false); // End the buying process, re-enable the button
    }
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 py-16 flex justify-center items-center">
        <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-2xl w-full border border-gray-200">
          {/* Policy Image */}
          <div className="relative">
            <img
              src={policy.imageUrl}
              alt={policy.policyName}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg"></div>
          </div>

          {/* Policy Information */}
          <div className="mt-6">
            <h2 className="text-3xl font-bold text-gray-900">{policy.policyName}</h2>
            <p className="text-gray-500 text-base mt-2 leading-relaxed">{policy.policyDescription}</p>

            {/* Coverage & Dates */}
            <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-lg font-semibold text-blue-600">
                Coverage Amount: <span className="text-gray-900">Rs. {policy.coverageAmount.toLocaleString()}/-</span>
              </p>
              <div className="flex justify-between mt-3">
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-gray-900">Start Date:</span> {new Date(policy.startDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-gray-900">End Date:</span> {new Date(policy.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={buyPolicy}
              disabled={buying} // Disable the button while buying
              className={`bg-blue-600 text-white px-6 py-3 text-lg rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300 ${buying ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {buying ? (
                <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-white"></div>
              ) : (
                "Buy Policy"
              )}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
