export type GalleryItem = {
	image: string;
	title: string;
	alt: string;
	back?: {
		image: string;
		alt: string;
	};
	description?: string;
};

export const gallery: GalleryItem[] = [
	{
		image: '/gallery/coffee_mug.jpeg',
		title: 'Love, Laughter, and Lattes',
		alt: 'Picture of Coffee Mug Personalized with a Custom Logo and Tag.',
		description: 'Personalized Wedding Shower Mug — features a custom logo design and individual guest tags.'
	},
	{
		image: '/gallery/Photo_2a.jpg',
		title: 'Carved with Care',
		alt: 'Front view of a personalized wooden cutting board.',
		back: {
			image: '/gallery/Photo_2b.jpg',
			alt: 'Back view of a personalized wooden cutting board.'
		},
		description: 'Personalized bamboo cutting boards individually laser-engraved for each wedding shower guest.'
	},
	{
		image: '/gallery/Photo_3a.jpeg',
		title: 'A Recipe for Forever',
		alt: 'Front view of a cutting-board-inspired shower invitation.',
		back: {
			image: '/gallery/Photo_3b.jpeg',
			alt: 'Back view of a cutting-board-inspired shower invitation.'
		},
		description: 'An exquisitely detailed, cutting-board-inspired shower invite.'
	}
];
