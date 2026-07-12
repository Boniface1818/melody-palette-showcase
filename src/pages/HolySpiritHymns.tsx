import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const confirmationHymns = [
  {
    title: "Veni Creator Spiritus",
    arrangement: "SATB / Unison Chant",
    note: "The Church's oldest Pentecost hymn. Sing in Latin chant for the laying on of hands, or use an SATB harmonisation for the final verse.",
  },
  {
    title: "Come Down, O Love Divine",
    arrangement: "SATB",
    note: "Vaughan Williams' Down Ampney is unmatched for the Rite of Confirmation. Save the descant for verse three.",
  },
  {
    title: "Send Us Your Spirit",
    arrangement: "SATB with Cantor",
    note: "Contemporary, assembly-friendly. The cantor verses give room for a young voice — good for youth-heavy Confirmation Masses.",
  },
  {
    title: "Spirit of the Living God",
    arrangement: "SSA / Unison",
    note: "Short, meditative refrain. Works for the laying on of hands when the rite runs long — repeat as needed.",
  },
];

const pentecostHymns = [
  {
    title: "Veni Sancte Spiritus (Taizé)",
    arrangement: "SATB Ostinato",
    note: "The Golden Sequence in a Taizé loop. Layer solo verses over the choir refrain during the Sequence.",
  },
  {
    title: "Come, Holy Ghost",
    arrangement: "SATB with Organ",
    note: "Lambillotte's melody with full organ. Program as the Entrance on Pentecost Sunday — the assembly knows it.",
  },
  {
    title: "O Holy Spirit, By Whose Breath",
    arrangement: "SATB",
    note: "Set to Veni Creator's plainsong tone. Excellent Offertory choice when you want text-forward calm before the Eucharist.",
  },
  {
    title: "Holy Spirit, Come to Us",
    arrangement: "SSA / Cantor",
    note: "Taizé-style ostinato. Ideal for Communion — the assembly hums the refrain while a cantor floats verses above.",
  },
  {
    title: "Breathe on Me, Breath of God",
    arrangement: "SATB",
    note: "Trentham tune. A quiet, prayerful Communion or Recessional when Pentecost falls on a smaller Sunday choir.",
  },
];

const generalHymns = [
  {
    title: "Spirit of God, Descend Upon My Heart",
    arrangement: "SATB",
    note: "Morecambe tune. Excellent for retreats, ordinations, and Confirmation preparation Masses.",
  },
  {
    title: "Come, Holy Spirit, I Need You",
    arrangement: "Solo / Duet",
    note: "Intimate contemporary song. Program at Adoration or a healing service, not Sunday Mass.",
  },
  {
    title: "Holy Spirit, Living Breath of God",
    arrangement: "SATB",
    note: "Getty modern hymn. Doctrinally rich, singable — good for young-adult Masses and confirmation retreats.",
  },
];

const faq = [
  {
    q: "What is the best Holy Spirit song for a Catholic Confirmation Mass?",
    a: "\"Veni Creator Spiritus\" is the traditional and liturgically preferred choice — the Roman Missal itself invokes it. For a contemporary parish, pair it with \"Send Us Your Spirit\" during the laying on of hands.",
  },
  {
    q: "What Holy Spirit hymns should we sing on Pentecost Sunday?",
    a: "Program the Golden Sequence (Veni Sancte Spiritus) between the second reading and the Gospel Acclamation, \"Come, Holy Ghost\" as the Entrance, and a Taizé-style Holy Spirit refrain for Communion. Save \"O Holy Spirit, By Whose Breath\" for the Offertory.",
  },
  {
    q: "Are there SSA (women's choir) arrangements of Holy Spirit hymns?",
    a: "Yes. \"Spirit of the Living God\" and \"Holy Spirit, Come to Us\" work beautifully in SSA. I also write custom SSA settings of Veni Creator and Veni Sancte Spiritus on commission.",
  },
  {
    q: "Can I use a Holy Spirit song outside of Pentecost and Confirmation?",
    a: "Absolutely. Holy Spirit hymns fit ordinations, weddings (invoking the Spirit on the couple), funerals (commending the soul), retreats, Adoration, and any Mass whose readings foreground the Spirit — Baptism of the Lord, Trinity Sunday, and several Sundays in Easter.",
  },
];

