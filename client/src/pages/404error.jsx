import React from 'react'
import { useMoveBack } from '../hooks/useMoveBack.jsx';

function Error() {
  const back = useMoveBack();
  return (
    <div className="h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h1 className="text-4xl text-[var(--general)] font-bold  mb-8">404 - Page Not Found</h1>
            <p className="text-[var(--underline)] mb-6">The page you are looking for does not exist. <br /> Please check the URL and try again.</p>
            <button onClick={back} className="border-[var(--general)] border cursor-pointer rounded-lg uppercase bg-white px-4 py-2 active:translate-x-0.5 active:translate-y-0.5 hover:shadow-[0.5rem_0.5rem_#344E41,-0.5rem_-0.5rem_#A8CABA] transition">Go Back</button>
        </div>
    </div>
  )
}

export default Error