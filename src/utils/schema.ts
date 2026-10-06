import { person, site } from "../config";

/** Stable JSON-LD ids so every page points at the same Person and WebSite. */
export const schemaIds = (base: URL | string) => {
  const root = new URL("/", base).toString();
  return {
    person: `${root}#person`,
    website: `${root}#website`,
  };
};

export const personSchema = (base: URL | string) => ({
  "@type": "Person",
  "@id": schemaIds(base).person,
  name: person.name,
  alternateName: [...person.alternateName],
  url: new URL("/", base).toString(),
  image: new URL(person.image, base).toString(),
  jobTitle: person.jobTitle,
  description: person.description,
  email: `mailto:${person.email}`,
  nationality: { "@type": "Country", name: person.nationality },
  address: { "@type": "PostalAddress", addressCountry: person.country },
  worksFor: { "@type": "Organization", name: person.worksFor },
  knowsAbout: [...person.knowsAbout],
  sameAs: [...person.sameAs],
});

export const websiteSchema = (base: URL | string) => ({
  "@type": "WebSite",
  "@id": schemaIds(base).website,
  name: site.title,
  alternateName: ["iofdev", "iofdev.me"],
  url: new URL("/", base).toString(),
  description: site.description,
  inLanguage: ["en", "pt"],
  author: { "@id": schemaIds(base).person },
  publisher: { "@id": schemaIds(base).person },
});
