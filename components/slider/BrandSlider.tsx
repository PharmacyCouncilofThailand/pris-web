'use client'
import { Swiper as SwiperOriginal, SwiperSlide as SwiperSlideOriginal } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"

import Image from 'next/image';

const Swiper = SwiperOriginal as any;
const SwiperSlide = SwiperSlideOriginal as any;

const swiperOptions = {
	modules: [Autoplay, Pagination, Navigation],
	slidesPerView: 4,
	spaceBetween: 30,
	autoplay: {
		delay: 2500,
		disableOnInteraction: false,
	},
	loop: true,

	// Navigation
	navigation: {
		nextEl: '.h1n',
		prevEl: '.h1p',
	},

	// Pagination
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},

	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 30,
		},
		575: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
		767: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
		991: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
		1199: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
		1350: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
	}
}
export default function BrandSlider() {
	return (
		<>
			<Swiper {...swiperOptions} className="brand-slider-area owl-carousel">
				{[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
					<SwiperSlide className="brand-box" key={num}>
						<div style={{ position: 'relative', width: '100%', height: '100px' }}>
							<Image
								src={`/assets/img/elements/brand-img${num}.png`}
								alt={`Brand ${num}`}
								fill
								style={{ objectFit: 'contain' }}
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	)
}
