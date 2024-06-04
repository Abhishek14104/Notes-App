import moment from 'moment'
import React from 'react'
import { MdOutlinePushPin, MdCreate, MdDelete } from 'react-icons/md'
import { motion } from "framer-motion"

function NoteCard({
    title,
    date,
    content,
    // tags, 
    isPinned,
    onEdit,
    onDelete,
    onPinNote,
}) {
    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            className='border rounded p-4 hover:shadow-lg hover:shadow-white transition-all ease-in-out hover:border-[2px] hover:border-white hover:bg-white bg-zinc-400 text-black flex justify-between flex-col'
        >

            {/* Title and Date Section */}
            <div className='flex items-center justify-between'>
                <div>
                    <h6 className='text-sm font-semibold '>{title}</h6>
                    <span className='text-xs text-slate-700'>{moment(date).format('Do MMM YYYY')}</span>
                </div>

                <motion.div whileTap={{ scale: 0.5 }}>
                    <MdOutlinePushPin className={`icon-btn ${isPinned ? 'text-blue-400' : 'text-black'}`} onClick={onPinNote} />
                </motion.div>
            </div>

            <div className='flex items-center justify-between mt-2'>
                <p className='text-xs text-slate-600 mt-2'>{content?.slice(0, 60)}</p>
                {/* <div className='text-xs text-slate-500'>
                    {tags.map((item)=> ` #${item} `)}
                </div> */}

                <div className='flex items-center gap-2'>
                    <div onClick={onEdit}>
                        <motion.div whileTap={{ scale: 0.5 }}>
                            <MdCreate
                                className='icon-btn hover:text-green-600'
                                onClick={onEdit}
                            />
                        </motion.div>
                    </div>
                    <div onClick={onDelete}>
                    <motion.div whileTap={{ scale: 0.5 }}>
                        <MdDelete
                            className='icon-btn hover:text-red-500'
                            onClick={onDelete}
                        />
                    </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default NoteCard
