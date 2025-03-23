export type APIError = {
  response: {
    data: {
      message: string[]
      error: string
      statusCode: number
    }
  }
  status: number
}

export class BadRequestError extends Error {
  messages: string[]
  status: number = 400
  constructor(messages: string[]) {
    super('Bad request')
    this.messages = messages
  }
}

export class UnauthorizedError extends Error {
  status: number = 401
  constructor() {
    super('Unauthorized')
  }
}

export class ForbiddenError extends Error {
  status: number = 403
  constructor() {
    super('Forbidden')
  }
}

export class NotFoundError extends Error {
  status: number = 404
  constructor(message: string) {
    super(message)
  }
}

export class InternalServerError extends Error {
  status: number = 500
  constructor(message: string) {
    super(message)
  }
}
