import React, { useState } from 'react'
import { AiOutlineInfo } from 'react-icons/ai'

const AccessibilityPage = () => {
  const [options, setOptions] = useState([
    {
      id: 1,
      label: 'Подписи в курсе соответствуют данным рекомендациям',
      checked: false,
    },
    {
      id: 2,
      label: 'Аудиоматериалы в курсе соответствуют данным рекомендациям',
      checked: false,
    },
    {
      id: 3,
      label: 'Материалы, приложенные к курсу, соответствуют данным рекомендациям',
      checked: false,
    },
  ])

  const handleCheckboxChange = (id: number) => {
    const newOptions = options.map((option) => {
      if (option.id === id) {
        return { ...option, checked: !option.checked }
      }
      return option
    })
    setOptions(newOptions)
  }

  return (
    <div className='mx-auto max-w-4xl bg-white p-6 rounded-lg shadow'>
      <h1 className='text-2xl font-bold mb-6'>Доступность</h1>
      <div className='flex items-start mb-6'>
        <div className={'px-4 py-2 border-2 border-gray-200'}>
          <h2 className='text-xl font-bold mb-2 flex text-center items-center'>
            <AiOutlineInfo className={'bg-black text-white rounded-full mr-2 w-6 h-6'} />
            Создание доступных материалов курса
          </h2>
          <p>
            Благодаря доступности люди с ограниченными возможностями могут использовать те
            же информации, функции и услуги, как и люди без инвалидности, в понятной,
            осязаемой и удобной форме. Другими словами, это инклюзивная практика,
            обеспечивающая отсутствие барьеров в обучении для как можно более широкой
            аудитории.
          </p>
        </div>
      </div>

      <section className='mb-6'>
        <h2 className='text-xl font-bold mb-2'>
          Контрольные списки по обеспечению доступности
        </h2>
        <p className='mb-4'>
          Чтобы помочь вам в создании доступных материалов курса, мы подготовили
          рекомендации и лучшие практики для преподавателей, которые следует учитывать при
          создании новых курсов или обновлении существующих материалов. Ознакомьтесь с
          этими рекомендациями по обеспечению доступности и контрольными списками, чтобы
          проверить, соответствует ли ваш курс этим рекомендациям.
        </p>
        <p className='mb-4'>
          Примечание. Хотя мы настоятельно рекомендуем следовать этим советам по
          обеспечению доступности, их соблюдение не является обязательным требованием
          перед публикацией вашего курса. Тем не менее, материалы, отвечающие этим
          рекомендациям по обеспечению доступности, могут принести пользу большему числу
          учащихся, которые смогут пройти ваш курс.
        </p>
        <hr />
      </section>
      <ExpandableList
        title='Контрольный список по обеспечению доступности встроенных субтитров'
        handleCheckboxChange={handleCheckboxChange}
        option={options[0]}
      >
        <ul className='list-disc list-inside space-y-2'>
          <li>Аудиоматериалы можно прослушивать отдельно от видео, как аудиокнигу.</li>
          <li>
            Если визуальные материалы добавлены не для украшения, объясняется, что
            отображается на экране.
          </li>
          <li>
            Описана вся последовательность действий на экране, отдельные этапы не
            пропущены.
          </li>
          <li>
            В устной речи используется простой и понятный язык, ее темп размеренный (не
            слишком быстрый).
          </li>
          <li>
            Использование фигур речи, идиом, профессионального жаргона и сленга сведено к
            минимуму, незнакомые слова и сокращения объяснены.
          </li>
          <li>
            Субтитры ко всем материалам проверены на предмет точности ― особенно имена
            собственные, сокращения, аббревиатуры и технические термины.
          </li>
        </ul>
      </ExpandableList>
      <ExpandableList
        title='Контрольный список по обеспечению доступности встроенных субтитров'
        handleCheckboxChange={handleCheckboxChange}
        option={options[1]}
      >
        <ul className='list-disc list-inside space-y-2'>
          <li>
            Для всех объемных документов предоставлены содержание и глоссарий терминов.
          </li>
          <li>
            Семантическая разметка для заголовков, а также маркированных и нумерованных
            списков применена ко всем документам.
          </li>
          <li>
            Текст материалов разделен на краткие абзацы и/или объединен в простые таблицы.
          </li>
          <li>
            Для всех изображений в документах или слайдах презентации предусмотрен
            альтернативный текст.
          </li>
          <li>Для оформления текста и изображений используются контрастные цвета.</li>
        </ul>
      </ExpandableList>
      <ExpandableList
        title='Контрольный список по обеспечению доступности встроенных субтитров'
        handleCheckboxChange={handleCheckboxChange}
        option={options[2]}
      >
        <ul className='list-disc list-inside space-y-2'>
          <li>
            Все автоматические субтитры должны быть проверены на предмет точности.
            Точность субтитров должна составлять 99%.
          </li>
          <li>
            Любые звуковые эффекты, относящиеся к курсу, должны быть отражены в субтитрах,
            например: (Гудки).
          </li>
          <li>
            Любые неречевые элементы, такие как музыка, должны быть отражены в субтитрах,
            например: (Джазовая музыка).
          </li>
          <li>
            Указания на стиль устной речи должны быть отражены в субтитрах, например:
            (Восклицает).
          </li>
          <li>В субтитрах указываются лица, выступающие на экране и за кадром.</li>
        </ul>
      </ExpandableList>
    </div>
  )
}

export default AccessibilityPage

type CheckboxOption = {
  id: number
  label: string
  checked: boolean
}

type ExpandableListProps = {
  title: string
  children: React.ReactNode
  option: CheckboxOption
  handleCheckboxChange: (id: number) => void
}

const ExpandableList: React.FC<ExpandableListProps> = ({
  title,
  children,
  option,
  handleCheckboxChange,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='mb-4'>
      <button
        className='text-left w-full font-bold text-lg py-2 px-4 hover:bg-gray-100 focus:outline-none flex justify-between items-center'
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span
          className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        >
          <svg className='w-4 h-4 fill-current' viewBox='0 0 20 20'>
            <path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className='mt-2 px-4 py-2 bg-white border-l-4 border-blue-500'>
          {children}
        </div>
      )}
      <hr className={'border-gray-200 mb-6'} />
      <div className={'flex'}>
        <hr />

        <label className={'ml-4 hover:cursor-pointer w-full'}>
          <input
            type='checkbox'
            className={'accent-black mr-2'}
            checked={option.checked}
            onChange={() => handleCheckboxChange(option.id)}
          />
          {option.label}
        </label>
      </div>
    </div>
  )
}
