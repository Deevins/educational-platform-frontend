import React from 'react'
import { FaCheckCircle, FaTrash } from 'react-icons/fa'
import { MdModeEdit } from 'react-icons/md'
import { IoIosArrowDown, IoMdAdd } from 'react-icons/io'

type AssignmentComponentProps = {
  assignmentData: SectionAssignment
}
// TODO: implement AssignmentComponent if have time( im dying)
const AssignmentComponent: React.FC<AssignmentComponentProps> = ({ assignmentData }) => {
  const [editButtonsVisible, setIsEditButtonsVisible] = React.useState(false)
  // here will be request to fetch component data
  // React.useEffect(() => {
  //   console.log('TestComponent mounted')
  //   return () => {
  //     console.log('TestComponent unmounted')
  //   }
  // }, [])
  return (
    <div
      className='bg-white border-black border-2 flex items-center justify-between min-h-12 ml-16 py-1.5 mb-6 self-end'
      onMouseEnter={() => setIsEditButtonsVisible(true)}
      onMouseLeave={() => setIsEditButtonsVisible(false)}
    >
      <div className='flex items-center'>
        <FaCheckCircle className='ml-2 mr-1' />
        <p className='mr-2'>Задание {assignmentData.componentSerial}:</p>
        <p>{assignmentData.title}</p>
        <span
          className={`flex scale-90 items-center ml-2 ${editButtonsVisible ? 'visible' : 'hidden'} `}
        >
          <MdModeEdit className={'mr-4 hover:cursor-pointer'} />
          <FaTrash className={'mr-4 hover:cursor-pointer'} />
        </span>
      </div>
      <div className={'flex items-center justify-center hover:cursor-pointer'}>
        <button className='flex items-center border-black border-[1px] px-2 py-0.5 font-medium hover:bg-gray-300 '>
          <IoMdAdd />
          <p className='pb-0.5'>содержимое</p>
        </button>
        <IoIosArrowDown className={'ml-4 mr-4'} />
      </div>
    </div>
  )
}

export default AssignmentComponent
