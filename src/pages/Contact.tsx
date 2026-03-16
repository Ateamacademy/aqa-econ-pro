import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent", description: "We'll get back to you within 24 hours." });
    setName(""); setEmail(""); setMessage("");
  };

  return (
    <div className="container max-w-xl py-16">
      <h1 className="text-4xl font-extrabold tracking-tight mb-2">Contact Us</h1>
      <p className="text-muted-foreground mb-8">Questions, school licences, or feedback — we'd love to hear from you.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Textarea placeholder="Your message..." value={message} onChange={(e) => setMessage(e.target.value)} rows={5} required />
        <Button type="submit" className="w-full">Send Message</Button>
      </form>
    </div>
  );
}
