import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AppContext } from "../context/User";
import toast from 'react-hot-toast';

export default function PolicyDetail() {

  const { id } = useParams();
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);
  const [formVisible, setFormVisible] = useState(false);  
  const inputRef = useRef(null);

  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    medicalHistory: '',
    startDate: '',
    endDate: ''
  });

  const { auth } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/get-policy/${id}`);
        setPolicy(response.data.data);
      } catch (error) {
        console.error("Error fetching policy details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicy();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-opacity-50"></div>
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

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const buyPolicy = () => {
    if (!auth.user) {
      navigate('/login');
      toast.error("Please Login first");
      return;
    }

    if (auth.user.role === 1) {
      toast.error("Only a user can buy policies");
      return;
    }

    setFormVisible(true); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormVisible(false);
    setBuying(true);
  
    try {
      const response = await axios.post(`http://localhost:5000/api/buy-policy/${id}`, {
        ...formData,
        userId: auth.user._id,  // Attach the user ID
      });
  
      if (response.data.data) {
        toast.success("Policy was successfully bought!");
        navigate('/my-policies');
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setBuying(false);
    }
  };
   

  return (
    <>

    <div className={`min-h-screen transition duration-300 ${formVisible ? 'blur-sm' : ''}`}>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 py-16 flex justify-center items-center">
        <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-2xl w-full border border-gray-200">
          <div className="relative">
            <img
              src={policy.imageUrl}
              alt={policy.policyName}
              className="w-full h-72 object-fill rounded-lg shadow-md"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg"></div>
          </div>

          <div className="mt-6">
            <h2 className="text-3xl font-bold text-gray-900">{policy.policyName}</h2>
            <p className="text-gray-500 text-base mt-2 leading-relaxed">{policy.policyDescription}</p>

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

          <div className="mt-8 flex justify-center">
            <button
              onClick={buyPolicy}
              disabled={buying}
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

    </div>

       {/* Form for Policy Purchase */}
      {formVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-xl w-[30%]">
            <h3 className="text-xl font-semibold mb-4">Enter Your Details</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="text"
                name="age"
                ref={inputRef}
                value={formData.age}
                onChange={handleFormChange}
                placeholder="Write your age"
                className="w-full p-2 border rounded-lg focus:outline-none"
                required
              />
            </div>


            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleFormChange}
                className="w-full p-2 border rounded-lg focus:outline-none"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Medical History</label>
              <textarea
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleFormChange}
                rows={3}
                placeholder="Mention your recent medical history"
                className="w-full p-2 border rounded-lg focus:outline-none capitalize"
                required
              />
            </div>

            <div className="mb-4 flex justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-lg focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-lg focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="flex justify-center gap-6">
            <button onClick={()=>setFormVisible(false)}
                type="submit"
                className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-red-700 transition duration-300"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

    </>

  );
}

