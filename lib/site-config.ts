export const siteConfig = {
  name: "Mirage Hotel",
  tagline: "A Blackpool Landmark, Reimagined",
  description:
    "A 12-room hotel on Blackpool's Banks Street, moments from the Promenade and the Tower — refurbished with a quietly luxurious hand and run with genuine, personal hospitality.",
  phone: "0796 107 5000",
  phoneHref: "tel:+447961075000",
  email: "mirage.co.uk@gmail.com",
  address: {
    line1: "21 Banks Street",
    line2: "Blackpool, FY1 1RN",
    country: "United Kingdom",
  },
  mapsUrl: "https://maps.app.goo.gl/DZV2q4PnPJD5zWdN7",
  mapsEmbedSrc:
    "https://www.google.com/maps?q=Mirage+Hotel+LTD,21+Banks+Street,Blackpool,FY1+1RN&z=16&output=embed",
  coordinates: { lat: 53.8221205, lng: -3.0534256 },
  directBookingDiscount: 10,
  nav: [
    { label: "Home", href: "/" },
    { label: "Gallery", href: "/gallery" },
    { label: "Our Rooms", href: "/rooms" },
    { label: "Booking Request", href: "/booking" },
    { label: "Contact", href: "/contact" },
  ],
  checkIn: "3:00 PM",
  checkOut: "10:30 AM",
};

export type SiteConfig = typeof siteConfig;
