class ApiSuccessResponse {
  success: true;
  message: string;
  data: unknown;
  constructor(message: string, data?: unknown) {
    this.success = true;
    this.message = message;
    if (data) {
      this.data = data;
    }
  }
}

export default ApiSuccessResponse;
