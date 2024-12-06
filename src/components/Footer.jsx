import { AiOutlineQuestionCircle } from "react-icons/ai";
import { FaHeart, FaKeyboard, FaStar, FaTelegramPlane } from "react-icons/fa";
import { LuCreditCard, LuNut } from "react-icons/lu";
import { MdMusicOff } from "react-icons/md";
import { PiSpeakerNoneFill } from "react-icons/pi";
import { TbWaveSine } from "react-icons/tb";


const Footer = () => {
  return (
    <div className="bg-[#292d2e] p-4 flex justify-between text-gray-400">
      {/* Left Section */}
      <div className="flex gap-10">
        {/* Star Icon with Count */}
        <span className="flex gap-2 items-center">
          <FaStar />
          <span>20806</span>
        </span>
        {/* Heart Icon with Count */}
        <span className="flex gap-2 items-center">
          <FaHeart />
          <span>20845</span>
        </span>
        {/* Mail Icon */}
        <span className="flex gap-2 items-center text-xl">
          <FaTelegramPlane />
        </span>
      </div>

      {/* Right Section */}
      <div className="flex gap-5 text-xl">
        <span>
          <LuCreditCard />
        </span>
        <span>
          <MdMusicOff />
        </span>
        <span className="text-green-400 ">
          <PiSpeakerNoneFill />
        </span>
        <span>
          <FaKeyboard />
        </span>
        <span>
          <TbWaveSine />
        </span>
        <span>
          <LuNut />
        </span>
        <span>
          <AiOutlineQuestionCircle />
        </span>
      </div>
    </div>
  );
};

export default Footer;
