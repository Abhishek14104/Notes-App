import React from 'react'
import { getInitials } from "../../utils/helper"

const ProfileInfo = (  { userInfo, onLogout  }) => {
  return (
    <div className='flex items-center gap-3 '>
      {/* <div className='w-12 h-12 flex items-center justify-center rounded-full text-black font-medium bg-slate-200'>
        {getInitials(userInfo?.fullName)}
      </div> */}

      <div className='flex gap-5'>
        <p className='text-sm font-medium bg-zinc-600 hover:scale-105 px-4 py-2 rounded-2xl mr-2'> {userInfo?.fullName} </p>
        <button className='text-sm text-white hover:font-bold hover:text-[#ff3434fb] hover:scale-110 ease-in-out' onClick = {onLogout}>
          Logout
        </button>
      </div>
    </div>
  )
};

export default ProfileInfo;
