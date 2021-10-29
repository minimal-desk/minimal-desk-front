export interface UpdateAccountService {
  updateEmail(email: string): { error: string };
  updatePassword(password: string): { error: string };
}