import React from 'react'

export default function page({params}: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="font-bold text-3xl text-gray-400">Profile Page</h1>
        <h2 className="font-bold text-lg pt-8 text-gray-400"> {params.id}</h2>
    </div>
  )
}
