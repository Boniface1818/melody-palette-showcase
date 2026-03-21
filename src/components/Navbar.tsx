import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <RouterNavLink to="/" className="font-display font-bold text-lg tracking-tight color-shift">
          B.
        </RouterNavLink>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-8">
          {links.map((l) => (
            <RouterNavLink
              key={l.to}
              to={l.to}
              className={`nav-link ${pathname === l.to ? "active" : ""}`}
            >
              {l.label}
            </RouterNavLink>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden text-foreground p-2 active:scale-95 transition-transform"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden border-t border-border bg-background/95 backdrop-blur-xl animate-fade-in">
          <div className="flex flex-col px-6 py-4 gap-3">
            {links.map((l) => (
              <RouterNavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`nav-link text-base py-2 ${pathname === l.to ? "active" : ""}`}
              >
                {l.label}
              </RouterNavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
