import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is your shipping policy?",
    answer: "We offer complimentary standard shipping on all orders. Expedited shipping options are available at checkout for an additional fee. Orders are typically processed within 1-2 business days."
  },
  {
    question: "What is your return policy?",
    answer: "We accept returns on unworn, unwashed items with tags attached within 30 days of delivery. To initiate a return, please visit our returns portal or contact customer service."
  },
  {
    question: "How do I care for my garments?",
    answer: "Care instructions are provided on the tag of each garment. For most of our pieces, we recommend professional dry cleaning to maintain their quality and longevity. For specific questions, please contact us."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by destination. Please note that duties and taxes are the responsibility of the customer."
  }
];

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="text-center">
        <h1 className="font-headline text-4xl sm:text-5xl">Frequently Asked Questions</h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
          Find answers to common questions about our products and policies.
        </p>
      </div>
      <div className="mx-auto mt-12 max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
