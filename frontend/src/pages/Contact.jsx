import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Show toast message
   

    // Simulate a delay (2 seconds), then navigate to home
    setTimeout(() => {
      setLoading(false);
      navigate("/");
      toast.success("Support team will contact you shortly!", {
        duration: 2000,
        position: "top-center",
      });
    }, 2000);
  };

  return (
    <div>
      <Navbar />

      {/* Header Section */}
      <section className="py-16 bg-blue-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Let's Connect</h1>
          <p className="text-lg text-white mb-8">
            We would love to hear from you! Whether you have a project idea, a question, or just want to talk, feel free to reach out.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <div className="mt-16">
        <div className="grid md:grid-cols-2 items-start gap-12 px-8 py-12 mx-auto max-w-6xl bg-white shadow-xl rounded-md">
          
          {/* Left Column: Contact Information */}
          <div>
            <h2 className="text-3xl text-gray-800 font-semibold mb-4">Contact Info</h2>
            <p className="text-lg text-gray-500 mb-8">
              If you have a big idea or need assistance with your project, we’re here to help!
            </p>
            
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-gray-800">Email</h3>
              <a href="mailto:LumiClaim@example.com" className="text-blue-500 text-lg hover:underline mt-4 inline-block">
                LumiClaim@example.com
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div>
            <h2 className="text-3xl text-gray-800 font-semibold mb-6">Send Us a Message</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input type="text" placeholder="Name" className="w-full px-4 py-2 text-gray-800 rounded-md border text-sm focus:border-blue-500 focus:outline-none" required />
              <input type="email" placeholder="Email" className="w-full px-4 py-2 text-gray-800 rounded-md border text-sm focus:border-blue-500 focus:outline-none" required />
              <input type="text" placeholder="Subject" className="w-full px-4 py-2 text-gray-800 rounded-md border text-sm focus:border-blue-500 focus:outline-none" required />
              <textarea placeholder="Message" rows="6" className="w-full px-4 py-2 text-gray-800 rounded-md border text-sm focus:border-blue-500 focus:outline-none" required></textarea>
              
              <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md">
                {loading ? (
                  <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
}
