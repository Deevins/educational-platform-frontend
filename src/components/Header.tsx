import Navbar from '@/components/Navbar.tsx'
import { Link, NavLink } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'

const Header = () => {
  const isAuthorized = true

  return (
    <header>
      <nav className={'bg-white border-gray-200 px-4 lg:px-6 py-3.5 dark:bg-gray-800'}>
        <div
          className={
            'flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'
          }
        >
          <NavLink to='/' className='flex items-center'>
            <img
              src='https://flowbite.com/docs/images/logo.svg'
              className='h-8'
              alt='Flowbite Logo'
            />
            <span className='self-start text-2xl font-semibold whitespace-nowrap dark:text-white'>
              Study-work
            </span>
          </NavLink>
          <Navbar />
          <div className={'flex justify-center items-center'}>
            {/*if authorized try to render image and if not render register/login button*/}
            {isAuthorized ? (
              <>
                <Link to={'/profiles/my-page'}>
                  <Avatar className={'hover:scale-105'}>
                    <AvatarImage src='https://github.com/shadcn.png' />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
              </>
            ) : (
              <div>NOT AUTHORIZED</div>
            )}
            <div className={'pl-5'}>switcher</div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
