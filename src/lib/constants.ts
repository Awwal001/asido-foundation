// lib/constants.ts
export const SITE_CONFIG = {
  name: 'Asido Foundation',
  description: 'Making mental health support accessible through advocacy and action',
  url: 'https://asidofoundation.org',
  ogImage: '/logo.svg',
  links: {
    twitter: 'https://twitter.com/asidofoundation',
    facebook: 'https://facebook.com/asidofoundation',
    instagram: 'https://instagram.com/asidofoundation',
    linkedin: 'https://linkedin.com/company/asidofoundation',
  },
} as const

export const NAVIGATION = {
  main: [
    { label: 'About Us', href: '#about' },
    { label: 'Impact', href: '#impact' },
    { label: 'Get Involved', href: '#get-involved' },
    { label: 'Stay Informed', href: '#blog' },
  ],
  actions: [
    { label: 'Take the Pledge', href: '#take-the-pledge', variant: 'outline' as const },
    { label: 'Donate', href: '#donate', variant: 'primary' as const },
  ],
  secondary: [
    { label: 'Who We Are', href: '#who-we-are' },
    { label: 'Leadership', href: '#leadership' },
    { label: 'Our Volunteer Team', href: '#volunteer-team' },
    { label: 'Milestones', href: '#milestones' },
  ],
} as const

export const FOOTER_LINKS = {
  quickLinks: [
    { label: 'Programs', href: '#programs' },
    { label: 'Blog', href: '#blog' },
    { label: 'Thursday Tribune', href: '#thursday-tribune' },
    { label: 'IMCE Sessions', href: '#imce-sessions' },
  ],
  support: [
    { label: 'Donate', href: '#donate' },
    { label: 'Volunteer', href: '#volunteer' },
    { label: 'Book Campaign', href: '#book-campaign' },
    { label: 'Unashamed Pledge', href: '#unashamed-pledge' },
  ],
  contact: {
    address: 'No4, Awosika Street, Old Bodija, Ibadan.',
    email: 'asidofoundation@gmail.com',
    phones: ['+234 818 077 7458', '+234 902 808 0416'],
  },
} as const