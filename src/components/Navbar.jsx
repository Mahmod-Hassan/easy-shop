"use client";

import { afterLoginNavData, beforeLoginNavData } from "@/data/navData";
import useAuth from "@/hooks/useAuth";
import useCart from "@/hooks/useCart";
import useTheme from "@/hooks/useTheme";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { startTransition, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import {
  HiMiniXMark,
  HiOutlineBars3,
  HiOutlineMoon,
  HiSun,
} from "react-icons/hi2";
import NavLink from "./NavLink";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { uid, displayName, photoURL } = user || {};
  const [navToggle, setNavToggle] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navData = user ? afterLoginNavData : beforeLoginNavData;
  const { replace, refresh } = useRouter();
  const path = usePathname();

  const { cart } = useCart();
  const total = useMemo(
    () => cart.reduce((pre, cur) => cur.price * cur.quantity + pre, 0),
    [cart]
  );

  const handleLogout = async () => {
    const toastId = toast.loading("Loading...");
    try {
      await logout();
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      await res.json();
      toast.success("logout successfully");
      if (path.includes("/dashboard") || path.includes("/profile")) {
        replace(`/login?redirectUrl=${path}`);
      }
      toast.dismiss(toastId);
      toast.success("Successfully logout!");
      startTransition(() => {
        refresh();
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <nav className="navbar sticky top-0 z-10 bg-slate-200 shadow-lg dark:bg-slate-900 px-5 mx-2 lg:mx-0 lg:px-20">
      <div className="flex-1">
        <Link href="/" className="text-2xl font-bold normal-case">
          Easy Shop
        </Link>
      </div>
      <div
        className={`absolute ${
          navToggle ? "left-0" : "left-[-120%]"
        } top-[4.5rem] flex w-full flex-col bg-slate-200 pb-3 pt-2 transition-all duration-300 dark:bg-slate-900 lg:static lg:w-[unset] lg:flex-row lg:bg-transparent lg:pb-0 lg:pt-0 dark:lg:bg-transparent`}
      >
        <ul className="menu menu-horizontal flex-col px-1 lg:flex-row">
          {navData.map(({ path, title }) => (
            <li key={path} className="mx-auto">
              <NavLink
                onClick={() => setNavToggle(false)}
                href={path}
                activeClassName="text-blue-500"
                exact={path === "/"}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* all about cart and it's it dropdown */}
        <div className="dropdown-end dropdown lg:mr-2">
          {/* cart icon from daisy ui*/}
          <label tabIndex={0} className="btn-ghost btn-circle btn">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item bg-primary text-white dark:text-gray-300">
                {cart.length}
              </span>
            </div>
          </label>
          <div
            tabIndex={0}
            className="card dropdown-content card-compact mt-3 w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">{cart.length} Items</span>
              <span className="text-info">Total: ${total.toFixed(2)}</span>
              <div className="card-actions">
                <Link href="/checkout" className="block w-full">
                  <button className="btn-primary btn-block btn">
                    View cart
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/*all about profile image and it's dropdown */}
        {uid && (
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
              <div className="w-10 rounded-full">
                <Image
                  alt="user-logo"
                  title={displayName}
                  src={photoURL || "https://i.ibb.co/dJnbzDL/profile-image.png"}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu-compact dropdown-content menu rounded-box mt-3 w-52 bg-base-100 p-2 shadow"
            >
              <li className="mb-2 mt-1 text-center font-semibold">
                {displayName}
              </li>
              <div className="divider my-0"></div>
              <li className="mb-2">
                <NavLink
                  href="/profile"
                  className="text-lg"
                  activeClassName="text-blue-500"
                >
                  Profile
                </NavLink>
              </li>
              <li className="">
                <button
                  onClick={handleLogout}
                  className="btn-warning btn content-center text-white"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}

        {/* all about dark mod and light mode */}
        <label className="swap swap-rotate lg:ml-2">
          <input
            onChange={toggleTheme}
            type="checkbox"
            checked={theme === "light"}
          />
          <HiSun className="swap-off text-5xl p-3"></HiSun>
          <HiOutlineMoon className="swap-on text-5xl hover:bg-slate-300 rounded-full p-3"></HiOutlineMoon>
        </label>
      </div>

      {/* all about responsive menu bar */}
      <label className="swap-rotate swap btn-ghost btn-circle btn ml-2 bg-white dark:bg-slate-800 lg:hidden">
        <input
          checked={navToggle}
          onChange={() => setNavToggle((pre) => !pre)}
          type="checkbox"
        />
        <HiOutlineBars3 className="swap-off text-3xl"></HiOutlineBars3>
        <HiMiniXMark className="swap-on text-3xl"></HiMiniXMark>
      </label>
    </nav>
  );
};

export default Navbar;
