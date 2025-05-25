import { useState } from "react";
import Link from "next/link";
import { Ticket as Cricket, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Cricket className="h-8 w-8" />
            <span className="text-xl font-bold">MyCrickStats</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            <Link href="/" className="hover:text-indigo-200 transition-colors">
              Dashboard
            </Link>
            <Link
              href="/players"
              className="hover:text-indigo-200 transition-colors"
            >
              Players
            </Link>
            <Link
              href="/teams"
              className="hover:text-indigo-200 transition-colors"
            >
              Teams
            </Link>
            <Link
              href="/matches"
              className="hover:text-indigo-200 transition-colors"
            >
              Matches
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              href="/"
              className="block py-2 px-4 hover:bg-indigo-700 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/players"
              className="block py-2 px-4 hover:bg-indigo-700 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Players
            </Link>
            <Link
              href="/teams"
              className="block py-2 px-4 hover:bg-indigo-700 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Teams
            </Link>
            <Link
              href="/matches"
              className="block py-2 px-4 hover:bg-indigo-700 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Matches
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
