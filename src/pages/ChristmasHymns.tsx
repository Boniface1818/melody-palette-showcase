import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const advent = [
  {
    title: "O Come, O Come Emmanuel",
    arrangement: "SATB / Unison with Organ",
    note: "The Veni Emmanuel tune is the spine of Advent. Sing verses in unison and open into four parts only on the final 'Rejoice' — the growth mirrors the season's waiting.",
  },
  {
    title: "Creator of the Stars of Night",
    arrangement: "SATB a cappella",
    note: "A plainchant-rooted Advent hymn. Program at the Entrance in the first two weeks, before the parish tips into Christmas repertoire.",
  },
  {
    title: "People, Look East",
    arrangement: "SSA / Unison",
    note: "Besançon carol tune, bright and dancing. Ideal when a youth or ladies' choir carries the Advent Masses.",
  },
];

const midnight = [
  {
    title: "O Holy Night",
    arrangement: "Solo / SATB",
    note: "The Midnight Mass showpiece. Give the first verse to a soloist and bring the choir in at 'Fall on your knees' — the entrance of harmony does the work, not volume.",
  },
  {
    title: "Silent Night / Usiku Mtakatifu",
    arrangement: "SATB, English & Kiswahili",
    note: "A bilingual setting lands beautifully in Kenyan parishes: verse one in English, verse two in Kiswahili, final verse in unison with the whole assembly.",
  },
  {
    title: "O Come, All Ye Faithful",
    arrangement: "SATB with Descant",
    note: "The processional for Midnight Mass. Hold the descant back until the 'Yea, Lord, we greet thee' verse sung on Christmas Day itself.",
  },
];

const christmasDay = [
  {
    title: "Hark! The Herald Angels Sing",
    arrangement: "SATB with Organ",
    note: "The strongest congregational carol for the Christmas Day Entrance — everyone knows it, so the assembly sings from the first bar.",
  },
  {
    title: "Angels We Have Heard on High",
    arrangement: "SATB / SSA",
    note: "The Gloria refrain makes this an excellent Offertory carol. The SSA arrangement keeps the melismas light and airy.",
  },
  {
    title: "Thigitiro (Kikuyu Nativity Carol)",
    arrangement: "SATB, Kikuyu",
    note: "A Kikuyu-language nativity setting gives the local church its own voice at Christmas. Program at Communion, unaccompanied, with a light hand drum.",
  },
];

const epiphany = [
  {
    title: "We Three Kings",
    arrangement: "SATB with Cantor Verses",
    note: "Give each gift verse to a different cantor and let the choir answer on the refrain — the storytelling structure is built into the hymn.",
  },
  {
    title: "As with Gladness Men of Old",
    arrangement: "SATB",
    note: "Dix tune. A more restrained Epiphany hymn for parishes that want the feast without the pageantry.",
  },
  {
    title: "Songs of Thankfulness and Praise",
    arrangement: "SATB with Organ",
    note: "Ties Epiphany, the Baptism of the Lord, and Cana into one text — useful as a closing hymn across the whole Epiphany season.",
  },
];

const faq = [
  {
    q: "What are the best Catholic Christmas songs for Mass?",
    a: "For Midnight Mass, 'O Come, All Ye Faithful' at the Entrance, 'O Holy Night' at the Offertory, and 'Silent Night' at Communion form the classic arc. On Christmas Day, 'Hark! The Herald Angels Sing' and 'Angels We Have Heard on High' give the assembly carols they already know.",
  },
  {
    q: "When should a parish stop singing Advent hymns and start Christmas carols?",
    a: "Advent hymns belong to the four Sundays of Advent — carols begin at the Vigil Mass on Christmas Eve and run through the Baptism of the Lord. Keeping 'O Come, O Come Emmanuel' in place until 24 December protects the shape of the season.",
  },
  {
    q: "Are there Christmas carols in Kiswahili or Kikuyu for Catholic choirs?",
    a: "Yes. 'Usiku Mtakatifu' is the standard Kiswahili setting of Silent Night, and Kikuyu nativity carols such as 'Thigitiro' are sung widely in central Kenya. Bilingual arrangements — one verse English, one Kiswahili — work well in mixed parishes.",
  },
  {
    q: "Do you write custom Christmas arrangements?",
    a: "Yes. I write bespoke SATB and SSA Christmas settings, including bilingual and trilingual arrangements in English, Kiswahili, and Kikuyu. Commission early — Advent and Christmas requests fill up from October.",
  },
];

export default function ChristmasHymns() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Best Catholic Christmas Songs and Carols for Mass",
      description:
        "A choir director's guide to Catholic Christmas songs and carols, from Advent through Epiphany, with SATB and SSA arrangements in English, Kiswahili, and Kikuyu.",
      author: { "@type": "Person", name: "Boniface Kagunda" },
      publisher: { "@type": "Organization", name: "BK Music" },
      mainEntityOfPage: "https://bk-melodies.lovable.app/resources/christmas-hymns",
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
    items: typeof advent;
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
        title="Best Catholic Christmas Songs & Carols for Mass"
        description="A choir director's guide to Catholic Christmas songs — Advent to Epiphany, with SATB and SSA carols in English, Kiswahili, and Kikuyu."
        path="/resources/christmas-hymns"
        type="article"
        jsonLd={jsonLd}
      />
      <Navbar />

      <main className="pt-28 pb-20">
        <article className="container mx-auto px-6 max-w-3xl">
          <header className="mb-12">
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-4">
              Guide · Advent to Epiphany
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gradient leading-tight mb-6">
              Best Catholic Christmas Songs & Carols for Mass
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Christmas music is the one repertoire the whole assembly already
              knows — which is exactly why it needs planning. This guide sorts
              the strongest Catholic Christmas songs by where they belong in the
              season, from the restraint of Advent through Midnight Mass,
              Christmas Day, and Epiphany, with notes on SATB and SSA
              arrangements and on singing the nativity in Kiswahili and Kikuyu.
            </p>
          </header>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold mb-4">How to plan the season</h2>
            <p className="text-muted-foreground leading-relaxed">
              Hold the line on Advent: four weeks of Emmanuel texts make the
              carols land harder on 24 December. Then build Midnight Mass around
              one showpiece and two hymns everybody can sing. Keep a bilingual
              carol in every Christmas Mass so the parish hears its own languages
              at the crib. Original settings and arrangements live in the{" "}
              <Link to="/compositions" className="text-primary hover:underline">
                BK Music catalogue
              </Link>
              , and I write bespoke Christmas music on commission.
            </p>
          </section>

          <Group
            title="Advent"
            subtitle="Waiting music — restrained, modal, pointed toward a birth that hasn't happened yet."
            items={advent}
          />

          <Group
            title="Christmas Vigil & Midnight Mass"
            subtitle="The night the parish is fullest — one showpiece, two carols the assembly owns."
            items={midnight}
          />

          <Group
            title="Christmas Day & the Octave"
            subtitle="Bright, congregational carols, with room for a local-language setting at Communion."
            items={christmasDay}
          />

          <Group
            title="Epiphany & Baptism of the Lord"
            subtitle="The season's closing arc — star, gifts, and the manifestation to the nations."
            items={epiphany}
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
              Want a Christmas arrangement of your own?
            </h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
              I write original SATB and SSA Christmas settings — including
              bilingual and trilingual arrangements in English, Kiswahili, and
              Kikuyu. You receive a PDF score and a MIDI file.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/resources/funeral-hymns"
                className="px-6 py-3 rounded-md border border-border text-sm hover:border-primary transition-colors"
              >
                Funeral hymns guide
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
