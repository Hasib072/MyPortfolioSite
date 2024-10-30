import Link from 'next/link'
import React from 'react'

const userPage = () => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>this is /work page</h1>
      <Link href={"/"}> &lt; Go Back </Link>
    </div>
  )
}

export default userPage
