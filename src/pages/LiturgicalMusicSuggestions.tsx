import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const seasons = [
  {
    name: "Advent",
    tone: "Expectant, hushed, hopeful. Restrained instrumentation; modal and minor keys work well.",
    picks: [
      { part: "Entrance", suggestion: "\"O Come, O Come Emmanuel\" or a Kyrie-forward gathering hymn in a minor mode." },
      { part: "Offertory", suggestion: "A quiet SATB motet on the Magnificat text — favour breath and space over volume." },
      { part: "Communion", suggestion: "\"Wait for the Lord\" (Taizé) or a soft chant-based antiphon." },
      { part: "Recessional", suggestion: "\"People, Look East\" — bright without breaking the season's restraint." },
    ],
  },
  {
    name: "Christmas",
    tone: "Radiant, celebratory. Full choir, descants welcome on the final verse.",
    picks: [
      { part: "Entrance", suggestion: "\"O Come, All Ye Faithful\" with a soaring SATB descant on the last verse." },
      { part: "Offertory", suggestion: "\"Silent Night\" arranged for soloist + choir humming — intimate before the Eucharist." },
      { part: "Communion", suggestion: "\"What Child Is This\" or a Kikuyu Christmas carol arranged for SSA." },
      { part: "Recessional", suggestion: "\"Joy to the World\" or \"Hark! The Herald Angels Sing\" — full organ, full choir." },
    ],
  },
  {
    name: "Lent",
    tone: "Penitential, spare. No Gloria, no Alleluia. A cappella and unison chant serve this season best.",
    picks: [
      { part: "Entrance", suggestion: "\"Attende Domine\" or a simple Kyrie eleison in chant." },
      { part: "Offertory", suggestion: "\"Parce Domine\" or a reflective SATB setting of Psalm 51." },
      { part: "Communion", suggestion: "\"Ubi Caritas\" (Duruflé or Taizé) — text-forward, prayerful." },
      { part: "Recessional", suggestion: "\"Were You There\" during Holy Week; otherwise a quiet instrumental exit." },
    ],
  },
  {
    name: "Easter",
    tone: "Triumphant, luminous. Bring back Alleluias, brass, and full SATB textures.",
    picks: [
      { part: "Entrance", suggestion: "\"Jesus Christ Is Risen Today\" — full choir, organ, and brass if available." },
      { part: "Offertory", suggestion: "\"This Joyful Eastertide\" or a Regina Caeli setting." },
      { part: "Communion", suggestion: "\"I Am the Bread of Life\" or a Swahili Alleluia refrain between verses." },
      { part: "Recessional", suggestion: "\"Christ the Lord Is Risen Today\" with a trumpet descant." },
    ],
  },
  {
    name: "Ordinary Time",
    tone: "Grounded, congregation-friendly. Vary style week to week; use the Sunday's readings to guide mood.",
    picks: [
      { part: "Entrance", suggestion: "A well-known gathering hymn matched to the day's psalm — \"Gather Us In\" or \"All Are Welcome\"." },
      { part: "Offertory", suggestion: "A responsorial-style piece or an SSA setting drawn from the Gospel imagery." },
      { part: "Communion", suggestion: "\"Panis Angelicus\" (Franck) for solo tenor, or a bilingual Kiswahili/English refrain." },
      { part: "Recessional", suggestion: "\"Sing a New Song\" or \"City of God\" — send the assembly out with lift." },
    ],
  },
  {
    name: "Feast Days & Solemnities",
    tone: "Match the feast: Marian feasts lean lyrical (\"Ave Maria\"); Pentecost calls for fire; Christ the King wants majesty.",
    picks: [
      { part: "Entrance", suggestion: "For Marian feasts: \"Immaculate Mary\" or a Salve Regina setting." },
      { part: "Offertory", suggestion: "For Pentecost: \"Veni Sancte Spiritus\" (Taizé or SATB)." },
      { part: "Communion", suggestion: "For Corpus Christi: \"Pange Lingua\" or \"Adoro Te Devote\"." },
      { part: "Recessional", suggestion: "For Christ the King: \"To Jesus Christ, Our Sovereign King\" with full organ." },
    ],
  },
];

