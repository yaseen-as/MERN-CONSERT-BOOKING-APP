
class ApiResponse<T=any,E=null> {
    statusCode: number;
    data: T;
    massage: string;
    isSuccess: boolean;
    error?: E;
    constructor(
      statusCode: number,
      data: T,
      massage: string = "success",
      error?: E,
    ) {
      (this.statusCode = statusCode),
        (this.data = data),
        (this.massage = massage);
      this.isSuccess = statusCode < 400;
      this.error = error;
    }
  }
  
  export default ApiResponse;
  