import React, { useState } from 'react'
import {auth,db} from '../Firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const style={
    form:'h-14 w-full max-w-[720px] flex text-xl absolute bottom-0',
    input:'w-full text-xl p-3 bg-gray-900 text-white outline-none border-none',
    button:`w-[20%] bg-green-500`
}

const SendMessage = ({scroll}) => {
    const [input, setInput] =useState('');

    const sendMessage=async (e) => {
        e.preventDefault()
        
        if (input.trim() === "") {
          alert('Please enter valid text...!');
          return;
      }

        const {uid, displayName} = auth.currentUser
        await addDoc(collection(db, 'messages'), {
          text:input,
          name:displayName,
          uid,
          timestamp:serverTimestamp()
        })

        setInput('')

        scroll.current.scrollIntoView({behaviour:'smooth'})
      }

  return (
    <form onSubmit={sendMessage} className={style.form}>
        <input  value= {input} onChange={(e) => setInput(e.target.value)}  className={style.input} type='text' placeholder='Type Message'/>
        <button className={style.button} type='submit'>Send</button>
    </form>
  )
}

export default SendMessage