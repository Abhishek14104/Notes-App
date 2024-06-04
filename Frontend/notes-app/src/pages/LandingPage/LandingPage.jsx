import React from 'react'
import NavbarLP from '../../components/Navbar/NavbarLP'
import SignupLP from '../Signup/SignupLP'
import RightArrow from '../../assets/Images/right-arrow-free-svg-file-1.svg'

function LandingPage() {
    return (

        <div className='bg-black text-zinc-100 overflow-y-hidden'>

            <NavbarLP />

            <div className='flex justify-evenly w-[90vw] h-[100%] items-center '>

                <div className='flex flex-col w-[48vw] relative -mt-32'>

                    <span className='text-[64px] font-bold flex items-center justify-center text-[#2f8d46]'>
                        HELLO😊
                    </span>

                    <p className='text-[28px] mb-5'>
                        and
                        <span className='text-[40px] font-semibold mx-2'>
                            Welcome
                        </span>

                        <span className='mr-1'>
                            to the App, where You can take and keep all the Notes for yourself with
                        </span>

                        <span className='ml-1 font-semibold text-[40px]'>
                            EASE!
                        </span>
                    </p>
                    <hr></hr>
                    <p className='text-primary font-semibold text-[48px] absolute -bottom-[72px] left-[200px]'>
                        Sign up Here
                    </p>

                    <div className='absolute left-[350px] -bottom-[220px]'>
                        <img src={RightArrow} className='invert h-[225px] w-[550px] text-red-500 -rotate-12' />
                    </div>
                </div>

                <SignupLP />
            </div>

        </div>
    )
}

export default LandingPage
