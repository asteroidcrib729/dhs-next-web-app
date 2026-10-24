export const serviceGroups = [
  {
    id: "development-marketing",
    title: "Development & Marketing Solutions",
    description:
      "Web development with on-demand SEO, connected e-commerce and email workflows, and custom desktop applications.",
    services: [
      {
        icon: "Code",
        title: "Web Development",
        description:
          "Build responsive websites and web applications with search-friendly foundations. SEO audits, on-page optimization and ongoing improvements are available on demand, with scope and pricing discussed for your project.",
        features: [
          "Responsive websites and web applications",
          "CMS and content structure",
          "Database and API integration",
          "Accessibility and performance optimization",
          "Security implementation",
          "Search-friendly pages and metadata",
          "On-demand SEO audits and on-page optimization",
          "Search performance reviews",
        ],
      },
      {
        icon: "ShoppingCart",
        title: "E-Commerce & Email Marketing",
        description:
          "Connect your online store, catalogue and order workflows with permission-based email campaigns, customer journeys and useful follow-up communications.",
        features: [
          "Online store and product catalogue development",
          "Payment and checkout integration",
          "Inventory and order workflows",
          "Responsive shopping experiences",
          "Email template and campaign design",
          "Audience segmentation and automation",
          "Permission and unsubscribe workflows",
          "Store and campaign performance reporting",
        ],
      },
      {
        icon: "Monitor",
        title: "Custom Desktop Applications",
        description:
          "Purpose-built desktop software that simplifies daily work, connects business data and fits your team's operating requirements.",
        features: [
          "Workflow and requirements analysis",
          "Desktop interface and usability design",
          "Database and API integration",
          "Validated data imports and exports",
          "Role-based access",
          "Offline workflows where required",
          "Application packaging and update planning",
          "Testing, documentation and handover",
        ],
      },
    ],
  },
  {
    id: "it-solutions",
    title: "IT Solutions",
    description: "Cloud, security and networking services for dependable business operations.",
    services: [
      {
        icon: "Cloud",
        title: "Cloud Solutions",
        description:
          "Migrate to the cloud and optimize your infrastructure with our comprehensive cloud services.",
        features: [
          "Cloud Migration Strategy",
          "VMware Virtualization",
          "Hybrid Cloud Setup",
          "Cloud Security",
          "Backup & Disaster Recovery",
          "24/7 Monitoring & Support",
        ],
      },
      {
        icon: "Shield",
        title: "Cybersecurity Solutions",
        description:
          "Protect your business with enterprise-grade security solutions from Sangfor and other leading providers.",
        features: [
          "Network Security Assessment",
          "Firewall Configuration",
          "Endpoint Protection",
          "Security Monitoring",
          "Compliance Management",
          "Incident Response",
        ],
      },
      {
        icon: "Network",
        title: "Network Infrastructure",
        description:
          "Design and implement robust network infrastructure using H3C and other enterprise-grade equipment.",
        features: [
          "Network Design & Planning",
          "H3C Equipment Installation",
          "Network Optimization",
          "Redundancy & Failover",
          "Performance Monitoring",
          "Maintenance & Support",
        ],
      },
    ],
  },
] as const;

export const contactServiceOptions = [
  {
    value: "web-development",
    label: "Web Development & SEO",
  },
  {
    value: "desktop-solutions",
    label: "Custom Desktop Applications",
  },
  {
    value: "ecommerce",
    label: "E-Commerce & Email Marketing",
  },
  {
    value: "it-solutions",
    label: "IT Solutions",
  },
  {
    value: "cloud",
    label: "Cloud Solutions",
  },
  {
    value: "cybersecurity",
    label: "Cybersecurity",
  },
  {
    value: "networking",
    label: "Network Infrastructure",
  },
  {
    value: "consultation",
    label: "Project Consultation",
  },
] as const;

export function isSupportedContactService(value: string) {
  return contactServiceOptions.some((option) => option.value === value);
}
