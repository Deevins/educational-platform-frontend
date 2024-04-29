import { NavLink } from 'react-router-dom'

const LogOutPage = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='text-center'>
        <h2 className='text-2xl font-bold mb-4'>Вы успешно вышли</h2>
        <p className='mb-8'>
          Желаете вернуться на{'  '}
          <NavLink to='/' className='text-blue-500 hover:underline'>
            главную?
          </NavLink>
        </p>
      </div>
    </div>
  )
}

export default LogOutPage
