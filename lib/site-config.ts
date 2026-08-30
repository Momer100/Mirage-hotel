export const siteConfig = {
  name: "Mirage Hotel",
  tagline: "A Blackpool Landmark, Reimagined",
  description:
    "A 12-room hotel on Blackpool's Banks Street, moments from the Promenade and the Tower — refurbished with a quietly luxurious hand and run with genuine, personal hospitality.",
  url: "https://www.miragehotel.co.uk",
  phone: "01253 380 654",
  phoneHref: "tel:+441253380654",
  mobile: "0796 107 5000",
  mobileHref: "tel:+447961075000",
  email: "mirage.co.uk@gmail.com",
  address: {
    line1: "21 Banks Street",
    line2: "Blackpool, FY1 1RN",
    locality: "Blackpool",
    region: "Lancashire",
    postalCode: "FY1 1RN",
    country: "United Kingdom",
    countryCode: "GB",
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
  checkIn: "1:00 PM to 8:00 PM",
  checkOut: "10:30 AM",
};

export type SiteConfig = typeof siteConfig;
