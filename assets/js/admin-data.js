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
    id: "svc_youtube_views_1259", providerId: "1259", platform: "YouTube", category: "Views",
    name: "YouTube Shorts Views [ Max 1M ] | Only Shorts Link | Non Drop | Lifetime | Day 5K",
    description: "YouTube views service from provider panel screenshot.",
    providerRate: 105.56, clientRate: 105.56, rateUnit: 1000, min: 100, max: 1000000,
    avgTime: "Not enough data", tag: "Video/Shorts Views", visible: true
  },
  {
    id: "svc_youtube_views_1260", providerId: "1260", platform: "YouTube", category: "Views",
    name: "YouTube Video/Shorts Views [ Max 5M ] | Non Drop | Lifetime | Instant | Day 500",
    description: "YouTube views service from provider panel screenshot.",
    providerRate: 68.04, clientRate: 68.04, rateUnit: 1000, min: 50, max: 2147483647,
    avgTime: "15 Hours", tag: "Video/Shorts Views", visible: true
  },
  {
    id: "svc_youtube_views_1261", providerId: "1261", platform: "YouTube", category: "Views",
    name: "YouTube Video/Shorts Views [ Max 5M ] | Non Drop | Lifetime | Instant | Day 5K",
    description: "YouTube views service from provider panel screenshot.",
    providerRate: 88.09, clientRate: 88.09, rateUnit: 1000, min: 100, max: 10000000,
    avgTime: "Not enough data", tag: "Video/Shorts Views", visible: true
  },
  {
    id: "svc_youtube_views_1262", providerId: "1262", platform: "YouTube", category: "Views",
    name: "YouTube Video/Shorts Views [ Max 5M ] | Non Drop | Lifetime | Instant | Day 10K",
    description: "YouTube views service from provider panel screenshot.",
    providerRate: 95.23, clientRate: 95.23, rateUnit: 1000, min: 100, max: 10000000,
    avgTime: "Not enough data", tag: "Video/Shorts Views", visible: true
  },
  {
    id: "svc_youtube_views_1263", providerId: "1263", platform: "YouTube", category: "Views",
    name: "YouTube Video/Shorts Views [ Max 5M ] | Non Drop | Lifetime | Instant | Day 15K",
    description: "YouTube views service from provider panel screenshot.",
    providerRate: 99.72, clientRate: 99.72, rateUnit: 1000, min: 100, max: 10000000,
    avgTime: "Not enough data", tag: "Video/Shorts Views", visible: true
  },
  {
    id: "svc_youtube_live_stream_views_769", providerId: "769", platform: "YouTube", category: "Live Stream Views",
    name: "YouTube Live Stream Views [ Max 50K ] | Stay Time: 15 Min",
    description: "YouTube live stream views service from provider panel screenshot.",
    providerRate: 4.65, clientRate: 4.65, rateUnit: 1000, min: 50, max: 500000,
    avgTime: "Not enough data", tag: "Live Stream Views", visible: true
  },
  {
    id: "svc_youtube_live_stream_views_770", providerId: "770", platform: "YouTube", category: "Live Stream Views",
    name: "YouTube Live Stream Views [ Max 50K ] | Stay Time: 30 Min",
    description: "YouTube live stream views service from provider panel screenshot.",
    providerRate: 9.30, clientRate: 9.30, rateUnit: 1000, min: 50, max: 500000,
    avgTime: "Not enough data", tag: "Live Stream Views", visible: true
  },
  {
    id: "svc_youtube_live_stream_views_771", providerId: "771", platform: "YouTube", category: "Live Stream Views",
    name: "YouTube Live Stream Views [ Max 50K ] | Stay Time: 60 Min",
    description: "YouTube live stream views service from provider panel screenshot.",
    providerRate: 18.60, clientRate: 18.60, rateUnit: 1000, min: 50, max: 500000,
    avgTime: "Not enough data", tag: "Live Stream Views", visible: true
  },
  {
    id: "svc_youtube_live_stream_views_772", providerId: "772", platform: "YouTube", category: "Live Stream Views",
    name: "YouTube Live Stream Views [ Max 50K ] | Stay Time: 90 Min",
    description: "YouTube live stream views service from provider panel screenshot.",
    providerRate: 27.91, clientRate: 27.91, rateUnit: 1000, min: 50, max: 500000,
    avgTime: "Not enough data", tag: "Live Stream Views", visible: true
  },
  {
    id: "svc_youtube_live_stream_views_773", providerId: "773", platform: "YouTube", category: "Live Stream Views",
    name: "YouTube Live Stream Views [ Max 50K ] | Stay Time: 2 Hours",
    description: "YouTube live stream views service from provider panel screenshot.",
    providerRate: 37.21, clientRate: 37.21, rateUnit: 1000, min: 50, max: 500000,
    avgTime: "Not enough data", tag: "Live Stream Views", visible: true
  },
  {
    id: "svc_youtube_live_stream_views_774", providerId: "774", platform: "YouTube", category: "Live Stream Views",
    name: "YouTube Live Stream Views [ Max 50K ] | Stay Time: 3 Hours",
    description: "YouTube live stream views service from provider panel screenshot.",
    providerRate: 55.81, clientRate: 55.81, rateUnit: 1000, min: 50, max: 500000,
    avgTime: "Not enough data", tag: "Live Stream Views", visible: true
  },
  {
    id: "svc_youtube_live_stream_views_775", providerId: "775", platform: "YouTube", category: "Live Stream Views",
    name: "YouTube Live Stream Views [ Max 50K ] | Stay Time: 4 Hours",
    description: "YouTube live stream views service from provider panel screenshot.",
    providerRate: 74.42, clientRate: 74.42, rateUnit: 1000, min: 50, max: 500000,
    avgTime: "Not enough data", tag: "Live Stream Views", visible: true
  },
  {
    id: "svc_youtube_live_stream_views_776", providerId: "776", platform: "YouTube", category: "Live Stream Views",
    name: "YouTube Live Stream Views [ Max 50K ] | Stay Time: 6 Hours",
    description: "YouTube live stream views service from provider panel screenshot.",
    providerRate: 111.63, clientRate: 111.63, rateUnit: 1000, min: 50, max: 500000,
    avgTime: "Not enough data", tag: "Live Stream Views", visible: true
  },
  {
    id: "svc_youtube_live_stream_views_777", providerId: "777", platform: "YouTube", category: "Live Stream Views",
    name: "YouTube Live Stream Views [ Max 50K ] | Stay Time: 12 Hours",
    description: "YouTube live stream views service from provider panel screenshot.",
    providerRate: 223.26, clientRate: 223.26, rateUnit: 1000, min: 50, max: 500000,
    avgTime: "Not enough data", tag: "Live Stream Views", visible: true
  },
  {
    id: "svc_youtube_live_stream_views_778", providerId: "778", platform: "YouTube", category: "Live Stream Views",
    name: "YouTube Live Stream Views [ Max 50K ] | Stay Time: 24 Hours",
    description: "YouTube live stream views service from provider panel screenshot.",
    providerRate: 446.52, clientRate: 446.52, rateUnit: 1000, min: 50, max: 500000,
    avgTime: "Not enough data", tag: "Live Stream Views", visible: true
  },
  {
    id: "svc_youtube_subscribers_1123", providerId: "1123", platform: "YouTube", category: "Subscribers",
    name: "YouTube Subscribers [ Max 100K ] | High Quality | Lifetime | Day 150",
    description: "YouTube subscribers service from provider panel screenshot.",
    providerRate: 3099.94, clientRate: 3099.94, rateUnit: 1000, min: 100, max: 100000,
    avgTime: "Not enough data", tag: "Subscribers", visible: true
  },
  {
    id: "svc_youtube_subscribers_1126", providerId: "1126", platform: "YouTube", category: "Subscribers",
    name: "YouTube Subscribers [ Max 100K ] | High Quality | Lifetime | Day 500",
    description: "YouTube subscribers service from provider panel screenshot.",
    providerRate: 3630.56, clientRate: 3630.56, rateUnit: 1000, min: 100, max: 100000,
    avgTime: "Not enough data", tag: "Subscribers", visible: true
  },
  {
    id: "svc_youtube_subscribers_779", providerId: "779", platform: "YouTube", category: "Subscribers",
    name: "YouTube Subscribers | Non Drop | 50/Day | 30 Days Guaranteed",
    description: "YouTube subscribers service from provider panel screenshot.",
    providerRate: 4461.78, clientRate: 4461.78, rateUnit: 1000, min: 100, max: 10000,
    avgTime: "Not enough data", tag: "Subscribers", visible: true
  },
  {
    id: "svc_youtube_subscribers_782", providerId: "782", platform: "YouTube", category: "Subscribers",
    name: "YouTube Subscribers | Low Drop | Slow / Day 300 | Lifetime Guaranteed",
    description: "YouTube subscribers service from provider panel screenshot.",
    providerRate: 2578.56, clientRate: 2578.56, rateUnit: 1000, min: 100, max: 10000,
    avgTime: "Not enough data", tag: "Subscribers", visible: true
  },
  {
    id: "svc_youtube_subscribers_784", providerId: "784", platform: "YouTube", category: "Subscribers",
    name: "YouTube Subscribers | Low Drop | 50/Day | 30 Days Guaranteed",
    description: "YouTube subscribers service from provider panel screenshot.",
    providerRate: 1528.38, clientRate: 1528.38, rateUnit: 1000, min: 10, max: 10000,
    avgTime: "Not enough data", tag: "Subscribers", visible: true
  },
  {
    id: "svc_youtube_subscribers_785", providerId: "785", platform: "YouTube", category: "Subscribers",
    name: "YouTube Subscribers | Low Drop | Day 500-1K | Lifetime Guaranteed",
    description: "YouTube subscribers service from provider panel screenshot.",
    providerRate: 1438.92, clientRate: 1438.92, rateUnit: 1000, min: 50, max: 10000,
    avgTime: "Not enough data", tag: "Subscribers", visible: true
  },
  {
    id: "svc_youtube_subscribers_786", providerId: "786", platform: "YouTube", category: "Subscribers",
    name: "YouTube Subscribers | Max 10K | Non Drop | Day 500 | 30 Days",
    description: "YouTube subscribers service from provider panel screenshot.",
    providerRate: 1498.95, clientRate: 1498.95, rateUnit: 1000, min: 100, max: 50000,
    avgTime: "Not enough data", tag: "Subscribers", visible: true
  },
  {
    id: "svc_youtube_subscribers_787", providerId: "787", platform: "YouTube", category: "Subscribers",
    name: "YouTube Subscribers | Non Drop | 400/Day | 30 Days Guaranteed",
    description: "YouTube subscribers service from provider panel screenshot.",
    providerRate: 1892.19, clientRate: 1892.19, rateUnit: 1000, min: 50, max: 10000,
    avgTime: "Not enough data", tag: "Subscribers", visible: true
  },
  {
    id: "svc_youtube_subscribers_791", providerId: "791", platform: "YouTube", category: "Subscribers",
    name: "YouTube Subscribers | Super HQ | Non Drop | 2K/Day | 30 Days Guaranteed",
    description: "YouTube subscribers service from provider panel screenshot.",
    providerRate: 1210.95, clientRate: 1210.95, rateUnit: 1000, min: 5, max: 1000000,
    avgTime: "Not enough data", tag: "Subscribers", visible: true
  },
  {
    id: "svc_youtube_subscribers_794", providerId: "794", platform: "YouTube", category: "Subscribers",
    name: "YouTube Subscribers | Max 400K | Non Drop | Day 5K | 30 Days Guaranteed",
    description: "YouTube subscribers service from provider panel screenshot.",
    providerRate: 1951.44, clientRate: 1951.44, rateUnit: 1000, min: 100, max: 400000,
    avgTime: "Not enough data", tag: "Subscribers", visible: true
  },
  {
    id: "svc_youtube_views_1953", providerId: "1953", platform: "YouTube", category: "Views",
    name: "YouTube Views [ Video/Shorts ] [ Max 10M ] | Low Drop | 30 Days | Instant Start | Day 100K",
    description: "YouTube views service from provider panel screenshot.",
    providerRate: 56.39, clientRate: 56.39, rateUnit: 1000, min: 100, max: 10000000,
    avgTime: "Not enough data", tag: "Video/Shorts Views High Speed", visible: true
  },
  {
    id: "svc_youtube_views_1954", providerId: "1954", platform: "YouTube", category: "Views",
    name: "YouTube Views [ Video/Shorts ] [ Max 10M ] | Low Drop | 60 Days | Instant Start | Day 100K",
    description: "YouTube views service from provider panel screenshot.",
    providerRate: 61.80, clientRate: 61.80, rateUnit: 1000, min: 100, max: 10000000,
    avgTime: "Not enough data", tag: "Video/Shorts Views High Speed", visible: true
  },
  {
    id: "svc_youtube_views_1955", providerId: "1955", platform: "YouTube", category: "Views",
    name: "YouTube Views [ Video/Shorts ] [ Max 10M ] | Low Drop | 90 Days | Instant Start | Day 100K",
    description: "YouTube views service from provider panel screenshot.",
    providerRate: 66.37, clientRate: 66.37, rateUnit: 1000, min: 100, max: 10000000,
    avgTime: "Not enough data", tag: "Video/Shorts Views High Speed", visible: true
  },
  {
    id: "svc_youtube_views_1956", providerId: "1956", platform: "YouTube", category: "Views",
    name: "YouTube Views [ Video/Shorts ] [ Max 10M ] | Low Drop | 365 Days | Instant Start | Day 100K",
    description: "YouTube views service from provider panel screenshot.",
    providerRate: 70.95, clientRate: 70.95, rateUnit: 1000, min: 100, max: 10000000,
    avgTime: "Not enough data", tag: "Video/Shorts Views High Speed", visible: true
  },
  {
    id: "svc_youtube_views_1957", providerId: "1957", platform: "YouTube", category: "Views",
    name: "YouTube Views [ Video/Shorts ] [ Max 10M ] | Low Drop | Lifetime | Instant Start | Day 100K",
    description: "YouTube views service from provider panel screenshot.",
    providerRate: 75.53, clientRate: 75.53, rateUnit: 1000, min: 100, max: 10000000,
    avgTime: "Not enough data", tag: "Video/Shorts Views High Speed", visible: true
  },
  {
    id: "svc_youtube_likes_796", providerId: "796", platform: "YouTube", category: "Likes",
    name: "YouTube Likes [ Max 500K ] | Super Instant | NR | Day 50K",
    description: "YouTube likes service from provider panel screenshot.",
    providerRate: 133.45, clientRate: 133.45, rateUnit: 1000, min: 100, max: 100000,
    avgTime: "Not enough data", tag: "Likes", visible: true
  },
  {
    id: "svc_youtube_likes_797", providerId: "797", platform: "YouTube", category: "Likes",
    name: "YouTube Likes [ Max 500K ] | Super Instant | 30 Days | Day 50K",
    description: "YouTube likes service from provider panel screenshot.",
    providerRate: 106.21, clientRate: 106.21, rateUnit: 1000, min: 10, max: 100000,
    avgTime: "Not enough data", tag: "Likes", visible: true
  },
  {
    id: "svc_youtube_likes_798", providerId: "798", platform: "YouTube", category: "Likes",
    name: "YouTube Likes [ Max 500K ] | Super Instant | 60 Days | Day 50K",
    description: "YouTube likes service from provider panel screenshot.",
    providerRate: 147.25, clientRate: 147.25, rateUnit: 1000, min: 100, max: 100000,
    avgTime: "Not enough data", tag: "Likes", visible: true
  },
  {
    id: "svc_youtube_likes_799", providerId: "799", platform: "YouTube", category: "Likes",
    name: "YouTube Likes [ Max 500K ] | Super Instant | 90 Days | Day 50K",
    description: "YouTube likes service from provider panel screenshot.",
    providerRate: 151.86, clientRate: 151.86, rateUnit: 1000, min: 100, max: 100000,
    avgTime: "Not enough data", tag: "Likes", visible: true
  },
  {
    id: "svc_youtube_likes_800", providerId: "800", platform: "YouTube", category: "Likes",
    name: "YouTube Comment Likes [ Max 500K ] | Super Instant | 30 Days | Day 50K",
    description: "YouTube likes service from provider panel screenshot.",
    providerRate: 555.56, clientRate: 555.56, rateUnit: 1000, min: 10, max: 100000,
    avgTime: "Not enough data", tag: "Comment Likes", visible: true
  },
  {
    id: "svc_youtube_likes_801", providerId: "801", platform: "YouTube", category: "Likes",
    name: "YouTube Under Comment Likes [ Max 500K ] | Super Instant | 30 Days | Day 50K",
    description: "YouTube likes service from provider panel screenshot.",
    providerRate: 88.04, clientRate: 88.04, rateUnit: 1000, min: 10, max: 20000,
    avgTime: "Not enough data", tag: "Comment Likes", visible: true
  },
  {
    id: "svc_youtube_likes_1121", providerId: "1121", platform: "YouTube", category: "Likes",
    name: "YouTube Likes [ Max 50K ] | Superinstant | 30 Days | Day 20K - [ World Cheapest ]",
    description: "YouTube likes service from provider panel screenshot.",
    providerRate: 273.10, clientRate: 273.10, rateUnit: 1000, min: 50, max: 50000,
    avgTime: "Not enough data", tag: "Likes", visible: true
  },
  {
    id: "svc_youtube_comments_802", providerId: "802", platform: "YouTube", category: "Comments",
    name: "YouTube Comment Likes [ Max 500K ] | 30 Days | Day 10K | UltraFast",
    description: "YouTube comments service from provider panel screenshot.",
    providerRate: 308.64, clientRate: 308.64, rateUnit: 1000, min: 10, max: 100000,
    avgTime: "Not enough data", tag: "Comments", visible: true
  },
  {
    id: "svc_youtube_comments_803", providerId: "803", platform: "YouTube", category: "Comments",
    name: "YouTube Under Comment Likes [ Max 100K ] | 30 Days | Day 10K | UltraFast",
    description: "YouTube comments service from provider panel screenshot.",
    providerRate: 23.07, clientRate: 23.07, rateUnit: 1000, min: 10, max: 10000,
    avgTime: "Not enough data", tag: "Comments", visible: true
  },
  {
    id: "svc_youtube_comments_804", providerId: "804", platform: "YouTube", category: "Comments",
    name: "YouTube Custom Comments [ Max 5K ] | Instant | NR | Ultrafast",
    description: "YouTube comments service from provider panel screenshot.",
    providerRate: 96.88, clientRate: 96.88, rateUnit: 1000, min: 5, max: 5000,
    avgTime: "Not enough data", tag: "Comments", visible: true
  },
  {
    id: "svc_youtube_comments_805", providerId: "805", platform: "YouTube", category: "Comments",
    name: "YouTube Comment Likes [ Max 10K ] | Instant | NR | Day 10K",
    description: "YouTube comments service from provider panel screenshot.",
    providerRate: 284.02, clientRate: 284.02, rateUnit: 1000, min: 10, max: 100000,
    avgTime: "Not enough data", tag: "Comments", visible: true
  },
  {
    id: "svc_youtube_comments_806", providerId: "806", platform: "YouTube", category: "Comments",
    name: "YouTube Comment Likes [ Max 100K ] | Instant | NR | Day 10K",
    description: "YouTube comments service from provider panel screenshot.",
    providerRate: 96.97, clientRate: 96.97, rateUnit: 1000, min: 10, max: 100000,
    avgTime: "Not enough data", tag: "Comments", visible: true
  },
  {
    id: "svc_youtube_comments_809", providerId: "809", platform: "YouTube", category: "Comments",
    name: "YouTube Custom Comment [ Max 10K ] | Instant | NR | Day 10K",
    description: "YouTube comments service from provider panel screenshot.",
    providerRate: 546.20, clientRate: 546.20, rateUnit: 1000, min: 1, max: 10000,
    avgTime: "Not enough data", tag: "Comments", visible: true
  },
  {
    id: "svc_tg_members_non_drop_1406", providerId: "1406", platform: "Telegram", category: "Members - Non Drop",
    name: "Telegram Members [Max 1M] | High Quality | Non Drop | 30 Days | Instant Start | Day 100K",
    description: "Telegram members - non drop service from provider panel screenshot.",
    providerRate: 60.32, clientRate: 60.32, rateUnit: 1000, min: 10, max: 100000,
    avgTime: "Not enough data", tag: "Members - Non Drop", visible: true
  },
  {
    id: "svc_tg_members_non_drop_1407", providerId: "1407", platform: "Telegram", category: "Members - Non Drop",
    name: "Telegram Members [Max 1M] | High Quality | Non Drop | 60 Days | Instant Start | Day 100K",
    description: "Telegram members - non drop service from provider panel screenshot.",
    providerRate: 59.8, clientRate: 59.8, rateUnit: 1000, min: 10, max: 50000,
    avgTime: "3 hours and 48 minutes", tag: "Members - Non Drop", visible: true
  },
  {
    id: "svc_tg_members_non_drop_1408", providerId: "1408", platform: "Telegram", category: "Members - Non Drop",
    name: "Telegram Members [Max 1M] | High Quality | Non Drop | 90 Days | Instant Start | Day 100K",
    description: "Telegram members - non drop service from provider panel screenshot.",
    providerRate: 59.8, clientRate: 59.8, rateUnit: 1000, min: 10, max: 50000,
    avgTime: "Not enough data", tag: "Members - Non Drop", visible: true
  },
  {
    id: "svc_tg_members_cheapest_1264", providerId: "1264", platform: "Telegram", category: "Members - Cheapest",
    name: "Telegram Members (Channel/Group) [Max 100K] | Superinstant | Cancel Enable | No Refill | Day 100K",
    description: "Telegram members - cheapest service from provider panel screenshot.",
    providerRate: 0.6853, clientRate: 0.6853, rateUnit: 1000, min: 1, max: 100000,
    avgTime: "Not enough data", tag: "Members - Cheapest", visible: true
  },
  {
    id: "svc_tg_members_cheapest_1265", providerId: "1265", platform: "Telegram", category: "Members - Cheapest",
    name: "Telegram Members (Channel/Group) [Max 100K] | Superinstant | Cancel Enable | No Refill | Day 100K",
    description: "Telegram members - cheapest service from provider panel screenshot.",
    providerRate: 1.24, clientRate: 1.24, rateUnit: 1000, min: 10, max: 100000,
    avgTime: "Not enough data", tag: "Members - Cheapest", visible: true
  },
  {
    id: "svc_tg_members_cheapest_1266", providerId: "1266", platform: "Telegram", category: "Members - Cheapest",
    name: "Telegram Members (Channel/Group) [Max 100K] | Superinstant | Cancel Enable | 3 Days | Day 100K",
    description: "Telegram members - cheapest service from provider panel screenshot.",
    providerRate: 1.51, clientRate: 1.51, rateUnit: 1000, min: 10, max: 100000,
    avgTime: "Not enough data", tag: "Members - Cheapest", visible: true
  },
  {
    id: "svc_tg_members_cheapest_1267", providerId: "1267", platform: "Telegram", category: "Members - Cheapest",
    name: "Telegram Members (Channel/Group) [Max 100K] | Superinstant | Cancel Enable | 7 Days | Day 100K",
    description: "Telegram members - cheapest service from provider panel screenshot.",
    providerRate: 2.06, clientRate: 2.06, rateUnit: 1000, min: 10, max: 100000,
    avgTime: "Not enough data", tag: "Members - Cheapest", visible: true
  },
  {
    id: "svc_tg_members_recommended_810", providerId: "810", platform: "Telegram", category: "Members - Recommended",
    name: "Telegram Members [Max 100K] | High Quality | Non Drop | Cancel Enable | 30 Days | Instant Start | Day 100K",
    description: "Telegram members - recommended service from provider panel screenshot.",
    providerRate: 66.35, clientRate: 66.35, rateUnit: 1000, min: 10, max: 100000,
    avgTime: "58 minutes", tag: "Members - Recommended", visible: true
  },
  {
    id: "svc_tg_members_recommended_811", providerId: "811", platform: "Telegram", category: "Members - Recommended",
    name: "Telegram Members [Max 200K] | High Quality | Non Drop | Cancel Enable | 60 Days | Instant Start | Day 100K",
    description: "Telegram members - recommended service from provider panel screenshot.",
    providerRate: 69.55, clientRate: 69.55, rateUnit: 1000, min: 10, max: 50000,
    avgTime: "Not enough data", tag: "Members - Recommended", visible: true
  },
  {
    id: "svc_tg_members_recommended_812", providerId: "812", platform: "Telegram", category: "Members - Recommended",
    name: "Telegram Members [Max 200K] | High Quality | Non Drop | Cancel Enable | 90 Days | Instant Start | Day 100K",
    description: "Telegram members - recommended service from provider panel screenshot.",
    providerRate: 71.32, clientRate: 71.32, rateUnit: 1000, min: 10, max: 50000,
    avgTime: "Not enough data", tag: "Members - Recommended", visible: true
  },
  {
    id: "svc_tg_members_recommended_813", providerId: "813", platform: "Telegram", category: "Members - Recommended",
    name: "Telegram Members [Max 200K] | High Quality | Non Drop | Cancel Enable | 365 Days | Instant Start | Day 100K",
    description: "Telegram members - recommended service from provider panel screenshot.",
    providerRate: 90.48, clientRate: 90.48, rateUnit: 1000, min: 10, max: 50000,
    avgTime: "Not enough data", tag: "Members - Recommended", visible: true
  },
  {
    id: "svc_tg_members_recommended_814", providerId: "814", platform: "Telegram", category: "Members - Recommended",
    name: "Telegram Members [Max 500K] | High Quality | Non Drop | Cancel Enable | Lifetime | Instant Start | Day 100K",
    description: "Telegram members - recommended service from provider panel screenshot.",
    providerRate: 95.5, clientRate: 95.5, rateUnit: 1000, min: 10, max: 50000,
    avgTime: "Not enough data", tag: "Members - Recommended", visible: true
  },
  {
    id: "svc_tg_members_recommended_815", providerId: "815", platform: "Telegram", category: "Members - Recommended",
    name: "Telegram Members (Channel/Group) [Max 80K] | Superinstant | Cancel Enabled | Day 50K | No Warranty",
    description: "Telegram members - recommended service from provider panel screenshot.",
    providerRate: 6.24, clientRate: 6.24, rateUnit: 1000, min: 10, max: 80000,
    avgTime: "37 minutes", tag: "Members - Recommended", visible: true
  },
  {
    id: "svc_tg_post_views_822", providerId: "822", platform: "Telegram", category: "Post Views",
    name: "Telegram Post Views - LAST 1 POST - Super Instant",
    description: "Telegram post views service from provider panel screenshot.",
    providerRate: 0.1355, clientRate: 0.1355, rateUnit: 1000, min: 10, max: 2147483647,
    avgTime: "15 minutes", tag: "Post Views", visible: true
  },
  {
    id: "svc_tg_post_views_823", providerId: "823", platform: "Telegram", category: "Post Views",
    name: "Telegram Post Views - LAST 5 POST - Super Instant",
    description: "Telegram post views service from provider panel screenshot.",
    providerRate: 0.6145, clientRate: 0.6145, rateUnit: 1000, min: 10, max: 2147483647,
    avgTime: "Not enough data", tag: "Post Views", visible: true
  },
  {
    id: "svc_tg_post_views_824", providerId: "824", platform: "Telegram", category: "Post Views",
    name: "Telegram Post Views - LAST 10 POST - Super Instant",
    description: "Telegram post views service from provider panel screenshot.",
    providerRate: 1.24, clientRate: 1.24, rateUnit: 1000, min: 10, max: 2147483647,
    avgTime: "1 hour and 37 minutes", tag: "Post Views", visible: true
  },
  {
    id: "svc_tg_post_views_825", providerId: "825", platform: "Telegram", category: "Post Views",
    name: "Telegram Post Views - LAST 20 POST - Super Instant",
    description: "Telegram post views service from provider panel screenshot.",
    providerRate: 2.47, clientRate: 2.47, rateUnit: 1000, min: 10, max: 2147483647,
    avgTime: "Not enough data", tag: "Post Views", visible: true
  },
  {
    id: "svc_tg_post_views_826", providerId: "826", platform: "Telegram", category: "Post Views",
    name: "Telegram Post Views - LAST 30 POST - Super Instant",
    description: "Telegram post views service from provider panel screenshot.",
    providerRate: 3.7, clientRate: 3.7, rateUnit: 1000, min: 10, max: 2147483647,
    avgTime: "Not enough data", tag: "Post Views", visible: true
  },
  {
    id: "svc_tg_post_views_827", providerId: "827", platform: "Telegram", category: "Post Views",
    name: "Telegram Post Views - LAST 50 POST - Super Instant",
    description: "Telegram post views service from provider panel screenshot.",
    providerRate: 6.17, clientRate: 6.17, rateUnit: 1000, min: 10, max: 2147483647,
    avgTime: "Not enough data", tag: "Post Views", visible: true
  },
  {
    id: "svc_tg_post_views_828", providerId: "828", platform: "Telegram", category: "Post Views",
    name: "Telegram Post Views - LAST 100 POST - Super Instant",
    description: "Telegram post views service from provider panel screenshot.",
    providerRate: 24.67, clientRate: 24.67, rateUnit: 1000, min: 10, max: 2147483647,
    avgTime: "Not enough data", tag: "Post Views", visible: true
  },
  {
    id: "svc_tg_reactions_830", providerId: "830", platform: "Telegram", category: "Reactions",
    name: "Telegram Post Views [1 Post] FASTEST",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 0.9048, clientRate: 0.9048, rateUnit: 1000, min: 10, max: 1000000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_831", providerId: "831", platform: "Telegram", category: "Reactions",
    name: "Telegram Pack of random reactions - 👍 ❤️ 🔥 🚀",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 2.31, clientRate: 2.31, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_832", providerId: "832", platform: "Telegram", category: "Reactions",
    name: "Telegram Pack of negative reactions - 👎 😁 💩",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 2.31, clientRate: 2.31, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_833", providerId: "833", platform: "Telegram", category: "Reactions",
    name: "Telegram Pack of premium reactions - 🦋 😍 🌹 😈 🐬",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 2.31, clientRate: 2.31, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_834", providerId: "834", platform: "Telegram", category: "Reactions",
    name: "Telegram Pack of random reactions - ❤️ 💯 💃 🚀",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 2.31, clientRate: 2.31, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_835", providerId: "835", platform: "Telegram", category: "Reactions",
    name: "Telegram Pack of random reactions - 🐬 🦄 💎 🎄",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 2.31, clientRate: 2.31, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_836", providerId: "836", platform: "Telegram", category: "Reactions",
    name: "Telegram Pack of random reactions - 🔥 😲 😍 😢",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 2.31, clientRate: 2.31, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_837", providerId: "837", platform: "Telegram", category: "Reactions",
    name: "Telegram Pack of random reactions - 🤩 😱 😭 😢",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 2.31, clientRate: 2.31, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_838", providerId: "838", platform: "Telegram", category: "Reactions",
    name: "Telegram Pack of random reactions - 💦 🔨 🎸 😡",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 2.31, clientRate: 2.31, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_839", providerId: "839", platform: "Telegram", category: "Reactions",
    name: "Telegram Random reactions - 💯 🤔",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 2.31, clientRate: 2.31, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_840", providerId: "840", platform: "Telegram", category: "Reactions",
    name: "Telegram Random reactions - 👍 🙏",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 2.31, clientRate: 2.31, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_841", providerId: "841", platform: "Telegram", category: "Reactions",
    name: "Telegram Random reactions - 💋 💘",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 2.31, clientRate: 2.31, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_842", providerId: "842", platform: "Telegram", category: "Reactions",
    name: "Telegram Random reactions - 🤣 👏",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 2.31, clientRate: 2.31, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_843", providerId: "843", platform: "Telegram", category: "Reactions",
    name: "Telegram Random reactions - 👎 💔",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 2.31, clientRate: 2.31, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_844", providerId: "844", platform: "Telegram", category: "Reactions",
    name: "Telegram Random reactions - 😱 🥺",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 2.31, clientRate: 2.31, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_845", providerId: "845", platform: "Telegram", category: "Reactions",
    name: "Telegram Random reactions - 💩 🤡",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 2.31, clientRate: 2.31, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_846", providerId: "846", platform: "Telegram", category: "Reactions",
    name: "Telegram Random reactions - 😡 😨",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 2.31, clientRate: 2.31, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_847", providerId: "847", platform: "Telegram", category: "Reactions",
    name: "Telegram Random reactions - 😢 😭",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 2.31, clientRate: 2.31, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_848", providerId: "848", platform: "Telegram", category: "Reactions",
    name: "Telegram Premium reaction 🚀",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 2.31, clientRate: 2.31, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_849", providerId: "849", platform: "Telegram", category: "Reactions",
    name: "Telegram Premium reaction 💔",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 2.31, clientRate: 2.31, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_850", providerId: "850", platform: "Telegram", category: "Reactions",
    name: "Telegram Premium reaction 😈",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 2.31, clientRate: 2.31, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_851", providerId: "851", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction ❤️",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_852", providerId: "852", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🔥",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_853", providerId: "853", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🤣",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_854", providerId: "854", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 👍",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_855", providerId: "855", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 👎",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_856", providerId: "856", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🤝",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_857", providerId: "857", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction ⚡",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_858", providerId: "858", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🥰",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_859", providerId: "859", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 👌",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_860", providerId: "860", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 😀",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_861", providerId: "861", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 👀",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_862", providerId: "862", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 👋",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_863", providerId: "863", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🙏",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_864", providerId: "864", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🏆",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_865", providerId: "865", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🦄",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_866", providerId: "866", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 💅",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_867", providerId: "867", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 😭",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_868", providerId: "868", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 😍",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_869", providerId: "869", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🎄",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_870", providerId: "870", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🥳",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_871", providerId: "871", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction ☃️",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_872", providerId: "872", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 💩",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_873", providerId: "873", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🎉",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_874", providerId: "874", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 😱",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_875", providerId: "875", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 😁",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_876", providerId: "876", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 💨",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_877", providerId: "877", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🕊️",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_878", providerId: "878", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🥺",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_879", providerId: "879", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 💊",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_880", providerId: "880", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 😱",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_881", providerId: "881", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🙏",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_882", providerId: "882", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 👌",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_883", providerId: "883", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 😡",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_884", providerId: "884", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🐬",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_885", providerId: "885", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 💯",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_886", providerId: "886", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🕊️",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_887", providerId: "887", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🤡",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_888", providerId: "888", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🥰",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_889", providerId: "889", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🤔",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_890", providerId: "890", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🤯",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_891", providerId: "891", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 😈",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_892", providerId: "892", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🌭",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_893", providerId: "893", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🍓",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_894", providerId: "894", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 💋",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_895", providerId: "895", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🤓",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_896", providerId: "896", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🧑‍💻",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_897", providerId: "897", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🎃",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_898", providerId: "898", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 😨",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_899", providerId: "899", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction ✍️",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_900", providerId: "900", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🤗",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_901", providerId: "901", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 😀",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_902", providerId: "902", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🎉",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_903", providerId: "903", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 😘",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_904", providerId: "904", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🆗",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_905", providerId: "905", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 💘",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_906", providerId: "906", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🤡",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_907", providerId: "907", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 😘",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_908", providerId: "908", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 😎",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_909", providerId: "909", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 👾",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_910", providerId: "910", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 👋",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_911", providerId: "911", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 😡",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_912", providerId: "912", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🤔",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_913", providerId: "913", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 😴",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_914", providerId: "914", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🧘",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_915", providerId: "915", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🙈",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_916", providerId: "916", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🤩",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_917", providerId: "917", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🤟",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_918", providerId: "918", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🙊",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_919", providerId: "919", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction ❤️‍🔥",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_920", providerId: "920", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 😍",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_921", providerId: "921", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 😱",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_reactions_922", providerId: "922", platform: "Telegram", category: "Reactions",
    name: "Telegram Reaction 🥺",
    description: "Telegram reactions service from provider panel screenshot.",
    providerRate: 1.91, clientRate: 1.91, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Reactions", visible: true
  },
  {
    id: "svc_tg_votes_937", providerId: "937", platform: "Telegram", category: "Votes",
    name: "Telegram Poll Votes | UltraFast / Day 20K",
    description: "Telegram votes service from provider panel screenshot.",
    providerRate: 22.69, clientRate: 22.69, rateUnit: 1000, min: 1, max: 50000,
    avgTime: "Not enough data", tag: "Votes", visible: true
  },
  {
    id: "svc_tg_votes_938", providerId: "938", platform: "Telegram", category: "Votes",
    name: "Telegram Post/Poll Votes | UltraFast / Day 20K",
    description: "Telegram votes service from provider panel screenshot.",
    providerRate: 30.04, clientRate: 30.04, rateUnit: 1000, min: 10, max: 300000,
    avgTime: "Not enough data", tag: "Votes", visible: true
  },
  {
    id: "svc_tg_comments_939", providerId: "939", platform: "Telegram", category: "Comments",
    name: "Telegram Random Comments [Indian]",
    description: "Telegram comments service from provider panel screenshot.",
    providerRate: 173.56, clientRate: 173.56, rateUnit: 1000, min: 10, max: 5000,
    avgTime: "Not enough data", tag: "Comments", visible: true
  },
  {
    id: "svc_tg_comments_940", providerId: "940", platform: "Telegram", category: "Comments",
    name: "Telegram Random Comments [English]",
    description: "Telegram comments service from provider panel screenshot.",
    providerRate: 173.56, clientRate: 173.56, rateUnit: 1000, min: 10, max: 500000,
    avgTime: "Not enough data", tag: "Comments", visible: true
  },
  {
    id: "svc_tg_comments_941", providerId: "941", platform: "Telegram", category: "Comments",
    name: "Telegram Random Comments [Russian]",
    description: "Telegram comments service from provider panel screenshot.",
    providerRate: 173.56, clientRate: 173.56, rateUnit: 1000, min: 10, max: 500000,
    avgTime: "Not enough data", tag: "Comments", visible: true
  },
  {
    id: "svc_tg_comments_942", providerId: "942", platform: "Telegram", category: "Comments",
    name: "Telegram Random Comments [Arabic]",
    description: "Telegram comments service from provider panel screenshot.",
    providerRate: 173.56, clientRate: 173.56, rateUnit: 1000, min: 10, max: 5000,
    avgTime: "Not enough data", tag: "Comments", visible: true
  },
  {
    id: "svc_tg_comments_943", providerId: "943", platform: "Telegram", category: "Comments",
    name: "Telegram Random Comments + Views [Turkish]",
    description: "Telegram comments service from provider panel screenshot.",
    providerRate: 176.63, clientRate: 176.63, rateUnit: 1000, min: 10, max: 10000,
    avgTime: "Not enough data", tag: "Comments", visible: true
  },
  {
    id: "svc_tg_comments_944", providerId: "944", platform: "Telegram", category: "Comments",
    name: "Telegram Random Comments + Views [Germany]",
    description: "Telegram comments service from provider panel screenshot.",
    providerRate: 176.63, clientRate: 176.63, rateUnit: 1000, min: 10, max: 10000,
    avgTime: "Not enough data", tag: "Comments", visible: true
  },
  {
    id: "svc_tg_comments_945", providerId: "945", platform: "Telegram", category: "Comments",
    name: "Telegram Random Comments + Views [China]",
    description: "Telegram comments service from provider panel screenshot.",
    providerRate: 176.63, clientRate: 176.63, rateUnit: 1000, min: 10, max: 10000,
    avgTime: "Not enough data", tag: "Comments", visible: true
  },
  {
    id: "svc_tg_comments_946", providerId: "946", platform: "Telegram", category: "Comments",
    name: "Telegram Random Comments + Views [Indian]",
    description: "Telegram comments service from provider panel screenshot.",
    providerRate: 176.63, clientRate: 176.63, rateUnit: 1000, min: 10, max: 10000,
    avgTime: "Not enough data", tag: "Comments", visible: true
  },
  {
    id: "svc_tg_comments_947", providerId: "947", platform: "Telegram", category: "Comments",
    name: "Telegram Random Comments + Views [Arab & Iran]",
    description: "Telegram comments service from provider panel screenshot.",
    providerRate: 176.63, clientRate: 176.63, rateUnit: 1000, min: 10, max: 10000,
    avgTime: "Not enough data", tag: "Comments", visible: true
  },
  {
    id: "svc_tg_comments_948", providerId: "948", platform: "Telegram", category: "Comments",
    name: "Telegram Random Comments + Views [Russia]",
    description: "Telegram comments service from provider panel screenshot.",
    providerRate: 176.63, clientRate: 176.63, rateUnit: 1000, min: 10, max: 10000,
    avgTime: "Not enough data", tag: "Comments", visible: true
  },
  {
    id: "svc_tg_comments_949", providerId: "949", platform: "Telegram", category: "Comments",
    name: "Telegram Random Comments + Views [English]",
    description: "Telegram comments service from provider panel screenshot.",
    providerRate: 176.63, clientRate: 176.63, rateUnit: 1000, min: 10, max: 10000,
    avgTime: "Not enough data", tag: "Comments", visible: true
  }
];
