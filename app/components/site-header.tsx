import Link from "next/link";

const navItems = [
  { href: "/", label: "Overview" },
  { href: "/features", label: "Features" },
  { href: "/download", label: "Download" },
  { href: "/releases", label: "Releases" },
];

export function SiteHeader() {
  return (
    <header className="ha-shell py-6">
      <div className="ha-panel flex items-center justify-between px-5 py-4">
        <Link href="/" className="text-lg font-semibold tracking-wide">
          Hyper Alerts
        </Link>
        <nav className="flex gap-4 text-sm md:gap-6 md:text-base">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="ha-muted hover:text-white transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
