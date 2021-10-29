export interface UserAuthInterface {
  signUp(email: string, password: string): { error: Error };
  signInWithPassword(email: string, password: string): { error: Error };
  signInWithGitHub(): { error: Error };
  
}