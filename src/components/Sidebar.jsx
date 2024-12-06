import { useState } from "react";
import InputWithButtons from "./InputWithButtons";
import RangeSlider from "./RangeSlider";

const Sidebar = ({
  bombCount,
  handleBombCountChange,
  handleBetAmountChange,
  handleStartGame,
  isGameStarted,
}) => {
  const [activeTab, setActiveTab] = useState("manual");

  return (
    <div className="bg-[#323738] w-1/4 p-4 h-full flex flex-col gap-10">
      {/* Tabs for Manual and Auto */}
      <div>
        <div
          className="relative"
          style={{
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <nav className="flex w-[85%] m-auto justify-between text-white p-4">
            {/* Manual Tab */}
            <div
              onClick={() => setActiveTab("manual")}
              className="cursor-pointer font-bold"
              style={{
                color: activeTab === "manual" ? "white" : "gray",
              }}
            >
              Manual
              {activeTab === "manual" && (
                <div   
                  className="absolute left-0 bottom-0 h-[2px] w-1/2"
                  style={{
                    backgroundColor: "#26a776",
                  }}
                ></div>
              )}
            </div>

            {/* Auto Tab */}
            <div
              onClick={() => setActiveTab("auto")}
              className="cursor-pointer font-bold"
              style={{
                color: activeTab === "auto" ? "white" : "gray",
              }}
            >
              Auto
              {activeTab === "auto" && (
                <div
                  className="absolute right-0 bottom-0 h-[2px] w-1/2"
                  style={{
                    backgroundColor: "#26a776",
                  }}
                ></div>
              )}
            </div>
          </nav>
        </div>
      </div>

      {/* Betting Amount */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <div className="text-gray-400 items-center flex font-bold text-sm">
            <span>Amount</span>
            <span className="ml-1 flex items-center text-[0.6rem] max-h-2 text-green-400 rounded-md border px-[6px] py-[6px] border-green-400">
              i
            </span>
          </div>
          <div className="text-gray-400 font-bold text-sm">≈0.0001BCD</div>
        </div>

        <InputWithButtons
          handleBetAmountChange={handleBetAmountChange}
          isGameStarted={isGameStarted}
        />

        <div className="flex gap-2 justify-between text-sm mt-2">
          <div className="w-1/4 bg-[#353b3c] rounded py-1">
            <button className="font-bold text-[#65686a]">10</button>
          </div>
          <div className="w-1/4 bg-[#353b3c] rounded py-1">
            <button className="font-bold text-[#65686a]">100</button>
          </div>
          <div className="w-1/4 bg-[#353b3c] rounded py-1">
            <button className="font-bold text-[#65686a]">1.0k</button>
          </div>
          <div className="w-1/4 bg-[#353b3c] rounded py-1">
            <button className="font-bold text-[#65686a]">10.0k</button>
          </div>
        </div>
      </div>

      {/* Mines Range Slider */}
      <div>
        <div className="text-gray-400 font-bold text-sm text-left mb-2">Mines</div>

        <RangeSlider
          min={0}
          max={24}
          value={bombCount}
          onChange={handleBombCountChange}
        />
      </div>

      {/* Start Game Button */}
      <button
        onClick={handleStartGame}
        disabled={isGameStarted}
        className="bg-gradient-to-r from-[#46ed48] to-[#97e973] w-full py-2 rounded-lg text-black font-bold"
      >
        Bet
      </button>
    </div>
  );
};

export default Sidebar;
