"use client"; // make it a client component

import Link from "next/link";

export default function Navbar() {
  return (
 <div className="bg-[#E9E6DB] w-full shadow">
  <nav className="w-9/12 mx-auto px-6 py-4 flex justify-between items-center rounded-md">
    <Link href="/" className="text-2xl font-bold text-[#0A090C]">
      BookApp
    </Link>

  <div className="flex items-center space-x-4">
  <Link
    href="/login"
    className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-900 transition"
  >
    Login
  </Link>
  <Link
    href="/signup"
    className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-900 transition"
  >
    Signup
  </Link>
</div>
  </nav>
</div>

  );
}
