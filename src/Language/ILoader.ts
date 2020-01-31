export default interface ILoader {
  loadLanguage(languageCode: string): Promise<any>;
}