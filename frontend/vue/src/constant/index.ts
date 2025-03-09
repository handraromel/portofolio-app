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
    iconSrc:
      'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/section-2/sleek-design.svg',
    title: 'sleek design',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting let. Lorem Ipsum has been the industry.'
  },
  {
    iconSrc:
      'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/section-2/clean-code.svg',
    title: 'clean code',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting let. Lorem Ipsum has been the industry.'
  },
  {
    iconSrc:
      'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/section-2/creative-idea.svg',
    title: 'creative idea',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting let. Lorem Ipsum has been the industry.'
  },
  {
    iconSrc:
      'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/section-2/free-support.svg',
    title: 'free support',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting let. Lorem Ipsum has been the industry.'
  }
]

export const recentWorks = [
  {
    image:
      'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/section-5/img1.jpg',
    title: 'Web Design',
    category: 'Web / Design'
  },
  {
    image:
      'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/section-5/img2.jpg',
    title: 'T-Shirt Design',
    category: 'Art / T-shirt'
  },
  {
    image:
      'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/section-5/img3.jpg',
    title: 'Resume Design',
    category: 'Print / Design'
  },
  {
    image:
      'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/section-5/img4.jpg',
    title: 'Mobile App',
    category: 'App / Development'
  },
  {
    image:
      'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/section-5/img5.jpg',
    title: 'Logo Design',
    category: 'Branding / Design'
  },
  {
    image:
      'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/section-5/img6.jpg',
    title: 'Business Card',
    category: 'Print / Design'
  },
  {
    image:
      'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/section-5/img7.jpg',
    title: 'Mobile UI',
    category: 'UI / UX'
  },
  {
    image:
      'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/section-5/img8.jpg',
    title: 'Responsive Design',
    category: 'Web / Design'
  }
]

export const caseStudyContent = [
  {
    iconSrc:
      'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/section-6/photography.svg',
    title: 'sleek design',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting let. Lorem Ipsum has been the industry.'
  },
  {
    iconSrc:
      'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/section-6/lamp.svg',
    title: 'creative solutions',
    description:
      'Our team develops innovative and creative solutions to tackle complex business challenges.'
  },
  {
    iconSrc:
      'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/section-6/print.svg',
    title: 'targeted approach',
    description:
      'We use a targeted approach to ensure our strategies align perfectly with your business goals.'
  }
]

export const achievementContent = [
  {
    iconSrc:
      'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/section-7/favourite.svg',
    value: '3891',
    label: 'User Favourites'
  },
  {
    iconSrc:
      'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/section-7/post.svg',
    value: '281K',
    label: 'Posts Last 24 Hours'
  },
  {
    iconSrc:
      'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/section-7/like.svg',
    value: '618',
    label: 'Total Posts'
  },
  {
    iconSrc:
      'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/section-7/campaign.svg',
    value: '178',
    label: 'Campaigns'
  },
  {
    iconSrc:
      'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/section-7/feature.svg',
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

export const publicAssets = [
  {
    decoration:
      'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/decoration/decoration.png',
    fonts:
      'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/fonts/jakarta.ttf',
    footer: [
      {
        facebook:
          'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/footer/facebook.svg',
        gplus:
          'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/footer/gplus.svg',
        linkedin:
          'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/footer/linkedin.svg',
        skype:
          'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/footer/skype.svg',
        tumblr:
          'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/footer/tumblr.svg',
        twitter:
          'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/footer/twitter.svg',
        vimeo:
          'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/footer/vimeo.svg'
      }
    ],
    homepage: [
      {
        background:
          'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/homepage/bg.jpg',
        profile:
          'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/homepage/profile.jpg'
      }
    ],
    section1: [
      {
        anchor:
          'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/section-1/anchor.png',
        background:
          'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/section-1/background.jpg'
      }
    ],
    section10: [
      {
        arrow:
          'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/section-10/arrow.svg',
        blog1:
          'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/section-10/blog1.jpg',
        blog2:
          'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/section-10/blog2.jpg',
        blog3:
          'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/section-10/blog3.jpg',
        blog4:
          'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/section-10/blog4.jpg',
        play: 'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/section-10/play.svg'
      }
    ],
    section3: [
      {
        monitor:
          'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/section-3/monitor.png'
      }
    ],
    section4: [
      {
        photography:
          'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/section-4/photography.svg',
        print:
          'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/section-4/print.svg',
        rSide:
          'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/section-4/r-side.jpg',
        web: 'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/section-4/web.svg'
      }
    ],
    stats: [
      {
        error:
          'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/stats/error.svg',
        info: 'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/stats/info.svg',
        success:
          'https://objectstorage.us-phoenix-1.oraclecloud.com/p/01EEwaMK1sJ8gzo_MMmykH_lskQ6gm6RLnZM1m3Wl77kEwGEwJOztyEQygsVTH30/n/axuu7txrfgin/b/bucket-20221228-0640/o/portofolio-app-1/stats/success.svg'
      }
    ]
  }
]
