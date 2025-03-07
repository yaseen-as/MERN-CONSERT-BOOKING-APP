export interface APiSuccessResponse<T>{
    statusCode: number;
    data: T;
    massage: string;
    isSuccess: boolean;
}

export interface ApiErrorResponse{
    statusCode: number;
    message: string ;
    errors: string;
    stack: string ;
}
