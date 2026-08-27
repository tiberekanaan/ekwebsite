/**
 * One-off restore of the three "Empowering Community Leadership" sub-programmes
 * (Civil Society Leaders / Faith Leaders / Community Organisation Leaders) that
 * were removed from production, plus their 18 participant testimonials. Content
 * is copied verbatim from the local dev database (backend/.tmp/data.db), where
 * the entries still exist.
 *
 * Each programme is created published with: strategy -> Enabling Digital
 * Participation, pillars M2M [Enabling Digital Participation, Empowering
 * Leaders & Communities], the New Zealand High Commission as partner (legacy
 * M2M + partner_links role "funder"), and its testimonials linked via
 * testimonial.project.
 *
 * Idempotent: programmes are matched by title and testimonials by quote —
 * anything that already exists is skipped, so reruns and admin edits are safe.
 *
 * Defaults to local dev (backend/.env). For production:
 *
 *   STRAPI_URL=https://determined-strength-17a6de9eef.strapiapp.com STRAPI_API_TOKEN=xxx node apply-restore-community-leadership.js
 *
 * (Mint a fresh write-capable token for the run and delete it afterwards.)
 */

const fs = require("fs");
const path = require("path");

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";

const PROGRAMMES = [
  {
    "title": "Empowering Community Leadership: Civil Society Leaders",
    "description": "Two days of leadership, digital literacy and financial literacy training for advocacy organisations and member-based NGOs, delivered on 18 and 19 June 2026 and closing with personal action planning. Part of the Empowering Community Leadership programme funded by the New Zealand High Commission.\n\n### Participant commitments\n\nCommitments were operational rather than general. They included establishing a regular schedule to check actual spending against approved budget, and applying planning, communication and advocacy skills within participants' own organisations.",
    "objectives": "For civil society leaders, the programme aimed to strengthen:\n\n- **Leadership:** advocacy, policy engagement, stakeholder management and strategic planning.\n- **Digital literacy:** using digital platforms for advocacy, collecting data as evidence, collaborating with partner organisations and engaging policymakers.\n- **Financial management:** grant management, financial reporting to donors, programme budgeting and organisational sustainability.",
    "location": "Seminary and Institute Lounge, Teaoraereke, South Tarawa",
    "project_status": "completed",
    "strategy": "zi89rq6eybjuburge7xicitz",
    "pillars": [
      "zi89rq6eybjuburge7xicitz",
      "jvu7d9o8yktbmqa61cofz8rp"
    ],
    "partners": [
      "o220wc21csar6qr8lqvwftpa"
    ],
    "testimonials": [
      {
        "quote": "The most useful thing I learned was how leadership, advocacy, digital tools and financial management work together to strengthen community impact and organisational sustainability.",
        "author": "Civil society leader",
        "role": "Empowering Community Leadership · June 2026"
      },
      {
        "quote": "I will create a regular schedule to check our project's actual spending against our approved budget.",
        "author": "Civil society leader",
        "role": "Empowering Community Leadership · June 2026"
      },
      {
        "quote": "Understanding how to manage grant budgets properly and track spending early to avoid mistakes.",
        "author": "Civil society leader",
        "role": "Empowering Community Leadership · June 2026"
      },
      {
        "quote": "I intend to use the skills I learned to engage more effectively with my organisation and community, and support positive change through better planning, communication and advocacy.",
        "author": "Civil society leader",
        "role": "Empowering Community Leadership · June 2026"
      },
      {
        "quote": "Leadership with honesty.",
        "author": "Civil society leader",
        "role": "On the one action they intended to take · June 2026"
      }
    ]
  },
  {
    "title": "Empowering Community Leadership: Faith Leaders",
    "description": "Two days of leadership, digital literacy and financial literacy training for church leaders and stewardship directors, delivered on 2 and 3 July 2026 and closing with personal action planning. Part of the Empowering Community Leadership programme funded by the New Zealand High Commission.\n\n### Reach beyond the workshop\n\nParticipants reported taking the material directly back to their congregations. One group reported delivering the lessons to several hundred women in their church community within weeks of the workshop.",
    "objectives": "For faith leaders, the programme aimed to strengthen:\n\n- **Leadership:** communication, team building, decision-making, and guiding congregations through social and moral challenges.\n- **Digital literacy:** reaching congregation members including those in remote locations, sharing resources digitally, and organising activities online.\n- **Financial management:** managing offerings transparently, budgeting for church operations and outreach, and responsible financial decision-making.",
    "location": "South Tarawa, Kiribati",
    "project_status": "completed",
    "strategy": "zi89rq6eybjuburge7xicitz",
    "pillars": [
      "zi89rq6eybjuburge7xicitz",
      "jvu7d9o8yktbmqa61cofz8rp"
    ],
    "partners": [
      "o220wc21csar6qr8lqvwftpa"
    ],
    "testimonials": [
      {
        "quote": "I once was a Boss but not a leader, so after the workshop I learnt a lot that being an abusive leader can ruin my reputation and create corruption.",
        "author": "Faith leader",
        "role": "Empowering Community Leadership · July 2026"
      },
      {
        "quote": "We shared the lessons we learned with hundreds of women in our church community. We made every effort to present the lessons clearly and effectively, just as they were beautifully presented to us.",
        "author": "Faith leader",
        "role": "Empowering Community Leadership · July 2026"
      },
      {
        "quote": "We have come to realize that we made many mistakes in the past while serving in leadership. Now we understand the difference between a boss and a leader, and we are committed to becoming good leaders.",
        "author": "Faith leader",
        "role": "Empowering Community Leadership · July 2026"
      },
      {
        "quote": "We learned that when handling money, we need to provide receipts as evidence to ensure transparency and accountability.",
        "author": "Faith leader",
        "role": "Empowering Community Leadership · July 2026"
      },
      {
        "quote": "A good leader is someone who humbles themselves, remains patient and open-minded, and allows different ideas to come from their community. Leadership is not only about knowing right from wrong decisions, but about listening to your people.",
        "author": "Faith leader",
        "role": "Empowering Community Leadership · July 2026"
      },
      {
        "quote": "Before, I knew that we had goals, but I did not understand how important it was to have a clear goal and a plan to achieve it. We may face challenges along the way, but we need to overcome them to reach our goals.",
        "author": "Faith leader",
        "role": "Empowering Community Leadership · July 2026"
      },
      {
        "quote": "We thought we were already doing well in our workplace, but we have discovered many new things to learn, especially about leadership and how our behaviour affects our organisation.",
        "author": "Faith leader",
        "role": "Empowering Community Leadership · July 2026"
      }
    ]
  },
  {
    "title": "Empowering Community Leadership: Community Organisation Leaders",
    "description": "Two days of leadership, digital literacy and financial literacy training for village and community group leaders, delivered in July 2026 and closing with personal action planning. Part of the Empowering Community Leadership programme funded by the New Zealand High Commission.\n\n### Participant commitments\n\nParticipants recorded the most detailed action commitments of the programme. They included electing board members and clearly defining their roles, opening community bank accounts, preparing full documentation before applying for funding, and retaining receipts as evidence for donors. Fifteen participants identified community leadership and budgeting as their priority areas for the following three months.",
    "objectives": "For community-based organisation leaders, the programme aimed to strengthen:\n\n- **Leadership:** grassroots mobilisation, volunteer management and community engagement.\n- **Digital literacy:** using digital tools for community communication, event coordination and documenting local projects.\n- **Financial management:** managing community funds, transparent budgeting for local projects, and tracking donations and expenditure.",
    "location": "South Tarawa, Kiribati",
    "project_status": "completed",
    "strategy": "zi89rq6eybjuburge7xicitz",
    "pillars": [
      "zi89rq6eybjuburge7xicitz",
      "jvu7d9o8yktbmqa61cofz8rp"
    ],
    "partners": [
      "o220wc21csar6qr8lqvwftpa"
    ],
    "testimonials": [
      {
        "quote": "Elect new board members and clearly define their roles. Open a community bank account, since we do not have one. Train the board members and apply for grants.",
        "author": "Community organisation leader",
        "role": "Empowering Community Leadership · July 2026"
      },
      {
        "quote": "I will teach my community about the qualities of a good leader and help them learn how to write grant applications.",
        "author": "Community organisation leader",
        "role": "Empowering Community Leadership · July 2026"
      },
      {
        "quote": "Protecting myself from online risks and cyber threats on social media, and understanding the importance of providing strong evidence when applying for funding.",
        "author": "Community organisation leader",
        "role": "Empowering Community Leadership · July 2026"
      },
      {
        "quote": "I will return and teach my community about networking, and how to request funding from donors to support business and livelihood activities.",
        "author": "Community organisation leader",
        "role": "Empowering Community Leadership · July 2026"
      },
      {
        "quote": "The importance of preparing a strong grant proposal and a strategic plan that meets both community needs and donor requirements.",
        "author": "Community organisation leader",
        "role": "Empowering Community Leadership · July 2026"
      },
      {
        "quote": "I gained a better understanding of communication and how to work effectively with my members, and how to communicate properly as a responsible and trustworthy leader.",
        "author": "Community organisation leader",
        "role": "Empowering Community Leadership · July 2026"
      }
    ]
  }
];

