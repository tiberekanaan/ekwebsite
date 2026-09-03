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
  {
    title: 'How to prepare your grant application',
    slug: 'how-to-prepare-your-grant-application',
    category: 'Grants and funding',
    excerpt:
      'Most applications are lost weeks before the closing date, not on the day. This guide walks through the preparation in the order that works, from the issue in your community to the documents you attach.',
    meta_description:
      'A step-by-step guide for community groups, civil society organisations and NGOs in Kiribati: framing the project from the issue, gathering evidence, building the budget, securing permits, and getting registration, bank account and governing documents ready before a funding round opens.',
    author: 'Empower Kiribati',
    reading_time: 12,
    last_reviewed: '2026-09',
    tags: ['grants', 'writing your application', 'documents', 'getting ready', 'community groups'],
    body: `**A resource for community-based organisations, civil society organisations and NGOs in Kiribati.**

Most grant applications are not lost on the day they are submitted. They are lost weeks earlier, when an organisation starts from the money on offer rather than from the problem in front of it, or when it discovers on the last afternoon that the bank account is in the chairman's name and the registration certificate has expired. This guide walks through the preparation in the order that works, from the issue in your community to the documents you attach, so that when a funding round opens you are assembling an application rather than starting one.

You do not need to be a professional grant writer to do this well. You need to know your community, be honest about what you have and what you need, and give yourself enough time.

## Part one: the project

### Start from the issue, not from the funding

The first question a funder asks is not "what do you want to buy" but "why does this matter". An application that opens with a request for a generator says very little. An application that opens with the fact that the maneaba has no power after dark, so the youth group cannot meet in the evenings and the women's group has stopped holding its fortnightly savings meeting, tells the funder what the generator is for and why the community will use it.

Framing the proposal from the issue does two things. It shows there is a real need that you did not invent for the application, and it lets the funder see that their money will change something in people's lives rather than simply arriving as equipment or an allowance. A funder reading fifty applications will remember the one that made the problem clear.

Do this in consultation with the people it affects. Sit with your leadership, your elders, your members or the households concerned and ask them to describe the issue in their own words, and then check your description back with them before you write it into the application. This matters for two reasons. The issue you think is most pressing is not always the one the community would name first, and an application that has been validated by the community carries far more weight than one written alone at a desk. If a funder later visits and asks a member what the project is for, the answer should match what you wrote.

### Say what the issue does to people

Once the issue is clear, spell out the problems that flow from it and what they do to the lives of your members. Be specific and be concrete. "Poor sanitation" is a category; "the school has one working toilet for 180 children, so girls stay home during their period and fall behind" is a problem a reader can picture and a funder can act on.

Ask yourself who is affected, how many, how often, and what happens as a result. Follow the chain a few steps: what the issue costs in money, in time, in health, in safety, in school attendance, in opportunities missed. If the issue affects some people more than others, such as women, children, older people or people with disabilities, say so, because most funders are asked to give priority to exactly those groups and cannot do it unless you tell them.

### Say how the project will address it, and what will change

Now connect your project to the problem. Describe what you will actually do, step by step, and then describe what will be different for your members once it is done. This is the part where many applications go wrong, because they describe the activity and stop. Building a toilet block is an activity. Children attending school through the whole month, and a school that passes its health inspection, are the changes the activity is meant to bring about.

Be realistic about what the project can and cannot do. A funder does not expect a small grant to end a problem, and an application that claims it will is less believable than one that says clearly what this stage will achieve and what would come next. Say how you will know it worked. That does not need a complicated system; a register of who uses the facility, a count of meetings held, a photograph before and after, or a short round of questions to members after six months will do, as long as you decide now what you will record.

### Gather your evidence

Everything you have said so far becomes much stronger when there is something to show for it. Collect what you can before you write.

Photographs of the current situation are the simplest and most persuasive evidence there is, especially for anything physical. Take them clearly, in daylight, and note the date and place. Where you have numbers, use them: the number of households, members, children or families affected, how many people attend now compared with before, how far people walk, how much they pay. Letters of support from the village council, the church, the school, the island council, the unimwane or a partner organisation confirm that the issue is recognised beyond your own committee. Minutes of the meeting where the community discussed and agreed the project are evidence of consultation and are worth attaching.

If you asked members questions during the consultation, keep the answers. A short survey of twenty households, even on paper, is evidence. So is a quote from a member in their own words, with their permission.

### If you are building something, get the drawings

Any project that involves construction or installation, such as a toilet block, a generator shed, a water tank stand, a fence, a kitchen or a maneaba repair, needs a drawing or plan before the budget can be trusted. Ask a builder, a tradesperson, a Public Works officer or someone in the community with construction experience to prepare a simple plan showing the size, the layout and the materials. It does not need to be an architect's drawing, but it does need to be clear enough that someone else could price it.

The plan does two jobs. It shows the funder that the project has been thought through rather than guessed at, and it produces your list of materials, which is the backbone of the budget. Without a plan, the budget is an estimate of an estimate, and funders can tell.

### Develop the budget

The budget is where the funder checks whether you understand your own project. Build it line by line rather than as a single figure. For each item, write what it is, how many you need, the unit cost and the total, and get a real price from a supplier wherever you can rather than guessing. Attach the quotes.

Think through every category the project will actually need, not only the obvious one. Materials and equipment, freight and transport (which, in Kiribati, is often the line people forget and the one that grows most), labour if it is to be paid, tools, fuel, hire of vehicles or a boat, venue and catering if there are meetings or training, communication, and the cost of the reporting and acquittal at the end. If you will pay people, say who, for how many days, and at what rate. If part of the money is needed to procure something from overseas or from another island, allow for the time and the cost of getting it here.

Add a contingency line, usually around ten per cent, and label it as such. This is not padding; it is the honest acknowledgement that prices change between the day you write the application and the day the money arrives. Do not shrink the budget to make the application look cheaper. An application that is underfunded from the start ends with half a building and a difficult report, and funders remember that more than they remember a slightly higher figure.

### Show what the community will contribute

If your members can provide something, write it into the application as a contribution. Labour is the most common one: the community will dig the foundations, carry the materials from the wharf, or provide the meals for the workers. Land, local materials such as coconut timber or coral aggregate, use of a truck, a venue, cooking, storage and the committee's own time all count.

Put a value on these where you can, using the local rate for a day's labour or the hire cost you are avoiding, and show them as a column beside the funder's contribution. This is not a formality. It tells the funder that the community owns the project and is investing in it, which is one of the strongest signals that the project will still be cared for after the grant is spent. Many funders look for exactly this and some require it.

### Secure the permits before you apply

If the project needs a building permit, a land use consent, a lease agreement, a licence, an environmental approval or a health clearance, start that process now and not after the grant is approved. Permits take time in Kiribati, and a funder who approves money for a project that then waits six months for a permit will be reluctant to fund you again.

Where the permit is already in hand, attach it. Where it is in process, attach the application and say when you expect it. Where the project sits on land that is not the organisation's own, a written agreement from the landowner or the relevant authority is essential, because a funder will not pay for a building the organisation may not be allowed to keep.

## Part two: the organisation

Before a funder looks at your project, they look at whether your organisation is one they can legally and safely give money to. These are the basics. None of them can be done in a hurry, so get them in order now and keep them current.

### Get your registration ready

Make sure your organisation is registered with the Ministry of Women, Youth, Sport and Social Affairs (MWYSSA) and that the registration is current. Keep a copy of the certificate where you can find it. Almost every funder will ask for it, and an unregistered group will be turned away regardless of how good the project is.

### Open a bank account in the organisation's name

The account that receives the grant must be in the exact legal name of your organisation, not in the name of the chairperson, the treasurer or the pastor. An account in a person's name raises immediate concerns about who controls the money and can stop the payment altogether. Set the account up with two signatories so that no single person can move funds alone, and keep the statements. If your organisation does not yet have such an account, treat this as the first thing to fix.

### Have your governing documents ready

Funders may ask for your constitution or by-laws, your organisational or strategic plan, the names of your committee or board, minutes of your annual general meeting, and a recent financial statement or report. Even if a particular funder does not ask, having these ready shows you are an organisation with structure rather than a group of individuals, and it saves you from writing them under pressure. If your plan is out of date, update it. If you have never had one, a two-page statement of what your organisation is for, what it does and what it intends to do over the next few years is enough to begin with.

## Apply early

Funding rounds have closing dates, and the closing date is not the day to be gathering quotes. Give yourself weeks rather than days: time to consult the community properly, time to get a builder's plan and a supplier's quote, time for the permit office and the bank, and time to have someone outside the committee read the application and tell you which parts do not make sense. Applications assembled in the last two days are the ones missing an attachment, quoting an old price or naming a bank account that does not match the registration. Funders notice, and a rushed application says something about how the project would be run.

> **A good habit**
>
> Keep a folder, on paper or on a phone, with the standing documents always in it: the registration certificate, the bank account details, the constitution, the current plan, the committee list and the most recent financial report. When a round opens, the only work left is the project itself.

## Before you submit: a checklist

### The project

- The issue is described from the community's point of view and has been checked with leadership or members.
- The problems that flow from the issue, and their effect on people's lives, are specific and concrete.
- The project activities are clear, and the change they are expected to make is stated separately from the activities.
- You have said how you will know the project worked.
- Evidence is attached: photographs, numbers, letters of support, meeting minutes.
- For any construction, a drawing or plan is attached and matches the materials in the budget.
- The budget is line by line, based on real quotes, includes transport and contingency, and is not undercounted.
- The community's own contribution is shown and valued.
- Permits, land agreements and licences are attached, or their status is explained.

### The organisation

- MWYSSA registration is current and a copy is attached.
- The bank account is in the organisation's exact legal name, with two signatories.
- Constitution or by-laws, organisational plan, committee list and a recent financial report are ready.

### The timing

- You have left enough time for someone outside the committee to read the whole application before it goes in.

---

*Empower Kiribati is a locally driven organisation working to strengthen leadership, enterprise and digital participation in Kiribati. If your group is working through an application and gets stuck, get in touch.*`,
  },
];
