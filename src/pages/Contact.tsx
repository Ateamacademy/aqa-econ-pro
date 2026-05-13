import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { MessageSquare, Loader2, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const SUPPORT_EMAIL = "elevate@econrev.co";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    const id = crypto.randomUUID();
    try {
      const [confirm, notify] = await Promise.all([
        supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "contact-confirmation",
            recipientEmail: email,
            idempotencyKey: `contact-confirm-${id}`,
            templateData: { name, message },
          },
        }),
        supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "contact-notification",
            idempotencyKey: `contact-notify-${id}`,
            templateData: { name, email, message },
          },
        }),
      ]);
      if (confirm.error || notify.error) {
        throw confirm.error || notify.error;
      }
      toast({
        title: "Message sent",
        description: `We've received your message and will reply to ${email} within 24 hours.`,
      });
      setName(""); setEmail(""); setMessage("");
    } catch (err: any) {
      console.error("Contact submit failed", err);
      toast({
        title: "Couldn't send message",
        description: `Please email us directly at ${SUPPORT_EMAIL}.`,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container max-w-xl py-16">
      <div className="flex items-center gap-3 mb-2">
        <MessageSquare className="h-8 w-8 text-primary" />
        <h1 className="text-4xl font-extrabold tracking-tight">Get in Touch</h1>
      </div>
      <p className="text-muted-foreground mb-4">
        Questions, school licences, or feedback · fill out the form below and we'll get back to you within 24 hours.
      </p>
      <a
        href={`mailto:${SUPPORT_EMAIL}`}
        className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-8"
      >
        <Mail className="h-4 w-4" /> {SUPPORT_EMAIL}
      </a>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required disabled={submitting} />
        <Input type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={submitting} />
        <Textarea placeholder="How can we help?" value={message} onChange={(e) => setMessage(e.target.value)} rows={5} required disabled={submitting} />
        <Button type="submit" className="w-full" size="lg" disabled={submitting}>
          {submitting ? (<><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Sending…</>) : "Send Message"}
        </Button>
      </form>
    </div>
  );
}