export default function HolySpiritHymns() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Best Catholic Holy Spirit Songs and Hymns for Confirmation and Pentecost",
      description:
        "A choir director's guide to the best Catholic Holy Spirit songs — organised by liturgical use (Confirmation, Pentecost) and vocal arrangement (SATB, SSA).",
      author: { "@type": "Person", name: "Boniface Kagunda" },
      publisher: { "@type": "Organization", name: "BK Music" },
      mainEntityOfPage: "https://bk-melodies.lovable.app/resources/holy-spirit-hymns",
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

  const Group = ({
    title,
    subtitle,
    items,
  }: {
    title: string;
    subtitle: string;
    items: typeof confirmationHymns;
  }) => (
    <section className="mb-12">
      <h2 className="font-display text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-sm text-muted-foreground italic mb-5">{subtitle}</p>
      <ul className="space-y-4">
        {items.map((h) => (
          <li key={h.title} className="glass-card p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
              <p className="font-semibold text-foreground">{h.title}</p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-primary">
                {h.arrangement}
              </p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{h.note}</p>
          </li>
        ))}
      </ul>
    </section>
  );

  return (
    <>
      <SEO
        title="Best Catholic Holy Spirit Songs for Confirmation & Pentecost"
        description="A choir director's guide to the best Catholic Holy Spirit hymns — sorted by liturgical use (Confirmation, Pentecost) and vocal arrangement (SATB, SSA)."
        path="/resources/holy-spirit-hymns"
        type="article"
        jsonLd={jsonLd}
      />
      <Navbar />

      <main className="pt-28 pb-20">
        <article className="container mx-auto px-6 max-w-3xl">
          <header className="mb-12">
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-4">
              Guide · For Choir Directors & Worship Leaders
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gradient leading-tight mb-6">
              Best Catholic Holy Spirit Songs for Confirmation and Pentecost
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A good Holy Spirit song does one thing: it invites the assembly to ask.
              Whether you are preparing candidates for Confirmation, programming
              Pentecost Sunday, or building a repertoire binder for the year, this
              guide organises the strongest Catholic Holy Spirit hymns by liturgical
              use and by vocal arrangement — SATB for mixed parish choirs, SSA for
              women's and youth choirs.
            </p>
          </header>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold mb-4">How to use this guide</h2>
            <p className="text-muted-foreground leading-relaxed">
              Start with the liturgical occasion. Confirmation Masses lean towards
              invocation — songs that ask the Spirit to descend. Pentecost leans
              towards proclamation — songs that celebrate the Spirit who has come.
              Then match the arrangement to your ensemble. Where you need a custom
              setting, the{" "}
              <Link to="/compositions" className="text-primary hover:underline">
                BK Music catalogue
              </Link>{" "}
              has original SATB and SSA arrangements, and I write bespoke Holy Spirit
              settings on commission.
            </p>
          </section>

          <Group
            title="For Confirmation"
            subtitle="Invocation songs — the assembly asks the Spirit to come down on the candidates."
            items={confirmationHymns}
          />

          <Group
            title="For Pentecost Sunday"
            subtitle="Proclamation songs — full choir, brass welcome, alleluias unfurled."
            items={pentecostHymns}
          />

          <Group
            title="For Retreats, Adoration & General Use"
            subtitle="Quieter, prayer-forward pieces for outside the main Sunday cycle."
            items={generalHymns}
          />

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
              Need a custom Holy Spirit setting?
            </h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
              I write bespoke SATB and SSA arrangements of Veni Creator, Veni Sancte
              Spiritus, and original Holy Spirit songs for parishes, Confirmation
              Masses, and choir residencies.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/liturgical-music-suggestions"
                className="px-6 py-3 rounded-md border border-border text-sm hover:border-primary transition-colors"
              >
                See the full seasonal guide
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
