import {
  Landmark,
  Gavel,
  Users,
  ShoppingCart,
  BriefcaseBusiness,
  Building2,
} from "lucide-react";

const courtsData = [
  {
    icon: Landmark,
    name: "Allahabad High Court",
    desc: "Civil, criminal, writ and constitutional matters before the High Court.",
  },
  {
    icon: Gavel,
    name: "District & Sessions Court, Varanasi",
    desc: "Extensive trial advocacy and criminal litigation experience.",
  },
  {
    icon: Users,
    name: "Family Court",
    desc: "Divorce, custody, maintenance and matrimonial disputes.",
  },
  {
    icon: ShoppingCart,
    name: "Consumer Disputes Redressal Commission",
    desc: "Consumer protection complaints and redressal matters.",
  },
  {
    icon: BriefcaseBusiness,
    name: "Labour & Industrial Tribunal",
    desc: "Employment and industrial dispute representation.",
  },
  {
    icon: Building2,
    name: "Revenue Court",
    desc: "Land revenue records and property title disputes.",
  },
];

export default courtsData;

export const litigationProcess = [
  {
    step: "01",
    title: "Case Assessment",
    desc: "Understanding your matter in detail and evaluating the legal options available.",
  },
  {
    step: "02",
    title: "Legal Strategy",
    desc: "Building a strong, practical litigation strategy tailored to your case.",
  },
  {
    step: "03",
    title: "Filing & Documentation",
    desc: "Handling all paperwork, petitions and court filings with precision.",
  },
  {
    step: "04",
    title: "Hearings & Advocacy",
    desc: "Strong, persuasive representation at every stage of the hearing.",
  },
  {
    step: "05",
    title: "Resolution",
    desc: "Working towards the most favourable and timely outcome for you.",
  },
];
