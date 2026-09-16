import Icon from '@iconify/svelte';

export const site = {
  companyName: 'Memori',
  tagline: 'Made by your moments.',
  email: 'memorillc@outlook.com',
  social: {
    // Pass the component to 'component' and the identifier string to 'props'
    instagram: { 
      url: 'https://instagram.com', 
      component: Icon, 
      props: { icon: 'akar-icons:instagram-fill', height: '24' } 
    },
    facebook: { 
      url: 'https://facebook.com', 
      component: Icon, 
      props: { icon: 'mdi:facebook', height: '24' } 
    },
    pinterest: { 
      url: 'https://pinterest.com', 
      component: Icon, 
      props: { icon: 'mdi:pinterest', height: '24' } 
    }
  }
}
