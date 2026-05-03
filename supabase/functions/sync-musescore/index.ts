import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2/cors";

const MUSESCORE_USER_URL = "https://musescore.com/user/108485503";
const FIRECRAWL_ENDPOINT = "https://api.firecrawl.dev/v2/scrape";

interface ScoreData {
  title: string;
  musescore_id: string;
  musescore_url: string;
  thumbnail_url: string | null;
  ensemble_type: string | null;
  instruments: string | null;
  parts: number;
  pages: number;
  duration: string | null;
  views: number;
  published_date: string | null;
  story?: string | null;
  mood?: string | null;
}

function generateStory(title: string, ensemble: string | null): { story: string; mood: string } {
  const t = title.toUpperCase();
  const ens = ensemble ?? "ensemble";
  if (t.startsWith("MISA")) return { mood: "Reverent", story: `A complete Mass setting — "${title}" — voiced for ${ens.toLowerCase()}, weaving liturgy and East African melody into one prayer.` };
  if (t.includes("HALELUYA") || t.includes("ALLELUIA")) return { mood: "Joyful", story: `A radiant Gospel acclamation lifting the assembly with bright harmonies and a steady, dancing pulse.` };
  if (t.includes("SADAKA")) return { mood: "Devotional", story: `An offertory piece — bread, wine, and song carried slowly toward the altar in quiet devotion.` };
  if (t.includes("SIFA") || t.includes("UTUKUFU") || t.includes("GLORIA")) return { mood: "Radiant", story: `A burst of praise and glory, compact yet luminous — perfect as a festive interlude.` };
  if (t.includes("NJONI") || t.includes("KARIBU")) return { mood: "Welcoming", story: `An entrance hymn that gathers the faithful at the threshold of worship with warm, inviting voices.` };
  if (t.includes("HEKO") || t.includes("ASANTE")) return { mood: "Tender", story: `A heartfelt thanksgiving — voices answering one another like a soul in quiet gratitude.` };
  if (t.includes("BWANA") || t.includes("MUNGU")) return { mood: "Contemplative", story: `A prayerful meditation lifting the name of the Lord through layered, unhurried lines.` };
  if (t.includes("MARIA")) return { mood: "Serene", story: `A Marian devotion — gentle, flowing, and luminous as candlelight at a side altar.` };
  return { mood: "Soulful", story: `"${title}" — a sacred miniature for ${ens.toLowerCase()}, crafted with devotion and a love for liturgical beauty.` };
}

