import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

interface DropdownProps {
  title: string;
  children: { title: string; url: string }[];
}

const Dropdown: React.FC<DropdownProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      event.target instanceof HTMLElement &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const handleMouseEnter = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsOpen(true);
  };

  const handleMouseLeave = (event: React.MouseEvent) => {
    console.log("MOUSE LEFT");

    event.preventDefault();
    event.stopPropagation();
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className='relative inline-block text-right dropdown-container'
    >
      <div>
        <button
          type='button'
          className='inline-flex items-center gap-1 2xl:gap-2 justify-center w-full rounded-md border border-transparent shadow-sm  px-1 2xl:px-4 py-2 bg-transparent text-sm font-medium text-white focus:outline-none'
          onClick={toggleDropdown}
          onMouseEnter={handleMouseEnter}
        >
          {title}
          <svg
            className={cn("-mr-1 ml-2 h-3 w-3 transition-all", {
              "rotate-180": isOpen,
            })}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M5.23 7.21a.75.75 0 011.06 0L10 10.92l3.71-3.71a.75.75 0 011.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 010-1.06z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className='origin-top-right px-5 py-6 lg:absolute right-0  w-[90vw] lg:w-56 rounded-md shadow-lg backdrop-blur bg-theme-slate text-white ring-1 ring-black ring-opacity-5'>
          <div
            className='py-1 flex flex-col justify-center gap-4 lg:max-h-full lg:h-fit overflow-y-scroll hide-scroll lg:overflow-y-hidden'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='options-menu'
          >
            {children.map((child, index) => (
              <Link
                onClick={(event) => {
                  event.stopPropagation();
                  toggleDropdown(event);
                }}
                key={index}
                to={child.url}
                className={cn(
                  "flex justify-between gap-2 px-4 py-2 text-sm hover:bg-theme-primary hover:bg-primary-dark hover:text-white rounded-lg",
                  {
                    "bg-primary-dark text-white":
                      location.pathname === child.url,
                  },
                  {
                    "cursor-default": child.url === "#",
                  }
                )}
                role='menuitem'
              >
                {child.title}{" "}
                {child.url === "#" && (
                  <span className='bg-theme-white rounded-md px-2 h-fit text-[10px] inline-block text-theme-midnight-slate'>
                    قريبا
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
