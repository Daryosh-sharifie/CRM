import React from "react";

export default function Dashboard({
  userEmail,
  secondsLeft,
  onLogout,
}: {
  userEmail: string;
  secondsLeft: number;
  onLogout: () => void;
}) {
  return (
    <div className="flex">
      <div className="flex flex-col justify-between bg-[#FFFFFF] w-[280px] h-[1080px] border-r-[1px]">
        <div>
          <div className="flex items-center gap-2 mb-4 w-[159.7109375px] h-[29.143524169921875px] mt-[24.43px] ml-[24px]">
            <div className="w-10 h-10 bg-[#0068E9] rounded-full"></div>
            <div><h1 className="font-semibold text-[#0068E9] ">Survey Tracker</h1></div>
          </div>
          <div className="bg-[#BDBDBD] w-[256px] h-[0px] border-[1px] mt-[18.43px] mx-[12px]"></div>

          <div className="flex items-center justify-center bg-[#0068E9] rounded-[4px] w-[256px] h-[40px] mt-[16px] ml-[12px] text-white text-center font-bold">
            Dashboard</div>     

        </div>

        <div>
          <div className="bg-[#BDBDBD] w-[256px] h-[0px] border-[1px] mb-[24px] mx-[12px]"></div>
          <div className="mb-[74px] flex items-center gap-3 ml-[24px] w-[165px] h-[24px]">
            <div className="flex items-center justify-center text-lg w-12 h-12 bg-gray-200 rounded-full">AA</div>
            <div>
              <h1>Alexander Alli</h1>
              <p>Admin</p>
            </div>
          </div>
        </div>

      </div>




      <div className="flex flex-col bg-blue-100">
        <div className="flex justify-between items-center w-[1640px] h-[72px] border-b-[1px] boarder-[#BDBDBD] bg-[#FFFFFF] border-b-[1px] border-[#BDBDBD]">
          <h1 className="ml-[28px]">Dashboard</h1>
          <div className="relative w-64 mr-[28px]">
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-10 pl-10 pr-3 border border-gray-300 rounded-lg focus:outline-none"
            />
            <svg
              className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7 7 0 1010 17a7 7 0 006.65-4.35z"
              />
            </svg>
          </div>
        </div>
        
      </div>

     
      
    </div>
  );
}
