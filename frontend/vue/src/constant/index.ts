import { type PriceContent } from '@/types'

export const MAX_PAGE_ITEM = 5
export const DEFAULT_TIMEOUT_BUFFER = 300
export const THREES_TIMEOUT_BUFFER = 3000
export const FIVES_TIMEOUT_BUFFER = 5000

export const menuItems = [
  'HOME',
  'ADVANTAGE',
  'HISTORY',
  'SERVICES',
  'WORKS',
  'CASE STUDY',
  'ACHIEVEMENTS',
  'PRICING',
  'OUR BLOG',
  'CONTACT'
]

export const advantageCardContent = [
  {
    iconSrc: '/assets/section_2/sleek-design.svg',
    title: 'sleek design',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting let. Lorem Ipsum has been the industry.'
  },
  {
    iconSrc: '/assets/section_2/clean-code.svg',
    title: 'clean code',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting let. Lorem Ipsum has been the industry.'
  },
  {
    iconSrc: '/assets/section_2/creative-idea.svg',
    title: 'creative idea',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting let. Lorem Ipsum has been the industry.'
  },
  {
    iconSrc: '/assets/section_2/free-support.svg',
    title: 'free support',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting let. Lorem Ipsum has been the industry.'
  }
]

export const recentWorks = [
  { image: '/assets/section_5/img1.jpg', title: 'Web Design', category: 'Web / Design' },
  {
    image: '/assets/section_5/img2.jpg',
    title: 'T-Shirt Design',
    category: 'Art / T-shirt'
  },
  {
    image: '/assets/section_5/img3.jpg',
    title: 'Resume Design',
    category: 'Print / Design'
  },
  {
    image: '/assets/section_5/img4.jpg',
    title: 'Mobile App',
    category: 'App / Development'
  },
  {
    image: '/assets/section_5/img5.jpg',
    title: 'Logo Design',
    category: 'Branding / Design'
  },
  {
    image: '/assets/section_5/img6.jpg',
    title: 'Business Card',
    category: 'Print / Design'
  },
  { image: '/assets/section_5/img7.jpg', title: 'Mobile UI', category: 'UI / UX' },
  {
    image: '/assets/section_5/img8.jpg',
    title: 'Responsive Design',
    category: 'Web / Design'
  }
]

export const caseStudyContent = [
  {
    iconSrc: '/assets/section_6/photography.svg',
    title: 'sleek design',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting let. Lorem Ipsum has been the industry.'
  },
  {
    iconSrc: '/assets/section_6/lamp.svg',
    title: 'creative solutions',
    description:
      'Our team develops innovative and creative solutions to tackle complex business challenges.'
  },
  {
    iconSrc: '/assets/section_6/print.svg',
    title: 'targeted approach',
    description:
      'We use a targeted approach to ensure our strategies align perfectly with your business goals.'
  }
]

export const achievementContent = [
  {
    iconSrc: '/assets/section_7/favourite.svg',
    value: '3891',
    label: 'User Favourites'
  },
  {
    iconSrc: '/assets/section_7/post.svg',
    value: '281K',
    label: 'Posts Last 24 Hours'
  },
  {
    iconSrc: '/assets/section_7/like.svg',
    value: '618',
    label: 'Total Posts'
  },
  {
    iconSrc: '/assets/section_7/campaign.svg',
    value: '178',
    label: 'Campaigns'
  },
  {
    iconSrc: '/assets/section_7/feature.svg',
    value: '285',
    label: 'Amazing Features'
  }
]

export const plansContent: PriceContent[] = [
  {
    name: 'STARTER',
    price: 19,
    features: [
      'Competition Analysis Methods',
      'All Ranked URLs',
      'International Support System',
      'Social Media Tracking'
    ]
  },
  {
    name: 'PREMIUM',
    price: 39,
    features: [
      'Competition Analysis Methods',
      'All Ranked URLs',
      'International Support System',
      'Social Media Tracking'
    ]
  },
  {
    name: 'BUSINESS',
    price: 99,
    features: [
      'Competition Analysis Methods',
      'All Ranked URLs',
      'International Support System',
      'Social Media Tracking'
    ]
  }
]
