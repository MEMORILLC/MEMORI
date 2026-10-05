export type GalleryItem = {
	image: string;
	title: string;
	alt: string;
	description?: string;
};

export const gallery: GalleryItem[] = [
	{
		image: '/gallery/coffee_mug.jpeg',
		title: 'Coffee Mug',
		alt: 'Picture of Coffee Mug Personalized with a Custom Logo and Tag',
		description: 'Coffee mug favor created for a wedding shower using a custom logo designed with input from the customer and a personalized tag for the attendees.'
	}
];
