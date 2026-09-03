export type GalleryItem = {
	image: string;
	title: string;
	description?: string;
};

export const gallery: GalleryItem[] = [
	{
		image: '/gallery/product-1.jpg',
		title: 'Product One',
		description: 'Description of this product.'
	},
	{
		image: '/gallery/product-2.jpg',
		title: 'Product Two',
		description: 'Description of this product.'
	},
	{
		image: '/gallery/product-3.jpg',
		title: 'Product Three',
		description: 'Description of this product.'
	},
	{
		image: '/gallery/product-4.jpg',
		title: 'Product Four',
		description: 'Description of this product.'
	}
];
