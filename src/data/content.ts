export type Block =
  | { t: "p"; x: string }
  | { t: "h"; x: string }
  | { t: "ul"; x: string[] }
  | { t: "dl"; x: [string, string][] };

export interface ContentPage {
  title: string;
  sub: string;
  blocks: Block[];
  cta?: [string, string, string][];
}

// Text for the About, Properties, Partners, Technology, Vision, Contact and legal pages.
// Edit here to change the wording.
export const pages: Record<string, ContentPage> = {
  "about": {
    "title": "About Us",
    "sub": "An independent digital property marketing and listing platform for Ikorodu, Lagos.",
    "blocks": [
      {
        "t": "p",
        "x": "Ikorodu Realtors is an independent digital property marketing and listing platform focused on connecting prospective property buyers, tenants and investors with property opportunities across Ikorodu, Lagos State, Nigeria."
      },
      {
        "t": "p",
        "x": "The platform provides a centralised online space where users can explore available houses, apartments, land and commercial properties through property descriptions, asking prices, photographs, videos and relevant location information."
      },
      {
        "t": "p",
        "x": "Working with independent real estate agents, property owners, developers and authorised listing representatives, Ikorodu Realtors provides an additional digital channel for property promotion and customer enquiries."
      },
      {
        "t": "h",
        "x": "Who we serve"
      },
      {
        "t": "ul",
        "x": [
          "Prospective property buyers, tenants and investors looking for property in Ikorodu.",
          "Independent real estate agents, property owners, developers and authorised listing representatives."
        ]
      },
      {
        "t": "h",
        "x": "Our approach"
      },
      {
        "t": "p",
        "x": "Our approach is centred on improving the accessibility of property information, supporting property marketing efforts and facilitating connections between prospective customers and the representatives responsible for the advertised properties."
      },
      {
        "t": "p",
        "x": "We aim to create a more organised and convenient property discovery experience through digital technology, responsible advertising practices and professional collaboration."
      }
    ],
    "cta": [
      [
        "Browse properties",
        "/",
        "pri"
      ],
      [
        "Become a partner",
        "/partners/",
        "sec"
      ]
    ]
  },
  "listings": {
    "title": "Property Marketing and Listings",
    "sub": "Showcasing available properties across different neighbourhoods within Ikorodu.",
    "blocks": [
      {
        "t": "p",
        "x": "We provide a digital platform for showcasing available properties across different neighbourhoods within Ikorodu."
      },
      {
        "t": "p",
        "x": "Our marketplace features a range of property categories, including:"
      },
      {
        "t": "ul",
        "x": [
          "Residential houses and apartments",
          "Land and plots available for sale",
          "Rental properties",
          "Commercial buildings and business spaces",
          "New property developments and estate opportunities"
        ]
      },
      {
        "t": "p",
        "x": "Each listing is intended to provide prospective customers with useful information, including asking prices, property descriptions, available features, photographs, videos and location details, subject to the information and materials supplied by the authorised listing representative."
      },
      {
        "t": "p",
        "x": "We aim to keep property information current by communicating with our listing partners regarding availability, pricing and material changes."
      },
      {
        "t": "p",
        "x": "Our marketing approach combines online property presentation, digital visibility and customer enquiries to help property representatives reach a wider audience."
      },
      {
        "t": "p",
        "x": "Our commitment is to present property information responsibly and avoid knowingly publishing misleading, unauthorised or outdated advertisements."
      },
      {
        "t": "h",
        "x": "Please note"
      },
      {
        "t": "p",
        "x": "Property information is supplied by third parties and is not automatically independently verified by Ikorodu Realtors. Customers are encouraged to conduct appropriate checks and obtain confirmation from the responsible representative before making any property-related commitment."
      }
    ],
    "cta": [
      [
        "Browse all properties",
        "/",
        "pri"
      ],
      [
        "View map",
        "/map/",
        "sec"
      ]
    ]
  },
  "partners": {
    "title": "Realtor Partnerships",
    "sub": "Mutually beneficial relationships with real estate professionals in Ikorodu.",
    "blocks": [
      {
        "t": "p",
        "x": "We recognise the importance of strong relationships within the real estate industry."
      },
      {
        "t": "p",
        "x": "Ikorodu Realtors works towards building mutually beneficial relationships with independent real estate agents, property companies, property owners and developers operating within Ikorodu."
      },
      {
        "t": "p",
        "x": "Through our partnership model, authorised property representatives can submit available property information, photographs and videos for consideration and publication on our platform."
      },
      {
        "t": "p",
        "x": "We provide an additional digital marketing channel through which participating realtors can showcase their listings, receive prospective customer enquiries and improve the online visibility of their available properties."
      },
      {
        "t": "p",
        "x": "Where a customer introduced through our platform proceeds with a successful transaction, any applicable referral fee or commission-sharing arrangement will be determined by a separate written agreement between the relevant parties."
      },
      {
        "t": "p",
        "x": "All participating partners are expected to provide accurate property information, maintain appropriate authority to advertise their listings and communicate material changes affecting property availability."
      },
      {
        "t": "p",
        "x": "Our aim is to establish professional relationships built on transparency, accountability, mutual respect and clearly agreed commercial terms."
      }
    ],
    "cta": [
      [
        "List a property with us",
        "/sell/",
        "pri"
      ],
      [
        "Partnership enquiry on WhatsApp",
        "https://wa.me/2349139255152",
        "wa"
      ]
    ]
  },
  "technology": {
    "title": "Digital Property Solutions",
    "sub": "Technology that makes property discovery and communication more efficient.",
    "blocks": [
      {
        "t": "p",
        "x": "At Ikorodu Realtors, we believe technology can make property discovery and communication more efficient."
      },
      {
        "t": "p",
        "x": "Our digital marketplace is designed to provide a convenient experience for individuals searching for properties and professionals looking to increase the visibility of their listings."
      },
      {
        "t": "p",
        "x": "Our platform incorporates:"
      },
      {
        "t": "dl",
        "x": [
          [
            "Property Discovery",
            "Organised property listings with relevant descriptions, asking prices and location information."
          ],
          [
            "Visual Property Presentation",
            "Photographs and video content to help customers understand the properties being advertised."
          ],
          [
            "Property Search",
            "Browsing and filtering features designed to help users identify properties that match their requirements."
          ],
          [
            "Direct Enquiries",
            "Communication channels that connect interested customers with the relevant property representatives."
          ],
          [
            "Inspection Requests",
            "Opportunities for prospective customers to express interest in arranging property inspections with the responsible representative."
          ],
          [
            "Digital Listing Management",
            "Organised processes for receiving, reviewing, updating and managing submitted property advertisements."
          ]
        ]
      },
      {
        "t": "p",
        "x": "We continue to explore practical digital solutions that can improve communication, property presentation and the overall marketplace experience."
      },
      {
        "t": "p",
        "x": "Our technology is intended to support property discovery and introductions; it does not replace independent legal, financial or professional property checks."
      }
    ]
  },
  "vision": {
    "title": "Our Vision and Growth Strategy",
    "sub": "A recognised and reliable digital property marketplace for the Ikorodu real estate community.",
    "blocks": [
      {
        "t": "p",
        "x": "Ikorodu Realtors aims to develop into a recognised and reliable digital property marketplace serving the Ikorodu real estate community."
      },
      {
        "t": "p",
        "x": "Our growth strategy is centred on strengthening our network of property professionals, improving the quality and availability of property information and expanding our ability to connect prospective customers with suitable property opportunities."
      },
      {
        "t": "p",
        "x": "Our key priorities include:"
      },
      {
        "t": "dl",
        "x": [
          [
            "Partnership Development",
            "Building relationships with reputable realtors, property companies and developers."
          ],
          [
            "Marketplace Expansion",
            "Increasing the range of genuine and available property listings across Ikorodu."
          ],
          [
            "Digital Visibility",
            "Improving our online presence through search engines, digital marketing and relevant property content."
          ],
          [
            "Customer Experience",
            "Making property discovery, enquiries and inspection arrangements more convenient."
          ],
          [
            "Operational Improvement",
            "Developing effective systems for listing management, customer communication, referral tracking and partner coordination."
          ],
          [
            "Trust and Transparency",
            "Encouraging responsible advertising, appropriate property checks and clear communication between all parties."
          ]
        ]
      },
      {
        "t": "p",
        "x": "As the marketplace develops, we intend to strengthen our technology, operational processes and professional relationships while maintaining our focus on Ikorodu."
      },
      {
        "t": "p",
        "x": "Our long-term objective is to create a useful digital connection between property opportunities and the people looking for them, while supporting the growth of the local real estate community."
      }
    ]
  },
  "contact": {
    "title": "Contact Us",
    "sub": "Customer enquiries and realtor partnership enquiries.",
    "blocks": [
      {
        "t": "p",
        "x": "Reach us about a property you have seen on the marketplace, to arrange an inspection, or to discuss a partnership as a realtor, property owner or developer."
      },
      {
        "t": "dl",
        "x": [
          [
            "WhatsApp",
            "+234 913 925 5152"
          ],
          [
            "Email",
            "ikorodurealtors@gmail.com"
          ],
          [
            "Location",
            "Ikorodu, Lagos State, Nigeria"
          ]
        ]
      },
      {
        "t": "p",
        "x": "When you enquire about a property, please quote its reference number (for example IK-005) so we can respond quickly."
      }
    ],
    "cta": [
      [
        "Chat on WhatsApp",
        "https://wa.me/2349139255152",
        "wa"
      ],
      [
        "Send an email",
        "mailto:ikorodurealtors@gmail.com",
        "sec"
      ]
    ]
  },
  "privacy": {
    "title": "Privacy Policy",
    "sub": "Last updated: 14 November 2026",
    "blocks": [
      {
        "t": "p",
        "x": "Ikorodu Realtors respects your privacy. This policy explains what personal information we collect, how we use it and the choices you have, in line with the Nigeria Data Protection Act 2023."
      },
      {
        "t": "h",
        "x": "Information we collect"
      },
      {
        "t": "p",
        "x": "We collect the information you choose to send us when you enquire about a property or ask to list one, such as your name, phone number, email address, the property you are interested in and the contents of your message. This may be sent through WhatsApp, email or the forms on this website."
      },
      {
        "t": "p",
        "x": "We also receive property information, photographs and videos from listing partners for publication."
      },
      {
        "t": "p",
        "x": "Like most websites, our hosting and third-party services (such as map tiles and photographs loaded from other providers) may receive technical information such as your IP address and browser type."
      },
      {
        "t": "h",
        "x": "How we use your information"
      },
      {
        "t": "ul",
        "x": [
          "To respond to your enquiries and arrange property inspections.",
          "To connect you with the representative responsible for a property, where needed to complete your enquiry.",
          "To receive, review and manage property listings submitted by partners.",
          "To improve our website and meet legal obligations."
        ]
      },
      {
        "t": "h",
        "x": "Sharing"
      },
      {
        "t": "p",
        "x": "We share your details with the listing representative responsible for a property only where needed to respond to your enquiry or arrange an inspection. We do not sell your personal information. We may use service providers for communication and website hosting, and messages sent through WhatsApp are also subject to WhatsApp's own privacy practices."
      },
      {
        "t": "h",
        "x": "Retention and security"
      },
      {
        "t": "p",
        "x": "We keep enquiry information only for as long as needed for the purposes above or as the law requires, and take reasonable steps to protect it from loss or misuse."
      },
      {
        "t": "h",
        "x": "Your rights"
      },
      {
        "t": "p",
        "x": "You may ask to access, correct or delete your personal information, to object to certain uses, or to withdraw consent, by contacting us. You may also complain to the Nigeria Data Protection Commission."
      },
      {
        "t": "h",
        "x": "Children"
      },
      {
        "t": "p",
        "x": "This website is not directed at children under 18 and we do not knowingly collect their information."
      },
      {
        "t": "h",
        "x": "Changes and contact"
      },
      {
        "t": "p",
        "x": "We may update this policy from time to time. Questions or requests can be sent to ikorodurealtors@gmail.com or WhatsApp +234 913 925 5152."
      }
    ]
  },
  "terms": {
    "title": "Terms of Use",
    "sub": "Last updated: 14 November 2026",
    "blocks": [
      {
        "t": "p",
        "x": "By using this website you agree to these terms. If you do not agree, please do not use the website."
      },
      {
        "t": "h",
        "x": "1. About the platform"
      },
      {
        "t": "p",
        "x": "Ikorodu Realtors is an independent digital property marketing and listing platform. It provides an additional channel for property promotion and customer enquiries. Unless a separate written agreement says otherwise, Ikorodu Realtors is not a party to any sale, rental or other transaction between a customer and a property representative."
      },
      {
        "t": "h",
        "x": "2. Use of the website"
      },
      {
        "t": "p",
        "x": "You agree to use the website lawfully and not to misuse it, interfere with its operation, or copy and republish listings, photographs or videos without permission."
      },
      {
        "t": "h",
        "x": "3. Listings and information"
      },
      {
        "t": "p",
        "x": "Listing information, including asking prices, net prices, descriptions, photographs, videos and locations, is supplied by third parties and is not automatically independently verified. Properties may be sold, withdrawn or changed without notice. See our Disclaimer."
      },
      {
        "t": "h",
        "x": "4. Enquiries and inspections"
      },
      {
        "t": "p",
        "x": "Enquiries and inspection requests are coordinated through Ikorodu Realtors. An enquiry does not create a binding agreement to buy, rent or sell any property."
      },
      {
        "t": "h",
        "x": "5. Partners and listing representatives"
      },
      {
        "t": "p",
        "x": "Partners must provide accurate property information, hold appropriate authority to advertise their listings and tell us promptly about material changes. Any referral fee or commission-sharing arrangement applies only under a separate written agreement."
      },
      {
        "t": "h",
        "x": "6. Intellectual property"
      },
      {
        "t": "p",
        "x": "The website design, text and branding belong to Ikorodu Realtors or their respective owners and may not be reused without permission."
      },
      {
        "t": "h",
        "x": "7. Limitation of liability"
      },
      {
        "t": "p",
        "x": "To the extent permitted by law, Ikorodu Realtors is not liable for losses arising from reliance on listing information, from dealings with property representatives, or from interruptions to the website."
      },
      {
        "t": "h",
        "x": "8. Changes and governing law"
      },
      {
        "t": "p",
        "x": "We may update these terms from time to time. They are governed by the laws of the Federal Republic of Nigeria."
      },
      {
        "t": "h",
        "x": "9. Contact"
      },
      {
        "t": "p",
        "x": "ikorodurealtors@gmail.com or WhatsApp +234 913 925 5152."
      }
    ]
  },
  "disclaimer": {
    "title": "Disclaimer",
    "sub": "Property and third-party notices",
    "blocks": [
      {
        "t": "p",
        "x": "Property information on this website, including descriptions, asking prices, net prices, photographs, videos, features and location details, is supplied by third parties and is not automatically independently verified by Ikorodu Realtors."
      },
      {
        "t": "p",
        "x": "Prices, availability and other details may change without notice, and a property shown may already have been sold or withdrawn. Photographs and videos are for illustration and may not show the current condition of a property."
      },
      {
        "t": "p",
        "x": "Customers are encouraged to conduct appropriate checks and obtain confirmation from the responsible representative before making any property-related commitment. This includes inspecting the property, confirming ownership and title documents, checking survey and approval documents, and obtaining independent legal, financial or professional advice."
      },
      {
        "t": "p",
        "x": "Our technology is intended to support property discovery and introductions. It does not replace independent legal, financial or professional property advice."
      },
      {
        "t": "p",
        "x": "Ikorodu Realtors is a marketing and listing platform. Where a customer introduced through the platform completes a transaction, a referral fee or commission-sharing arrangement may apply under a separate written agreement between the relevant parties."
      },
      {
        "t": "p",
        "x": "The website may include maps, photographs and links provided by third parties. We are not responsible for their content or availability."
      }
    ]
  }
};

export const steps: [string, string, string][] = [
  [
    "1",
    "Search and filter",
    "Browse the listings by type, area, budget and price, or explore the map."
  ],
  [
    "2",
    "Enquire",
    "Tap the WhatsApp button and tell us the property reference. We will confirm availability."
  ],
  [
    "3",
    "Arrange an inspection",
    "We coordinate your inspection with the representative responsible for the property."
  ]
];
