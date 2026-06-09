# Project Overview

This project is a modern, content-driven website built with **Astro 6** as the frontend and **Strapi 5** as the backend headless CMS. 

## Objective
The primary goal is to create a seamless platform that empowers content creators to easily perform CRUD (Create, Read, Update, Delete) operations through a user-friendly backend interface provided by Strapi. The Astro framework will then consume this data via API to render the final frontend experience for the users.

## Content Strategy
Similar to structured CMSs like Drupal, the content will be highly modeled and structured. Content creators will have access to custom content types with specific fields tailored to their needs. Key content types include:
- **Events:** Featuring custom fields for dates, locations, event details, and imagery.
- **Blog:** For articles, announcements, and news updates.
- **Basic Pages:** For standard, relatively static information like 'About Us' or 'Terms of Service'.
- **Web-forms:** Structured to capture user input, inquiries, or registrations from the frontend.

## Frontend Foundation: Velocity Boilerplate
To accelerate development, the frontend is built upon the **Velocity starter kit**. This provides a production-ready Astro 6 environment out of the box, specifically configured with:
- **Tailwind CSS v4:** Integrated using the `@tailwindcss/vite` plugin and a three-tier OKLCH design token system for a modern, vibrant, and responsive UI.
- **Pre-built Components:** Over 40 marketing-ready components ready to be wired up to our Strapi content types.
- **Built-in Security:** Native Content Security Policy (CSP) is enabled by default (`security.csp: true`), providing crucial protection against cross-site scripting (XSS) when users interact with our web-forms.
- **Type-Safe Environment Variables:** Uses the `astro:env` module to define and validate environment variables securely.
- **Search & SEO:** Includes Pagefind for client-side search, dynamic Open Graph image generation, and native Astro 6 `<head>` management.

## Architecture & Communication
- **Backend (Strapi 5):** Hosts, models, and manages all content. Content is uniquely identified across locales and draft/published states using the new 24-character alphanumeric `documentId`, which replaces the legacy numeric `id`.
- **Frontend Data Fetching (Astro 6):** 
  - Static and build-time data (like Blog posts and Basic pages) is fetched using Astro's **Content Loader API**.
  - Dynamic, personalized, or frequently updating content uses **Server Islands** (`server:defer`), which defers rendering until the data is fetched on the server while displaying fallback content instantly.
- **Form Handling:** Client-to-server interactions, such as submitting the **web-forms**, will use **Astro Actions**. This allows us to define type-safe backend functions that automatically parse and validate JSON and form data (using Zod) before safely passing it along to the Strapi backend.
```