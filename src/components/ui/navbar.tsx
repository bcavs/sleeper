import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const NavBar = () => {
  return (
    <nav className="bg-slate-800 py-4">
      <div className="container flex items-center">
        <Link href="/">
          <p className="text-3xl font-bold text-slate-100 underline">
            Dawg Dynasty
          </p>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
