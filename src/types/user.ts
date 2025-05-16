import type { UserGender } from './auth'
import type { BaseModel, PaginationRequest } from './utils'

export enum UserRole {
  ADMIN = 'admin',
  BRANCH_ADMIN = 'branch_admin',
  CUSTOMER = 'customer',
  DELIVERY = 'delivery',
}

export type ProfileResponse = {
  firstName: string
  lastName: string
  email: string
  documentId: string
  phoneNumber: string
  birthDate: Date
  gender: string
  profilePicture: string
  role: string
}

export type Profile = {
  profilePicture: string
  birthDate: Date
  gender: string
}

export type UserList = BaseModel & {
  firstName: string
  lastName: string
  email: string
  documentId: string
  phoneNumber: string
  lastOrderDate: Date
  role: string
  isValidated: boolean
  profile: Profile
  isGenericPassword: boolean
}

export type UpdateUser = {
  firstName?: string
  lastName?: string
  phoneNumber?: string
  profilePicture?: string
  birthDate?: string
  gender?: UserGender
  role?: UserRole
}

export type CreateUser = {
  firstName: string
  lastName: string
  email: string
  documentId: string
  phoneNumber: string
  birthDate: string
  gender: UserGender
  role: UserRole
  branchId?: string
}

export type PaginationUserRequest = PaginationRequest & {
  role?: UserRole
}

export type BulkUserData = {
  isValidated: boolean
  role: UserRole
}

export type BulkUpdateUser = {
  users: string[]
  data: BulkUserData
}
