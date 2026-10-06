import { Headset, RotateCcw, ShieldCheck, Truck } from "lucide-react";

const BADGES = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On every order, no minimum",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "Your information is protected",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day return window",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description: "We're here whenever you need us",
  },
];

export function TrustBadges() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {BADGES.map(({ icon: Icon, title, description }, index) => (
        <div
          key={title}
          style={{ animationDelay: `${index * 60}ms` }}
          className="animate-in fade-in fill-mode-backwards flex items-start gap-4 duration-500"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted">
            <Icon className="h-5 w-5 text-foreground" />
          </div>

          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
