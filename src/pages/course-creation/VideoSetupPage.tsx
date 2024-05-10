import React from 'react'
import { Link } from 'react-router-dom'

const VideoSetupPage: React.FC = () => {
  return (
    <div className='mx-auto max-w-4xl bg-white p-6 rounded-lg shadow-2xl'>
      {/* Main Content Area */}
      <div className='flex-1'>
        <h1 className='text-2xl font-bold mb-8 p-2 pl-8'>Подготовка и тестовое видео</h1>
        <hr />
        <div className={'bg-gray-100 px-32 py-8 text-center'}>
          <h2 className='text-2xl font-bold mb-4 '>
            Подготовьте идеальное место для съемки и получите своевременный отзыв
          </h2>
          <p className='mb-4'>
            Очень важно правильно настроить видео- и аудиооборудование с самого начала,
            поскольку исправлять ошибки после съемки будет намного сложнее. Существует
            множество оригинальных способов создать видео профессионального качества с
            помощью подручных средств.
          </p>
          <div
            className={
              'bg-white w-full h-32 lg:flex sm:flex sm:flex-col sm:h-1/2 sm:pb-4 '
            }
          >
            <h1
              className={
                'text-2xl font-bold text-center lg:text-left sm:text-center sm:pl-4 pt-2'
              }
            >
              Бесплатная помощь от экспертов по видео
            </h1>
            <p className={'px-2'}>
              Получите индивидуальные советы и рекомендации по вашим аудио- и
              видеоматериалам
            </p>
            <Link
              to={'/teaching/test-video'}
              className='bg-white text-black border-2 border-black px-4 py-2 mt-4 mx-auto w-1/2 font-bold'
            >
              Создайте тестовое видео
            </Link>
          </div>
        </div>

        <div className='container py-4 px-12'>
          <h2 className='text-2xl font-bold mb-6'>Советы</h2>
          <TipsSection title='Начните с обозначения целей.'>
            <p>
              Обозначение целей, которые будут стоять перед учащимися вашего курса (их
              также называют
              <Link
                className={'text-blue-400'}
                to={'course-creation/learning-objectives'}
              >
                {' '}
                целями обучения
              </Link>
              ), с самого начала поможет вам определить, какие материалы стоит включить в
              курс и то, как лучше предподносить материал учащимся, чтобы они могли
              добиться поставленных целей.
            </p>
          </TipsSection>
          <TipsSection title='Продумайте структуру курса.'>
            <p>
              Продумайте, какими навыками вы хотите обучить студентов и как вы планируете
              построить обучение. Разбейте связанные лекции на разделы. В каждом разделе
              должно быть минимум 3 лекции, рекомендуется также добавить не менее одного
              задания или практического занятия.{' '}
              <Link
                className={'text-blue-400'}
                to={'course-creation/learning-objectives/'}
              >
                {' '}
                Узнать подробнее.
              </Link>
            </p>
          </TipsSection>
          <TipsSection title='Представьтесь и заинтересуйте аудиторию.'>
            <p>
              Люди в Интернете очень хотят получать знания быстро. Продумайте вводный
              раздел, посмотрите который, учащийся заинтересуется вашим курсом уже в
              первые 10 минут.
            </p>
          </TipsSection>
          <TipsSection title='В каждом разделе должна быть поставлена четкая обучающая задача.'>
            <p>
              Начните каждый раздел с вводной части и опишите, какие{' '}
              <Link
                className={'text-blue-400'}
                to={'course-creation/outline-your-course/'}
              >
                цели ставит перед собой данный раздел, и почему это важно.
              </Link>{' '}
              Называйте лекции и разделы так, чтобы заголовок отражал основную тему и
              создавал логическую структуру.
            </p>
          </TipsSection>
          <TipsSection title='Одна лекция — одна тема.'>
            <p>
              Оптимальная длина лекции составляет 2–7 минут; это помогает удерживать
              интерес студентов и позволяет усваивать информацию небольшими порциями.
            </p>
          </TipsSection>
          video-setup
          <TipsSection title='Выбирайте и комбинируйте типы лекций.'>
            <p>
              Меняйте планы видео: показывайте себя в кадре, демонстрируйте экран,
              выводите слайды и другие наглядные материалы. Если учащиеся периодически
              будут видеть вас в кадре, это поможет лучше начать контакт и выстроить
              диалог.
            </p>
          </TipsSection>
          <TipsSection title='Практические занятия помогают приобрести реальный опыт.'>
            <p>
              Помогите учащимся научиться{' '}
              <Link
                className={'text-blue-400'}
                to={'course-creation/plan-your-practice-activities/'}
              >
                применять полученные знания на практике
              </Link>{' '}
              , подготовьте для них задания, письменные задания и темы для проектов.
            </p>
          </TipsSection>
        </div>
        <div className={'ml-4 px-12'}>
          <h1 className={'font-bold text-xl mb-6'}>Требования</h1>
          <ul className={'list-disc pl-6'}>
            <li className={'mb-2'}>
              Прочитайте наш{' '}
              <Link
                className={'text-blue-400'}
                to={'prodigypath-course-quality-checklist'}
              >
                полный список
              </Link>{' '}
              требований к качеству курса
            </li>
            <li className={'mb-2'}>В вашем курсе должно быть не меньше пяти лекций</li>
            <li className={'mb-2'}>
              Продолжительность всех видеолекций должна в сумме составить не менее 30
              минут
            </li>
            <li className={'mb-2'}>
              В вашем курсе должны содержаться только полезные образовательные материалы
              без рекламы и других отвлекающих материалов
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default VideoSetupPage

const TipsSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <div className='mb-6'>
      <h3 className='text-lg font-semibold mb-2'>{title}</h3>
      <div>{children}</div>
    </div>
  )
}
