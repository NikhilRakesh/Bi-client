import Link from "next/link";
import { FaInstagram, FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="text-black font-ubuntu py-12 bg-gray-100 pt-10 ">
      <hr className=" border-gray-300 pb-10" />
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-ubuntuMedium font-semibold mb-4">
            Brands Info
          </h3>
          <p className="md:text-md sm:text-sm text-gray-500">
            Premium Dealers & Suppliers, Providing Quality Products and Services
            Worldwide.
          </p>
        </div>

        <div className="mb-12">
          <h4 className="text-xl font-ubuntuMedium font-semibold mb-4">
            Become a Part of the Upcoming and Fast-Expanding Community
          </h4>
          <p className=" sm:text-sm text-gray-500 text-left">
            Grow your business with BrandsInfo! Find the best deals and publish
            your business in your local area with us. Give your business the
            visibility it deserves.
            <br />
            Amplify your online presence and reach with BrandsInfo. In simple
            words, we’re here to seamlessly bridge the gap between B2B buyers
            and sellers. we focus on providing scalable solutions that empower
            businesses to grow. Our commitment to quality ensures that you
            receive only the best products and services, every time. Purchase
            our packages and expand your business through BrandsInfo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h4 className="text-xl font-ubuntuMedium font-semibold mb-4">
              Benefits for Buyers
            </h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>High-Quality Products</li>
              <li>Fast Delivery</li>
              <li>Trusted Dealers</li>
              <li>Competitive Pricing</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-ubuntuMedium font-semibold mb-4">
              Benefits for Dealers
            </h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>Global Exposure</li>
              <li>Easy Payment Methods</li>
              <li>Reliable Partnership</li>
              <li>Scalable Opportunities</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-ubuntuMedium font-semibold mb-4">
              Our Services
            </h4>
            <ul className="space-y-1 text-gray-600 text-sm">
              <li>
                <Link href="/services" className="hover:text-gray-400">
                  B2B Dealer Network
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-gray-400">
                  Premium Dealer Listings
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-gray-400">
                  Custom Business Solutions
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-gray-400">
                  Marketplace Integration
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-ubuntuMedium font-semibold mb-4">
              Our Expertise
            </h4>
            <p className="text-gray-600 text-sm ">
              At <span className="font-semibold">BrandsInfo</span>, we pride
              ourselves on offering unparalleled expertise in connecting buyers
              with premium dealers and suppliers. Our extensive network ensures
              access to high-quality products, backed by trusted relationships
              that prioritize transparency, reliability, and customer
              satisfaction.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h4 className="text-xl font-ubuntuMedium font-semibold mb-4 ">
              Policies
            </h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>
                <Link
                  href="/terms-and-condition"
                  className="hover:text-blue-600 cursor-pointer hover:underline"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-blue-600 cursor-pointer hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className="hover:text-blue-600 cursor-pointer hover:underline"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-ubuntuMedium font-semibold mb-4">
              Contact Us
            </h4>
            <ul className="space-y-1 text-gray-600 text-sm">
              {/* <li>
                <Link
                  href="/contact"
                  className="hover:text-blue-600 cursor-pointer hover:underline"
                >
                  Get in Touch
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="hover:text-blue-600 cursor-pointer hover:underline"
                >
                  Support
                </Link>
              </li> */}
              <li>brandsinfoguide@gmail.com</li>
              <li>+91 90957 30182</li>
              <li>
                MG Pudhur, kRC Complex 1st Floor, Tirupur, TamilNadu, 641606
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-ubuntuMedium font-semibold mb-4">
              About Us
            </h4>
            <ul className="space-y-1 text-gray-600 text-sm">
              <li>
                <Link
                  href="/about-us"
                  className="hover:text-blue-600 cursor-pointer hover:underline"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/mission"
                  className="hover:text-blue-600 cursor-pointer hover:underline"
                >
                  Our Mission
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-ubuntuMedium font-semibold mb-4">
              Careers
            </h4>
            <ul className="space-y-1 text-gray-600 text-sm">
              <li>
                <Link
                  href="/careers"
                  className="hover:text-blue-600 cursor-pointer hover:underline"
                >
                  Join Us
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/careers"
                  className="hover:text-blue-600 cursor-pointer hover:underline"
                >
                  Current Openings
                </Link>
              </li> */}
            </ul>
          </div>
        </div>

        <div className="flex justify-center space-x-8 mb-8">
          <a
            href="https://x.com/Brandsinfoguide"
            target="_blank"
            className="text-2xl hover:text-gray-400"
            rel="noopener noreferrer"
          >
            <FaSquareXTwitter />
          </a>
          <a
            href="https://www.instagram.com/brandsinfo_in/"
            target="_blank"
            className="text-2xl hover:text-gray-400"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.facebook.com/brandsinfo/"
            target="_blank"
            className="text-2xl hover:text-gray-400"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://linkedin.com/company/brandsinfo/"
            target="_blank"
            className="text-2xl hover:text-gray-400"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.youtube.com/@Brandsinfobi"
            target="_blank"
            className="text-2xl hover:text-gray-400"
            rel="noopener noreferrer"
          >
            <FaYoutube />
          </a>
        </div>

        <div className="text-center mb-8">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} BrandsInfo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
