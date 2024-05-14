import React from 'react'
import Slider, { Settings } from 'react-slick'

import item_1 from '/carousel_1.png'
import item_2 from '/carousel_2.png'
import item_3 from '/carousel_3.png'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import CarouselItem from '@/components/carousel/carousel-item/carousel-item.tsx'

const items = [
  {
    image: item_1,
    title: 'Откройте новые горизонты',
    text: 'Начните своё путешествие в мир знаний с нашими интерактивными курсами! Узнайте что-то новое, расширьте свои навыки и достигайте своих целей вместе с нами!',
  },
  {
    image: item_2,
    title: 'Учитесь у лучших',
    text: 'Присоединяйтесь к нашим занятиям, проводимым экспертами отрасли. Получите уникальные инсайты и практические знания, которые помогут вам продвинуться в карьере',
  },
  {
    image: item_3,
    title: 'Гибкое обучение для вашего удобства',
    text: 'Учитесь в удобное для вас время и в любом месте. Наши курсы доступны 24/7, чтобы вы могли развиваться без ограничений. Начните уже сегодня!',
  },
]

const settings: Settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  arrows: true,
  speed: 1000,
  draggable: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplaySpeed: 4000,
}

const SliderWithImageAndText: React.FC = () => {
  return (
    <Slider {...settings} className={'-z-50'}>
      {items.map((item, idx) => (
        <CarouselItem key={idx} image={item.image} title={item.title} text={item.text} />
      ))}
    </Slider>
  )
}

export default SliderWithImageAndText
