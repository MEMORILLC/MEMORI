export type GalleryItem = {
	image: string;
	title: string;
	alt: string;
	description?: string;
};

export const gallery: GalleryItem[] = [
	{
		image: '/gallery/coffee_mug.jpeg',
		title: 'Personalized Wedding Shower Mug',
		alt: 'Picture of Coffee Mug Personalized with a Custom Logo and Tag',
		description: 'Personalized Wedding Shower Mug — Features a custom, collaborative logo design and individual guest tags.'
	}
];
