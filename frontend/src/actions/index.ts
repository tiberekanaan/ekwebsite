import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro/zod';
import { STRAPI_URL, STRAPI_TOKEN } from 'astro:env/server';

export const server = {
  contact: {
    submit: defineAction({
      accept: 'form',
      input: z.object({
        name: z
          .string()
          .min(2, 'Name must be at least 2 characters')
          .max(100, 'Name is too long'),
        email: z.email('Please enter a valid email address'),
        message: z
          .string()
          .min(10, 'Message must be at least 10 characters')
          .max(5000, 'Message is too long'),
        honeypot: z.string().max(0).optional(),
      }),
      handler: async ({ name, email, message, honeypot }) => {
        if (honeypot) {
          return { documentId: null, swallowed: true as const };
        }

        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        if (STRAPI_TOKEN) {
          headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
        }

        const res = await fetch(`${STRAPI_URL}/api/web-forms`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ data: { name, email, message } }),
        });

        if (!res.ok) {
          const body = await res.text().catch(() => '');
          if (res.status === 403 || res.status === 401) {
            throw new ActionError({
              code: 'FORBIDDEN',
              message:
                'Submissions are not currently accepted. Grant the Public role `create` on web-form in Strapi, or set STRAPI_TOKEN.',
            });
          }
          throw new ActionError({
            code: 'INTERNAL_SERVER_ERROR',
            message: `Strapi rejected the submission (${res.status} ${res.statusText})${body ? `: ${body}` : ''}`,
          });
        }

        const json = (await res.json()) as { data: { documentId: string } };
        return { documentId: json.data.documentId, swallowed: false as const };
      },
    }),
  },
};