// Parse scores from Firecrawl markdown. Each score appears as a sequence:
//   [![ALT](thumb_url)](score_url)
//   [TITLE](score_url)
//   [KAGUNDA](user_url)
//   N parts • N pages • MM:SS • Date • N views
//   [Ensemble](...)
//   [Instrument](...), [Instrument](...)
function parseScoresFromMarkdown(md: string): ScoreData[] {
  const scores: ScoreData[] = [];
  const seen = new Set<string>();

  // Find every score URL (the linked title line is most reliable).
  // Match: [TITLE](https://musescore.com/user/108485503/scores/ID)   — but NOT the image-link line.
  const titleLineRe = /^\[([^\]\n]{2,200})\]\(https:\/\/musescore\.com\/user\/108485503\/scores\/(\d+)\)\s*$/gm;
  const matches = [...md.matchAll(titleLineRe)];

  for (const m of matches) {
    const rawTitle = m[1];
    const scoreId = m[2];
    if (seen.has(scoreId)) continue;
    seen.add(scoreId);

    // Skip the image-alt occurrence (alt starts with "!")
    if (rawTitle.startsWith("!")) continue;

    const title = rawTitle.replace(/\s*[–-]\s*KAGUNDA\s*$/i, "").trim();
    if (!title) continue;

    const startIdx = (m.index ?? 0) + m[0].length;
    // Look at the ~700 chars after the title for metadata.
    const after = md.substring(startIdx, startIdx + 700);

    // Thumbnail: search the ~400 chars BEFORE the title for the image link with this scoreId.
    const before = md.substring(Math.max(0, (m.index ?? 0) - 600), m.index ?? 0);
    const thumbRe = new RegExp(`\\((https:\\/\\/cdn\\.ustatik\\.com\\/musescore\\/scoredata\\/[^)\\s]+)\\)\\]\\([^)]*${scoreId}[^)]*\\)`);
    const thumbMatch = thumbRe.exec(before) ?? thumbRe.exec(md.substring(startIdx, startIdx + 800));

    const metaRe = /(\d+)\s*parts?\s*•\s*(\d+)\s*pages?\s*•\s*([\d:]+)\s*•\s*([A-Za-z]{3}\s+\d{1,2},\s*\d{4})\s*•\s*(\d+)\s*views?/;
    const meta = metaRe.exec(after);

    const ensembleRe = /\[(Mixed Quartet|Piano Duo|String Duet|Mixed Trio|Mixed Ensemble|Church Choir|SATB|Solo)\]/;
    const ensemble = ensembleRe.exec(after);

    // Instruments: collect linked instrument names that follow the ensemble line.
    let instruments: string | null = null;
    if (ensemble) {
      const afterEns = after.substring((ensemble.index ?? 0) + ensemble[0].length);
      const instRe = /\[([A-Z][A-Za-z ]{1,40})\]\(https:\/\/musescore\.com\/sheetmusic\/[a-z-]+\)/g;
      const instNames: string[] = [];
      let im;
      while ((im = instRe.exec(afterEns)) !== null && instNames.length < 5) {
        const name = im[1].trim();
        if (!["Mixed Quartet","Piano Duo","String Duet","Mixed Trio","Mixed Ensemble","Church Choir","SATB","Solo"].includes(name)) {
          instNames.push(name);
        }
        if (im.index > 200) break;
      }
      if (instNames.length) instruments = instNames.join(", ");
    }

    scores.push({
      title,
      musescore_id: scoreId,
      musescore_url: `https://musescore.com/user/108485503/scores/${scoreId}`,
      thumbnail_url: thumbMatch ? thumbMatch[1].replace(/@\d+x\d+/, "@500x660") : null,
      ensemble_type: ensemble ? ensemble[1] : null,
      instruments,
      parts: meta ? parseInt(meta[1]) : 1,
      pages: meta ? parseInt(meta[2]) : 1,
      duration: meta ? meta[3] : null,
      views: meta ? parseInt(meta[5]) : 0,
      published_date: meta ? meta[4].trim() : null,
    });
  }

  return scores;
}

