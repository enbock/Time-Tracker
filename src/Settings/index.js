import Language from './Language';
import Settings from './Settings';
import ThemesManager from './ThemesManager';

export default Object.assign(
  Settings,
  {
    Language:      Language,
    ThemesManager: ThemesManager
  }
);
