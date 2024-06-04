import React, { useEffect, useState } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from '../../components/Cards/NoteCard';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from './AddEditNotes';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import Toast from '../../components/ToastMessage/Toast';
import EmptyCard from '../../components/Empty Card/EmptyCard';
import AddImage from '../../assets/Images/image.svg'
import NoDataImg from '../../assets/Images/No_Script_Logo.svg.svg'

function Home() {

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  const handleEdit = (noteDetail) => {
    setOpenAddEditModal({ isShown: true, data: noteDetail, type: "edit" });
  };

  // Get User info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.post("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Get all Notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred");
    }
  };

  // Delete note
  const deleteNote = async (data) => {
    const noteId = data._id;

    try {
      const response = await axiosInstance.delete('/delete-note/' + noteId);

      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully", 'delete');
        getAllNotes();
        // setOpenAddEditModal({ isShown: false, type: "add", data: null });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.log("An unexpected error occurred. Please try again later");
      }
    }
  };

  // Search for a Notes
  const onSearchnote = async (query) => {
    try {
      const response = await axiosInstance.get("search-notes", {
        params: { query },
      });

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes)
      }
    } catch (error) {
      console.log(error);
    }
  }
  // Search ka Clear function 
  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  }

  // Pin ki Update karne ke liye
  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id
    try {
      const response = await axiosInstance.put('/update-note-pinned/' + noteId, {
        isPinned: !noteData.isPinned,
      });

      if (response.data && response.data.note) {
        showToastMessage("Note Updated Successfully")
        getAllNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => { };
  }, []);

  return (
    <>

      <Navbar
        userInfo={userInfo}
        onSearchnote={onSearchnote}
        handleClearSearch={handleClearSearch}
      />

    {/* //* Cards Display karne ke liye map function */}
      <div className='container mx-auto bg-black block w-full h-[93.7vh]'>

        {allNotes.length > 0 ?
          <div className='grid grid-cols-3 gap-10 py-10 w-[90vw] m-auto'>
            {allNotes.map((item, index) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                onPinNote={() => updateIsPinned(item)}
              />
            ))}
          </div> :
          <EmptyCard
            imgSrc={ isSearch ? NoDataImg : AddImage }
            message={ isSearch ? `Oops! No Notes found` : `Start creating your first Note! Cllick the 'Add' button to add your thoughts, ideas and reminders. Let's get started! `}
          />}

      </div>

      {/* Add button to add new NOTES */}
        <button
          className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-20 bottom-10 hover:scale-110 transition-all ease-linear'
          onClick={() => {
            setOpenAddEditModal({ isShown: true, type: "add", data: null });
          }}
        >
          <MdAdd className='text-[32px] text-white' />
        </button>

      {/* Add button par click karne par Pop-up Screen */}
      <Modal
        ariaHideApp={false}
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-zinc-400 rounded-md mx-auto mt-14 p-5 overflow-auto"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      {/* Notification show karne ke liye  */}
      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />

    </>
  );
}

export default Home;
