import createError from "@fastify/error"

type CustomErrorsV = {
  code: string
  statusCode: number
}

export enum CustomErrorsKeys {
  // server
  ErrSomethingWrong,

  // business logic
  ErrPasswordWrong,
  ErrRequestParameterError,
  ErrRequestFailed,
  ErrUserAlreadyExists,
  ErrUserNotExists,
  ErrPermissionDenied,

  // jwt
  ErrTokenDoesNotExist,
  ErrTokenVerifyFailed,
  ErrRefreshTokenVerifyFailed,
  ErrTokenExpired,
}

type CustomErrorsT = Map<CustomErrorsKeys, CustomErrorsV>

const CustomErrors: CustomErrorsT = new Map<CustomErrorsKeys, CustomErrorsV>([
  // server
  [
    CustomErrorsKeys.ErrSomethingWrong,
    {
      code: "ERR_SOMETHING_WRONG",
      statusCode: 500,
    },
  ],

  // business logic
  [
    CustomErrorsKeys.ErrPasswordWrong,
    {
      code: "ERR_PASSWORD_WRONG",
      statusCode: 404,
    },
  ],
  [
    CustomErrorsKeys.ErrRequestParameterError,
    {
      code: "ERR_REQUEST_PARAMETER_ERROR",
      statusCode: 404,
    },
  ],
  [
    CustomErrorsKeys.ErrRequestFailed,
    {
      code: "ERR_REQUEST_FAILED",
      statusCode: 404,
    },
  ],
  [
    CustomErrorsKeys.ErrUserAlreadyExists,
    {
      code: "ERR_USER_ALREADY_EXISTS",
      statusCode: 404,
    },
  ],
  [
    CustomErrorsKeys.ErrUserNotExists,
    {
      code: "ERR_USER_NOT_EXISTS",
      statusCode: 404,
    },
  ],
  [
    CustomErrorsKeys.ErrPermissionDenied,
    {
      code: "ERR_PERMISSION_DENIED",
      statusCode: 401,
    },
  ],

  // jwt
  [
    CustomErrorsKeys.ErrTokenDoesNotExist,
    {
      code: "ERR_TOKEN_IS_NOT_EXIST",
      statusCode: 401,
    },
  ],
  [
    CustomErrorsKeys.ErrTokenVerifyFailed,
    {
      code: "ERR_TOKEN_VERIFY_FAILED",
      statusCode: 401,
    },
  ],
  [
    CustomErrorsKeys.ErrRefreshTokenVerifyFailed,
    {
      code: "ERR_REFRESHTOKEN_VERIFY_FAILED",
      statusCode: 401,
    },
  ],
  [
    CustomErrorsKeys.ErrTokenExpired,
    {
      code: "ERR_TOKEN_EXPIRED",
      statusCode: 412,
    },
  ],
])

export default class CustomError {
  private ErrorCode: string
  private ErrorMessage: string
  private ErrorStatusCode: number

  constructor(ErrorKey: CustomErrorsKeys, ErrorMessage: string) {
    const error: CustomErrorsV = CustomErrors.get(ErrorKey)
    this.ErrorCode = error.code
    this.ErrorStatusCode = error.statusCode
    this.ErrorMessage = ErrorMessage
  }

  NewError() {
    const customError = createError(this.ErrorCode, this.ErrorMessage, this.ErrorStatusCode)
    return customError()
  }
}
