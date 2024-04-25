import React from 'react'

function LoadingScreen() {
  return (
    <div className="h-screen bg-black text-white w-screen flex items-center justify-center">
        <div className="text-4xl font-bold">Loading</div>
        <div className="loader"></div>
        <div className="text-4xl font-bold">...</div>
    </div>
  )
}

export default LoadingScreen