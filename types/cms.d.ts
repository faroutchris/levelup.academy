declare interface MediaAlternateFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string;
  size: number;
  width: number;
  height: number;
}

declare interface Media {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    small: MediaAlternateFormat;
    medium: MediaAlternateFormat;
    thumbnail: MediaAlternateFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string;
  provider: string;
  provider_metadata: string;
  created_at: string;
  updated_at: string;
}

declare interface Course {
  id: number;
  title: string;
  slug: string;
  release: string;
  heroImage: Media;
  lessons: any[]; // Todo: add lessons type
}