async function fetchViaFirecrawl(apiKey: string): Promise<string> {
  const res = await fetch(FIRECRAWL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: MUSESCORE_USER_URL,
      formats: ["markdown"],
      onlyMainContent: true,
      waitFor: 3000,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Firecrawl ${res.status}: ${text.slice(0, 300)}`);
  }
  const json = await res.json();
  return json.markdown ?? json.data?.markdown ?? "";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const expectedSecret = Deno.env.get("SYNC_SECRET");
  const providedSecret = req.headers.get("x-sync-secret");
  if (!expectedSecret || providedSecret !== expectedSecret) {
    return new Response(
      JSON.stringify({ success: false, error: "Unauthorized" }),
      { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const firecrawlKey = Deno.env.get("FIRECRAWL_API_KEY");
    const supabase = createClient(supabaseUrl, supabaseKey);

    let scores: ScoreData[] = [];
    let source = "firecrawl";
    let warning: string | null = null;

    if (!firecrawlKey) {
      warning = "FIRECRAWL_API_KEY missing";
    } else {
      try {
        const content = await fetchViaFirecrawl(firecrawlKey);
        scores = parseScoresFromContent(content);
        console.log(`Firecrawl returned ${content.length} chars, parsed ${scores.length} scores`);
      } catch (e) {
        warning = `Firecrawl failed: ${(e as Error).message}`;
        console.warn(warning);
      }
    }

    // Fallback curated list if scraping yielded nothing.
    if (scores.length === 0) {
      source = "fallback";
      scores = [
        { title: "HALELUYA", musescore_id: "28959626", musescore_url: "https://musescore.com/user/108485503/scores/28959626", thumbnail_url: "https://cdn.ustatik.com/musescore/scoredata/g/1c0006c9355526855fdddd53fa994c33c6ccd8e6/score_0.png@500x660?no-cache=1770885292&bgclr=ffffff", ensemble_type: "Mixed Quartet", instruments: "Bass guitar, Strings group", parts: 4, pages: 1, duration: "00:31", views: 17, published_date: "Nov 1, 2025" },
        { title: "HEKO", musescore_id: "29658509", musescore_url: "https://musescore.com/user/108485503/scores/29658509", thumbnail_url: "https://cdn.ustatik.com/musescore/scoredata/g/269f49578a6f2ec4513778e31ca00a679ec894e3/score_0.png@500x660?no-cache=1775565757&bgclr=ffffff", ensemble_type: "Piano Duo", instruments: "Piano", parts: 2, pages: 2, duration: "01:04", views: 30, published_date: "Nov 24, 2025" },
        { title: "NJONI TUINGIE", musescore_id: "32170553", musescore_url: "https://musescore.com/user/108485503/scores/32170553", thumbnail_url: "https://cdn.ustatik.com/musescore/scoredata/g/fa0cad89f403eceb2eef3d09fb581e48a56ba63a/score_0.png@500x660?no-cache=1772639698&bgclr=ffffff", ensemble_type: "Mixed Quartet", instruments: "Piano, Bass guitar", parts: 4, pages: 1, duration: "00:26", views: 6, published_date: "Mar 2, 2026" },
        { title: "SADAKA TAKATIFU", musescore_id: "31555013", musescore_url: "https://musescore.com/user/108485503/scores/31555013", thumbnail_url: "https://cdn.ustatik.com/musescore/scoredata/g/87d24f9322344cf67f699621aaac53c2c1d3359a/score_0.png@500x660?no-cache=1773657233&bgclr=ffffff", ensemble_type: "String Duet", instruments: "Strings group", parts: 2, pages: 1, duration: "01:20", views: 20, published_date: "Feb 6, 2026" },
        { title: "SIFA NA UTUKUFU", musescore_id: "32866709", musescore_url: "https://musescore.com/user/108485503/scores/32866709", thumbnail_url: "https://cdn.ustatik.com/musescore/scoredata/g/9a4fd32d33f7e222994370cb1567cbfb79371ce9/score_0.png@500x660?no-cache=1774615293&bgclr=ffffff", ensemble_type: "Piano Duo", instruments: "Piano", parts: 2, pages: 1, duration: "00:27", views: 6, published_date: "Mar 27, 2026" },
        { title: "MISA ANTHONY", musescore_id: "30245900", musescore_url: "https://musescore.com/user/108485503/scores/30245900", thumbnail_url: "https://cdn.ustatik.com/musescore/scoredata/g/02952ac134520f9c34b2306d1748349cc23f88a7/score_0.png@500x660?no-cache=1775457938&bgclr=ffffff", ensemble_type: "Mixed Trio", instruments: "Piano", parts: 3, pages: 3, duration: "01:33", views: 21, published_date: "Dec 16, 2025" },
      ];
    }

    let synced = 0;
    let added = 0;
    for (const score of scores) {
      const { data: existing } = await supabase
        .from("scores")
        .select("id, story, mood")
        .eq("musescore_id", score.musescore_id)
        .maybeSingle();

      const payload: Record<string, unknown> = {
        ...score,
        updated_at: new Date().toISOString(),
      };

      if (!existing) {
        const generated = generateStory(score.title, score.ensemble_type);
        payload.story = generated.story;
        payload.mood = generated.mood;
        added++;
      } else {
        delete payload.story;
        delete payload.mood;
      }

      const { error } = await supabase
        .from("scores")
        .upsert(payload, { onConflict: "musescore_id" });
      if (!error) synced++;
      else console.error("Upsert error:", error);
    }

    return new Response(
      JSON.stringify({ success: true, synced, added, total: scores.length, source, warning }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Sync error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Sync failed. Please try again later." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
