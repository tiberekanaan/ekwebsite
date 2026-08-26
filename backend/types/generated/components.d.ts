import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksChallenges extends Struct.ComponentSchema {
  collectionName: 'components_blocks_challenges';
  info: {
    description: 'Grid of major challenges the organisation responds to.';
    displayName: 'Challenges';
    icon: 'alert';
  };
  attributes: {
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    items: Schema.Attribute.Component<'shared.challenge-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksClose extends Struct.ComponentSchema {
  collectionName: 'components_blocks_closes';
  info: {
    description: 'Closing "Work with us" call-to-action section.';
    displayName: 'Close';
    icon: 'envelop';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface BlocksFuture extends Struct.ComponentSchema {
  collectionName: 'components_blocks_futures';
  info: {
    description: 'Forward-looking section with values and headline stats.';
    displayName: 'Future';
    icon: 'rocket';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    stats: Schema.Attribute.Component<'shared.future-stat', true>;
    title: Schema.Attribute.String;
    values: Schema.Attribute.Component<'shared.value-item', true>;
  };
}

export interface BlocksHero extends Struct.ComponentSchema {
  collectionName: 'components_blocks_heroes';
  info: {
    description: 'Landing-page hero with headline, intro and call-to-action buttons.';
    displayName: 'Hero';
    icon: 'landscape';
  };
  attributes: {
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    heritage: Schema.Attribute.Text;
    primaryButtonLink: Schema.Attribute.String;
    primaryButtonText: Schema.Attribute.String;
    secondaryButtonLink: Schema.Attribute.String;
    secondaryButtonText: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface BlocksImpact extends Struct.ComponentSchema {
  collectionName: 'components_blocks_impacts';
  info: {
    description: 'Impact section with a repeatable set of headline metrics.';
    displayName: 'Impact';
    icon: 'chartCircle';
  };
  attributes: {
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    metrics: Schema.Attribute.Component<'shared.impact-metric', true>;
    note: Schema.Attribute.Text;
    outcomes: Schema.Attribute.Component<'shared.outcome-item', true>;
    photos: Schema.Attribute.Media<'images', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksPartnerMarquee extends Struct.ComponentSchema {
  collectionName: 'components_blocks_partner_marquees';
  info: {
    description: 'Scrolling row of funder and government partners, sourced from consenting Partner records.';
    displayName: 'Partner marquee';
    icon: 'apps';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    intro: Schema.Attribute.Text;
  };
}

export interface BlocksPartners extends Struct.ComponentSchema {
  collectionName: 'components_blocks_partners';
  info: {
    description: 'Partner logo marquee with editable logo + name entries.';
    displayName: 'Partners';
    icon: 'apps';
  };
  attributes: {
    allPartnersLabel: Schema.Attribute.String;
    allPartnersLink: Schema.Attribute.String;
    categories: Schema.Attribute.Component<'shared.partner-category', true>;
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    logos: Schema.Attribute.Component<'shared.partner-logo', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksPillars extends Struct.ComponentSchema {
  collectionName: 'components_blocks_pillars';
  info: {
    description: 'Our Work section linking to selected Pillar entries.';
    displayName: 'Pillars';
    icon: 'grid';
  };
  attributes: {
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    pillars: Schema.Attribute.Relation<'oneToMany', 'api::pillar.pillar'>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksProgrammes extends Struct.ComponentSchema {
  collectionName: 'components_blocks_programmes';
  info: {
    description: 'Landing "Our work" section listing current programmes with status pills.';
    displayName: 'Programmes';
    icon: 'briefcase';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    items: Schema.Attribute.Component<'shared.programme-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_blocks_testimonials';
  info: {
    description: 'Testimonial carousel sourcing selected Testimonial entries.';
    displayName: 'Testimonials';
    icon: 'message';
  };
  attributes: {
    attribution: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    note: Schema.Attribute.Text;
    quote: Schema.Attribute.Text;
    testimonials: Schema.Attribute.Relation<
      'oneToMany',
      'api::testimonial.testimonial'
    >;
    title: Schema.Attribute.String;
  };
}

export interface BlocksThreats extends Struct.ComponentSchema {
  collectionName: 'components_blocks_threats';
  info: {
    description: 'Roots-of-empowerment bridge pairing each threat with our response.';
    displayName: 'Threats';
    icon: 'shield';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    items: Schema.Attribute.Component<'shared.threat-item', true>;
    lead: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface BlocksWhatWeDo extends Struct.ComponentSchema {
  collectionName: 'components_blocks_what_we_dos';
  info: {
    description: 'Four areas of work from the 2026-2030 strategy.';
    displayName: 'What We Do';
    icon: 'grid';
  };
  attributes: {
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    items: Schema.Attribute.Component<'shared.area-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface ContentBlocksArticle extends Struct.ComponentSchema {
  collectionName: 'components_content_blocks_articles';
  info: {
    description: 'Links out to an external article.';
    displayName: 'Article';
    icon: 'link';
  };
  attributes: {
    external_link: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentBlocksDownload extends Struct.ComponentSchema {
  collectionName: 'components_content_blocks_downloads';
  info: {
    description: 'A downloadable file (PDF, doc, etc.).';
    displayName: 'Download';
    icon: 'download';
  };
  attributes: {
    file: Schema.Attribute.Media<'files' | 'images' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
  };
}

export interface ContentBlocksVideo extends Struct.ComponentSchema {
  collectionName: 'components_content_blocks_videos';
  info: {
    description: 'Embeds a video by URL.';
    displayName: 'Video';
    icon: 'play';
  };
  attributes: {
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedAreaItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_area_items';
  info: {
    description: 'A single "What we do" area of work card.';
    displayName: 'Area Item';
    icon: 'grid';
  };
  attributes: {
    description: Schema.Attribute.Text;
    photo: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedChallengeItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_challenge_items';
  info: {
    description: 'A single challenge card (title, caption, headline stat).';
    displayName: 'Challenge Item';
    icon: 'alert';
  };
  attributes: {
    caption: Schema.Attribute.Text;
    icon: Schema.Attribute.Enumeration<['waves', 'chart', 'screen', 'people']>;
    stat: Schema.Attribute.String;
    statLabel: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFutureStat extends Struct.ComponentSchema {
  collectionName: 'components_shared_future_stats';
  info: {
    description: 'A single stat overlay (value + label) for the Future image card.';
    displayName: 'Future Stat';
    icon: 'chartBubble';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedImpactMetric extends Struct.ComponentSchema {
  collectionName: 'components_shared_impact_metrics';
  info: {
    description: 'A single landing-page impact statistic.';
    displayName: 'Impact Metric';
    icon: 'chartCircle';
  };
  attributes: {
    badge: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    number: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    description: 'A navigation link (label + url).';
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedOutcomeItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_outcome_items';
  info: {
    description: 'A single qualitative outcome for the impact checklist.';
    displayName: 'Outcome Item';
    icon: 'check';
  };
  attributes: {
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedPartnerCategory extends Struct.ComponentSchema {
  collectionName: 'components_shared_partner_categories';
  info: {
    description: 'A single partner-category card (title + short text).';
    displayName: 'Partner Category';
    icon: 'grid';
  };
  attributes: {
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedPartnerLogo extends Struct.ComponentSchema {
  collectionName: 'components_shared_partner_logos';
  info: {
    description: 'A single partner name + logo for the partners marquee.';
    displayName: 'Partner Logo';
    icon: 'picture';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedProgrammeItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_programme_items';
  info: {
    description: 'A programme row for the landing "Our work" section.';
    displayName: 'Programme Item';
    icon: 'briefcase';
  };
  attributes: {
    description: Schema.Attribute.Text;
    partnerLine: Schema.Attribute.String;
    programmeStatus: Schema.Attribute.Enumeration<['running', 'completed']> &
      Schema.Attribute.DefaultTo<'running'>;
    statusYear: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedThreatItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_threat_items';
  info: {
    description: 'A single threat paired with the response (pillar) that answers it.';
    displayName: 'Threat Item';
    icon: 'shield';
  };
  attributes: {
    answerText: Schema.Attribute.Text;
    answerTitle: Schema.Attribute.String & Schema.Attribute.Required;
    ctaLabel: Schema.Attribute.String;
    ctaUrl: Schema.Attribute.String;
    threatLabel: Schema.Attribute.String & Schema.Attribute.Required;
    threatText: Schema.Attribute.Text;
  };
}

export interface SharedValueItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_value_items';
  info: {
    description: 'A single value/principle entry for the Future section.';
    displayName: 'Value Item';
    icon: 'star';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.challenges': BlocksChallenges;
      'blocks.close': BlocksClose;
      'blocks.future': BlocksFuture;
      'blocks.hero': BlocksHero;
      'blocks.impact': BlocksImpact;
      'blocks.partner-marquee': BlocksPartnerMarquee;
      'blocks.partners': BlocksPartners;
      'blocks.pillars': BlocksPillars;
      'blocks.programmes': BlocksProgrammes;
      'blocks.testimonials': BlocksTestimonials;
      'blocks.threats': BlocksThreats;
      'blocks.what-we-do': BlocksWhatWeDo;
      'content-blocks.article': ContentBlocksArticle;
      'content-blocks.download': ContentBlocksDownload;
      'content-blocks.video': ContentBlocksVideo;
      'shared.area-item': SharedAreaItem;
      'shared.challenge-item': SharedChallengeItem;
      'shared.future-stat': SharedFutureStat;
      'shared.impact-metric': SharedImpactMetric;
      'shared.link': SharedLink;
      'shared.outcome-item': SharedOutcomeItem;
      'shared.partner-category': SharedPartnerCategory;
      'shared.partner-logo': SharedPartnerLogo;
      'shared.programme-item': SharedProgrammeItem;
      'shared.threat-item': SharedThreatItem;
      'shared.value-item': SharedValueItem;
    }
  }
}
