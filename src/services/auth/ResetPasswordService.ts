export interface ResetPasswordService {
  resetPassword(email: string): { error: string }
}