import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {
  private tokenKey = 'your_token_key'; // Adjust the key name you want to use

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}