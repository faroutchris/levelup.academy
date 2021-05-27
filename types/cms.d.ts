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

declare interface MediaVideo {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: any;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string;
  provider: 'local' | 'cdn';
  provider_metadata: any;
  created_at: string;
  updated_at: string;
}

declare interface LessonTruncated {
  id: number;
  published_at: '2021-03-29T17:30:22.749Z';
  created_at: '2021-03-29T17:29:46.023Z';
  updated_at: '2021-04-01T03:27:50.683Z';
  title: 'Räntor och du';
}

declare type QuizComponent = {
  __component: 'lesson-components.question-scenario';
  id: number;
  question: string;
  answers: {
    id: number;
    value: string;
    is_correct: boolean;
  }[];
};

declare type VideoComponent = {
  __component: 'lesson-components.video-lesson';
  id: number;
  title: string;
  transcript: string;
  video: MediaVideo;
};

declare type ArticleComponent = {
  __component: 'lesson-components.article';
  id: number;
  title: string;
  content: string;
  users_permissions_user: {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    role: number;
    created_at: string;
    updated_at: string;
  };
  publish_date: string;
  quiz?: QuizComponent[];
  cover?: Media;
};

declare type ScenarioComponent = QuizComponent | VideoComponent | ArticleComponent;

declare interface User {
  id: number;
  username: string;
  email: string;
  provider: 'local';
  confirmed: boolean;
  blocked: boolean;
  role: number;
  created_at: string;
  updated_at: string;
}

declare interface Lesson {
  id: number;
  published_at: string;
  created_at: string;
  updated_at: string;
  course: Course;
  title: string;
  scenarios: ScenarioComponent[];
}

declare interface Course {
  id: number;
  title: string;
  slug: string;
  release: string;
  heroImage: Media;
  lessons: LessonTruncated[];
}

declare interface Topic {
  id: number;
  published_at: string;
  created_at: string;
  updated_at: string;
  title: string;
  post: string;
  user: User;
}

declare interface Comment {
  id: number;
  published_at: string;
  created_at: string;
  updated_at: string;
  body: string;
  user: User;
}
