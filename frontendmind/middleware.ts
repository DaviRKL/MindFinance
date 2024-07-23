// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
    

  // Se não estiver logado e tentando acessar uma página protegida, redirecione para o login.
  if (!token && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}


export const config = {
  matcher: [
    '/dashboard/:path*',  
    '/profile/:path*',    
    '/finances/:path*',   
  ],
};
