import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

export default function AiAssistant() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate  = useNavigate();

  const handleGenerateResponse = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/ask-ai', { prompt });
      console.log(res.data.data);
      setResponse(res.data.data);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setResponse('Error fetching response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Header Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-center text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-extrabold mb-4">AI Assistant</h1>
          <p className="text-xl mb-8">Enter your query and get AI-powered insights instantly.</p>
        </div>
      </section>

      {/* AI Prompt Section */}
      <div className="mt-12 flex justify-center">
        <div className="max-w-4xl w-full px-8 py-12 bg-white shadow-2xl rounded-lg text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-1">Ask Your Question</h2>
          <p className="text-lg text-gray-500 mb-4">Still confused about which policy to buy? We got you covered!</p>
          <textarea 
            className="w-full px-4 py-3 text-gray-800 rounded-md border border-gray-300 outline-none transition" 
            rows="6" 
            placeholder="Type your prompt here..." 
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          <button 
            className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition flex items-center justify-center gap-2" 
            onClick={handleGenerateResponse} 
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
            ) : (
              <>
                
                Generate Response
              </>
            )}
          </button>

          {response && (
          <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl text-left shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">AI Suggestion:</h3>
            <p className="text-gray-700 leading-relaxed">{response}</p>

            <button 
              onClick={() => navigate('/policies')}
              className="mt-6 w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow-md transition-all"
            >
              View Recommended Policies
            </button>
          </div>
        )}

        </div>
      </div>

      {/* Footer */}
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
}