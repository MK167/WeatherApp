import { Circle, CloudMoonRain } from "lucide-react";
import Divider from "./Divider";

function Header() {
  return (
    <>
      <div className="px-8 py-8 w-full">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div>
              <CloudMoonRain className="w-10 h-10 text-blue-400 fill-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-blue-400">Weather App</h1>
              <h3 className="text-sm text-gray-400">
                Real time weather app for your city and country updates every 15
                seconds.
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 shadow-sm border border-gray-100 hover:bg-gray-100 transition-all duration-300 cursor-pointer">
            <Circle className="w-5 h-5 text-green-500 fill-green-500 stroke-green-500" />
            <span className="text-sm text-green-500 font-medium tracking-wider uppercase">live</span>
          </div>
        </header>
      </div>
      <Divider />
    </>
  );
}

export default Header;
