import React, { useState } from 'react'
import {FaMagnifyingGlass} from "react-icons/fa6"
import {IoMdClose} from "react-icons/io"
import { useNavigate } from 'react-router-dom';

function SearchBar({value, onChange, handleSearch, onClearSearch}) {

    return (

        <div className='w-96 flex items-center px-4 bg-black rounded-md'>
            <input 
                type="text"
                placeholder='Search notes'
                className='w-full text-xs bg-black py-[11px] outline-none '
                value={value}
                onChange={onChange}
            />

            {value && 
                (
                    <IoMdClose className='text-xl text-white cursor-pointer hover:text-zinc-300 mr-3' onClick={onClearSearch}/>
                )
            }

            <FaMagnifyingGlass className='text-white cursor-pointer hover:text-zinc-300' onClick={handleSearch} />
        </div>
        
    )
}

export default SearchBar;

