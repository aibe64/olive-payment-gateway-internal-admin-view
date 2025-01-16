export class Validation {
  static isUrlValid = (url: string) => {
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(:\d{1,5})?(\/[^\s]*)?$/
    return urlPattern.test(url);
  };
}