function readEnvToken() {
  if (process.env.STRAPI_API_TOKEN) return process.env.STRAPI_API_TOKEN;
  const envPath = path.join(__dirname, ".env");
  let raw = "";
  try {
    raw = fs.readFileSync(envPath, "utf8");
  } catch {
    throw new Error(`Cannot read ${envPath}`);
  }
  for (const line of raw.split("\n")) {
    const m = line.match(/^\s*STRAPI_API_TOKEN\s*=\s*(.*)\s*$/);
    if (m) return m[1].trim().replace(/^["']|["']$/g, "");
  }
  return null;
}

let headers;

async function api(method, url, body) {
  const res = await fetch(`${STRAPI_URL}${url}`, {
    method,
    headers: body ? { ...headers, "Content-Type": "application/json" } : headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`${method} ${url} ${res.status}\n${await res.text()}`);
  return res.json();
}

// status=draft returns every document's draft counterpart, so this finds the
// entry whether it is currently published or draft-only.
async function findByField(collection, field, value) {
  const q = `filters[${field}][$eq]=${encodeURIComponent(value)}`;
  const { data } = await api("GET", `/api/${collection}?${q}&status=draft&fields[0]=${field}`);
  return data[0] ?? null;
}

async function main() {
  const token = readEnvToken();
  if (!token) {
    throw new Error("STRAPI_API_TOKEN missing. Pass one via the environment.");
  }
  headers = { Authorization: `Bearer ${token}` };

  let createdProgrammes = 0;
  let createdTestimonials = 0;

  for (const p of PROGRAMMES) {
    let documentId;
    const existing = await findByField("projects", "title", p.title);
    if (existing) {
      documentId = existing.documentId;
      console.log(`- ${p.title}: already exists (${documentId})`);
    } else {
      const { data } = await api("POST", "/api/projects?status=published", {
        data: {
          title: p.title,
          description: p.description,
          objectives: p.objectives,
          location: p.location,
          project_status: p.project_status,
          strategy: { connect: [p.strategy] },
          pillars: { connect: p.pillars },
          partners: { connect: p.partners },
          partner_links: p.partners.map((partner) => ({
            partner: { connect: [partner] },
            partner_role: "funder",
          })),
        },
      });
      documentId = data.documentId;
      createdProgrammes++;
      console.log(`✓ ${p.title}: created + published (${documentId})`);
    }

    for (const t of p.testimonials) {
      const existingT = await findByField("testimonials", "quote", t.quote);
      if (existingT) {
        console.log(`  - testimonial already exists: "${t.quote.slice(0, 50)}…"`);
        continue;
      }
      await api("POST", "/api/testimonials?status=published", {
        data: { ...t, project: { connect: [documentId] } },
      });
      createdTestimonials++;
      console.log(`  ✓ testimonial: "${t.quote.slice(0, 50)}…"`);
    }
  }

  console.log(
    `Done — ${createdProgrammes} programme(s) and ${createdTestimonials} testimonial(s) created.`,
  );
}

main().catch((err) => {
  console.error("✗ Restore failed:", err.message);
  process.exit(1);
});
