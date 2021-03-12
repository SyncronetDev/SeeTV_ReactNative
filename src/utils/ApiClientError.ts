export default class ApiClientError {
  status: number;

  message: string;

  content: Object;

  constructor({ status, message, content }) {
    this.status = status;
    this.message = message;
    this.content = content;
  }
}
