"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import Image from "next/image";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";


const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
const pathname = usePathname();

  const checkAuth = () => {
    const token = Cookies.get("token");
    const storedEmail = localStorage.getItem("userEmail");
    setIsLoggedIn(!!token);
    setEmail(token && storedEmail ? storedEmail : null);
  };

  useEffect(() => {
    checkAuth();

    const handleLogin = () => checkAuth();
    window.addEventListener("user-logged-in", handleLogin);

    return () => {
      window.removeEventListener("user-logged-in", handleLogin);
    };
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    setEmail(null);
    window.location.href = "/login";
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <header className="bg-white border-b shadow-sm">
      <nav className="mx-auto max-w-7xl p-6 flex items-center justify-between">
        <div className="flex gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold text-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex gap-x-4 items-center">
          {!isLoggedIn && pathname !== "/login" && pathname !== "/signup" ? (
  <>
    <Link href="/login" className="text-sm font-semibold text-black">
      Log in
    </Link>
    <Link
      href="/signup"
      className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-white hover:text-black border border-gray-500"
    >
      Sign up
    </Link>
  </>
) : (
  isLoggedIn && (
    <>
      <span className="text-sm text-gray-700">{email}</span>
      <button onClick={handleLogout} className="text-sm font-semibold">
        Logout
      </button>
    </>
  )
)}

        </div>

        <div className="lg:hidden">
          <button
            className="-m-2.5 p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <FaBars className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <Dialog.Panel className="fixed inset-0 z-10 bg-white p-6">
          <div className="flex justify-between items-center">
            <Image src="/logo 1.png" width={40} height={40} alt="logo" />
            <FaXmark className="h-6 w-6" onClick={() => setMobileMenuOpen(false)} />
          </div>

          <div className="mt-6 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-base font-semibold"
              >
                {item.name}
              </Link>
            ))}

            {!isLoggedIn ? (
              <>
                <Link href="/login" className="block">
                  Login
                </Link>
                <Link href="/signup" className="block">
                  Signup
                </Link>
              </>
            ) : (
              <button onClick={handleLogout} className="text-black">
                Logout
              </button>
            )}
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Navbar;
