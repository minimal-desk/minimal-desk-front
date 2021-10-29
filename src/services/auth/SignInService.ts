export interface SignInService {
  signInWithEmail(email: string, password: string): { error: string }
  signInWithGitHub() : { error: string }
}