import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800">

        <Navbar/>
      {/* Header Section */}
      <section className="bg-blue-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="mt-4 text-lg">Discover our vision, our mission, and the people behind the innovation.</p>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 px-4 bg-white text-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-blue-900">Our Mission</h2>
          <p className="mt-4 text-lg">
            At LumiClaim, our mission is to empower individuals and businesses with innovative, user-friendly solutions designed to streamline operations and enhance productivity. We believe in delivering exceptional quality and creating lasting relationships with our clients.
          </p>
          <div className="mt-8">
            <img src="https://img.freepik.com/premium-photo/man-touching-mission-text-screen_218381-4228.jpg" alt="Team Image" className="mx-auto rounded-lg shadow-lg w-[50%] h-80 max-w-4xl"/>
          </div>
        </div>
      </section>



      {/* Core Values Section */}
      <section className="py-16 px-4 bg-white -mt-10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-blue-900">Core Values</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <div className="text-4xl text-blue-900">💡</div>
              <h3 className="text-xl font-semibold mt-2">Innovation</h3>
              <p className="mt-2 text-gray-600">We strive to bring creative ideas to life, providing cutting-edge solutions to modern-day challenges.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl text-blue-900">🤝</div>
              <h3 className="text-xl font-semibold mt-2">Customer Success</h3>
              <p className="mt-2 text-gray-600">Our clients’ success is our success. We work closely with them to ensure they achieve their goals.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl text-blue-900">⚖️</div>
              <h3 className="text-xl font-semibold mt-2">Integrity</h3>
              <p className="mt-2 text-gray-600">We believe in honesty, transparency, and ethical business practices.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl text-blue-900">🏆</div>
              <h3 className="text-xl font-semibold mt-2">Excellence</h3>
              <p className="mt-2 text-gray-600">We are committed to delivering top-tier service and products that exceed expectations.</p>
            </div>
          </div>
        </div>
      </section>


      

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 bg-white text-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-blue-900">Why Choose Us?</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="text-4xl text-blue-900">🏅</div>
              <h3 className="text-xl font-semibold mt-4">Proven Track Record</h3>
              <p className="mt-2 text-gray-600">With years of experience in the industry, we’ve helped hundreds of businesses achieve their goals with our comprehensive solutions.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl text-blue-900">🛠</div>
              <h3 className="text-xl font-semibold mt-4">Tailored Solutions</h3>
              <p className="mt-2 text-gray-600">We offer customized services that fit the specific needs of each client, ensuring optimal results.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl text-blue-900">📞</div>
              <h3 className="text-xl font-semibold mt-4">Support & Collaboration</h3>
              <p className="mt-2 text-gray-600">We’re with you every step of the way, offering dedicated support to ensure your success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      {/* <section className="py-16 px-4 bg-gray-100 text-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-blue-900">Let’s Get in Touch!</h2>
          <p className="mt-4 text-lg">We’d love to hear from you! Whether you have questions about our services or want to explore potential partnerships, feel free to reach out to us.</p>
          <form className="mt-8 max-w-lg mx-auto space-y-4">
            <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your Name" />
            <input type="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your Email" />
            <textarea className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your Message" rows="4"></textarea>
            <button type="submit" className="w-full py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Send Message
            </button>
          </form>
        </div>
      </section> */}

      <Footer/>
    </div>
  );
};

export default AboutUs;
