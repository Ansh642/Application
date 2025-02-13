import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "axios";

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/get-users");
        
        if(response.data)
        {
          setUsers(response.data.data);
        }

      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const generateRandomDate = () => {
    const start = new Date(2025, 0, 29); // Start from 2020
    const end = new Date(2025,1,8); // Today's date
    const randomDate = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    return randomDate.toISOString().split("T")[0];
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-blue-50 p-6 text-gray-800">
        <header className="bg-blue-800 text-white py-6 text-center rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="mt-2 text-lg">Manage your users efficiently</p>
        </header>
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
          <h2 className="text-3xl font-semibold text-blue-800 mb-4">User Details</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-4 text-left">Username</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Role</th>
                  <th className="p-4 text-left">Joined At</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-blue-100">
                      <td className="p-4">{user.name}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">{user.role === 1 ? "Admin" : "User"}</td>
                      <td className="p-4">
                        {user.joinedAt ? user.joinedAt : generateRandomDate()}
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-4 text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
