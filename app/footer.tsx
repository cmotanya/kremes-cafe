"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-stone-800 py-12 text-white mt-[23rem]">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-3">
        <div>
          <h3 className="mb-4 text-xl font-bold">About Us</h3>
          <p className="text-gray-300">
            Passionate about creating exceptional dining experiences with fresh,
            locally-sourced ingredients.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-bold">Quick Links</h3>
          <nav className="space-y-2">
            <Link href="/menu" className="block hover:text-gray-300">
              Menu
            </Link>
            <Link href="/reservations" className="block hover:text-gray-300">
              Reservations
            </Link>
            <Link href="/catering" className="block hover:text-gray-300">
              Catering
            </Link>
            <Link href="/contact" className="block hover:text-gray-300">
              Contact
            </Link>
          </nav>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-bold">Connect With Us</h3>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-gray-300">
              <Facebook size={24} />
            </Link>
            <Link href="#" className="hover:text-gray-300">
              <Instagram size={24} />
            </Link>
            <Link href="#" className="hover:text-gray-300">
              <Twitter size={24} />
            </Link>
          </div>
          <div className="mt-4 text-gray-300">
            <p>123 Culinary Street</p>
            <p>Foodville, ST 12345</p>
            <p>Phone: (555) 123-4567</p>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center">
        <p>&copy; 2024 Delicious Dining. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
