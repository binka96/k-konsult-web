import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service'; // Adjust the import path according to your project structure

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken(); // Get the token from the TokenService
    if (token) {
      // Clone the request and set the new header in one step
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` // Use 'Bearer' or any prefix your API requires
        }
      });
    }
    return next.handle(request); // Forward the cloned request
  }
}