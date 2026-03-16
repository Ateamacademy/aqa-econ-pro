import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const faqs = [
  { q: "How do I get started?", a: "Create a free account to access study notes, practice questions, and your first predicted paper. Upgrade to Econ Rev Pro for unlimited access." },
  { q: "Which exam boards are supported?", a: "We support AQA, Edexcel A, Edexcel B, OCR, Cambridge (CAIE), IB, WJEC, Eduqas, GCSE, IGCSE, and Edexcel IGCSE." },
  { q: "How does instant marking work?", a: "Submit your essay or written answer and receive detailed feedback with marks, examiner-style comments, and improvement suggestions within seconds." },
  { q: "Can I practise diagrams?", a: "Yes! Our diagram practice tool lets you draw and label key Economics diagrams with guided feedback on accuracy." },
  { q: "What are predicted papers?", a: "Predicted papers are exam-style question papers tailored to your specific exam board and specification, designed to target the most likely topics." },
  { q: "How do I cancel my subscription?", a: "You can manage your subscription from your account settings. Contact us if you need any help." },
  { q: "Is my data secure?", a: "Absolutely. We use industry-standard encryption and never share your personal data with third parties." },
];

export default function HelpCentre() {
  return (
    <div className="container max-w-3xl py-16 px-4">
      <h1 className="text-3xl font-bold mb-2">Help Centre</h1>
      <p className="text-muted-foreground mb-10">Find answers to common questions below.</p>
      <Accordion type="single" collapsible className="mb-10">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="text-sm font-semibold text-left">{f.q}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <p className="text-sm text-muted-foreground">
        Still need help?{" "}
        <Link to="/contact" className="text-primary hover:underline">Contact us</Link>
      </p>
    </div>
  );
}
