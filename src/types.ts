import type { NavigatorScreenParams } from '@react-navigation/native';

export type StudyNote = {
  takeaway: string;
  exercise: string;
  checkpoint: string;
};

export type Lesson = {
  id: string;
  title: string;
  duration?: string;
  content: string;
  codeExample?: string;
  codeLanguage?: string;
  keyPoints?: string[];
  study: StudyNote;
};

export type TopicStudy = {
  difficulty: string;
  estimatedTime: string;
  prerequisites: string[];
  learningGoals: string[];
  summary: string;
  whyItMatters: string;
};

export type Topic = {
  id: string;
  title: string;
  description: string;
  progress: number;
  lessons: Lesson[];
  quiz?: boolean;
  study: TopicStudy;
};

export type ModuleGuide = {
  displayName: string;
  summary: string;
  level: string;
  estimatedTime: string;
  prerequisites: string[];
  learningGoals: string[];
};

export type FinalProject = {
  title: string;
  description: string;
  deliverables?: string[];
  acceptanceCriteria?: string[];
};

export type LearningModule = {
  category: string;
  icon?: string;
  description?: string;
  level?: string;
  estimatedTotalDuration?: string;
  topics: Topic[];
  finalProject?: FinalProject;
  guide: ModuleGuide;
};

export type UserData = {
  name: string;
  level: string;
  stats: {
    lessonsCompleted: number;
    quizAverage: number;
  };
};

export type AlgorithmItem = {
  name: string;
  complexity: string;
  space: string;
  description: string;
  code: string;
  language: string;
};

export type AlgorithmGroup = {
  id: string;
  title: string;
  items: AlgorithmItem[];
};

export type AlgorithmsData = {
  algorithms: AlgorithmGroup[];
};

export type TimelineItem = {
  id: string;
  year: string;
  title: string;
  who: string;
  tag: string;
  color: string;
  summary: string;
  impact: string;
};

export type ReferenceColor =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'green'
  | 'violet'
  | 'orange'
  | 'success';

export type ReferenceItem = {
  cmd: string;
  desc: string;
};

export type ReferenceSection = {
  id: string;
  title: string;
  icon: string;
  color: ReferenceColor;
  summary: string;
  items: ReferenceItem[];
};

export type LearnStackParamList = {
  Dashboard: undefined;
  ModuleTopics: { module: LearningModule };
  TopicDetail: { topicTitle?: string; topic: Topic };
  LessonDetail: { topicTitle: string; lesson: Lesson };
};

export type BottomTabParamList = {
  Öğren: NavigatorScreenParams<LearnStackParamList>;
  Algoritmalar: undefined;
  Tarih: undefined;
  Kılavuz: undefined;
};
