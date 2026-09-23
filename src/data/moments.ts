export interface Moment {
  year: string;
  title: string;
  description: string;
  /** Root-relative path in `public/moments/`. Optional so text-only
   *  milestones still render until you add their photo. */
  image?: string;
  imageAlt?: string;
  /** Free text, e.g. "Lubango, Angola". Shown as travel stamp. */
  location?: string;
}

/**
 * How to add a new moment:
 * 1. Drop the photo in `public/moments/` (use kebab-case, e.g. `tundavala-2025.jpg`,
 *    keep it under ~300KB, JPG/WebP).
 * 2. Add one entry below (newest first). That's it — the /moments gallery,
 *    filters, counter and lightbox pick it up automatically.
 */
export const moments: Moment[] = [
  {
    year: "2024",
    title: "Winner of Huila Talent as Best Tech Project Powered By Tigra",
    description:
      "Reconhecimento como melhor projeto tech no Huíla Talento Powered by Tigra.",
    location: "Lubango, Angola",
    // TODO: drop photo in public/moments/, e.g. `/moments/huila-talent-2024.jpg`
  },
  {
    year: "2023",
    title: "Christmas charity event with Criança Feliz Angola",
    description: "Ação solidária de Natal com a Criança Feliz Angola.",
    location: "Lubango, Angola",
    // TODO: drop photo in public/moments/, e.g. `/moments/natal-crianca-feliz-2023.jpg`
  },
  {
    year: "2023",
    title: "Launch of the first two products as dev-team lead",
    description:
      "Lançamento dos dois primeiros produtos com liderança técnica.",
    location: "Luanda, Angola",
    // TODO: drop photo in public/moments/, e.g. `/moments/launch-2023.jpg`
  },
  {
    year: "2022",
    title: "Launch of Mutundo Express, my first mobile app in a team",
    description: "Lançamento do primeiro aplicativo mobile em equipa.",
    image: "/moments/mutundoexpress.jpg",
    location: "Lubango, Angola",
  },
  {
    year: "2021",
    title: "My first workshop as a speaker",
    description:
      "Meu primeiro workshop como speaker sobre programação como veículo para soluções locais.",
    image: "/moments/workshop.jpg",
    location: "Lubango, Angola",
  },
  {
    year: "2020",
    title: "Final of LISPA JUMPSTART by Acelera Angola & BNA",
    description:
      "Participação na final do programa de aceleração LISPA JUMPSTART.",
    image: "/moments/lispa.jpg",
    location: "Luanda, Angola",
  },
  {
    year: "2019",
    title: "My first bootcamp about programming",
    description: "Primeiro bootcamp de programação e aceleração prática.",
    image: "/moments/bootcamp.jpg",
    location: "Lubango, Angola",
  },
  {
    year: "2019",
    title: "GinPro Hackaton Universitário, my first hackaton",
    description: "Minha primeira experiência em hackathon universitário.",
    image: "/moments/hackaton.jpg",
    location: "Lubango, Angola",
  },
  {
    year: "2019",
    title: "Gala Huíla Talento 2019 Final",
    description: "Um marco especial no início da minha jornada em tecnologia.",
    image: "/moments/huila-talento.jpg",
    location: "Lubango, Angola",
  },
];
