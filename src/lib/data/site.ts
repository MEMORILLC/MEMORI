import Icon from '@iconify/svelte';

type SocialLink = {
  url: string;
  component: typeof Icon;
  props: {
    icon: string;
    height: string;
  };
};

const social: Record<string, SocialLink> = {
  // Pass the component to 'component' and the identifier string to 'props'
  // instagram: {
  //   url: 'https://instagram.com',
  //   component: Icon,
  //   props: { icon: 'akar-icons:instagram-fill', height: '24' }
  // },
  // facebook: {
  //   url: 'https://facebook.com',
  //   component: Icon,
  //   props: { icon: 'mdi:facebook', height: '24' }
  // },
  // pinterest: {
  //   url: 'https://pinterest.com',
  //   component: Icon,
  //   props: { icon: 'mdi:pinterest', height: '24' }
  // }
};

export const site = {
  companyName: 'Memori',
  tagline: 'Made by your moments.',
  email: 'memorillc@outlook.com',
  social
};
