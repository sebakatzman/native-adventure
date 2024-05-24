export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Native Adventure",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Nosotros",
      href: "/",
    },
    {
      label: "Excursiones",
      href: "/excursiones",
    },
    {
      label: "Rental",
      href: "https://native-adventure-rental.booqable.shop",
    },
  ],
  navMenuItems: [
    {
      label: "Inicio",
      href: "/",
    },
    {
      label: "Excursiones",
      href: "/excursiones",
    },
    {
      label: "Rental",
      href: "https://native-adventure-rental.booqable.shop",
    },
  ],
  links: {
    instagram: "https://www.instagram.com/native.adventure",
    rental: "https://native-adventure-rental.booqable.shop"
  },
};
