// Closed tag vocabulary from the grants-resources tag guide. Do not add tags
// here without adding them to the guide first — the whole team must use the
// same words or the related-articles block shows the wrong things.
export type TagGroup = 'stage' | 'topic' | 'audience';

export const TAG_VOCABULARY: Array<{ name: string; group: TagGroup }> = [
  // Stage — where the reader is in the journey (one per article)
  { name: 'getting started', group: 'stage' },
  { name: 'getting ready', group: 'stage' },
  { name: 'applying', group: 'stage' },
  { name: 'after the grant', group: 'stage' },
  // Topic — what the article is about (one or two per article)
  { name: 'funding basics', group: 'topic' },
  { name: 'eligibility', group: 'topic' },
  { name: 'documents', group: 'topic' },
  { name: 'writing your application', group: 'topic' },
  { name: 'budgeting', group: 'topic' },
  { name: 'reporting', group: 'topic' },
  { name: 'digital skills', group: 'topic' },
  // Funder and audience — `grants` goes on every article in the collection
  { name: 'DAP', group: 'audience' },
  { name: 'grants', group: 'audience' },
  { name: 'community groups', group: 'audience' },
  { name: 'churches', group: 'audience' },
  { name: 'youth groups', group: 'audience' },
  { name: "women's groups", group: 'audience' },
  { name: 'outer islands', group: 'audience' },
];

export interface SeedArticle {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  meta_description: string;
  author: string;
  reading_time: number;
  last_reviewed: string;
  tags: string[];
  body: string;
}

export const GRANT_ARTICLES: SeedArticle[] = [
  {
    title: 'What a grant is, and what it is not',
    slug: 'what-a-grant-is',
    category: 'Grants and funding',
    excerpt:
      'Money is set aside every year for community projects in Kiribati. Before your group asks for any of it, it helps to know exactly what a grant is, and what comes with it.',
    meta_description:
      'A plain English guide for Kiribati community groups, churches and villages. What a grant is, how it differs from a loan or a gift, and what the Australian Direct Aid Program will and will not pay for.',
    author: 'Empower Kiribati',
    reading_time: 5,
    last_reviewed: '2026-08',
    tags: ['grants', 'funding basics', 'DAP', 'getting started', 'community groups'],
    body: `**Money is set aside every year for community projects in Kiribati. Village groups, church groups and small organisations can ask for some of it. Many never do.**

Some have never heard of it. Others have heard of it but are not sure what it really is, or what happens after the money arrives.

A lot of good projects are lost before a single form is filled in. So it is worth starting at the beginning.

> **In short**
>
> A grant is money given to your group for an agreed project. You do not pay it back. But you sign an agreement, you keep every receipt, and you report at the end on what you did. Grant money is never your group's money. You are looking after it for a purpose.

## A grant is money given for a job you promise to do

A grant is money that an organisation gives your group to carry out a project. You do not pay the money back. But you do not get to spend it on anything you like either.

You tell the funder what you want to do. If they agree, they give you the money for that project only. You do the work. Then you show them what you did with the money.

Think of it like this. A relative sends you money to buy roofing iron for the maneaba. The money is yours to use, but everyone knows what it is for. If the iron never arrives, you will have to explain yourself. A grant works the same way, only the promise is written down and signed.

## How a grant is different from other money

People often mix these up.

| Type of money | Do you pay it back? | Does anyone check? |
|---|---|---|
| **Grant** | No | Yes. You report on every dollar. |
| Loan | Yes, usually with interest | Yes |
| Donation or gift | No | Usually not |
| Government services | Not your money to spend | Handled by the ministry |
| Remittance from family | No | No. It belongs to your household. |

Government services are things a ministry is already meant to provide, such as teachers or clinic supplies. A grant is for something extra that your community wants to do for itself.

The row that matters most is the first one. Grant money passes through your hands. It does not become yours.

## What the funder expects back

When your group receives a grant, four things usually follow.

You sign a contract. This is a written agreement about what you will do, by when, and for how much.

You keep every receipt. Every dollar spent needs paper to show for it.

You take photos and keep records of the work as it happens.

You send a final report at the end. This is sometimes called an acquittal. It says what you did, what you spent, and what changed for your community.

Someone from the funder may also visit to see the work.

None of this is a trap. It is simply how the money is looked after. Groups that do these things well are the ones invited back.

## The Direct Aid Program

The main small grant available in Kiribati is the Direct Aid Program, usually called DAP. It is run by the Australian High Commission in Bairiki, Tarawa.

Grants go up to **$20,000**. Because Kiribati uses the Australian dollar, that is the same money you use every day. There is no exchange rate to worry about.

**Who can apply.** Community groups, villages, non government organisations and churches. Island councils and other local government bodies cannot apply for themselves.

**What it supports.** Community and rural development. Education. Health. The environment. Youth and sports. Training and skills. Gender equality and disability inclusion. Economic activity. Small building work.

**How you apply.** Online, through a website called SmartyGrants.

**When.** There is a round each year with a closing date. Late applications are not accepted.

> **Check before you rely on this**
>
> Round dates, forms and rules change from year to year. Always check the Australian High Commission website for the current round, including after reading this article. You can also phone the High Commission on +686 740 211 84 or visit the office in Bairiki.

## What DAP will not pay for

This list stops a lot of good applications. It is worth reading twice.

- Wages or salaries for your staff
- Running costs such as rent, power, water or ordinary maintenance
- Big assets such as vehicles or boats
- Loan schemes, cash handouts or business ventures
- Overseas travel or study tours
- Sports tournaments, unless there is a clear benefit to the community beyond the games themselves

If your idea is mostly one of these things, DAP is the wrong door. Other funders work in Kiribati with different rules, and one of them may suit you better.

## Why this matters before you write anything

Groups often start by writing the application. Then they find out that their idea was never going to be funded, or that they are missing a document they cannot get in time.

It is easier the other way around. Understand what the money is for. Check whether your idea fits. Get your papers in order. Then write.

## One thing to do this week

Sit down with your committee and answer one question out loud.

**If someone gave our group $20,000 tomorrow, what exactly would we do with it, and who would be better off?**

Write the answer on one sheet of paper. Do not worry about the wording yet. That sheet is where your application will come from.

## Words to know

**Grant.** Money given for an agreed project, which you do not pay back.

**Funder** or **donor.** The organisation giving the money. For DAP, this is the Australian High Commission.

**Applicant.** The group asking for the money.

**Application** or **proposal.** The form and information you send in.

**Budget.** The list of what you will spend the money on.

**Contract** or **agreement.** The paper both sides sign before the money is released.

**Acquittal** or **final report.** What you send at the end to show how the money was used.

**Beneficiaries.** The people who are better off because of your project.

---

*Empower Kiribati is a locally driven organisation working to strengthen leadership, enterprise and digital participation across Kiribati. If your group is working through an application and gets stuck, get in touch.*`,
  },
];
