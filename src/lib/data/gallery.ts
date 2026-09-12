export type GalleryItem = {
	image: string;
	title: string;
	alt: string;
	description?: string;
};

export const gallery: GalleryItem[] = [
	{
		image: '/gallery/product-1.png',
		title: 'Product One',
		alt: 'Picture of Product One',
		description: 'Description of this product.'
	},
	{
		image: '/gallery/product-2.png',
		title: 'Product Two',
		alt: 'Picture of Product Two',
		description: 'Description of this product.'
	},
	{
		image: '/gallery/product-3.png',
		title: 'Product Three',
		alt: 'Picture of Product Three',
		description: 'Description of this product.'
	},
	{
		image: '/gallery/product-4.png',
		title: 'Product Four',
		alt: 'Picture of Product Four',
		description: 'Description of this product.'
	}
];
