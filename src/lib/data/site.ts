import Icon from '@iconify/svelte';

export const site = {
  companyName: 'Memori',
  tagline: 'Made by your moments.',
  email: 'test@email.com',
  phone: '(555) 555-5555',
  social: {
    // Pass the component to 'component' and the identifier string to 'props'
    facebook: { 
      url: 'https://facebook.com', 
      component: Icon, 
      props: { icon: 'mdi:facebook', height: '24' } 
    },
    instagram: { 
      url: 'https://instagram.com', 
      component: Icon, 
      props: { icon: 'akar-icons:instagram-fill', height: '24' } 
    },
    etsy: { 
      url: 'https://etsy.com', 
      component: Icon, 
      props: { icon: 'mdi:etsy', height: '24' } 
    }
  }
}
