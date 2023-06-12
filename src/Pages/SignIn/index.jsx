import { useContext, useState, useRef } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Layout } from '../../Components/Layout'
import { ShoppingCartContext } from '../../Context'

function SignIn() {
    const context = useContext(ShoppingCartContext)
    const [view, setView] = useState('user-info')
    const form = useRef(null)

    //account
    const account = localStorage.getItem('account')
    const parsedAccount = JSON.parse(account)

    //has account
    const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
    const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true
    const hasUserAnAccount = !noAccountInLocalState || !noAccountInLocalStorage

    const handleSignIn = () => {
        const stringifiedSignOut = JSON.stringify(false)
        localStorage.setItem('sign-out', stringifiedSignOut)
        context.setSignOut(false)
        //redirect
        return <Navigate replace to={'/'} />
    }

    const createAnAccount = () => {
        const formData = new FormData(form.current)
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password')
        }
        //create account
        const stringifiedAccount = JSON.stringify(data)
        localStorage.setItem('account', stringifiedAccount)
        context.setAccount(data)
        handleSignIn()
    }


    const renderLogIn = () => {
        return (
            <div className='flex flex-col w-80'>
                <div className=' flex flex-col gap-2'>
                    <p>
                        <span >Email: </span>
                        <span className='text-sm'>{parsedAccount?.email}</span>
                    </p>
                    <p>
                        <span >Password: </span>
                        <span className=' text-sm'>{parsedAccount?.password}</span>
                    </p>
                </div>
                <Link
                    to='/'>
                    <button className='bg-orange-500 disabled:bg-black/40 text-white w-full rounded-lg py-3 mt-6 mb-2 hover:bg-orange-600'
                        disabled={!hasUserAnAccount}
                        onClick={() => handleSignIn()}>

                        Log in
                    </button>
                </Link>
                <div className='text-center'>
                    <a className='font-light text-xs underline underline-offset-4' href="/">Forgot my Password</a>
                </div>
                <button
                    className=' border border-orange-600 disabled:text-black/40 disabled:border-black/40 rounded-lg mt-4 mb-8 py-3'
                    onClick={() => setView('create-user-info')}
                    disabled={hasUserAnAccount}>
                    Sign up
                </button>
            </div>
        )
    }

    const renderCreateUserInfo = () => {
        return (
            <form ref={form} className='flex flex-col gap-4 w-80'>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="name" className='text-sm'>Your name:</label>
                    <input type="text"
                        id='name'
                        name='name'
                        defaultValue={parsedAccount?.name}
                        placeholder='Jhon'
                        className='rounded-lg border border-orange-500 placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="email" className='text-sm'>Your email:</label>
                    <input
                        type="text"
                        id='email'
                        name='email'
                        defaultValue={parsedAccount?.email}
                        placeholder='jhon@example.com'
                        className='rounded-lg border border-orange-500 placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="password" className='text-sm'>Your password:</label>
                    <input
                        type="text"
                        id='password'
                        name='password'
                        defaultValue={parsedAccount?.password}
                        placeholder='********'
                        className='rounded-lg border border-orange-500 placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
                    />
                </div>
                <Link to='/'>
                    <button
                        className='bg-orange-500 text-white w-full rounded-lg py-3 my-8 hover:bg-orange-600'
                        onClick={() => createAnAccount()}
                    >
                        Create
                    </button>
                </Link>
            </form>
        )
    }

    const renderView = () => view === 'create-user-info' ? renderCreateUserInfo() : renderLogIn()

    return (
        <Layout>

            <div className='w-1/3 h-auto mt-10 bg-orange-600/40 rounded-lg flex flex-col justify-center items-center'>
                <h1 className='w-80 font-medium text-xl text-center text-orange-950 mt-6 mb-3'>Welcome</h1>
                <hr className=' border border-orange-600/20 w-11/12 mb-3' />
                {renderView()}
            </div>


        </Layout>
    )
}

export { SignIn }