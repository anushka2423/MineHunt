import { useEffect, useState } from "react";

// Helper function to map a value within the range [0, 24] to a percentage [0, 100]
function mapToRange(value) {
    return (value / 24) * 100;
  }
  
  const RangeSlider = ({
    min = 0,
    max = 24,
    value = 2,
    onChange,
  }) => {
    const [thumbPosition, setThumbPosition] = useState(mapToRange(value));

    // Effect to update thumb position whenever the `value` prop changes
    useEffect(() => {
        setThumbPosition(mapToRange(value));
    }, [value]);

    // Handler for input range changes
    const onInoutChangeHandler = (e) => {
        setThumbPosition(mapToRange(e.target.value));
        onChange(e.target.value);
    }

    console.log(parseInt(thumbPosition));
  
    return (
      <div className="slider-track relative bg-[#292d2e] text-gray-400 font-bold text-sm flex items-center space-x-5 px-4 py-1 rounded-md">
        {/* Current Bomb Count */}
        <span>{value}</span>
        {/* Input Range */}
        <div className="relative w-full flex items-center">
          <input
            min={min}
            max={max}
            value={value}
            className="range-slider w-full"
            type="range"
            onChange={onInoutChangeHandler}
          />
  
          {/* Actual slider value bar */}
          <div
            style={{
              width: `${mapToRange(value)}%`,
              background: `linear-gradient(to right, #46ed48 100%, #97e973 ${
                mapToRange(value)
              }%, #97e973 ${mapToRange(value)}%, #46ed48 100%)`,
            }}
            className="absolute top-0 left-0 z-0 h-[6px] rounded"
          ></div>

          {/* Custom Thumb */}
        <div
          className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2"
          style={{
            width: "15px",
            height: "20px",
            borderRadius: "6px",
            background: "white",
            // cursor: "pointer",
            left: `${thumbPosition}%`,
          }}
        ></div>
        </div>
  
        {/* Max Bomb Count */}
        <span>{max}</span>
      </div>
    );
  };
  
  export default RangeSlider;
  