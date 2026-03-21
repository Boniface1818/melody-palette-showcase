export default function Footer() {
  return (
    <footer className="border-t border-border mt-24 py-8">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} Boniface. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a
            href="https://github.com/Boniface1818"
            target="_blank"
            rel="noreferrer"
            className="color-shift text-xs"
          >
            GitHub
          </a>
          <a
            href="https://musescore.com/user/108485503"
            target="_blank"
            rel="noreferrer"
            className="color-shift text-xs"
          >
            MuseScore
          </a>
        </div>
      </div>
    </footer>
  );
}
