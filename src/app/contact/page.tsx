import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="text-center">
        <h1 className="font-headline text-4xl sm:text-5xl">Contact Us</h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
          We're here to help. Reach out to us with any questions or inquiries.
        </p>
      </div>
      <div className="mx-auto mt-12 max-w-lg">
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your Name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Your message..." rows={6} />
          </div>
          <Button type="submit" className="w-full" size="lg">Send Message</Button>
        </form>
      </div>
    </div>
  );
}
