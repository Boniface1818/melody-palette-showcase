import { NavLink as RouterNavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, LogIn, LogOut, LayoutDashboard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logo from "@/assets/bk-logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/compositions", label: "Compositions" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setSignedIn(!!session);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    toast.success("Signed out");
    setOpen(false);
    navigate("/");
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <RouterNavLink to="/" className="font-display font-bold text-lg tracking-tight inline-flex items-center gap-2.5 group">
          <img
            src={logo}
            alt="BK Melodies logo"
            width={36}
            height={36}
            className="h-9 w-9 rounded-md object-cover ring-1 ring-primary/30 group-hover:ring-primary/60 transition-all"
          />
          <span className="color-shift">BK Melodies</span>
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
          {signedIn ? (
            <>
              <RouterNavLink to="/studio" className={`nav-link inline-flex items-center gap-1.5 ${pathname === "/studio" ? "active" : ""}`}>
                <LayoutDashboard size={14} /> Studio
              </RouterNavLink>
              <button onClick={signOut} className="nav-link inline-flex items-center gap-1.5" aria-label="Sign out">
                <LogOut size={14} /> Sign out
              </button>
            </>
          ) : (
            <RouterNavLink to="/auth" className="nav-link inline-flex items-center gap-1.5">
              <LogIn size={14} /> Sign in
            </RouterNavLink>
          )}
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
            {signedIn ? (
              <>
                <RouterNavLink to="/studio" onClick={() => setOpen(false)} className={`nav-link text-base py-2 inline-flex items-center gap-1.5 ${pathname === "/studio" ? "active" : ""}`}>
                  <LayoutDashboard size={16} /> Studio
                </RouterNavLink>
                <button onClick={signOut} className="nav-link text-base py-2 inline-flex items-center gap-1.5 text-left">
                  <LogOut size={16} /> Sign out
                </button>
              </>
            ) : (
              <RouterNavLink to="/auth" onClick={() => setOpen(false)} className="nav-link text-base py-2 inline-flex items-center gap-1.5">
                <LogIn size={16} /> Sign in
              </RouterNavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
