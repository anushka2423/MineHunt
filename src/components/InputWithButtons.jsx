import { useState } from "react";
import IndianFlag from "../assets/indian-flag.png";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const InputWithButtons = ({ handleBetAmountChange, isGameStarted}) => {

  const[betAmount, setBetAmount] = useState(0);

  // Handler for input value changes
  const handleAmountChange = (e) => {
    setBetAmount(e.target.value);
    if (handleBetAmountChange) {
      handleBetAmountChange(e);
    }
  };

  // Handler for 1/2 and 2x buttons
  const handleButtonClick = (operation) => {
    let newAmount = parseInt(betAmount);
    if (operation === "half") {
      newAmount /= 2;
    } else if (operation === "double") {
      newAmount *= 2;
    }
    setBetAmount(newAmount);
  };

  // Increment button handler
  const handleIncrementClick = () => {
    const newAmount = betAmount + 1;
    setBetAmount(newAmount);
    if (handleBetAmountChange) {
      handleBetAmountChange(newAmount);
    }
  };

  // Decrement button handler
  const handleDecrementClick = () => {
    const newAmount = Math.max(betAmount - 1, 0);
    setBetAmount(newAmount);
    if (handleBetAmountChange) {
      handleBetAmountChange(newAmount);
    }
  };

  return (
    <div className="flex max-h-10 items-center space-x-4 bg-[#292d2e] border border-[#3a4142] text-white py-4 px-1 rounded-md">

      {/* Custom CSS for input type number */}
      <style>
        {`
          /* Chrome, Safari, Edge, Opera */
          input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          /* Firefox */
          input[type="number"] {
            -moz-appearance: textfield;
          }
          
          /*input focus none */
          input:focus {
              outline: none;
              border: none;
          }
        `}
      </style>

      {/* Country Flag Dropdown */}
      <div className="flex items-center">
        <img src={IndianFlag} alt="indian-flag" />
      </div>

      {/* Bet Amount Input */}
      <input
        type="number"
        id="betAmount"
        value={betAmount}
        onChange={handleAmountChange}
        className="w-14 bg-transparent text-white rounded border-gray-500"
        disabled={isGameStarted}
      />

      {/* Control Buttons */}
      <div className="flex space-x-2">
        <div className="bg-[#3a4142] rounded py-1  max-h-8">
          {/* 1/2 Button */}
        <button
          onClick={() => handleButtonClick("half")}
          className="font-bold text-sm px-4"
          disabled={isGameStarted}
        >
          1/2
        </button>
        </div>
        <div className="bg-[#3a4142] rounded py-1 max-h-8">
          {/* 2x Button */}
          <button
            onClick={() => handleButtonClick("double")}
            className="font-bold text-sm px-4"
            disabled={isGameStarted}
          >
            2x
          </button>
        </div>

        {/* Increment/Decrement Buttons */}
        <button
          className="bg-[#3a4142] max-h-8 w-14 rounded-md text-sm font-bold flex flex-col justify-center items-center"
          disabled={isGameStarted}
        >
          {/* Increment */}
          <span
            onClick={handleIncrementClick}
            className="text-lg font-bold cursor-pointer hover:text-white"
          >
            <IoIosArrowUp />
          </span>
          {/* Decrement */}
          <span
            onClick={handleDecrementClick}
            className="text-lg font-bold cursor-pointer hover:text-white"
          >
            <IoIosArrowDown />
          </span>
        </button>

      </div>
    </div>
  );
};

export default InputWithButtons;
