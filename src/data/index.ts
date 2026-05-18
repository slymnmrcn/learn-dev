import programming from './modules/programming.json';
import system from './modules/system.json';
import networking from './modules/networking.json';
import database from './modules/database.json';
import hardware from './modules/hardware.json';
import security from './modules/security.json';
import testing from './modules/testing.json';
import web from './modules/web.json';
import type { LearningModule, UserData } from '../types';

export const allModules: LearningModule[] = [
  programming,
  system,
  networking,
  database,
  hardware,
  security,
  testing,
  web,
];

export const userData: UserData = {
  name: 'Dev Explorer',
  level: 'Backend geliştirici adayı',
  stats: {
    lessonsCompleted: 12,
    quizAverage: 85,
  },
};
