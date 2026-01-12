import React from "react";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#FFF7F0] border-t border-accent/20 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column - Links */}
          <div className="md:col-span-3 lg:col-span-4">
            <div className="flex flex-col items-center md:items-start space-y-6">
              <h3 className="font-brand text-lg font-semibold text-text">
                Quick Links
              </h3>
              <ul className="grid grid-cols-1 gap-3 text-center md:text-left">
                {["Home", "Menu", "About Us", "Contact"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-text hover:text-accent transition-colors duration-200 text-sm md:text-base hover:underline hover:underline-offset-4"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Center Column - Brand */}
          <div className="md:col-span-6 lg:col-span-4">
            <div className="flex flex-col items-center space-y-4">
              <h2 className="font-logo text-4xl text-accent tracking-wider">
                Cookieist
              </h2>
                <p className="mt-2 text-text text-center text-sm md:text-base leading-relaxed max-w-xs md:max-w-sm">
                Freshly baked cookies made with love.  
                Crafted to bring sweetness to your everyday moments 🍪
              </p>
            
              {/* Newsletter Signup */}
            
            </div>
          </div>

          {/* Right Column - Contact & Social */}
          <div className="md:col-span-3 lg:col-span-4">
            <div className="flex flex-col items-center md:items-end space-y-6">
              <h3 className="font-brand text-lg font-semibold text-text">
                Stay Connected
              </h3>
              
              <div className="flex flex-col items-center md:items-end space-y-4">
                <div className="flex gap-4">
                  <a 
                    href="#" 
                    className="p-2 rounded-full border border-accent/20 hover:border-accent hover:bg-accent/5 transition-all duration-200"
                  >
                    <Facebook className="w-5 h-5 text-text hover:text-accent" />
                  </a>
                  <a 
                    href="#" 
                    className="p-2 rounded-full border border-accent/20 hover:border-accent hover:bg-accent/5 transition-all duration-200"
                  >
                    <Instagram className="w-5 h-5 text-text hover:text-accent" />
                  </a>
                  <a 
                    href="#" 
                    className="p-2 rounded-full border border-accent/20 hover:border-accent hover:bg-accent/5 transition-all duration-200"
                  >
                    <Twitter className="w-5 h-5 text-text hover:text-accent" />
                  </a>
                </div>
                

              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 pt-6 border-t border-accent/20">
          
          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-text text-sm">
              © {new Date().getFullYear()} Cookieist. All rights reserved.
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-text hover:text-accent transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-text hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-text hover:text-accent transition-colors">
                Cookie Policy
              </a>
            </div>
            
            <div className="text-text text-sm">
              Made with ❤️ and 🍪
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;