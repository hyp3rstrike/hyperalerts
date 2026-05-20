import Link from "next/link";

const navItems = [
  { href: "/", label: "Overview" },
  { href: "/features", label: "Features" },
  { href: "/download", label: "Download" },
  { href: "/releases", label: "Releases" },
];

export function SiteHeader() {
  const basePath = process.env.GITHUB_ACTIONS === "true" ? "/hyperalerts" : "";

  return (
    <header className="ha-shell py-6">
      <div className="ha-panel flex items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold tracking-wide">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${basePath}/icons/hyper-alerts-icon.png`}
            alt="Hyper Alerts logo"
            width={34}
            height={34}
            className="rounded-md border border-zinc-700 bg-zinc-900"
          />
          <span>Hyper Alerts</span>
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
