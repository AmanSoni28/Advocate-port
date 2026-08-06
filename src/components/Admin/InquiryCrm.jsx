"use client";

import { useState } from "react";
import { Check, Trash2, Phone, Mail, MessageCircle } from "lucide-react";

export default function InquiryCrm({ initialInquiries }) {
  const [items, setItems] = useState(initialInquiries);
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState("");
  async function updateStatus(id, status) {
    setBusy(id); setMessage("");
    try { const res = await fetch("/api/admin/inquiries", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) }); const body = await res.json(); if (!res.ok) throw new Error(body.error); setItems((all) => all.map((item) => item._id === id ? body.data : item)); }
    catch (error) { setMessage(error.message || "Update failed."); } finally { setBusy(""); }
  }
  async function remove(id) {
    if (!window.confirm("Delete this completed inquiry permanently?")) return;
    setBusy(id); setMessage("");
    try { const res = await fetch("/api/admin/inquiries", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) }); const body = await res.json(); if (!res.ok) throw new Error(body.error); setItems((all) => all.filter((item) => item._id !== id)); }
    catch (error) { setMessage(error.message || "Delete failed."); } finally { setBusy(""); }
  }
  return <div className="space-y-4">{message && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{message}</p>}{items.length === 0 ? <div className="rounded-xl bg-white p-10 text-center text-sm text-gray-500 shadow-sm">No consultation inquiries yet.</div> : items.map((item) => { const completed = item.status === "completed"; return <article key={item._id} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100"><div className="flex flex-col justify-between gap-3 sm:flex-row"><div><div className="flex items-center gap-2"><h2 className="font-bold text-[#07172E]">{item.fullName}</h2><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${completed ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{item.status}</span></div><p className="mt-1 text-sm font-medium text-[#D4AF37]">{item.legalMatter} · {item.subject}</p><p className="mt-1 text-xs text-gray-500">Received {new Date(item.createdAt).toLocaleString()}</p></div><div className="flex items-center gap-2"><a href={`tel:${item.phone}`} title="Call" className="rounded-lg bg-[#EFF4FB] p-2.5 text-[#07172E]"><Phone size={17} /></a><a href={`mailto:${item.email}`} title="Email" className="rounded-lg bg-[#EFF4FB] p-2.5 text-[#07172E]"><Mail size={17} /></a>{item.contactMethod === "WhatsApp" && <a href={`https://wa.me/${item.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" title="WhatsApp" className="rounded-lg bg-[#dcfce7] p-2.5 text-green-700"><MessageCircle size={17} /></a>}</div></div><div className="mt-4 grid gap-3 border-t border-gray-100 pt-4 text-sm text-gray-600 sm:grid-cols-2"><p><strong>Phone:</strong> {item.phone}</p><p><strong>Email:</strong> {item.email}</p><p><strong>Location:</strong> {item.city}</p><p><strong>Preferred time:</strong> {item.consultationDate} · {item.timeSlot}</p><p><strong>Preferred contact:</strong> {item.contactMethod}</p><p className="sm:col-span-2"><strong>Case details:</strong> {item.description}</p></div><div className="mt-4 flex justify-end gap-2">{!completed && <button disabled={busy === item._id} onClick={() => updateStatus(item._id, "completed")} className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-60"><Check size={15} />Mark completed</button>}{completed && <button disabled={busy === item._id} onClick={() => remove(item._id)} className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 disabled:opacity-60"><Trash2 size={15} />Delete</button>}</div></article>; })}</div>;
}
