export type GalleryItem = {
	image: string;
	title: string;
	alt: string;
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
		alt: 'Picture of a Personalized Wooden Cutting Board.',
		description: 'Personalized bamboo cutting boards individually laser-engraved for each wedding shower guest.'
	},
	{
		image: '/gallery/Photo_2b.jpg',
		title: 'Carved with Care',
		alt: 'Picture of a Personalized Wooden Cutting Board.',
		description: 'Personalized bamboo cutting boards individually laser-engraved for each wedding shower guest.'
	},
	{
		image: '/gallery/Photo_3a.jpeg',
		title: 'A Recipe for Forever',
		alt: 'Picture of a cutting-board-inspired shower invite.',
		description: 'An exquisitely detailed, cutting-board-inspired shower invite.'
	},
	{
		image: '/gallery/Photo_3b.jpeg',
		title: 'A Recipe for Forever',
		alt: 'Picture of a cutting-board-inspired shower invite.',
		description: 'An exquisitely detailed, cutting-board-inspired shower invite.'
	}
];
