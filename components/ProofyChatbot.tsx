"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { enquiryServiceOptions, propertyTypeOptions } from "@/lib/form-options";

type Screen = "home" | "chat" | "appointment" | "success";
type ChatMessage = { id: number; role: "user" | "assistant"; text: string; suggestAppointment?: boolean };
type MascotState = "thinking" | "talking" | "happy" | "curious";

const quickQuestions = [
  "Which inspection service do I need?",
  "How does a Proofit inspection work?",
  "When will I receive my report?",
];

const mascotSources: Record<MascotState, string> = {
  thinking: "/images/proofy-thinking.webp",
  talking: "/images/proofy-talking.webp",
  happy: "/images/proofy-happy.webp",
  curious: "/images/proofy-curious.webp",
};

const fieldClass =
  "min-h-11 w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-[16px] text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

function localDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function ProofyChatbot() {
  const [open, setOpen] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const [screen, setScreen] = useState<Screen>("home");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [interactionId, setInteractionId] = useState<string>();
  const [question, setQuestion] = useState("");
  const [thinking, setThinking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const nextMessageId = useRef(1);

  const minimumDate = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return localDateValue(tomorrow);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowNudge(true), 1400);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    setShowNudge(false);
    closeButtonRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  useEffect(() => {
    if (screen === "chat") messageEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, screen, thinking]);

  const startAppointment = () => {
    setError("");
    setScreen("appointment");
  };

  const openProofy = () => {
    setShowNudge(false);
    setOpen(true);
  };

  const reset = () => {
    setError("");
    setMessages([]);
    setInteractionId(undefined);
    setQuestion("");
    setScreen("home");
  };

  const sendQuestion = async (text: string, addUserMessage = true) => {
    const cleanQuestion = text.trim();
    if (!cleanQuestion || thinking) return;

    const userMessage: ChatMessage = { id: nextMessageId.current++, role: "user", text: cleanQuestion };
    if (addUserMessage) setMessages((current) => [...current, userMessage]);
    setQuestion("");
    setError("");
    setThinking(true);
    setScreen("chat");

    try {
      const response = await fetch("/api/proofy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: cleanQuestion, previousInteractionId: interactionId }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Proofy could not answer right now.");

      setInteractionId(result.interactionId);
      setMessages((current) => [
        ...current,
        {
          id: nextMessageId.current++,
          role: "assistant",
          text: result.answer,
          suggestAppointment: Boolean(result.suggestAppointment),
        },
      ]);
    } catch (chatError) {
      setError(chatError instanceof Error ? chatError.message : "Proofy could not answer right now.");
    } finally {
      setThinking(false);
    }
  };

  const submitQuestion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendQuestion(question);
  };

  const submitAppointment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const appointmentDetails = [
      "Appointment request submitted through Proofy",
      `Preferred date: ${data.get("preferredDate")}`,
      `Preferred time: ${data.get("preferredTime")}`,
      `Area / locality: ${data.get("area")}`,
      `Property concern: ${data.get("concern") || "Not provided"}`,
    ].join("\n");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          service: data.get("service"),
          property: data.get("property"),
          message: appointmentDetails,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Could not request an appointment right now.");
      form.reset();
      setScreen("success");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Could not request an appointment right now.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[90]" aria-live="polite">
      {open && (
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="proofy-title"
          className="proofy-panel pointer-events-auto absolute bottom-[calc(4.75rem+env(safe-area-inset-bottom))] left-3 right-3 flex max-h-[min(690px,calc(100dvh-6rem))] flex-col overflow-hidden rounded-[22px] border border-white/10 bg-[#f4f1ec] shadow-[0_24px_80px_rgba(0,0,0,0.32)] sm:left-auto sm:right-6 sm:w-[390px]"
        >
          <header className="relative flex shrink-0 items-center gap-3 overflow-hidden bg-ink px-4 py-3.5 text-white">
            <span className="absolute inset-y-0 left-0 w-1.5 bg-brand" aria-hidden="true" />
            <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-brand/60 bg-black">
              <ProofyMascot state={thinking ? "thinking" : "happy"} size={44} className="scale-[1.25]" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 id="proofy-title" className="font-display text-base font-bold">Proofy</h2>
              <p className="flex items-center gap-1.5 text-xs text-white/65">
                <span className="proofy-status h-2 w-2 rounded-full bg-brand" aria-hidden="true" />
                Proofit&apos;s AI assistant
              </p>
            </div>
            <button ref={closeButtonRef} type="button" onClick={() => setOpen(false)} className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand" aria-label="Close Proofy">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </button>
          </header>

          <div className="proofy-scrollbar min-h-0 flex-1 overflow-y-auto p-4 sm:p-5">
            {screen === "home" && (
              <div className="proofy-message space-y-4">
                <BotMessage state="happy">Hi, I&apos;m Proofy. Ask me a quick question about inspections, or I can help request an appointment.</BotMessage>
                <div className="grid gap-2" aria-label="Conversation starters">
                  <QuickReply primary onClick={startAppointment}>Request an appointment</QuickReply>
                  {quickQuestions.map((item) => <QuickReply key={item} onClick={() => void sendQuestion(item)}>{item}</QuickReply>)}
                  <WhatsAppLink />
                </div>
              </div>
            )}

            {screen === "chat" && (
              <div className="proofy-message space-y-3">
                {messages.map((message) =>
                  message.role === "user" ? (
                    <UserMessage key={message.id}>{message.text}</UserMessage>
                  ) : (
                    <div key={message.id} className="space-y-2">
                      <BotMessage state="talking">{message.text}</BotMessage>
                      {message.suggestAppointment && <QuickReply primary onClick={startAppointment}>Request an appointment</QuickReply>}
                    </div>
                  ),
                )}
                {thinking && <BotMessage state="thinking"><TypingDots label="Proofy is thinking" dark /></BotMessage>}
                {error && (
                  <div role="alert" className="space-y-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">
                    <p>{error}</p>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => void sendQuestion(messages.filter((item) => item.role === "user").at(-1)?.text || "", false)} className="min-h-11 cursor-pointer rounded-lg bg-ink px-3 text-white">Try again</button>
                      <button type="button" onClick={startAppointment} className="min-h-11 cursor-pointer rounded-lg border border-red-300 bg-white px-3">Request appointment</button>
                    </div>
                  </div>
                )}
                {!thinking && messages.some((item) => item.role === "assistant") && (
                  <button type="button" onClick={startAppointment} className="min-h-11 w-full cursor-pointer text-sm font-semibold text-brand-deep underline underline-offset-4">Ready to arrange an inspection?</button>
                )}
                <div ref={messageEndRef} />
              </div>
            )}

            {screen === "appointment" && (
              <div className="proofy-message space-y-4">
                <BotMessage state="curious">I&apos;ll keep this quick. Share your preferred visit details and the team will confirm availability by email or phone.</BotMessage>
                <form onSubmit={submitAppointment} className="space-y-3 rounded-2xl border border-black/10 bg-white p-4" aria-label="Appointment request">
                  <div className="grid grid-cols-2 gap-2.5">
                    <Field label="Name" className="col-span-2 sm:col-span-1"><input className={fieldClass} name="name" autoComplete="name" required maxLength={200} /></Field>
                    <Field label="Phone" className="col-span-2 sm:col-span-1"><input className={fieldClass} name="phone" type="tel" autoComplete="tel" required placeholder="+91" /></Field>
                  </div>
                  <Field label="Email"><input className={fieldClass} name="email" type="email" autoComplete="email" required /></Field>
                  <Field label="Inspection needed"><select className={fieldClass} name="service" required defaultValue={enquiryServiceOptions[0]}>{enquiryServiceOptions.map((option) => <option key={option}>{option}</option>)}</select></Field>
                  <Field label="Property type"><select className={fieldClass} name="property" required defaultValue={propertyTypeOptions[0]}>{propertyTypeOptions.map((option) => <option key={option}>{option}</option>)}</select></Field>
                  <div className="grid grid-cols-2 gap-2.5">
                    <Field label="Preferred date"><input className={fieldClass} name="preferredDate" type="date" min={minimumDate} required /></Field>
                    <Field label="Preferred time"><select className={fieldClass} name="preferredTime" required defaultValue="Morning"><option>Morning</option><option>Afternoon</option><option>Evening</option></select></Field>
                  </div>
                  <Field label="Area / locality"><input className={fieldClass} name="area" required placeholder="e.g. Andheri West" maxLength={160} /></Field>
                  <Field label="Anything we should know? (optional)"><textarea className={`${fieldClass} min-h-20 resize-y`} name="concern" maxLength={1200} /></Field>
                  {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">{error}</p>}
                  <button type="submit" disabled={submitting} className="flex min-h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-brand px-4 py-3 text-sm font-bold text-white transition hover:bg-brand-deep focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 disabled:cursor-wait disabled:opacity-60">
                    {submitting ? <TypingDots label="Sending appointment request" /> : "Send appointment request"}
                  </button>
                  <p className="text-[11px] leading-relaxed text-ink-soft/65">This requests your preferred slot. The Proofit team will confirm availability. By submitting, you agree to be contacted about your enquiry.</p>
                </form>
                <button type="button" onClick={reset} className="min-h-11 w-full cursor-pointer text-sm font-semibold text-ink-soft underline underline-offset-4">Start a new conversation</button>
              </div>
            )}

            {screen === "success" && (
              <div className="proofy-message space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-ink"><ProofyMascot state="happy" size={64} className="scale-[1.25]" /></div>
                <BotMessage state="happy">Your appointment request is in. We have emailed you a copy, and the Proofit team will contact you to confirm the slot.</BotMessage>
                <QuickReply onClick={reset}>Start a new conversation</QuickReply>
              </div>
            )}
          </div>

          {(screen === "home" || screen === "chat") && (
            <form onSubmit={submitQuestion} className="flex shrink-0 gap-2 border-t border-black/10 bg-white p-3" aria-label="Ask Proofy">
              <label className="sr-only" htmlFor="proofy-question">Ask Proofy a question</label>
              <input id="proofy-question" value={question} onChange={(event) => setQuestion(event.target.value)} maxLength={600} disabled={thinking} placeholder="Ask about your property..." className="min-h-12 min-w-0 flex-1 rounded-xl border border-black/15 px-3.5 text-[16px] text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:bg-black/5" />
              <button type="submit" disabled={thinking || !question.trim()} aria-label="Send question" className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-brand text-white transition hover:bg-brand-deep focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45">
                <ArrowIcon />
              </button>
            </form>
          )}
        </section>
      )}

      {!open && showNudge && (
        <button type="button" onClick={openProofy} className="proofy-nudge pointer-events-auto absolute bottom-[calc(4.75rem+env(safe-area-inset-bottom))] right-20 max-w-[230px] cursor-pointer rounded-2xl rounded-br-md border border-black/10 bg-white px-4 py-3 text-left text-sm font-semibold leading-snug text-ink shadow-xl sm:right-24">Need a quick answer? Ask Proofy.</button>
      )}

      {!open && (
        <button type="button" onClick={openProofy} className="proofy-launcher group pointer-events-auto absolute bottom-4 right-20 flex min-h-14 w-[7.5rem] max-w-[calc(100vw-6rem)] translate-y-[15%] touch-manipulation cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-ink px-2 py-1.5 text-white shadow-[0_8px_24px_rgba(0,0,0,0.24)] transition hover:-translate-y-0.5 hover:border-brand focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 sm:bottom-0 sm:right-24 sm:min-h-[72px] sm:w-[15.875rem] sm:translate-y-0 sm:items-start sm:rounded-b-none sm:rounded-t-[2rem] sm:border-b-0 sm:pb-[calc(0.5rem+env(safe-area-inset-bottom))] sm:pl-2.5 sm:pr-3 sm:pt-2.5 sm:shadow-[0_-10px_30px_rgba(0,0,0,0.22)]" aria-expanded="false" aria-label="Open Proofy AI assistant">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-black"><ProofyMascot state="happy" size={44} priority className="scale-[1.25] transition duration-200 group-hover:-rotate-3 group-hover:scale-[1.35]" /></span>
          <span className="min-w-0 flex-1 self-center text-left font-display text-sm font-bold">Proofy</span>
        </button>
      )}
    </div>
  );
}

