import { c as createComponent } from './_astro_assets_AC_fZIIY.mjs';
import 'piccolore';
import { f as isInputError, c as renderComponent, e as renderTemplate, m as maybeRenderHead, u as unescapeHTML, h as addAttribute } from './server_ZGudQw4a.mjs';
import { $ as $$Layout, a as $$PageHeader } from './PageHeader_axbbYy51.mjs';
import { a as actions } from './server_BQw1ihUG.mjs';

const prerender = false;
const $$Contact = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Contact;
  const result = Astro2.getActionResult(actions.submitContact);
  const fieldErrors = result?.error && isInputError(result.error) ? result.error.fields : {};
  const formError = result?.error && !isInputError(result.error) ? result.error.message : null;
  const success = result && !result.error;
  const mailIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>`;
  const pinIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
  const inputClasses = "mt-2 block w-full rounded-xl border border-ek-700/15 bg-white px-4 py-3 text-ek-ink shadow-sm placeholder:text-ek-muted/60 focus:border-ek-500 focus:outline-none focus:ring-2 focus:ring-ek-500/30";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Contact", "description": "Get in touch with the Empower Kiribati team.", "floatingHeader": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PageHeader", $$PageHeader, { "eyebrow": "Get in touch", "title": "Let's connect", "description": "Questions, partnerships, or ideas — drop us a note and we'll get back to you." })} ${maybeRenderHead()}<section class="bg-ek-mist py-24"> <div class="mx-auto grid w-full max-w-6xl gap-x-14 gap-y-12 px-7 lg:grid-cols-5"> <aside class="lg:col-span-2" data-reveal> <span class="mb-4 inline-block font-condensed text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-ek-olive">
Where to find us
</span> <h2 class="mb-4 bg-gradient-to-r from-ek-800 to-ek-500 bg-clip-text font-serif text-3xl font-bold leading-[1.1] text-transparent sm:text-4xl">
Every message helps the work grow
</h2> <span class="mb-8 block h-1 w-16 rounded-full bg-gradient-to-r from-ek-lime to-ek-500" aria-hidden="true"></span> <div class="space-y-4"> <div class="flex items-start gap-4 rounded-2xl border border-ek-700/10 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,50,58,0.08)]"> <span class="inline-flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-ek-mist text-ek-600 ring-1 ring-ek-700/10">${unescapeHTML(mailIcon)}</span> <div> <p class="font-condensed text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ek-olive">
Email
</p> <a class="mt-1 block text-base font-semibold text-ek-ink transition-colors hover:text-ek-600" href="mailto:inquiry@empower.org.ki">
inquiry@empower.org.ki
</a> </div> </div> <div class="flex items-start gap-4 rounded-2xl border border-ek-700/10 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,50,58,0.08)]"> <span class="inline-flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-ek-mist text-ek-600 ring-1 ring-ek-700/10">${unescapeHTML(pinIcon)}</span> <div> <p class="font-condensed text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ek-olive">
Based in
</p> <p class="mt-1 text-base font-semibold text-ek-ink">Bikenibeu, Tarawa, Kiribati</p> </div> </div> </div> <p class="mt-8 border-l-2 border-ek-olive pl-[18px] text-base text-ek-muted">
Whether you're a community group, donor, or curious supporter — we usually reply within a
          few days.
</p> </aside> <div class="lg:col-span-3" data-reveal data-reveal-delay="120"> <div class="rounded-3xl border border-ek-700/10 bg-white p-8 shadow-[0_16px_38px_rgba(15,50,58,0.08)] sm:p-10"> ${success ? renderTemplate`<div class="rounded-2xl border border-ek-lime/50 bg-ek-lime/10 p-6"> <p class="font-serif text-xl font-bold text-ek-800">Message sent.</p> <p class="mt-1.5 text-base text-ek-muted">
Thanks for reaching out — we'll get back to you shortly.
</p> </div>` : renderTemplate`<form method="POST"${addAttribute(actions.submitContact, "action")} class="space-y-6" novalidate> <div> <label for="name" class="block text-sm font-semibold text-ek-ink">
Your name
</label> <input id="name" name="name" type="text" required autocomplete="name" placeholder="Jane Doe"${addAttribute(inputClasses, "class")}> ${fieldErrors.name && renderTemplate`<p class="mt-1.5 text-sm text-rose-600">${fieldErrors.name[0]}</p>`} </div> <div> <label for="email" class="block text-sm font-semibold text-ek-ink">
Email address
</label> <input id="email" name="email" type="email" required autocomplete="email" placeholder="jane@example.com"${addAttribute(inputClasses, "class")}> ${fieldErrors.email && renderTemplate`<p class="mt-1.5 text-sm text-rose-600">${fieldErrors.email[0]}</p>`} </div> <div> <label for="message" class="block text-sm font-semibold text-ek-ink">
Message
</label> <textarea id="message" name="message" rows="6" required placeholder="Tell us a bit about why you're reaching out…"${addAttribute(inputClasses, "class")}></textarea> ${fieldErrors.message && renderTemplate`<p class="mt-1.5 text-sm text-rose-600">${fieldErrors.message[0]}</p>`} </div> <div class="hidden" aria-hidden="true"> <label>
Leave this empty
<input type="text" name="honeypot" tabindex="-1" autocomplete="off"> </label> </div> ${formError && renderTemplate`<div class="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700"> ${formError} </div>`} <button type="submit" class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ek-lime px-[22px] py-3 font-condensed text-[0.92rem] font-semibold uppercase tracking-[0.06em] text-ek-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-ek-lime-bright hover:shadow-[0_8px_22px_rgba(174,203,58,0.3)] focus:outline-none focus:ring-2 focus:ring-ek-500/40 focus:ring-offset-2 sm:w-auto">
Send message
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"> <path d="M5 12h14M13 5l7 7-7 7"></path> </svg> </button> </form>`} </div> </div> </div> </section> ` })}`;
}, "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/pages/contact.astro", void 0);

const $$file = "/Users/tibereritobakanaan/Projects/ekwebsite/frontend/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
