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
    title: Schema.Attribute.String;
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
    allPartnersLink: Schema.Attribute.String;
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

export interface BlocksTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_blocks_testimonials';
  info: {
    description: 'Testimonial carousel sourcing selected Testimonial entries.';
    displayName: 'Testimonials';
    icon: 'message';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
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

export interface SharedChallengeItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_challenge_items';
  info: {
    description: 'A single challenge card (title, caption, headline stat).';
    displayName: 'Challenge Item';
    icon: 'alert';
  };
  attributes: {
    caption: Schema.Attribute.Text;
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
    description: Schema.Attribute.Text;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    number: Schema.Attribute.String & Schema.Attribute.Required;
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
      'blocks.future': BlocksFuture;
      'blocks.hero': BlocksHero;
      'blocks.impact': BlocksImpact;
      'blocks.partners': BlocksPartners;
      'blocks.pillars': BlocksPillars;
      'blocks.testimonials': BlocksTestimonials;
      'blocks.threats': BlocksThreats;
      'content-blocks.article': ContentBlocksArticle;
      'content-blocks.download': ContentBlocksDownload;
      'content-blocks.video': ContentBlocksVideo;
      'shared.challenge-item': SharedChallengeItem;
      'shared.future-stat': SharedFutureStat;
      'shared.impact-metric': SharedImpactMetric;
      'shared.partner-logo': SharedPartnerLogo;
      'shared.threat-item': SharedThreatItem;
      'shared.value-item': SharedValueItem;
    }
  }
}
