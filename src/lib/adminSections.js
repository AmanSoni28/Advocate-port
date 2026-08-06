// Config-driven admin form definitions. Each entry describes one editable
// section: where its data lives (HomeContent sub-document key, or the
// separate SiteSettings singleton) and which fields/field-types make up its
// form. SectionForm + Field/ListEditor render these generically.

const practiceWhyChooseItemFields = [
  { key: "title", type: "text", label: "Title" },
  { key: "desc", type: "textarea", label: "Description" },
  { key: "icon", type: "icon", label: "Icon" },
];

const pageHeroEntryFields = [
  { key: "eyebrow", type: "text", label: "Eyebrow" },
  { key: "title", type: "text", label: "Title" },
  { key: "subtitle", type: "textarea", label: "Subtitle" },
  { key: "current", type: "text", label: "Breadcrumb Label" },
  { key: "backgroundImageId", type: "image", label: "Background Image" },
];

export const groups = [
  {
    key: "header",
    label: "Header & Contact",
    sections: ["navbar", "bookingModal", "consultationForm", "siteSettings"],
  },
  {
    key: "crm",
    label: "CRM",
    collapsible: true,
    sections: ["inquiries"],
  },
  {
    key: "hero-stats",
    label: "Hero & Stats",
    sections: ["hero", "stats"],
  },
  {
    key: "about",
    label: "About & Credentials",
    sections: ["about"],
  },
  {
    key: "lists",
    label: "Practice, Why Choose & Featured Cases",
    sections: ["practice", "whyChoose", "featuredCases"],
  },
  {
    key: "updates",
    label: "Testimonials, Updates & Misc",
    sections: ["testimonials", "latestUpdates", "consultationBanner", "contactSection", "disclaimer"],
  },
  {
    key: "other-pages",
    label: "Other Pages",
    sections: ["pageHero", "recognitions", "caseStudiesPage", "courtExperiencePage"],
  },
];

