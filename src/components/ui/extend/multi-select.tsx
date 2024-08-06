import { cn } from "@/lib/utils";
import React, { useState, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectDropdownProps {
  options: Option[];
  selected: string[];
  onSelect: (selected: string[]) => void;
  className?: string;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  selected,
  onSelect,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = () => {
    if (isOpen) setIsOpen(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  const handleOptionClick = (option: Option) => {
    let newSelected = [...selected];
    if (newSelected.includes(option.value)) {
      newSelected = newSelected.filter((value) => value !== option.value);
    } else {
      newSelected.push(option.value);
    }
    onSelect(newSelected);
  };

  const handleRemove = (value: string) => {
    onSelect(selected.filter((item) => item !== value));
  };

  return (
    <div className='relative' ref={ref}>
      <button
        type='button'
        className={cn(
          "flex items-center justify-between w-full px-4 py-2 text-sm font-medium  bg-white border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none  rounded-compact min-h-[52px] text-theme-storm-gray placeholder:text-theme-storm-gray",
          className
        )}
        onClick={toggleDropdown}
      >
        <div className='flex flex-wrap gap-2 ml-2' dir='ltr'>
          {selected.length > 0
            ? selected.map((value) => {
                const label = options.find(
                  (option) => option.value === value
                )?.label;
                return label ? (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(value);
                    }}
                    key={value}
                    className='flex items-end px-2 py-1 text-xs font-medium text-white bg-black rounded-[4px]'
                  >
                    {label}

                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='none'
                    >
                      <path
                        d='M5 5L8 8M8 8L5 11M8 8L11 11M8 8L11 5'
                        stroke='white'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                    </svg>
                  </span>
                ) : null;
              })
            : "قم بالاختيار"}
        </div>
        <svg
          className={`h-5 w-5 text-gray-400 transform ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          aria-hidden='true'
        >
          <path
            fillRule='evenodd'
            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
            clipRule='evenodd'
          />
        </svg>
      </button>
      {isOpen && (
        <div className='absolute z-10 mt-2 w-full max-h-[300px] overflow-y-scroll bg-white  shadow-lg rounded-compact  text-theme-storm-gray placeholder:text-theme-storm-gray'>
          <ul className='py-1'>
            {options.map((option) => (
              <li
                key={option.value}
                className={`px-4 py-2 text-sm ${
                  selected.includes(option.value)
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-900"
                } hover:bg-gray-100 cursor-pointer`}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
