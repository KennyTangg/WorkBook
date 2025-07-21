import { Shield, Star, Zap } from "lucide-react";

export const testimonials = [
  {
    quote: "From academic research to daily to-do lists, WorkBook handles it all. The ability to link notes to my schedule and search everything instantly means no idea ever gets lost.",
    name: "David Kim",
    title: "University Researcher",
    image: "/testimony1_image.jpg"
  },
  {
    quote: "WorkBook has been a game-changer for my scattered thoughts. Everything is so neatly organized now, and I finally feel in control of my projects. The customizable dashboard is a lifesaver!",
    name: "Aisha Rahman",
    title: "Marketing Manager",
    image: "/testimony2_image.jpg" 
  },
  {
    quote: "I used to jump between three different apps for notes and scheduling. WorkBook brought it all together seamlessly. My productivity has genuinely soared, and I'm hitting deadlines with ease.",
    name: "Ben Carter",
    title: "Software Developer",
    image: "/testimony3_image.jpg" 
  },
  {
    quote: "The clean interface and intuitive features make WorkBook a joy to use. It's transformed how I manage my freelance clients and personal tasks. Simple, yet incredibly powerful.",
    name: "Chloe Lee",
    title: "Freelance Photographer",
    image: "/testimony4_image.jpg" 
  }
];

export const plans = [
    {
      id: 'free',
      name: 'Free',
      icon: Star,
      priceId: null,
      price: {
        monthly: 'Free',
        yearly: 'Free',
      },
      description: 'Perfect for personal notes and casual users.',
      features: [
        'Unlimited pages',
        'Basic block editor',
        'Save data to cloud',
        'Access from any device',
        'Limited AI assistant (3 uses/day)',
      ],
      cta: 'Start for free',
    },
    {
      id: 'pro',
      name: 'Pro',
      icon: Zap,
      priceId: {
        monthly: 'price_1RmcscBXXNQaF2mYRCytDzjm',
        yearly: 'price_1RnCscBXXNQaF2mYaC5PTcKF',
      },
      price: {
        monthly: 5,
        yearly: 48,
      },
      description: 'Unlock more power for daily use and focused work.',
      features: [
        'All Free features',
        'Reorder Blocks',
        'Daily cloud backups',
        'Limited AI assistant (10 uses/day)',
      ],
      cta: 'Upgrade to Pro',
      popular: true,
    },
    {
      id: 'creator',
      name: 'Creator',
      icon: Shield,
      priceId: {
        monthly: 'price_1RmdPABXXNQaF2mYwVo164W6',
        yearly: 'price_1RmdQnBXXNQaF2mYZNlVSLNb',
      },
      price: {
        monthly: 12,
        yearly: 115,
      },
      description: 'Designed for creators, writers, and productivity pros.',
      features: [
        'All Pro features',
        'Full AI assistant access',
        'Early access to new features',
        'Priority support',
      ],
      cta: 'Go Creator',
    },
  ];