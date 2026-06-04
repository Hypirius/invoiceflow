class ApiSuccessResponse {
  success: true;
  data: unknown;
  constructor(data: unknown) {
    this.success = true;
    this.data = data;
  }
}

export default ApiSuccessResponse;
