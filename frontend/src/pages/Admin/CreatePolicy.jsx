import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreatePolicyPage = () => {

  const [policyName, setPolicyName] = useState('');
  const [policyDescription, setPolicyDescription] = useState('');
  const [coverageAmount, setCoverageAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();  // Using useNavigate for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);  // Set loading to true when the request starts

    const policyData = new FormData();
    policyData.append('policyName', policyName);
    policyData.append('policyDescription', policyDescription);
    policyData.append('coverageAmount', coverageAmount);
    policyData.append('startDate', startDate);
    policyData.append('endDate', endDate);
    policyData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/api/create-policy', policyData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Policy Created:', response.data);
      
      // Show success toast
      toast.success('Policy created successfully!');
      
      // Navigate to the home page
      navigate('/');
    } catch (error) {
      console.error('Error creating policy:', error.response?.data || error.message);
      
      // Show error toast
      toast.error('Failed to create policy');
    } finally {
      setLoading(false);  // Set loading to false after the request completes (either success or error)
    }
  };
  

  return (
    <>
  <Navbar />

    <div className="bg-white text-gray-800">

      {/* Header Section */}
        <section className="bg-blue-900 text-white py-16 text-center">
          <h1 className="text-4xl font-bold">Create a New Policy</h1>
          <p className="mt-4 text-lg">
            Fill out the form below to create a new policy tailored for user needs.
          </p>
        </section>
      

        {/* Form Section */}
        <section className="py-16 px-4 bg-white text-gray-900">
          <div className="max-w-4xl mx-auto">
            <form
              onSubmit={handleSubmit}
              className="space-y-8 p-8 border border-gray-300 rounded-lg shadow-md">

              <h2 className="text-3xl text-center mx-auto font-extrabold text-gray-900 relative">
                Submit this Form
                <span className="absolute w-[20%] h-1 bg-blue-600 rounded-full left-1/2 transform -translate-x-1/2 bottom-0"></span>
              </h2>
              
              <div className="flex flex-col">
                <label htmlFor="policyName" className="text-gray-700 font-medium mb-2">
                  Policy Name
                </label>
                <input
                  type="text"
                  id="policyName"
                  name="policyName"
                  value={policyName}
                  onChange={(e) => setPolicyName(e.target.value)}
                  className="p-3 border capitalize border-gray-300 rounded-lg focus:outline-none text-base placeholder-gray-400"
                  placeholder="Enter policy name"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="policyDescription" className="text-gray-700 font-medium mb-2">
                  Policy Description
                </label>
                <textarea
                  id="policyDescription"
                  name="policyDescription"
                  value={policyDescription}
                  onChange={(e) => setPolicyDescription(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none text-base placeholder-gray-400"
                  placeholder="Enter policy description"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="coverageAmount" className="text-gray-700 font-medium mb-2">
                    Coverage Amount
                  </label>
                  <input
                    type="text"
                    id="coverageAmount"
                    name="coverageAmount"
                    value={coverageAmount}
                    onChange={(e) => setCoverageAmount(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none text-base placeholder-gray-400"
                    placeholder="Enter coverage amount"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="image" className="text-gray-700 font-medium mb-2">
                    Policy Image URL 
                  </label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    onChange={(e) => setImage(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none text-base placeholder-gray-400"
                    required
                    placeholder='Enter policy image URL'
                  />
                </div>
              </div>

              {/* {image && (
                <div className="flex justify-center mt-6">
                  <img
                    src={image}
                    alt="Policy Image"
                    className="w-40 h-40 object-cover rounded-lg shadow-md"
                  />
                </div>
              )} */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="startDate" className="text-gray-700 font-medium mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none text-base placeholder-gray-400"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="endDate" className="text-gray-700 font-medium mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none text-base placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <div className="text-center mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-300"
                >
                  {loading ? 'Creating Policy...' : 'Create Policy'}
                </button>

              </div>
            </form>
          </div>
        </section>

      </div>

      <Footer />
    </>

  );
};


export default CreatePolicyPage;

