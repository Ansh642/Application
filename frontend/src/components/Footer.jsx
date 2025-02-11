import React from 'react';

export default function Footer() {
  return (
    <div>
      <footer className="bg-blue-600 py-16">
        <div className="mx-auto max-w-screen-xl px-6 sm:px-8 lg:px-12">
          <div className="sm:flex sm:items-center sm:justify-between">
            {/* Logo section */}
            <div className="flex justify-center sm:justify-start items-center">
              <div className="text-center sm:text-left">
                <h2 className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text tracking-wide">
                  LumiClaim
                </h2>
              </div>
            </div>

            {/* Social media / Links section */}
            <div className="mt-8 sm:mt-0 flex justify-center sm:justify-end space-x-6">
              <a href="https://facebook.com" className="text-white text-xl hover:text-gray-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                  <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zm0 14a6 6 0 1 1 6-6 6 6 0 0 1-6 6zM9.93 6.267l.38-2.64H8.09v2.64h-.78V3.627h-.9v2.64H5.92v2.64h1.31V13h2.53V8.91h1.34l.18-2.64h-1.51z"/>
                </svg>
              </a>
              <a href="https://twitter.com" className="text-white text-xl hover:text-gray-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.04 0 9.353-5 9.353-9.334 0-.14 0-.277-.01-.415A6.646 6.646 0 0 0 16 3.545a6.595 6.595 0 0 1-1.889.518A3.253 3.253 0 0 0 15.552.537a6.565 6.565 0 0 1-2.084.796A3.259 3.259 0 0 0 7.877 4.693a9.225 9.225 0 0 1-6.71-3.4A3.255 3.255 0 0 0 2.62 4.57a3.258 3.258 0 0 0 1.027 4.347 3.26 3.26 0 0 1-1.48-.409v.042a3.257 3.257 0 0 0 2.606 3.17A3.27 3.27 0 0 1 1.5 12.28a3.243 3.243 0 0 0 3.03 2.248A6.522 6.522 0 0 1 0 13.124a9.29 9.29 0 0 0 5.026 1.477z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" className="text-white text-xl hover:text-gray-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                  <path d="M1.146 0A1.146 1.146 0 0 0 0 1.146v13.708A1.146 1.146 0 0 0 1.146 16h13.708a1.146 1.146 0 0 0 1.146-1.146V1.146A1.146 1.146 0 0 0 14.854 0H1.146zM4.898 13.75H2.721V6.507h2.177v7.243zM3.809 5.881c-.689 0-1.147-.467-1.147-1.049s.458-1.05 1.147-1.05c.688 0 1.147.467 1.147 1.05s-.458 1.049-1.147 1.049zM13.75 13.75h-2.178v-3.72c0-.888-.318-1.5-.963-1.5-.668 0-1.061.452-1.249.89-.064.15-.081.358-.081.568v3.72h-2.177v-7.243h2.177v.99c.29-.446.786-.99 1.735-.99 1.266 0 2.22.829 2.22 2.612v4.631z"/>
                </svg>
              </a>
            </div>

            {/* Copyright */}
            <div className="mt-8 sm:mt-0 text-center text-white text-sm">
              <p className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-lg">
                Copyright © 2025. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
