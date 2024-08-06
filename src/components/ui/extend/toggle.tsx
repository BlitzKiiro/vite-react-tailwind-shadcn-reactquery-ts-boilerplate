import React, { useState } from "react";

interface ToggleProps {
  initialChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({
  initialChecked = false,
  onChange,
}) => {
  const [checked, setChecked] = useState(initialChecked);

  const handleToggle = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (onChange) onChange(newChecked);
  };

  return (
    <div className='relative inline-flex !items-center cursor-pointer'>
      <input
        type='checkbox'
        checked={checked}
        onChange={handleToggle}
        className='sr-only'
      />
      <div
        className={`w-10 h-6 bg-gray-200 flex items-center px-1 rounded-full shadow-inner ${
          checked ? "!bg-primary" : ""
        }`}
        onClick={handleToggle}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
            checked ? "translate-x-4" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default Toggle;
