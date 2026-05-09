import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { MessageSquare } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
    setName(""); setEmail(""); setMessage("");
  };

  return (
    <div className="container max-w-xl py-16">
      <div className="flex items-center gap-3 mb-2">
        <MessageSquare className="h-8 w-8 text-primary" />
        <h1 className="text-4xl font-extrabold tracking-tight">Get in Touch</h1>
      </div>
      <p className="text-muted-foreground mb-8">
        Questions, school licences, or feedback · fill out the form below and we'll get back to you within 24 hours.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Textarea placeholder="How can we help?" value={message} onChange={(e) => setMessage(e.target.value)} rows={5} required />
        <Button type="submit" className="w-full" size="lg">Send Message</Button>
      </form>
    </div>
  );
}
