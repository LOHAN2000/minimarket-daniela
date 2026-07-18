import { NextRequest, NextResponse } from "next/server";

// 1. CAMBIO IMPORTANTE: La función DEBE llamarse 'middleware'
export function proxy(request: NextRequest) {
  // Obtenemos el token de las cookies
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Definimos qué rutas son exclusivas para usuarios NO logueados
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signUp');

  // Si no hay token y no está en la página de login/registro, lo redirigimos a login
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si hay token y trata de ir al login, lo regresamos al inicio (dashboard)
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Si todo está correcto, permitimos que la petición continúe
  return NextResponse.next();
}

// Configuración de rutas donde el middleware entrará en acción
export const config = {
  matcher: [
    // Excluimos archivos estáticos, imágenes y las rutas internas de Next o APIs
    '/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|favicon.ico).*)',
  ]
}