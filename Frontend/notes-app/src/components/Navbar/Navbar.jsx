import React, {useState} from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';

function Navbar({ userInfo , onSearchnote, handleClearSearch}) {
  
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear()
      navigate("/login");
  }

  const handleSearch = () =>{
      if(searchQuery){
        onSearchnote(searchQuery)
      }
  }

  const onClearSearch = () =>{
      setSearchQuery('');
      handleClearSearch()
  }

  return (
    <div className='bg-zinc-800 text-white flex items-center px-6 py-2 drop-shadow justify-between'>

        <p className='font-semibold text-2xl'> Notes </p>

        <SearchBar 
          value={searchQuery}
          onChange={({target}) => {
            setSearchQuery(target.value);
          }}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />

        <ProfileInfo userInfo = { userInfo } onLogout={onLogout} />
    </div>
  )
}

export default Navbar
