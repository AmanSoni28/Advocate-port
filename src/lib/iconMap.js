import {
  Scale,
  Shield,
  Users,
  Building2,
  BriefcaseBusiness,
  ShoppingCart,
  FileText,
  Landmark,
  Gavel,
  KeyRound,
  Laptop,
  FileCheck,
  MessageSquareText,
  Trophy,
  ShieldCheck,
  Handshake,
} from "lucide-react";

// Restricted set of icons that admin-editable list sections (practice,
// whyChoose, articles, achievements) can pick from — never free text.
export const iconMap = {
  Scale,
  Shield,
  Users,
  Building2,
  BriefcaseBusiness,
  ShoppingCart,
  FileText,
  Landmark,
  Gavel,
  KeyRound,
  Laptop,
  FileCheck,
  MessageSquareText,
  Trophy,
  ShieldCheck,
  Handshake,
};

export function resolveIcon(name) {
  return iconMap[name] || Scale;
}