function BotMessage({ children, state = "talking" }: { children: ReactNode; state?: MascotState }) {
  return <div className="flex items-end gap-2"><span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-black"><ProofyMascot state={state} size={32} className="scale-[1.3]" /></span><div className="max-w-[85%] whitespace-pre-line rounded-2xl rounded-bl-md bg-white px-4 py-3 text-sm leading-relaxed text-ink shadow-sm">{children}</div></div>;
}

function ProofyMascot({ state, size, className = "", priority = false }: { state: MascotState; size: number; className?: string; priority?: boolean }) {
  if (state === "talking") {
    return (
      <span className={`relative block h-full w-full ${className}`} aria-hidden="true">
        <Image src={mascotSources.talking} alt="" width={size} height={size} className="proofy-mascot-talk-a absolute inset-0 h-full w-full object-contain" priority={priority} />
        <Image src={mascotSources.happy} alt="" width={size} height={size} className="proofy-mascot-talk-b absolute inset-0 h-full w-full object-contain" priority={priority} />
      </span>
    );
  }

  return (
    <span className={`relative block h-full w-full ${className}`} aria-hidden="true">
      <Image src={mascotSources[state]} alt="" width={size} height={size} className={`h-full w-full object-contain ${state === "thinking" ? "proofy-mascot-thinking" : ""} ${state === "happy" ? "proofy-mascot-happy" : ""}`} priority={priority} />
    </span>
  );
}

