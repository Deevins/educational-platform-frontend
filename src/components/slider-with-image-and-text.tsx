import React from 'react'
import Slider, { Settings } from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import CarouselItem from '@/components/carousel/carousel-item/carousel-item.tsx'

const items = [
  {
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/2006-09-15_18-47-19_ziaja.jpg/1200px-2006-09-15_18-47-19_ziaja.jpg',
    title: 'Заголовок 1',
    text: 'Данная платформа предлагает какую-то  за какую-то , мимо которй мы не сможете пройтпи',
  },
  {
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/2006-09-15_18-47-19_ziaja.jpg/1200px-2006-09-15_18-47-19_ziaja.jpg',
    title: 'Заголовок 2',
    text: 'Текст 2 ...',
  },
  {
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/2006-09-15_18-47-19_ziaja.jpg/1200px-2006-09-15_18-47-19_ziaja.jpg',
    title: 'Заголовок 3',
    text: 'Данная платформа предлагает какую-то  за какую-то , мимо которй...',
  },
]

const settings: Settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  arrows: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplaySpeed: 5000,
}

const SliderWithImageAndText: React.FC = () => {
  return (
    <Slider {...settings}>
      {items.map((item, idx) => (
        <CarouselItem key={idx} image={item.image} title={item.title} text={item.text} />
      ))}
    </Slider>
  )
}

export default SliderWithImageAndText
