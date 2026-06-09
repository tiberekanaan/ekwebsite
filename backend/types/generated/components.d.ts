import type { Schema, Struct } from '@strapi/strapi';

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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'content-blocks.article': ContentBlocksArticle;
      'content-blocks.download': ContentBlocksDownload;
      'content-blocks.video': ContentBlocksVideo;
    }
  }
}
