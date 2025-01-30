import React from 'react'

export default function Footer() {
  return (
    <div>
  <footer className="bg-gray-50 px-4 sm:px-10 py-12 mt-2 w-[97%] mx-auto">
      
      <div className="grid max-sm:grid-cols-1 max-xl:grid-cols-2 xl:grid-cols-5 gap-8 border-t border-gray-300 pt-8">
        <div className="xl:col-span-2">
          <h4 className="text-xl font-semibold mb-6">Disclaimer</h4>
          <p className="mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida,
            mi eu pulvinar cursus, sem elit interdum mauris.</p>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-6">Services</h4>
          <ul className="space-y-4">
            <li><a href="javascript:void(0)" className="hover:text-blue-600">Web Development</a></li>
            <li><a href="javascript:void(0)" className="hover:text-blue-600">Mobile App
                Development</a></li>
            <li><a href="javascript:void(0)" className="hover:text-blue-600">UI/UX
                Design</a></li>
            <li><a href="javascript:void(0)" className="hover:text-blue-600">Digital Marketing</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-6">Resources</h4>
          <ul className="space-y-4">
            <li><a href="javascript:void(0)" className="hover:text-blue-600">Webinars</a>
            </li>
            <li><a href="javascript:void(0)" className="hover:text-blue-600">Ebooks</a>
            </li>
            <li><a href="javascript:void(0)" className="hover:text-blue-600">Templates</a>
            </li>
            <li><a href="javascript:void(0)" className="hover:text-blue-600">Tutorials</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-4">About Us</h4>
          <ul className="space-y-4">
            <li><a href="javascript:void(0)" className="hover:text-blue-600">Our Story</a>
            </li>
            <li><a href="javascript:void(0)" className="hover:text-blue-600">Mission and
                Values</a></li>
            <li><a href="javascript:void(0)" className="hover:text-blue-600">Team</a></li>
            <li><a href="javascript:void(0)" className="hover:text-blue-600">Testimonials</a></li>
          </ul>
        </div>
      </div>
      <p className="mt-10">© 2025<a href="https://readymadeui.com/" target="_blank" className="hover:underline mx-1">LumiClaim</a>All Rights Reserved.</p>
    </footer>
    </div>

  )
}
