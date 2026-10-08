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
		alt: 'Picture of Coffee Mug Personalized with a Custom Logo and Tag',
		description: 'Personalized Wedding Shower Mug — features a custom, collaborative logo design and individual guest tags.'
	}
];
