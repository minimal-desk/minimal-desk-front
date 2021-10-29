export interface SignUpService {
  signUpWithEmail(email: string, password: string): { error: string };
}