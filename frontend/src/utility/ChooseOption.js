import React, { useState, useEffect } from "react";

const ChooseOption = ({ placeHolder, options }) => {

  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    const handler = () => setShowMenu(false);

    window.addEventListener("click", handler);

    return () => {
        window.removeEventListener("click", handler);
    };
  });

  const handleInputClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  }

  const getDisplay = () => {
    if(selectedValue) {
        return selectedValue.label;
    }
    return placeHolder;
  };

  const onItemClick = (option) => {
    setSelectedValue(option);
  }

  const isSelected = (option) => {
    if(!selectedValue) {
        return false;
    }

    return selectedValue.value === option.value;
  }

  return (
    <div className="dropdown-container">
      <div onClick={handleInputClick} className="dropdown-input">
        <div className="dropdown-selected-value">{getDisplay()}</div>
        <div className="dropdown-tools">
          <div className="dropdown-tool">
          {showMenu && (
            <div className="dropdown-menu">
            {options.map((option) => (
            <div
            onClick={() => onItemClick(option)} 
            key={option.value} 
            className={`dropdown-item ${isSelected(option) && "selected"}`}>
              {option.label}
            </div>
          ))}
        </div>
      )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseOption;