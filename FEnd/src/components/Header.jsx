import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useLocation, Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { logoutUser } from "../api/api";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const { user, setUser, loading } = useUser(); // ✅ global state
  const location = useLocation();

  if (loading) return null; // optional: show skeleton instead

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // ✅ Role-based navigation
  let navigation = [
    { name: "Home", href: "/" },
  ];

  if (user?.role === "jobseeker") {
    navigation.push({ name: "Applied Jobs", href: "/applied-jobs" });
  } else if (user?.role === "employer") {
    navigation.push({ name: "Dashboard", href: "/dashboard" });
  }

  if (!user) {
    navigation.push({ name: "Login", href: "/login" });
    navigation.push({ name: "Sign Up", href: "/signup" });
  }

  return (
    <Disclosure as="nav" className="sticky top-0 z-50 bg-gray-800 shadow-md">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="Logo"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        isActive
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-white/5 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {user && (
              <>
                <button
                  type="button"
                  className="relative rounded-full p-1 text-gray-400 hover:text-white"
                >
                  <BellIcon aria-hidden="true" className="size-6" />
                </button>
                <Menu as="div" className="relative ml-3">
                  <MenuButton className="relative flex rounded-full focus:outline-none">
                    <img
                      alt="Profile"
                      src={
                        user?.profilePic ||
                        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                      }
                      className="size-8 rounded-full bg-gray-800"
                    />
                  </MenuButton>
                  <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
                    <MenuItem>
                      <p className="block px-4 py-2 text-sm text-gray-700">
                        {user.username}
                      </p>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700"
                      >
                        Sign Out
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </>
            )}
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
