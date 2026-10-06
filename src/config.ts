/** Single source of truth for site + blog SEO (AstroPaper pattern). */
export const site = {
  url: "https://iofdev.me",
  title: "Idárcio Oliveira",
  description:
    "Idárcio Oliveira is a software engineer and tech lead based in Angola. He builds backend and mobile apps with TypeScript, NestJS, PostgreSQL, React and React Native.",
  author: "Idárcio Oliveira",
  profile: "https://iofdev.me/about/",
  /** Default social image: absolute-path PNG/JPG, min 1200x630. No SVG. */
  ogImage: "/og-default.jpg",
  lang: "pt",
  timezone: "Africa/Luanda",
} as const;

/**
 * Who the site is about. Feeds the Person JSON-LD that search engines use to
 * link the name to this site and to the profiles listed in sameAs.
 */
export const person = {
  name: "Idárcio Oliveira",
  /** Spellings people type into search: no accent, handle, domain. */
  alternateName: ["Idarcio Oliveira", "iofdev"],
  jobTitle: "Software Engineer",
  description:
    "Software engineer and tech lead from Cabinda, Angola. Backend and mobile apps with TypeScript, NestJS, PostgreSQL, React and React Native.",
  image: "/profile-image.jpeg",
  email: "idarciooliveira@gmail.com",
  nationality: "Angola",
  country: "AO",
  worksFor: "People In Need",
  knowsAbout: [
    "Software Engineering",
    "Software Architecture",
    "TypeScript",
    "NestJS",
    "PostgreSQL",
    "React",
    "React Native",
    "Mobile Development",
    "Backend Development",
    "OpenTelemetry",
    "Observability",
    "Technical Leadership",
  ],
  sameAs: [
    "https://github.com/idarciooliveira",
    "https://www.linkedin.com/in/idarciooliveira",
  ],
} as const;

export const blog = {
  /** Posts per paginated listing page (/posts, /tags/[tag]). */
  perPage: 8,
  /** Recent posts shown on section previews. */
  perIndex: 6,
} as const;
