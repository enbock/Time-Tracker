export default interface Loader {
  loadLanguage(languageCode: string): Promise<any>;
}