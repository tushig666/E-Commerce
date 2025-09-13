export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="text-center">
        <h1 className="font-headline text-4xl sm:text-5xl">Shipping Information</h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
          Details about our shipping options, processing times, and policies.
        </p>
      </div>
      <div className="mx-auto mt-12 max-w-3xl space-y-8 text-muted-foreground">
        <div>
          <h2 className="font-headline text-2xl text-foreground">Processing Time</h2>
          <p className="mt-2">All orders are processed and dispatched within 1-2 business days. You will receive a shipment confirmation email with tracking information once your order has been shipped.</p>
        </div>
        <div>
          <h2 className="font-headline text-2xl text-foreground">Domestic Shipping</h2>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li><strong>Complimentary Standard Shipping:</strong> 5-7 business days.</li>
            <li><strong>Expedited Shipping:</strong> 2-3 business days, $25 fee.</li>
            <li><strong>Overnight Shipping:</strong> 1 business day, $40 fee.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-headline text-2xl text-foreground">International Shipping</h2>
          <p className="mt-2">We ship to most countries worldwide. Shipping rates are calculated at checkout based on your destination. Please note that international orders may be subject to customs duties and taxes, which are the responsibility of the customer.</p>
        </div>
      </div>
    </div>
  );
}