export const sections = {
  navbar: {
    label: "Navbar",
    model: "home",
    fields: [
      { key: "workingHours", type: "text", label: "Working Hours" },
      { key: "eyebrow", type: "text", label: "Eyebrow (e.g. ADVOCATE)" },
      { key: "firstName", type: "text", label: "First Name" },
      { key: "lastName", type: "text", label: "Last Name" },
      { key: "bookConsultation", type: "text", label: "Book Consultation Button" },
      {
        key: "navLinks",
        type: "group",
        label: "Navigation Menu Labels",
        fields: [
          { key: "home", type: "text", label: "Home" },
          { key: "about", type: "text", label: "About" },
          { key: "practiceAreas", type: "text", label: "Practice Areas" },
          { key: "courtExperience", type: "text", label: "Court Experience" },
          { key: "caseStudies", type: "text", label: "Case Studies" },
          { key: "media", type: "text", label: "Media" },
          { key: "articles", type: "text", label: "Articles" },
          { key: "testimonials", type: "text", label: "Testimonials" },
        ],
      },
    ],
  },

  bookingModal: {
    label: "Booking Modal",
    model: "home",
    fields: [
      { key: "eyebrow", type: "text", label: "Eyebrow" },
      { key: "title", type: "text", label: "Title" },
      { key: "subtitle", type: "textarea", label: "Subtitle" },
      { key: "callNow", type: "text", label: "Call Now Button" },
      { key: "emailLabel", type: "text", label: "Email Label" },
      { key: "emailUs", type: "text", label: "Email Us Button" },
      { key: "phoneLabel", type: "text", label: "Phone Label" },
      { key: "hoursLabel", type: "text", label: "Hours Label" },
    ],
  },

  consultationForm: {
    label: "Consultation Form CMS",
    navLabel: "Consultation Form",
    model: "consultationForm",
    fields: [
      { key: "title", type: "plainText", label: "Form Title" },
      { key: "description", type: "textareaPlain", label: "Form Description" },
      { key: "legalMatterOptions", type: "list", label: "Legal Matter Options", itemFields: [{ key: "value", type: "plainText", label: "Option" }] },
      { key: "timeSlots", type: "list", label: "Consultation Time Slots", itemFields: [{ key: "value", type: "plainText", label: "Time Slot" }] },
      { key: "submitLabel", type: "plainText", label: "Submit Button Text" },
    ],
  },

  inquiries: { label: "Inquiries", navLabel: "Inquiries", model: "inquiries", fields: [] },

  disclaimer: {
    label: "Disclaimer Modal",
    model: "home",
    fields: [
      { key: "notice", type: "text", label: "Notice" },
      { key: "title", type: "text", label: "Title" },
      { key: "paragraph1", type: "textarea", label: "Paragraph 1" },
      { key: "paragraph2", type: "textarea", label: "Paragraph 2" },
      { key: "accept", type: "text", label: "Accept Checkbox Text" },
      { key: "proceed", type: "text", label: "Proceed Button" },
    ],
  },

  hero: {
    label: "Hero",
    model: "home",
    fields: [
      { key: "line1", type: "text", label: "Headline Line 1" },
      { key: "line2", type: "text", label: "Headline Line 2 (highlighted)" },
      { key: "line3", type: "text", label: "Headline Line 3" },
      { key: "subtitle", type: "text", label: "Subtitle" },
      { key: "paragraph", type: "textarea", label: "Paragraph" },
      { key: "scheduleConsultation", type: "text", label: "Schedule Consultation Button" },
      { key: "viewPracticeAreas", type: "text", label: "View Practice Areas Button" },
      { key: "bgImageId", type: "image", label: "Background Image (Desktop)" },
      { key: "bgMobileImageId", type: "image", label: "Background Image (Mobile)" },
      {
        key: "cards",
        type: "group",
        label: "Floating Cards",
        fields: [
          { key: "clientFirstTitle", type: "text", label: "Card 1 Title" },
          { key: "clientFirstSub", type: "text", label: "Card 1 Subtitle" },
          { key: "ethicalTitle", type: "text", label: "Card 2 Title" },
          { key: "ethicalSub", type: "text", label: "Card 2 Subtitle" },
          { key: "strategicTitle", type: "text", label: "Card 3 Title" },
          { key: "strategicSub", type: "text", label: "Card 3 Subtitle" },
        ],
      },
    ],
  },

  stats: {
    label: "Stat Highlights",
    model: "home",
    fields: [
      { key: "clientsAssisted", type: "text", label: "Clients Assisted (label)" },
      { key: "casesHandled", type: "text", label: "Cases Handled (label)" },
      { key: "practiceAreas", type: "text", label: "Practice Areas (label)" },
      { key: "yearsExcellence", type: "text", label: "Years of Excellence (label)" },
      { key: "highCourt", type: "text", label: "High Court Practice (label)" },
      {
        key: "values",
        type: "fixedList",
        label: "Stat Numbers (leave blank for none)",
        count: 5,
        itemLabels: [
          "Clients Assisted",
          "Cases Handled",
          "Practice Areas",
          "Years of Excellence",
          "High Court Practice",
        ],
      },
    ],
  },

  about: {
    label: "About",
    model: "home",
    fields: [
      { key: "eyebrow", type: "text", label: "Eyebrow" },
      { key: "name", type: "text", label: "Name" },
      { key: "role", type: "text", label: "Role" },
      { key: "bio", type: "textarea", label: "Bio" },
      { key: "imageId", type: "image", label: "Photo" },
      { key: "education", type: "text", label: "Education Label" },
      { key: "educationValue", type: "text", label: "Education Value" },
      { key: "enrollment", type: "text", label: "Enrollment Label" },
      { key: "enrollmentValue", type: "text", label: "Enrollment Value" },
      { key: "experience", type: "text", label: "Experience Label" },
      { key: "experienceValue", type: "text", label: "Experience Value" },
      { key: "courts", type: "text", label: "Courts Label" },
      { key: "courtsValue", type: "text", label: "Courts Value" },
      {
        key: "timeline",
        type: "list",
        label: "Career Timeline",
        itemFields: [
          { key: "year", type: "plainText", label: "Year" },
          { key: "title", type: "text", label: "Milestone" },
        ],
      },
    ],
  },

  practice: {
    label: "Practice Areas",
    model: "home",
    fields: [
      { key: "eyebrow", type: "text", label: "Eyebrow" },
      { key: "heading", type: "text", label: "Heading" },
      { key: "paragraph", type: "textarea", label: "Paragraph" },
      { key: "items", type: "list", label: "Practice Area Items", itemFields: practiceWhyChooseItemFields },
    ],
  },

  whyChoose: {
    label: "Why Choose Us",
    model: "home",
    fields: [
      { key: "heading", type: "text", label: "Heading" },
      { key: "items", type: "list", label: "Reasons", itemFields: practiceWhyChooseItemFields },
    ],
  },

  featuredCases: {
    label: "Featured Cases",
    model: "home",
    fields: [
      { key: "eyebrow", type: "text", label: "Eyebrow" },
      { key: "heading", type: "text", label: "Heading" },
      { key: "paragraph", type: "textarea", label: "Paragraph" },
      { key: "viewCase", type: "text", label: "View Case Button" },
      { key: "viewAll", type: "text", label: "View All Link" },
      {
        key: "items",
        type: "list",
        label: "Cases",
        itemFields: [
          { key: "title", type: "text", label: "Title" },
          { key: "desc", type: "textarea", label: "Description" },
          { key: "tag", type: "text", label: "Tag (shown on Case Studies page)" },
          { key: "imageId", type: "image", label: "Image" },
        ],
      },
    ],
  },

  testimonials: {
    label: "Testimonials",
    model: "home",
    fields: [
      { key: "eyebrow", type: "text", label: "Eyebrow" },
      { key: "heading", type: "text", label: "Heading" },
      { key: "viewAll", type: "text", label: "View All Link" },
      {
        key: "items",
        type: "list",
        label: "Testimonials",
        itemFields: [
          { key: "name", type: "plainText", label: "Client Name" },
          { key: "location", type: "plainText", label: "Client Location" },
          { key: "rating", type: "number", label: "Rating (1-5)" },
          { key: "role", type: "text", label: "Client Role" },
          { key: "message", type: "textarea", label: "Message" },
        ],
      },
    ],
  },

  latestUpdates: {
    label: "Latest Updates",
    model: "home",
    fields: [
      { key: "articlesEyebrow", type: "text", label: "Articles Eyebrow" },
      { key: "articlesHeading", type: "text", label: "Articles Heading" },
      {
        key: "articles",
        type: "list",
        label: "Articles",
        itemFields: [
          { key: "title", type: "text", label: "Title" },
          { key: "date", type: "plainText", label: "Date" },
          { key: "icon", type: "icon", label: "Icon" },
        ],
      },
      { key: "mediaHeading", type: "text", label: "Media Heading" },
      {
        key: "media",
        type: "list",
        label: "Media & News",
        itemFields: [
          { key: "title", type: "text", label: "Title" },
          { key: "date", type: "plainText", label: "Date" },
          { key: "imageId", type: "image", label: "Image" },
        ],
      },
      { key: "achievementsHeading", type: "text", label: "Achievements Heading" },
      {
        key: "achievements",
        type: "list",
        label: "Achievements",
        itemFields: [
          { key: "title", type: "text", label: "Title" },
          { key: "desc", type: "textarea", label: "Description" },
          { key: "year", type: "plainText", label: "Year" },
          { key: "icon", type: "icon", label: "Icon" },
        ],
      },
      { key: "viewAll", type: "text", label: "View All Link (reused for all 3 panels)" },
    ],
  },

  consultationBanner: {
    label: "Consultation Banner",
    model: "home",
    fields: [
      { key: "heading", type: "text", label: "Heading" },
      { key: "subheading", type: "text", label: "Subheading" },
      { key: "paragraph", type: "textarea", label: "Paragraph" },
      { key: "cta", type: "text", label: "Button Text" },
      { key: "bgImageId", type: "image", label: "Thumbnail Image" },
      {
        key: "features",
        type: "list",
        label: "Features",
        itemFields: [
          { key: "title", type: "text", label: "Title" },
          { key: "subtitle", type: "text", label: "Subtitle" },
        ],
      },
    ],
  },

  contactSection: {
    label: "Contact Section",
    model: "home",
    fields: [
      { key: "eyebrow", type: "text", label: "Eyebrow" },
      { key: "heading", type: "text", label: "Heading" },
      { key: "imageId", type: "image", label: "Office Photo" },
      { key: "address", type: "text", label: "Address Label" },
      { key: "workingHours", type: "text", label: "Working Hours Label" },
      { key: "workingHoursValue", type: "text", label: "Working Hours Value" },
      { key: "rights", type: "text", label: "Copyright Text" },
    ],
  },

  pageHero: {
    label: "Page Headings (About / Practice Areas / etc.)",
    navLabel: "Page Headings",
    model: "home",
    fields: [
      { key: "about", type: "group", label: "About Page", fields: pageHeroEntryFields },
      { key: "practiceAreas", type: "group", label: "Practice Areas Page", fields: pageHeroEntryFields },
      { key: "courtExperience", type: "group", label: "Court Experience Page", fields: pageHeroEntryFields },
      { key: "caseStudies", type: "group", label: "Case Studies Page", fields: pageHeroEntryFields },
      { key: "media", type: "group", label: "Media Page", fields: pageHeroEntryFields },
      { key: "articles", type: "group", label: "Articles Page", fields: pageHeroEntryFields },
      { key: "testimonials", type: "group", label: "Testimonials Page", fields: pageHeroEntryFields },
    ],
  },

  recognitions: {
    label: "Recognitions (About page)",
    model: "home",
    fields: [
      { key: "eyebrow", type: "text", label: "Eyebrow" },
      { key: "heading", type: "text", label: "Heading" },
    ],
  },

  caseStudiesPage: {
    label: "Case Studies Page Settings",
    model: "home",
    fields: [
      { key: "outcome", type: "text", label: "Outcome Label (shown on each case)" },
    ],
  },

  courtExperiencePage: {
    label: "Court Experience Page",
    navLabel: "Court Experience",
    model: "home",
    fields: [
      { key: "courtsEyebrow", type: "text", label: "Courts Eyebrow" },
      { key: "courtsHeading", type: "text", label: "Courts Heading" },
      {
        key: "courts",
        type: "list",
        label: "Courts & Forums",
        itemFields: [
          { key: "name", type: "text", label: "Court Name" },
          { key: "desc", type: "textarea", label: "Description" },
          { key: "icon", type: "icon", label: "Icon" },
        ],
      },
      { key: "processEyebrow", type: "text", label: "Process Eyebrow" },
      { key: "processHeading", type: "text", label: "Process Heading" },
      {
        key: "process",
        type: "list",
        label: "Litigation Process Steps",
        itemFields: [
          { key: "title", type: "text", label: "Step Title" },
          { key: "desc", type: "textarea", label: "Step Description" },
        ],
      },
    ],
  },

  siteSettings: {
    label: "Site Settings (Phone / Email / Address)",
    navLabel: "Site Settings",
    model: "settings",
    fields: [
      { key: "phone", type: "plainText", label: "Phone Number" },
      { key: "email", type: "plainText", label: "Email Address" },
      { key: "address", type: "plainText", label: "Office Address" },
      { key: "mapsEmbedUrl", type: "plainText", label: "Google Maps Embed URL" },
      { key: "rights", type: "text", label: "Copyright Text" },
    ],
  },
};
