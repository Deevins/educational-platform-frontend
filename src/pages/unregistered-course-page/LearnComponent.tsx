import React from 'react'
import { AiOutlineCheck } from 'react-icons/ai'

export const LearnComponent: React.FC = () => {
  // TODO: fix after connect api
  return (
    <div className='max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md'>
      <h2 className='text-lg font-bold'>В конце этого курса вы сможете:</h2>
      <ul className={'flex flex-col'}>
        <li className={'flex text-center items-center'}>
          <AiOutlineCheck className={'mr-2'} />
          <p className={'pb-1'}>Frontend</p>
        </li>
        <li className={'flex text-center items-center'}>
          <AiOutlineCheck className={'mr-2'} />
          <p className={'pb-1'}>Backend</p>
        </li>
        <li className={'flex text-center items-center'}>
          <AiOutlineCheck className={'mr-2'} />
          <p className={'pb-1'}>HTML</p>
        </li>
        <li className={'flex text-center items-center'}>
          <AiOutlineCheck className={'mr-2'} />
          <p className={'pb-1'}>CSS</p>
        </li>
        <li className={'flex text-center items-center'}>
          <AiOutlineCheck className={'mr-2'} />
          <p className={'pb-1'}>JavaScript</p>
        </li>
      </ul>
    </div>
  )
}
