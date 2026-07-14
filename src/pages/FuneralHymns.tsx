import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const entrance = [
  {
    title: "Be Not Afraid",
    arrangement: "SATB / Cantor",
    note: "Dufford's setting carries the family down the aisle without collapsing them. Save the descant for the final refrain as the coffin reaches the sanctuary.",
  },
  {
    title: "I Am the Bread of Life",
    arrangement: "SATB",
    note: "Toolan's paschal text — 'and I will raise them up' — is the Church's own answer to grief. Program as Entrance when the family wants scripture, not sentiment.",
  },
  {
    title: "Jerusalem, My Happy Home",
    arrangement: "SATB with Organ",
    note: "Land of Rest tune. Quiet, hopeful, unmistakably a funeral hymn. Good for older assemblies who know it by heart.",
  },
];

const offertory = [
  {
    title: "The King of Love My Shepherd Is",
    arrangement: "SATB",
    note: "St Columba tune. Pairs with Psalm 23 when the psalmist has already sung it — the assembly hears the shepherd theme twice, gently.",
  },
  {
    title: "Panis Angelicus",
    arrangement: "Solo / SATB",
    note: "Franck's setting. Program only if you have a soloist who can carry the long lines; otherwise use the SATB arrangement at a slower tempo.",
  },
  {
    title: "Shepherd Me, O God",
    arrangement: "Cantor / SATB Refrain",
    note: "Haugen's paraphrase of Psalm 23. Excellent Offertory when the funeral Mass avoided the psalm at the Liturgy of the Word.",
  },
];

const communion = [
  {
    title: "I Received the Living God",
    arrangement: "Unison / SATB",
    note: "A simple Communion processional. The refrain 'I received the living God, and my heart is full of joy' reframes the moment for a grieving family.",
  },
  {
    title: "Taste and See",
    arrangement: "SATB with Cantor",
    note: "Moore's setting of Psalm 34. Program at Communion when the congregation is small — the cantor verses give room to breathe between processing communicants.",
  },
  {
    title: "Ave Verum Corpus",
    arrangement: "SATB a cappella",
    note: "Mozart or Byrd. The Latin holds when English words would break down. Best sung after the last communicant returns to the pew, not during the procession.",
  },
];

const recessional = [
  {
    title: "In Paradisum",
    arrangement: "Chant / SATB",
    note: "The Order of Christian Funerals names this text for the procession to the place of committal. Sing it in plainchant as the coffin leaves the church — this is the rite's own recessional.",
  },
  {
    title: "How Great Thou Art",
    arrangement: "SATB with Organ",
    note: "For families who asked for something the whole assembly will sing. Program only if the deceased or family requested it — it can pull the tone away from the liturgical arc.",
  },
  {
    title: "Song of Farewell (Sands of Time)",
    arrangement: "SATB",
    note: "The commendation hymn. Sing during the Rite of Final Commendation, before In Paradisum — the two together are the emotional and liturgical climax of the funeral.",
  },
];

const faq = [
  {
    q: "What are the most appropriate Catholic funeral hymns for a Requiem Mass?",
    a: "The Order of Christian Funerals names 'In Paradisum' for the procession from the church and 'Song of Farewell' for the Rite of Final Commendation. Around those, program 'I Am the Bread of Life' or 'Be Not Afraid' at the Entrance, a Psalm 23 setting at the Offertory, and 'Ave Verum Corpus' or 'I Received the Living God' at Communion.",
  },
  {
    q: "Can we sing 'How Great Thou Art' or other popular hymns at a Catholic funeral?",
    a: "Yes, but weigh it. Popular hymns are permitted when they were meaningful to the deceased and don't displace the rite's own texts. Keep 'In Paradisum' as the recessional and place the family's chosen hymn earlier — Offertory or Communion — where it fits the liturgical flow.",
  },
  {
    q: "What hymn is sung when the coffin leaves the church?",
    a: "'In Paradisum' ('May the angels lead you into paradise'). It is the Church's own antiphon for the procession from the funeral Mass to the place of committal, and it should not be replaced except for grave pastoral reason.",
  },
  {
    q: "Do you write custom funeral music?",
    a: "Yes. I compose bespoke SATB and SSA settings — a psalm the family loves, a paraphrase of the deceased's favourite scripture, or an original Song of Farewell in English, Kiswahili, or Kikuyu. Reach out through the commission page with the funeral date and any texts you'd like set.",
  },
];

export default function FuneralHymns() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "The Best Catholic Funeral Hymns for a Requiem Mass",
      description:
        "A choir director's guide to the best Catholic funeral hymns — organised by the parts of the Requiem Mass and the Order of Christian Funerals.",
      author: { "@type": "Person", name: "Boniface Kagunda" },
      publisher: { "@type": "Organization", name: "BK Music" },
      mainEntityOfPage: "https://bk-melodies.lovable.app/resources/funeral-hymns",
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
    items: typeof entrance;
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
        title="The Best Catholic Funeral Hymns for a Requiem Mass"
        description="A choir director's guide to the best Catholic funeral hymns — sorted by the parts of the Requiem Mass and the Order of Christian Funerals."
        path="/resources/funeral-hymns"
        type="article"
        jsonLd={jsonLd}
      />
      <Navbar />

      <main className="pt-28 pb-20">
        <article className="container mx-auto px-6 max-w-3xl">
          <header className="mb-12">
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-4">
              Guide · For Choir Directors & Families
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gradient leading-tight mb-6">
              The Best Catholic Funeral Hymns for a Requiem Mass
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A funeral is not a concert. The music's job is to carry the family
              through the rite — from the reception of the body to the final
              commendation — without pulling attention onto itself. This guide
              organises the strongest Catholic funeral hymns by the part of the
              Mass they belong to, following the shape of the Order of Christian
              Funerals.
            </p>
          </header>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold mb-4">How to use this guide</h2>
            <p className="text-muted-foreground leading-relaxed">
              Start with the two hymns the rite itself names — 'Song of Farewell'
              at the Final Commendation and 'In Paradisum' as the coffin leaves
              the church. Build outward from there. Where the family asks for a
              hymn the deceased loved, place it at the Offertory or Communion so
              the liturgical anchors stay in place. For custom settings — a
              paraphrased psalm, a bilingual Song of Farewell — the{" "}
              <Link to="/compositions" className="text-primary hover:underline">
                BK Music catalogue
              </Link>{" "}
              has original SATB arrangements, and I write bespoke funeral music
              on commission.
            </p>
          </section>

          <Group
            title="Entrance / Reception of the Body"
            subtitle="Hymns of paschal hope — the Christian meets death with resurrection language."
            items={entrance}
          />

          <Group
            title="Offertory"
            subtitle="Quieter, psalm-based settings while the gifts are prepared."
            items={offertory}
          />

          <Group
            title="Communion"
            subtitle="Bread-of-life texts that speak to a grieving assembly returning from the altar."
            items={communion}
          />

          <Group
            title="Final Commendation & Recessional"
            subtitle="The rite's own farewell — sung as the coffin is incensed and carried out."
            items={recessional}
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
              Need a custom funeral setting?
            </h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
              I write bespoke SATB and SSA arrangements of psalms, Songs of
              Farewell, and paraphrased scripture in English, Kiswahili, and
              Kikuyu — turned around quickly when a funeral date is close.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/resources/holy-spirit-hymns"
                className="px-6 py-3 rounded-md border border-border text-sm hover:border-primary transition-colors"
              >
                Holy Spirit hymns guide
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
