"use client";

import {
  Hammer,
  Menu,
  PhoneCall,
  Users,
  Quote,
  Factory,
  Newspaper
} from "lucide-react";

import Link from "next/link";
import React from "react";

import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const menus = [
    // {
    //   name: "Careers",
    //   link: "/careers",
    //   icon: <Users size={20} />,
    // },

    {
      name: "Blogs",
      link: "/blogs",
      icon: <Newspaper size={20} />,
    },
    {
      name: "Contact",
      link: "/contact",
      icon: <PhoneCall size={20} />,
    },
    {
      name: "Testimonial",
      link: "/testimonial",
      icon: <Quote size={20} />,
    },
    {
      name: "Properties",
      link: "/properties",
      icon: <Factory size={20} />,
    },
    // {
    //   name: "Bookings",
    //   link: "/bookings",
    //   icon: <Users size={20} />,
    // },
  ];

  return (
    <nav className="border-r shadow min-w-56 h-full py-3 px-4 bg-white">
      {/* Logo section */}
      <div className="flex justify-between items-center">
        <Link href={"/admin"}>
          <img
            src="/logo-official-black.png"
            alt=""
            className="max-w-[120px]"
          />
        </Link>

        <span className="cursor-pointer">
          <Menu />
        </span>
      </div>

      {/* Navigation */}
      <ul className="mt-5 flex flex-col gap-y-3 text-base">
        {menus.map((menu) => {
          const isActive = (pathname === `/admin${menu.link}` || pathname.includes(menu.link));

          return (
            <li key={menu.name}>
              <Link
                href={`/admin${menu.link}`}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  
                  ${isActive
                    ? "bg-black text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                {menu.icon}

                <span className="font-medium">
                  {menu.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;