import { redirect } from "next/navigation";

// Keep the CRM root routable. This also provides a stable entry point as
// additional CRM modules are added beneath this segment.
export default function CrmPage() {
  redirect("/admin/crm/inquiries");
}
