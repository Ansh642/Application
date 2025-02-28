import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/User';
import toast from 'react-hot-toast';

export default function Navbar() {
  const navigate = useNavigate();
  const { auth, setauth } = useContext(AppContext);
  const [show, setShow] = useState(false); 

  const logoutHandler = (e) => {
    e.preventDefault();

    localStorage.removeItem('auth');
    setauth({
      ...auth,
      user: null,
      token: null,
    });
    toast.success('Logged out successfully');
    navigate('/');
    setShow(false);
  };


  return (
    <div>
      <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50">
        <div className="flex flex-wrap items-center justify-between gap-5 w-full">
          <div
            className="text-3xl font-extrabold text-white bg-gradient-to-r from-blue-500 to-blue-700 px-4 py-2 rounded-lg shadow-lg cursor-pointer"
            onClick={() => navigate('/')}
          >
            Lumi<span className="text-yellow-300">Claim</span>
          </div>
          <div
            id="collapseMenu"
            className="max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50">
            <button
              id="toggleClose"
              className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 fill-black"
                viewBox="0 0 320.591 320.591"
              >
                <path
                  d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                  data-original="#000000"
                />
                <path
                  d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                  data-original="#000000"
                />
              </svg>
            </button>
            <ul className="lg:flex gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
              <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                <div
                  onClick={() => navigate('/')}
                  className="hover:text-[#007bff] cursor-pointer  text-gray-500 block  text-lg"
                >
                  Home
                </div>
              </li>

              <li
                onClick={() => navigate('/about')}
                className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                <a
                  href="javascript:void(0)"
                  className="hover:text-[#007bff] text-gray-500 block text-lg ">
                  About
                </a>
              </li>
              <li
                onClick={() => navigate('/contact')}
                className="max-lg:border-b border-gray-300 max-lg:py-3 px-3"
              >
                <a
                  href="javascript:void(0)"
                  className="hover:text-[#007bff] text-gray-500 block text-lg ">
                  Contact
                </a>
              </li>

              <li
                onClick={() => navigate('/policies')}
                className="max-lg:border-b border-gray-300 max-lg:py-3 px-3"
              >
                <a
                  href="javascript:void(0)"
                  className="hover:text-[#007bff] text-gray-500 block text-lg ">
                  Policies
                </a>
              </li>

              <li
                onClick={() => navigate('/ask-ai')}
                className="relative max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                <a className="hover:text-[#007bff] text-gray-500 block text-lg cursor-pointer relative">
                  Ask AI
                  <span className="absolute -top-2 -right-5 text-[15px] text-yellow-400">⭐</span>
                </a>
              </li>

            </ul>
          </div>

          <div className="flex max-lg:ml-auto space-x-4">
            {auth?.token ? (
              <div className="flex flex-row cursor-pointer gap-6 items-center">
                <div className="flex items-center cursor-pointer">
                  <img
                    src={auth.user?.image}
                    alt="User Profile"
                    className="rounded-full h-9 w-9 object-contain mr-10"
                    onClick={() => setShow(!show)}
                  />
            </div>

      <div
        className={`w-36 h-auto bg-white border-[1px] border-gray-300 shadow-lg z-30 right-16 absolute rounded-lg px-1 py-1 top-16 cursor-pointer transition-all duration-300 ${
          show ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex flex-col gap-2 justify-start px-1 py-1 text-lg mt-2">
          {auth.user?.role === 0 ? (
            <>
              <p
                className="text-blue-700 hover:bg-blue-100 rounded-lg px-2 py-1"
                onClick={() => navigate('/my-policies')}
              >
                My Policies
              </p>

              <p
                className="text-blue-700 hover:bg-blue-100 rounded-lg px-2 py-1"
                onClick={() => navigate('/my-claims')}
              >
                My Claims
              </p>
            </>
          ) : (
            <>
            <p
              className="text-blue-700 hover:bg-blue-100 rounded-lg px-2 py-1"
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </p>

            <p
              className="text-blue-700 hover:bg-blue-100 rounded-lg px-2 py-1"
              onClick={() => navigate('/create-policy')}
            >
              New Policy
            </p>

            <p
              className="text-blue-700 hover:bg-blue-100 rounded-lg px-2 py-1"
              onClick={() => navigate('/my-approvals')}
            >
            Approvals
            </p>
            </>
          )}

          <p
            className="text-blue-700 hover:bg-blue-100 rounded-lg px-2 py-1"
            onClick={logoutHandler}
          >
            Log out
          </p>
        </div>
      </div>
    </div>
  ) : null}

  {!auth?.token && (
    <button
      className="px-3 py-3 mr-6 bg-blue-600 text-base rounded-[10px] hover:bg-blue-700 transition-all duration-200 text-white"
      onClick={() => navigate('/signup')}
    >
      Get Started
    </button>
  )}
</div>

        </div>
      </header>
    </div>
  );
}

