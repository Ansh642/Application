import React,{useState,useEffect} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';


export default function Policies() {

  const [policies, setpolicies] = useState([]);
  
  
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/get-policies");
        console.log(response.data.data);
        setpolicies(response.data.data);
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };
    fetchPolicies();
  }, [])
  
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

          {/* Policies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {policies?.map((policy, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-2xl w-[93%] mx-auto"
              >
                <img src={policy.imageUrl} alt={policy.policyName} className="w-full h-40 object-fill" />
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900">{policy.policyName}</h3>
                  <p className="text-gray-600 text-sm mt-2 h-16 overflow-hidden">{policy.policyDescription}</p>
                  <div className="mt-4 text-sm text-gray-700">
                    <p><span className="font-semibold text-blue-600">Coverage:</span> Rs.{policy.coverageAmount.toLocaleString() + "/-"}</p>
                    <p><span className="font-semibold text-gray-500">Start Date:</span> {new Date(policy.startDate).toLocaleDateString()}</p>
                  </div>
                  <button className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold transition-all duration-300">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <Footer/>
    </>
  );
}
