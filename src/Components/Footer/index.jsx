import React from 'react'

function Footer() {
    return (
        <footer className='w-full border-t border-solid  font-medium text-lg  sm:text-base  text-black/80 fixed bottom-0 bg-white'>
            <div className='py-4 flex items-center justify-between px-20'>
                <span>{new Date().getFullYear()} &copy; All rights reserved.</span>
                <div className='flex items-center'>
                    Build With <span className='text-primary text-2xl px-1 text-red-600'>&#9825; </span> by&nbsp; Henry Caiza
                </div>
                <a href='/' target={'_blank'} className='underline underline-offset-2 z-10'>Say Hello</a>
            </div>


        </footer>
    )
}

export { Footer }