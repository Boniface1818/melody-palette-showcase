import { NavLink as RouterNavLink, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <span className="font-display font-bold text-lg tracking-tight color-shift">
          B.
        </span>
        <div className="flex items-center gap-8">
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
      </div>
    </nav>
  );
}
