export const email = "contactus@atslng.com";

export const offices = "Lagos, Abuja, Port Harcourt and Kaduna";

export const phones = [
  {
    display: "+234 906 201 5454",
    e164: "2349062015454",
  },
  {
    display: "+234 911 327 4710",
    e164: "2349113274710",
  },
];

export function whatsappLink(e164) {
  return `https://wa.me/${e164}`;
}
