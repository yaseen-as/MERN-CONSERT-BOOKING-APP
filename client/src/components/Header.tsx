import { Link } from "react-router-dom";
// import MobilNav from "./MobilNav";
import MainNav from "./MainNav";
import logo from "../assets/logo.webp";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-700 bg-black py-1 shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex flex-row justify-between gap-4">
          <img
            src={logo}
            alt=""
            className="w-10 h-10 object-contain rounded-full"
          />
          <Link
            to="/"
            className="text-3xl font-bold tracking-tight text-white transition hover:text-gray-400"
          >
            Concert.in
          </Link>
        </div>

        <nav className="flex items-center">
          <div className="md:hidden">{/* <MobilNav /> */}</div>
          <div className="hidden md:flex space-x-6">
            <MainNav />
          </div>
        </nav>
      </div>
    </header>
  );
}