function UserMessage({ children }: { children: ReactNode }) {
  return <p className="ml-auto max-w-[85%] whitespace-pre-line rounded-2xl rounded-br-md bg-ink px-4 py-3 text-sm leading-relaxed text-white">{children}</p>;
}

function QuickReply({ children, onClick, primary = false }: { children: ReactNode; onClick: () => void; primary?: boolean }) {
  return <button type="button" onClick={onClick} className={`flex min-h-11 cursor-pointer items-center justify-between rounded-xl border px-4 py-2.5 text-left text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-brand/40 ${primary ? "border-brand bg-brand text-white hover:bg-brand-deep" : "border-black/10 bg-white text-ink hover:border-brand hover:text-brand-deep"}`}><span>{children}</span><ArrowIcon /></button>;
}

function WhatsAppLink() {
  return <a href="https://wa.me/919594013666" target="_blank" rel="noreferrer" className="flex min-h-11 items-center justify-between rounded-xl border border-black/10 bg-white px-4 py-2.5 text-left text-sm font-semibold text-ink transition hover:border-brand hover:text-brand-deep focus:outline-none focus:ring-2 focus:ring-brand/40">Talk to the team on WhatsApp<ArrowIcon /></a>;
}

function Field({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return <label className={`block ${className}`}><span className="mb-1.5 block text-xs font-bold text-ink-soft">{label}</span>{children}</label>;
}

function ArrowIcon() {
  return <svg className="ml-2 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function TypingDots({ label, dark = false }: { label: string; dark?: boolean }) {
  return <span className="flex items-center gap-1" role="status" aria-label={label}><span className={`proofy-dot h-1.5 w-1.5 rounded-full ${dark ? "bg-brand" : "bg-white"}`} /><span className={`proofy-dot h-1.5 w-1.5 rounded-full ${dark ? "bg-brand" : "bg-white"}`} /><span className={`proofy-dot h-1.5 w-1.5 rounded-full ${dark ? "bg-brand" : "bg-white"}`} /></span>;
}
