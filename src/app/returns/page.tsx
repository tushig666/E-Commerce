export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="text-center">
        <h1 className="font-headline text-4xl sm:text-5xl">Returns & Exchanges</h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
          Our policy for returns and exchanges is designed to be simple and hassle-free.
        </p>
      </div>
      <div className="mx-auto mt-12 max-w-3xl space-y-6 text-muted-foreground">
        <p>
          We accept returns on all unworn, unwashed merchandise with original tags attached within 30 days of the delivery date. A full refund will be issued to your original form of payment.
        </p>
        <p>
          To initiate a return, please use our online returns portal or contact our customer service team with your order number. Once your return is authorized, you will receive a prepaid shipping label.
        </p>
        <p>
          Exchanges are processed as a new order. Simply return your original item(s) for a full refund and place a new order for your desired size or style at your convenience.
        </p>
        <p>
          Final sale items are not eligible for return or exchange.
        </p>
      </div>
    </div>
  );
}
