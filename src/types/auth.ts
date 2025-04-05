export enum UserGender {
  MALE = 'm',
  FEMALE = 'f',
}

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  accessToken: string
}

export type SignUpRequest = {
  firstName: string
  lastName: string
  email: string
  password: string
  documentId: string
  phoneNumber?: string | null
  birthDate: string
  gender?: UserGender | null
}

export type SignUpResponse = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  firstName: string
  lastName: string
  email: string
  documentId: string
  phoneNumber: string
  lastOrderDate: Date
  role: string
}
