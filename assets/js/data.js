/* Novalyte seed services.
   Source basis: user draft notes/screenshots from the provider panel.
   Provider rates stay internal/admin-only. Client rates are editable in admin. */
window.NOVALYTE_SEED_SERVICES = [
  {
    id: 'svc_fb_ph_like_1097', providerId: '1097', platform: 'Facebook', category: 'Reactions',
    name: 'Facebook PHB pH Like (👍) | NR',
    description: 'Facebook PH like reactions. Manual/provider-panel service from draft screenshot.',
    providerRate: 300.00, clientRate: 320.00, rateUnit: 1000, min: 100, max: 10000000,
    avgTime: '14 minutes', tag: 'PH Reaction', visible: true
  },
  {
    id: 'svc_fb_ph_love_1098', providerId: '1098', platform: 'Facebook', category: 'Reactions',
    name: 'Facebook PHB pH Love (❤️) | NR', description: 'Facebook PH love reactions.',
    providerRate: 300.00, clientRate: 320.00, rateUnit: 1000, min: 100, max: 10000000,
    avgTime: '42 hours', tag: 'PH Reaction', visible: true
  },
  {
    id: 'svc_fb_ph_care_1099', providerId: '1099', platform: 'Facebook', category: 'Reactions',
    name: 'Facebook PHB pH Care (🥰) | NR', description: 'Facebook PH care reactions.',
    providerRate: 300.00, clientRate: 320.00, rateUnit: 1000, min: 100, max: 100000,
    avgTime: 'Not enough data', tag: 'PH Reaction', visible: true
  },
  {
    id: 'svc_fb_ph_wow_1208', providerId: '1208', platform: 'Facebook', category: 'Reactions',
    name: 'Facebook PHB pH Wow (😮) | NR', description: 'Facebook PH wow reactions.',
    providerRate: 300.00, clientRate: 320.00, rateUnit: 1000, min: 100, max: 10000000,
    avgTime: '12 minutes', tag: 'PH Reaction', visible: true
  },
  {
    id: 'svc_fb_ph_sad_1210', providerId: '1210', platform: 'Facebook', category: 'Reactions',
    name: 'Facebook PHB pH Sad (😢) | NR', description: 'Facebook PH sad reactions.',
    providerRate: 300.00, clientRate: 320.00, rateUnit: 1000, min: 100, max: 10000000,
    avgTime: 'Not enough data', tag: 'PH Reaction', visible: true
  },
  {
    id: 'svc_fb_ph_haha_1209', providerId: '1209', platform: 'Facebook', category: 'Reactions',
    name: 'Facebook PHB pH HAHA (😂) | NR', description: 'Facebook PH haha reactions.',
    providerRate: 510.00, clientRate: 550.00, rateUnit: 1000, min: 100, max: 10000000,
    avgTime: '121 hours and 23 minutes', tag: 'PH Reaction', visible: true
  },
  {
    id: 'svc_fb_ph_angry_1207', providerId: '1207', platform: 'Facebook', category: 'Reactions',
    name: 'Facebook PHB pH Angry (😡) | NR', description: 'Facebook PH angry reactions.',
    providerRate: 510.00, clientRate: 550.00, rateUnit: 1000, min: 100, max: 10000000,
    avgTime: '3 hours and 26 minutes', tag: 'PH Reaction', visible: true
  },
  {
    id: 'svc_fb_page_followers_1157', providerId: '1157', platform: 'Facebook', category: 'Followers',
    name: 'Facebook Profile/Page Followers | NR | INSTANT',
    description: 'Facebook profile/page follower service. Delivery average may vary depending on provider load.',
    providerRate: 450.00, clientRate: 500.00, rateUnit: 1000, min: 100, max: 1000000,
    avgTime: '99 hours and 21 minutes', tag: 'Followers', visible: true
  },
  {
    id: 'svc_fb_custom_comments_1206', providerId: '1206', platform: 'Facebook', category: 'Comments',
    name: 'Facebook PHB pH Custom Comments | NR | INSTANT',
    description: 'Custom comments service. Prepare exact comments/instructions before ordering.',
    providerRate: 4624.00, clientRate: 4800.00, rateUnit: 1000, min: 50, max: 10000,
    avgTime: 'Not enough data', tag: 'Custom comments', visible: true
  },
  {
    id: 'svc_fb_shares_1446', providerId: '1446', platform: 'Facebook', category: 'Shares',
    name: 'Facebook Shares | NR | INSTANT', description: 'Facebook shares for public post links.',
    providerRate: 170.00, clientRate: 190.00, rateUnit: 1000, min: 100, max: 1000000000,
    avgTime: '1 hour and 29 minutes', tag: 'Shares', visible: true
  },

  {
    id: 'svc_tt_views_1723', providerId: '1723', platform: 'TikTok', category: 'Views',
    name: 'TikTok Video Views [Max Unlimited] | Instant Start | Day 10M',
    description: 'Cheapest TikTok video views. Public video link required.',
    providerRate: 0.9436, clientRate: 5.00, rateUnit: 1000, min: 100, max: 2147482677,
    avgTime: '8 minutes', tag: 'Cheapest views', visible: true
  },
  {
    id: 'svc_tt_views_1724', providerId: '1724', platform: 'TikTok', category: 'Views',
    name: 'TikTok Video Views [Max Unlimited] | Instant Start | Day 10M',
    description: 'TikTok video views with instant-start provider listing.',
    providerRate: 2.35, clientRate: 7.00, rateUnit: 1000, min: 100, max: 2147483647,
    avgTime: '1 hour and 5 minutes', tag: 'Views', visible: true
  },
  {
    id: 'svc_tt_views_1725', providerId: '1725', platform: 'TikTok', category: 'Views',
    name: 'TikTok Video Views [Max Unlimited] | 30 Days | Instant Start',
    description: 'TikTok views with 30-day provider label.',
    providerRate: 1.03, clientRate: 6.00, rateUnit: 1000, min: 100, max: 2147482677,
    avgTime: '2 minutes', tag: '30 days', visible: true
  },
  {
    id: 'svc_tt_shares_1726', providerId: '1726', platform: 'TikTok', category: 'Shares',
    name: 'TikTok Shares [Max Unlimited] | Instant Start | Day 10M',
    description: 'TikTok shares for public video links.',
    providerRate: 4.82, clientRate: 10.00, rateUnit: 1000, min: 10, max: 2147483647,
    avgTime: '1 hour and 32 minutes', tag: 'Shares', visible: true
  },
  {
    id: 'svc_tt_views_overflow_674', providerId: '674', platform: 'TikTok', category: 'Views',
    name: 'TikTok Video Views + 100% Overflow | Super Stable | No Refill',
    description: 'Overflow views service. Provider notes: do not place a second order on the same link before completion.',
    providerRate: 12.39, clientRate: 18.00, rateUnit: 1000, min: 50, max: 2147483647,
    avgTime: '127 hours and 12 minutes', tag: 'Overflow', visible: true
  },
  {
    id: 'svc_tt_views_overflow_675', providerId: '675', platform: 'TikTok', category: 'Views',
    name: 'TikTok Video Views + 200% Overflow | Super Stable | No Refill',
    description: 'Overflow views service with 200% overflow label.',
    providerRate: 16.52, clientRate: 23.00, rateUnit: 1000, min: 50, max: 2147483647,
    avgTime: '1 hour', tag: 'Overflow', visible: true
  },
  {
    id: 'svc_tt_views_overflow_676', providerId: '676', platform: 'TikTok', category: 'Views',
    name: 'TikTok Video Views + 300% Overflow | Super Stable | No Refill',
    description: 'Overflow views service with 300% overflow label.',
    providerRate: 20.65, clientRate: 28.00, rateUnit: 1000, min: 50, max: 2147483647,
    avgTime: '10 minutes', tag: 'Overflow', visible: true
  },
  {
    id: 'svc_tt_likes_lq_1865', providerId: '1865', platform: 'TikTok', category: 'Likes',
    name: 'TikTok Likes [Max 1M] | LQ Accounts | Cancel Enable | No Refill',
    description: 'Low-cost TikTok likes, superinstant provider listing.',
    providerRate: 10.90, clientRate: 18.00, rateUnit: 1000, min: 10, max: 1000000,
    avgTime: '21 hours and 32 minutes', tag: 'Cheapest likes', visible: true
  },
  {
    id: 'svc_tt_likes_real_1833', providerId: '1833', platform: 'TikTok', category: 'Likes',
    name: 'TikTok Likes [Max 5M] | 100% Real Accounts | 0% Drop | No Refill',
    description: 'Real-account TikTok likes. More stable than low-quality likes.',
    providerRate: 26.93, clientRate: 38.00, rateUnit: 1000, min: 10, max: 5000000,
    avgTime: '8 hours and 11 minutes', tag: 'Real likes', visible: true
  },
  {
    id: 'svc_tt_likes_views_1153', providerId: '1153', platform: 'TikTok', category: 'Likes + Views',
    name: 'TikTok Likes + Views | Worldwide Based | REAL HQ Profiles',
    description: 'Bundle service for TikTok likes and views with REAL HQ profile label.',
    providerRate: 13.68, clientRate: 22.00, rateUnit: 1000, min: 10, max: 100000,
    avgTime: '1 hour and 26 minutes', tag: 'Bundle', visible: true
  },
  {
    id: 'svc_tt_followers_1882', providerId: '1882', platform: 'TikTok', category: 'Followers',
    name: 'TikTok Followers [Max 1M] | HQ & Real Profiles | Low Drop | No Refill',
    description: 'TikTok follower service with HQ/real profile label and low drop provider note.',
    providerRate: 122.26, clientRate: 150.00, rateUnit: 1000, min: 50, max: 1000000,
    avgTime: 'Not enough data', tag: 'Followers', visible: true
  },
  {
    id: 'svc_tt_followers_1886', providerId: '1886', platform: 'TikTok', category: 'Followers',
    name: 'TikTok Followers [Max 1M] | HQ & Real Profiles | 30 Days | Instant Start',
    description: 'TikTok followers with 30 days provider label.',
    providerRate: 171.66, clientRate: 205.00, rateUnit: 1000, min: 50, max: 1000000,
    avgTime: 'Not enough data', tag: 'HQ followers', visible: true
  },
  {
    id: 'svc_tt_followers_1887', providerId: '1887', platform: 'TikTok', category: 'Followers',
    name: 'TikTok Followers [Max 10M] | Low Drop | Cancel Enable | No Refill',
    description: 'Budget TikTok followers with low drop provider label.',
    providerRate: 67.83, clientRate: 90.00, rateUnit: 1000, min: 100, max: 1000000,
    avgTime: 'Not enough data', tag: 'Budget followers', visible: true
  },

  {
    id: 'svc_ig_repost_1612', providerId: '1612', platform: 'Instagram', category: 'Repost',
    name: 'Instagram Repost/Share Post | Worldwide | 100% Real Accounts',
    description: 'Instagram repost/share post service for worldwide links.',
    providerRate: 29.71, clientRate: 42.00, rateUnit: 1000, min: 100, max: 1000000,
    avgTime: 'Not enough data', tag: 'Repost', visible: true
  },
  {
    id: 'svc_ig_likes_1717', providerId: '1717', platform: 'Instagram', category: 'Likes',
    name: 'Instagram Real Likes [Max 1M] | HQ Accounts | Low Drop | No Refill',
    description: 'Instagram real likes with instant-start provider label.',
    providerRate: 8.78, clientRate: 15.00, rateUnit: 1000, min: 10, max: 1000000,
    avgTime: '31 minutes', tag: 'Real likes', visible: true
  },
  {
    id: 'svc_ig_views_720', providerId: '720', platform: 'Instagram', category: 'Views',
    name: 'Instagram Video Views | Max Unlimited | Cancel Enable | ULTRA FAST',
    description: 'Ultra-fast Instagram video views. Public video/reel link required.',
    providerRate: 0.2815, clientRate: 5.00, rateUnit: 1000, min: 100, max: 2147482764,
    avgTime: '10 minutes', tag: 'Ultra fast', visible: true
  },
  {
    id: 'svc_ig_saves_737', providerId: '737', platform: 'Instagram', category: 'Saves',
    name: 'Instagram Save | All Links | Instant | 20K/Day',
    description: 'Instagram saves for public links.',
    providerRate: 0.6423, clientRate: 5.00, rateUnit: 1000, min: 10, max: 50000,
    avgTime: 'Not enough data', tag: 'Saves', visible: true
  },
  {
    id: 'svc_ig_followers_1827', providerId: '1827', platform: 'Instagram', category: 'Followers',
    name: 'Instagram Followers [Max 1M] | 100% Real Accounts | Low Drop | No Refill',
    description: 'Recommended Instagram followers for drop reliability.',
    providerRate: 68.98, clientRate: 90.00, rateUnit: 1000, min: 50, max: 1000000,
    avgTime: '6 minutes', tag: 'Recommended', visible: true
  },
  {
    id: 'svc_ig_followers_1832', providerId: '1832', platform: 'Instagram', category: 'Followers',
    name: 'Instagram Followers [Max 1M] | 100% Real Accounts | Lifetime',
    description: 'Instagram followers with lifetime provider label.',
    providerRate: 103.75, clientRate: 130.00, rateUnit: 1000, min: 50, max: 1000000,
    avgTime: '7 minutes', tag: 'Lifetime', visible: true
  },
  {
    id: 'svc_ig_comments_1326', providerId: '1326', platform: 'Instagram', category: 'Comments',
    name: 'Instagram Custom Comments | Global Based | Max 100K | High Quality',
    description: 'Instagram custom comments. Prepare comments/instructions before ordering.',
    providerRate: 70.37, clientRate: 90.00, rateUnit: 1000, min: 10, max: 100000,
    avgTime: 'Not enough data', tag: 'Comments', visible: true
  },

  {
    id: 'svc_youtube_views_sample', providerId: 'YT-4001', platform: 'YouTube', category: 'Views',
    name: 'YouTube Video Views', description: 'YouTube views placeholder. Edit with exact provider ID/rate once selected from panel.',
    providerRate: 450, clientRate: 520, rateUnit: 1000, min: 100, max: 100000,
    avgTime: '1-4 days', tag: 'To verify', visible: true
  },
  {
    id: 'svc_telegram_members_sample', providerId: 'TG-5001', platform: 'Telegram', category: 'Members',
    name: 'Telegram Group Members', description: 'Telegram members placeholder. Edit with exact provider ID/rate once selected from panel.',
    providerRate: 380, clientRate: 440, rateUnit: 1000, min: 100, max: 50000,
    avgTime: '1-3 days', tag: 'To verify', visible: true
  }
];
