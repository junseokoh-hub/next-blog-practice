import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { IconType } from "react-icons";
import Logo from "./logo";
import { RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";

interface Props {
  navItems: { label: string; icon: IconType; href: string }[];
}

const NAV_OPEN_WIDTH = "w-60";
const NAV_CLOSE_WIDTH = "w-12";
const NAV_VISIBILITY = "nav-visibility";

const AdminNav: React.FC<Props> = ({ navItems }) => {
  const navRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(true);

  const toggleNav = () => {
    const currentNav = navRef.current;
    if (!currentNav) return;

    const { classList } = currentNav;
    if (visible) {
      // hide our nav
      classList.remove(NAV_OPEN_WIDTH);
      classList.add(NAV_CLOSE_WIDTH);
    } else {
      // show our nav
      classList.add(NAV_OPEN_WIDTH);
      classList.remove(NAV_CLOSE_WIDTH);
    }
    setVisible((prev) => !prev);
  };

  return (
    <nav
      ref={navRef}
      className="h-screen flex flex-col justify-between w-60 sticky top-0 p-2 transition-width bg-white shadow-md"
    >
      <div>
        {/* <Link href="/admin">
          <div className="p-3 mb-10 flex items-center space-x-2">
            <Logo className="w-5 h-5 fill-highlight-light dark:fill-highlight-dark" />
            {visible && (
              <span className="text-xl font-semibold leading-none fill-highlight-light dark:fill-highlight-dark">
                Admin
              </span>
            )}
          </div>
        </Link> */}
        <ul className="space-y-6">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="block">
              <li className="flex items-center text-xl cursor-pointer dark:text-high-contrast-dark text-high-contrast p-3 hover:scale-[0.98] transition">
                <item.icon size={24} />
                {visible ? (
                  <span className="leading-none animate-smooth-reveal ml-2">
                    {item.label}
                  </span>
                ) : null}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <button
        onClick={toggleNav}
        className="self-end text-low-contrast dark:text-low-contrast-dark hover:scale-[0.98] transition"
      >
        {visible ? (
          <RiMenuFoldFill size={30} />
        ) : (
          <RiMenuUnfoldFill size={30} />
        )}
      </button>
    </nav>
  );
};

export default AdminNav;
