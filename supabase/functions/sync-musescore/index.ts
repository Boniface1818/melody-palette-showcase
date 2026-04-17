import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2/cors";

const MUSESCORE_USER_URL = "https://musescore.com/user/108485503";

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

// Auto-generate a short story + mood from a score's title and ensemble.
// Used only for newly discovered scores so manually-curated stories are preserved.
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

function parseScoresFromHtml(html: string): ScoreData[] {
  const scores: ScoreData[] = [];
  const scorePattern = /href="(https:\/\/musescore\.com\/user\/108485503\/scores\/(\d+))"/g;
  const scoreUrls = new Map<string, string>();
  let match;
  while ((match = scorePattern.exec(html)) !== null) {
    scoreUrls.set(match[2], match[1]);
  }

  for (const [scoreId, scoreUrl] of scoreUrls) {
    const urlIdx = html.indexOf(scoreUrl);
    if (urlIdx === -1) continue;
    const nearbyHtml = html.substring(Math.max(0, urlIdx - 500), urlIdx + 1000);
    const titleMatch = nearbyHtml.match(/>([A-Z][A-Z\s\u2013\u2014–-]+(?:\s*–\s*[^<]+)?)<\/a>/);
    if (!titleMatch) continue;
    const title = titleMatch[1].replace(/\s*–\s*KAGUNDA\s*$/, "").trim();
    if (!title || title.length < 2) continue;
    if (scores.find((s) => s.musescore_id === scoreId)) continue;

    const metaMatch = nearbyHtml.match(/(\d+)\s*parts?\s*[•·]\s*(\d+)\s*pages?\s*[•·]\s*([\d:]+)\s*[•·]\s*([^•·<]+)\s*[•·]\s*(\d+)\s*views?/i);
    const ensembleMatch = nearbyHtml.match(/(Mixed Quartet|Piano Duo|String Duet|Mixed Trio|Church Choir|Mixed Ensemble|SATB|Solo)/i);
    const instrumentMatch = nearbyHtml.match(/(Piano|Bass guitar|Strings group|Violin|Oboe)[^<]*/i);
    const thumbMatch = nearbyHtml.match(/src="(https:\/\/cdn\.ustatik\.com\/musescore\/scoredata\/[^"]+)"/);

    scores.push({
      title,
      musescore_id: scoreId,
      musescore_url: scoreUrl,
      thumbnail_url: thumbMatch ? thumbMatch[1].replace(/@\d+x\d+/, "@500x660") : null,
      ensemble_type: ensembleMatch ? ensembleMatch[1] : null,
      instruments: instrumentMatch ? instrumentMatch[0].trim() : null,
      parts: metaMatch ? parseInt(metaMatch[1]) : 1,
      pages: metaMatch ? parseInt(metaMatch[2]) : 1,
      duration: metaMatch ? metaMatch[3] : null,
      views: metaMatch ? parseInt(metaMatch[5]) : 0,
      published_date: metaMatch ? metaMatch[4].trim() : null,
    });
  }

  return scores;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Authorization: only cron / authenticated admins may trigger this function.
  // The cron job sends the SYNC_SECRET via the `x-sync-secret` header.
  const expectedSecret = Deno.env.get("SYNC_SECRET");
  const providedSecret = req.headers.get("x-sync-secret");
  const authHeader = req.headers.get("Authorization");

  let authorized = false;

  if (expectedSecret && providedSecret && providedSecret === expectedSecret) {
    authorized = true;
  } else if (authHeader?.startsWith("Bearer ")) {
    try {
      const supabaseAuth = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_ANON_KEY")!,
        { global: { headers: { Authorization: authHeader } } },
      );
      const token = authHeader.replace("Bearer ", "");
      const { data, error } = await supabaseAuth.auth.getClaims(token);
      if (!error && data?.claims?.sub) authorized = true;
    } catch (_) {
      // fall through to unauthorized
    }
  }

  if (!authorized) {
    return new Response(
      JSON.stringify({ success: false, error: "Unauthorized" }),
      { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const response = await fetch(MUSESCORE_USER_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; ScoreSync/1.0)",
        "Accept": "text/html",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch MuseScore: ${response.status}`);
    }

    const html = await response.text();
    const scores = parseScoresFromHtml(html);

    if (scores.length === 0) {
      const fallbackScores: ScoreData[] = [
        { title: "HALELUYA", musescore_id: "28959626", musescore_url: "https://musescore.com/user/108485503/scores/28959626", thumbnail_url: "https://cdn.ustatik.com/musescore/scoredata/g/1c0006c9355526855fdddd53fa994c33c6ccd8e6/score_0.png@500x660?no-cache=1770885292&bgclr=ffffff", ensemble_type: "Mixed Quartet", instruments: "Bass guitar, Strings group", parts: 4, pages: 1, duration: "00:31", views: 17, published_date: "Nov 1, 2025" },
        { title: "HEKO", musescore_id: "29658509", musescore_url: "https://musescore.com/user/108485503/scores/29658509", thumbnail_url: "https://cdn.ustatik.com/musescore/scoredata/g/269f49578a6f2ec4513778e31ca00a679ec894e3/score_0.png@500x660?no-cache=1775565757&bgclr=ffffff", ensemble_type: "Piano Duo", instruments: "Piano", parts: 2, pages: 2, duration: "01:04", views: 30, published_date: "Nov 24, 2025" },
        { title: "NJONI TUINGIE", musescore_id: "32170553", musescore_url: "https://musescore.com/user/108485503/scores/32170553", thumbnail_url: "https://cdn.ustatik.com/musescore/scoredata/g/fa0cad89f403eceb2eef3d09fb581e48a56ba63a/score_0.png@500x660?no-cache=1772639698&bgclr=ffffff", ensemble_type: "Mixed Quartet", instruments: "Piano, Bass guitar", parts: 4, pages: 1, duration: "00:26", views: 6, published_date: "Mar 2, 2026" },
        { title: "MISA YA MTAKATIFU CLEMENT-EDDIE EUGENE", musescore_id: "33306086", musescore_url: "https://musescore.com/user/108485503/scores/33306086", thumbnail_url: "https://cdn.ustatik.com/musescore/scoredata/g/a622c1999d3392aa5c176a46b007a4b22cf351f5/score_0.png@500x660?no-cache=1776060827&bgclr=ffffff", ensemble_type: "String Duet", instruments: "Strings group", parts: 2, pages: 1, duration: "01:50", views: 1, published_date: "Apr 12, 2026" },
        { title: "SADAKA TAKATIFU", musescore_id: "31555013", musescore_url: "https://musescore.com/user/108485503/scores/31555013", thumbnail_url: "https://cdn.ustatik.com/musescore/scoredata/g/87d24f9322344cf67f699621aaac53c2c1d3359a/score_0.png@500x660?no-cache=1773657233&bgclr=ffffff", ensemble_type: "String Duet", instruments: "Strings group", parts: 2, pages: 1, duration: "01:20", views: 20, published_date: "Feb 6, 2026" },
        { title: "SIFA NA UTUKUFU", musescore_id: "32866709", musescore_url: "https://musescore.com/user/108485503/scores/32866709", thumbnail_url: "https://cdn.ustatik.com/musescore/scoredata/g/9a4fd32d33f7e222994370cb1567cbfb79371ce9/score_0.png@500x660?no-cache=1774615293&bgclr=ffffff", ensemble_type: "Piano Duo", instruments: "Piano", parts: 2, pages: 1, duration: "00:27", views: 6, published_date: "Mar 27, 2026" },
        { title: "MISA ANTHONY", musescore_id: "30245900", musescore_url: "https://musescore.com/user/108485503/scores/30245900", thumbnail_url: "https://cdn.ustatik.com/musescore/scoredata/g/02952ac134520f9c34b2306d1748349cc23f88a7/score_0.png@500x660?no-cache=1775457938&bgclr=ffffff", ensemble_type: "Mixed Trio", instruments: "Piano", parts: 3, pages: 3, duration: "01:33", views: 21, published_date: "Dec 16, 2025" },
      ];

      for (const score of fallbackScores) {
        await supabase.from("scores").upsert(score, { onConflict: "musescore_id" });
      }

      return new Response(
        JSON.stringify({ success: true, synced: fallbackScores.length, source: "fallback" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    let synced = 0;
    for (const score of scores) {
      const { error } = await supabase
        .from("scores")
        .upsert({ ...score, updated_at: new Date().toISOString() }, { onConflict: "musescore_id" });
      if (!error) synced++;
    }

    return new Response(
      JSON.stringify({ success: true, synced, total: scores.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    // Log full error server-side, return generic message to client
    console.error("Sync error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Sync failed. Please try again later." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
