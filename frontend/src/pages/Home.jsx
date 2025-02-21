import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import homeLogo from '../assets/team-image.webp'
export default function Home() {

  const navigate = useNavigate();

  return (
    <div>
     <div className="bg-white text-black text-[15px]">
    
    <Navbar/>

    <div className="px-4 sm:px-10">

      <div className="min-h-[500px]">
        <div className="grid md:grid-cols-2 justify-center items-center gap-10">
          <div className="max-md:order-1">
            <p className="mt-4 mb-2 font-semibold text-blue-600"><span className="rotate-90 inline-block mr-2">|</span> ALL IN
              ONE
              POLICY PLANNER</p>
            <h1 className="md:text-5xl text-4xl font-bold mb-4 md:!leading-[55px]">Manage policies and claims effortlessly</h1>
            <p className="mt-4 text-base leading-relaxed">With secure authentication, a user-friendly dashboard, and automated workflows, LumiClaim enhances the claims experience while ensuring transparency and efficiency in the insurance process. 🚀</p>
           
            <div className="mt-10 flex w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <div className="mt-10 flex w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
  
              <button
                type="button" onClick={()=>navigate('/policies')}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-lg py-3 rounded-full shadow-lg transition-all duration-300 transform hover:bg-blue-900 flex items-center justify-center gap-2">
                Explore All Policies
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 5l7 7m0 0l-7 7m7-7H4"
                  />
                </svg>
              </button>
            </div>

            </div>
          </div>
          <div className="max-md:mt-12 h-full">
            <img src={homeLogo} alt="banner img" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div className="mt-10 bg-gray-50 px-4 sm:px-10 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="md:text-center max-w-2xl mx-auto">
            <h2 className="md:text-4xl text-3xl font-bold mb-6">Discover Our Exclusive Features</h2>
            <p>Unlock a world of possibilities with our exclusive features. Explore how our unique offerings can
              transform your journey and empower you to achieve more.</p>
          </div>
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-10 mt-14">
  <div className="text-center">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 fill-blue-600 mb-4 inline-block" viewBox="0 0 32 32">
      <path d="M28.068 12h-.128a.934.934 0 0 1-.864-.6.924.924 0 0 1 .2-1.01l.091-.091a2.938 2.938 0 0 0 0-4.147l-1.511-1.51a2.935 2.935 0 0 0-4.146 0l-.091.091A.956.956 0 0 1 20 4.061v-.129A2.935 2.935 0 0 0 17.068 1h-2.136A2.935 2.935 0 0 0 12 3.932v.129a.956.956 0 0 1-1.614.668l-.086-.091a2.935 2.935 0 0 0-4.146 0l-1.516 1.51a2.938 2.938 0 0 0 0 4.147l.091.091a.935.935 0 0 1 .185 1.035.924.924 0 0 1-.854.579h-.128A2.935 2.935 0 0 0 1 14.932v2.136A2.935 2.935 0 0 0 3.932 20h.128a.934.934 0 0 1 .864.6.924.924 0 0 1-.2 1.01l-.091.091a2.938 2.938 0 0 0 0 4.147l1.51 1.509a2.934 2.934 0 0 0 4.147 0l.091-.091a.936.936 0 0 1 1.035-.185.922.922 0 0 1 .579.853v.129A2.935 2.935 0 0 0 14.932 31h2.136A2.935 2.935 0 0 0 20 28.068v-.129a.956.956 0 0 1 1.614-.668l.091.091a2.935 2.935 0 0 0 4.146 0l1.511-1.509a2.938 2.938 0 0 0 0-4.147l-.091-.091a.935.935 0 0 1-.185-1.035.924.924 0 0 1 .854-.58h.128A2.935 2.935 0 0 0 31 17.068v-2.136A2.935 2.935 0 0 0 28.068 12ZM29 17.068a.933.933 0 0 1-.932.932h-.128a2.956 2.956 0 0 0-2.083 5.028l.09.091a.934.934 0 0 1 0 1.319l-1.511 1.509a.932.932 0 0 1-1.318 0l-.09-.091A2.957 2.957 0 0 0 18 27.939v.129a.933.933 0 0 1-.932.932h-2.136a.933.933 0 0 1-.932-.932v-.129a2.951 2.951 0 0 0-5.028-2.082l-.091.091a.934.934 0 0 1-1.318 0l-1.51-1.509a.934.934 0 0 1 0-1.319l.091-.091A2.956 2.956 0 0 0 4.06 18h-.128A.933.933 0 0 1 3 17.068v-2.136A.933.933 0 0 1 3.932 14h.128a2.956 2.956 0 0 0 2.083-5.028l-.09-.091a.933.933 0 0 1 0-1.318l1.51-1.511a.932.932 0 0 1 1.318 0l.09.091A2.957 2.957 0 0 0 14 4.061v-.129A.933.933 0 0 1 14.932 3h2.136a.933.933 0 0 1 .932.932v.129a2.956 2.956 0 0 0 5.028 2.082l.091-.091a.932.932 0 0 1 1.318 0l1.51 1.511a.933.933 0 0 1 0 1.318l-.091.091A2.956 2.956 0 0 0 27.94 14h.128a.933.933 0 0 1 .932.932Z" data-original="#000000" />
      <path d="M16 9a7 7 0 1 0 7 7 7.008 7.008 0 0 0-7-7Zm0 12a5 5 0 1 1 5-5 5.006 5.006 0 0 1-5 5Z" data-original="#000000" />
    </svg>
    <h3 className="text-xl font-semibold mb-2">Customization</h3>
    <p>Tailor our product to fit your specific requirements and preferences.</p>
    <a href="#" className="text-blue-600 font-semibold inline-block mt-2 hover:underline">Learn more</a>
  </div>

  <div className="text-center">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 fill-blue-600 mb-4 inline-block" viewBox="0 0 682.667 682.667">
      <defs>
        <clipPath id="a" clipPathUnits="userSpaceOnUse">
          <path d="M0 512h512V0H0Z" data-original="#000000" />
        </clipPath>
      </defs>
      <g fill="none" className="stroke-blue-600" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth={40} clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
        <path d="M256 492 60 410.623v-98.925C60 183.674 137.469 68.38 256 20c118.53 48.38 196 163.674 196 291.698v98.925z" data-original="#000000" />
        <path d="M178 271.894 233.894 216 334 316.105" data-original="#000000" />
      </g>
    </svg>
    <h3 className="text-xl font-semibold mb-2">Security</h3>
    <p>Your data is securely protected with advanced encryption and safety measures.</p>
    <a href="#" className="text-blue-600 font-semibold inline-block mt-2 hover:underline">Learn more</a>
  </div>

  <div className="text-center">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 fill-blue-600 mb-4 inline-block" viewBox="0 0 512.001 512.001">
      <path d="M271.029 0c-33.091 0-61 27.909-61 61s27.909 61 61 61 60-27.909 60-61-26.909-61-60-61zm66.592 122c-16.485 18.279-40.096 30-66.592 30-26.496 0-51.107-11.721-67.592-30-14.392 15.959-23.408 36.866-23.408 59.059v59.085c-61.221 12.833-107.043 64.98-107.043 129.322v16.388c-40.352-17.21-79.917-30.828-121.564-42.549C7.871 278.697-5.43 286.206-2.523 297.575c3.063 10.633 17.158 17.675 27.973 14.305 38.765-15.292 79.519-26.705 120.948-38.385V389.47c0 64.336 50.587 116.44 113.718 121.698 63.347 5.426 117.472-46.228 122.808-109.464v-16.245c-58.86-4.718-105.024-56.524-105.024-116.363v-59.053c0-22.175 7.994-42.141 22.072-58.383 5.846 6.803 14.017 12.469 22.746 16.613 30.579 14.25 61.401 28.058 95.155 39.41 12.579 4.878 17.368 21.62 11.673 32.865-5.313 10.315-20.635 14.756-31.814 10.677z" data-original="#000000" />
    </svg>
    <h3 className="text-xl font-semibold mb-2">Performance</h3>
    <p>Experience seamless performance with fast load times and minimal downtime.</p>
    <a href="#" className="text-blue-600 font-semibold inline-block mt-2 hover:underline">Learn more</a>
  </div>
            </div>

            <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-10 mt-14">
  <div className="text-center">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 fill-blue-600 mb-4 inline-block" viewBox="0 0 32 32">
      <path d="M28.068 12h-.128a.934.934 0 0 1-.864-.6.924.924 0 0 1 .2-1.01l.091-.091a2.938 2.938 0 0 0 0-4.147l-1.511-1.51a2.935 2.935 0 0 0-4.146 0l-.091.091A.956.956 0 0 1 20 4.061v-.129A2.935 2.935 0 0 0 17.068 1h-2.136A2.935 2.935 0 0 0 12 3.932v.129a.956.956 0 0 1-1.614.668l-.086-.091a2.935 2.935 0 0 0-4.146 0l-1.516 1.51a2.938 2.938 0 0 0 0 4.147l.091.091a.935.935 0 0 1 .185 1.035.924.924 0 0 1-.854.579h-.128A2.935 2.935 0 0 0 1 14.932v2.136A2.935 2.935 0 0 0 3.932 20h.128a.934.934 0 0 1 .864.6.924.924 0 0 1-.2 1.01l-.091.091a2.938 2.938 0 0 0 0 4.147l1.51 1.509a2.934 2.934 0 0 0 4.147 0l.091-.091a.936.936 0 0 1 1.035-.185.922.922 0 0 1 .579.853v.129A2.935 2.935 0 0 0 14.932 31h2.136A2.935 2.935 0 0 0 20 28.068v-.129a.956.956 0 0 1 1.614-.668l.091.091a2.935 2.935 0 0 0 4.146 0l1.511-1.509a2.938 2.938 0 0 0 0-4.147l-.091-.091a.935.935 0 0 1-.185-1.035.924.924 0 0 1 .854-.58h.128A2.935 2.935 0 0 0 31 17.068v-2.136A2.935 2.935 0 0 0 28.068 12ZM29 17.068a.933.933 0 0 1-.932.932h-.128a2.956 2.956 0 0 0-2.083 5.028l.09.091a.934.934 0 0 1 0 1.319l-1.511 1.509a.932.932 0 0 1-1.318 0l-.09-.091A2.957 2.957 0 0 0 18 27.939v.129a.933.933 0 0 1-.932.932h-2.136a.933.933 0 0 1-.932-.932v-.129a2.951 2.951 0 0 0-5.028-2.082l-.091.091a.934.934 0 0 1-1.318 0l-1.51-1.509a.934.934 0 0 1 0-1.319l.091-.091A2.956 2.956 0 0 0 4.06 18h-.128A.933.933 0 0 1 3 17.068v-2.136A.933.933 0 0 1 3.932 14h.128a2.956 2.956 0 0 0 2.083-5.028l-.09-.091a.933.933 0 0 1 0-1.318l1.51-1.511a.932.932 0 0 1 1.318 0l.09.091A2.957 2.957 0 0 0 14 4.061v-.129A.933.933 0 0 1 14.932 3h2.136a.933.933 0 0 1 .932.932v.129a2.956 2.956 0 0 0 5.028 2.082l.091-.091a.932.932 0 0 1 1.318 0l1.51 1.511a.933.933 0 0 1 0 1.318l-.091.091A2.956 2.956 0 0 0 27.94 14h.128a.933.933 0 0 1 .932.932Z" data-original="#000000" />
      <path d="M16 9a7 7 0 1 0 7 7 7.008 7.008 0 0 0-7-7Zm0 12a5 5 0 1 1 5-5 5.006 5.006 0 0 1-5 5Z" data-original="#000000" />
    </svg>
    <h3 className="text-xl font-semibold mb-2">Scalability</h3>
    <p>Easily scale your solution to accommodate growing user demand without compromising performance .</p>
    <a href="#" className="text-blue-600 font-semibold inline-block mt-2 hover:underline">Learn more</a>
  </div>

  <div className="text-center">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 fill-blue-600 mb-4 inline-block" viewBox="0 0 682.667 682.667">
      <defs>
        <clipPath id="a" clipPathUnits="userSpaceOnUse">
          <path d="M0 512h512V0H0Z" data-original="#000000" />
        </clipPath>
      </defs>
      <g fill="none" className="stroke-blue-600" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth={40} clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
        <path d="M256 492 60 410.623v-98.925C60 183.674 137.469 68.38 256 20c118.53 48.38 196 163.674 196 291.698v98.925z" data-original="#000000" />
        <path d="M178 271.894 233.894 216 334 316.105" data-original="#000000" />
      </g>
    </svg>
    <h3 className="text-xl font-semibold mb-2">Integration</h3>
    <p>Your data is securely protected with advanced encryption and safety measures.</p>
    <a href="#" className="text-blue-600 font-semibold inline-block mt-2 hover:underline">Learn more</a>
  </div>

    <div className="text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 fill-blue-600 mb-4 inline-block" viewBox="0 0 512.001 512.001">
        <path d="M271.029 0c-33.091 0-61 27.909-61 61s27.909 61 61 61 60-27.909 60-61-26.909-61-60-61zm66.592 122c-16.485 18.279-40.096 30-66.592 30-26.496 0-51.107-11.721-67.592-30-14.392 15.959-23.408 36.866-23.408 59.059v59.085c-61.221 12.833-107.043 64.98-107.043 129.322v16.388c-40.352-17.21-79.917-30.828-121.564-42.549C7.871 278.697-5.43 286.206-2.523 297.575c3.063 10.633 17.158 17.675 27.973 14.305 38.765-15.292 79.519-26.705 120.948-38.385V389.47c0 64.336 50.587 116.44 113.718 121.698 63.347 5.426 117.472-46.228 122.808-109.464v-16.245c-58.86-4.718-105.024-56.524-105.024-116.363v-59.053c0-22.175 7.994-42.141 22.072-58.383 5.846 6.803 14.017 12.469 22.746 16.613 30.579 14.25 61.401 28.058 95.155 39.41 12.579 4.878 17.368 21.62 11.673 32.865-5.313 10.315-20.635 14.756-31.814 10.677z" data-original="#000000" />
        </svg>
        <h3 className="text-xl font-semibold mb-2">Customer Support:</h3>
        <p>Access 24/7 customer support to help you resolve any issues quickly and ensure a smooth experience</p>
        <a href="#" className="text-blue-600 font-semibold inline-block mt-2 hover:underline">Learn more</a>
    </div>
    </div>

        </div>
      </div>
      

      <div className="mt-10 bg-gray-50 px-4 sm:px-10 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 items-center gap-8">
            <div className="space-y-6 bg-gray-100 rounded-md p-6 max-w-md max-md:order-1">
              <div className="flex sm:items-center max-sm:flex-col-reverse">
                <div className="mr-3">
                  <h4 className="text-base font-semibold">John Doe</h4>
                  <p className="mt-2">Veniam proident aute magna anim excepteur et ex consectetur velit ullamco veniam minim
                    aute sit.</p>
                </div>
                <img src="https://readymadeui.com/profile_2.webp" className="w-16 h-16 rounded-full max-sm:mb-2" />
              </div>
              <div className="flex sm:items-center max-sm:flex-col-reverse p-6 relative lg:left-12 bg-white shadow-[0_2px_20px_-4px_rgba(93,96,127,0.2)] rounded-md">
                <div className="mr-3">
                  <h4 className="text-base font-semibold">Mark Adair</h4>
                  <p className="mt-2">Veniam proident aute magna anim excepteur et ex consectetur velit ullamco veniam minim
                    aute sit.</p>
                </div>
                <img src="https://readymadeui.com/profile_3.webp" className="w-16 h-16 rounded-full max-sm:mb-2" />
              </div>
              <div className="flex sm:items-center max-sm:flex-col-reverse">
                <div className="mr-3">
                  <h4 className="text-base font-semibold">Simon Konecki</h4>
                  <p className="mt-2">Veniam proident aute magna anim excepteur et ex consectetur velit ullamco veniam minim
                    aute sit.</p>
                </div>
                <img src="https://readymadeui.com/profile_4.webp" className="w-16 h-16 rounded-full max-sm:mb-2" />
              </div>
            </div>
            <div>
              <h6 className="text-xl font-bold text-gray-300 mb-4">Testimonials</h6>
              <h2 className="md:text-4xl text-3xl font-bold">We are loyal with our customer</h2>
              <div className="mt-4">
                <p>Veniam proident aute magna anim excepteur et ex consectetur velit ullamco veniam minim aute sit. Elit
                  occaecat officia et laboris Lorem minim. Officia do aliqua adipisicing ullamco in.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 py-3">
        <h2 className="md:text-4xl text-3xl font-bold text-center mb-14">Application Metrics</h2>
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-6 max-lg:gap-12">
          <div className="text-center">
            <h3 className="text-4xl font-semibold">5.4<span className="text-blue-600">M+</span></h3>
            <p className="text-base font-semibold mt-4">Total Users</p>
            <p className="mt-2">The total number of registered users on the platform.</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-semibold">$80<span className="text-blue-600">K</span></h3>
            <p className="text-base font-semibold mt-4">Revenue</p>
            <p className="mt-2">The total revenue generated by the application.</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-semibold">100<span className="text-blue-600">K</span></h3>
            <p className="text-base font-semibold mt-4">Engagement</p>
            <p className="mt-2">The level of user engagement with the application's content and features.</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-semibold">99.9<span className="text-blue-600">%</span></h3>
            <p className="text-base font-semibold mt-4">Server Uptime</p>
            <p className="mt-2">The percentage of time the server has been operational and available.</p>
          </div>
        </div>
      </div>


    </div>
    
    <div className='mt-20'>
    <Footer/>
    </div>

  </div>
</div>

  )
}
