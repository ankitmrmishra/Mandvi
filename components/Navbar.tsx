import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-center py-4 z-10   bg-[#0c1015]">
        <div className="bg-black text-white rounded-full px-6 py-2 ">
          <ul className="flex space-x-6 text-sm">
            <li>
              <a href="/" className="hover:text-gray-300">
                Home
              </a>
            </li>
            <li>
              <a href="#CaseStudy" className="hover:text-gray-300">
                Case Study
              </a>
            </li>
            <li>
              <a href="#About" className="hover:text-gray-300">
                About
              </a>
            </li>
            <li>
              <a href="#FAQ" className="hover:text-gray-300">
                FAQ
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