const faq = [
  {
    q: "How do I choose Catholic liturgical music for a Sunday Mass?",
    a: "Start with the season, then the readings, then your assembly's ability. The Entrance should gather people, the Offertory should reflect, Communion should unify, and the Recessional should send them out. Every choice supports the liturgy — never distracts from it.",
  },
  {
    q: "What Mass parts need music every Sunday?",
    a: "At minimum: Entrance, Responsorial Psalm, Gospel Acclamation, Preparation of the Gifts (Offertory), Sanctus, Memorial Acclamation, Great Amen, Agnus Dei, Communion, and Recessional. Solemn feasts add a Gloria and sometimes a Sequence.",
  },
  {
    q: "Can I use hymns in Kiswahili or Kikuyu at a Catholic Mass?",
    a: "Yes — vernacular sacred music is fully permitted and, in many African parishes, expected. I write SATB and SSA arrangements in English, Kiswahili, and Kikuyu specifically for parish choirs and soloists.",
  },
  {
    q: "What's the difference between SATB and SSA choir arrangements?",
    a: "SATB (Soprano, Alto, Tenor, Bass) is a four-part mixed choir — the standard parish setting. SSA (Soprano 1, Soprano 2, Alto) is a three-part treble arrangement — ideal for women's choirs, youth choirs, and schola groups.",
  },
];

export default function LiturgicalMusicSuggestions() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Catholic Liturgical Music Suggestions for Ordinary Time and Feasts",
      description:
        "A practical guide to selecting Catholic liturgical music by season and Mass part — Entrance, Offertory, Communion, and Recessional — for choir directors and soloists.",
      author: { "@type": "Person", name: "Boniface Kagunda" },
      publisher: { "@type": "Organization", name: "BK Music" },
      mainEntityOfPage: "https://bk-melodies.lovable.app/liturgical-music-suggestions",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <>
      <SEO
        title="Catholic Liturgical Music for Ordinary Time & Feasts"
        description="A choir director's guide to Catholic liturgical music — hymn and composition picks by season and Mass part (Entrance, Offertory, Communion, Recessional)."
        path="/liturgical-music-suggestions"
        type="article"
        jsonLd={jsonLd}
      />
      <Navbar />

      <main className="pt-28 pb-20">
        <article className="container mx-auto px-6 max-w-3xl">
          <header className="mb-12">
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-4">
              Guide · For Choir Directors & Soloists
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gradient leading-tight mb-6">
              Catholic Liturgical Music Suggestions for Ordinary Time and Feasts
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Choosing catholic liturgical music well is quiet work. The best selections
              disappear into the Mass — they carry the assembly, honour the season, and
              never draw attention to themselves. This guide organizes suggestions by
              liturgical season and by the four Mass parts most choir directors program
              week to week.
            </p>
          </header>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold mb-4">How to use this guide</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Every Sunday and solemnity has a colour, a mood, and a set of readings.
              Match your music to all three. Start with the season below, read the tone
              note, then work through the four Mass parts. Where you see a linked
              composition, it lives in the{" "}
              <Link to="/compositions" className="text-primary hover:underline">
                BK Music catalogue
              </Link>{" "}
              — original SATB and SSA arrangements in English, Kiswahili, and Kikuyu.
            </p>
          </section>

          {seasons.map((s) => (
            <section key={s.name} className="mb-12">
              <h2 className="font-display text-2xl font-semibold mb-2">{s.name}</h2>
              <p className="text-sm text-muted-foreground italic mb-5">{s.tone}</p>
              <ul className="space-y-4">
                {s.picks.map((p) => (
                  <li key={p.part} className="glass-card p-5">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-primary mb-2">
                      {p.part}
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">{p.suggestion}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {faq.map((f) => (
                <div key={f.q}>
                  <h3 className="font-semibold text-foreground mb-2">{f.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-card p-8 text-center">
            <h2 className="font-display text-2xl font-semibold mb-3">
              Need a custom setting for your parish?
            </h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
              I write bespoke SATB and SSA arrangements for specific feasts, weddings,
              funerals, and choir residencies — in English, Kiswahili, and Kikuyu.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/compositions"
                className="px-6 py-3 rounded-md border border-border text-sm hover:border-primary transition-colors"
              >
                Browse the catalogue
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 rounded-md bg-primary text-primary-foreground text-sm hover:opacity-90 transition-opacity"
              >
                Commission a piece
              </Link>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </>
  );
}
