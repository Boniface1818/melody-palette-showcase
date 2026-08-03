import { Music, Heart, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import logo from "@/assets/bk-logo.png";
import BackToTop from "@/components/BackToTop";


const socials = [
  { href: "https://musescore.com/user/108485503", icon: Music, label: "MuseScore" },
  { href: "https://www.linkedin.com/in/BonifaceKagunda", icon: Linkedin, label: "LinkedIn" },
  { href: "https://www.instagram.com/bonifacekagunda39/", icon: Instagram, label: "Instagram" },
  { href: "https://www.facebook.com/profile.php?id=61550230027573", icon: Facebook, label: "Facebook" },
  { href: "https://www.youtube.com/@BonifaceKagunda006", icon: Youtube, label: "YouTube" },
  { href: "https://www.tiktok.com/@b.o.n.i.5090", icon: Music, label: "TikTok" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border mt-24 py-8">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="BK Music logo" width={32} height={32} className="h-8 w-8 rounded-md object-cover ring-1 ring-primary/30" />
          <div className="text-muted-foreground text-xs leading-relaxed">
            <p className="flex items-center gap-1">
              © {new Date().getFullYear()} Boniface Kagunda Music. All rights reserved. Made with
              <Heart size={12} className="text-accent" />
            </p>
            <p className="mt-1 text-[10px] text-muted-foreground/70">
              All compositions, scores, recordings, and site content are the intellectual property of Boniface Kagunda and may not be copied, performed for profit, or redistributed without written permission.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="color-shift text-xs inline-flex items-center gap-1.5"
            >
              <s.icon size={14} /> {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
