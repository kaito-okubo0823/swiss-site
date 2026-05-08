import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // ロケールを必要とするすべてのパスにマッチ（API・静的ファイル・Next内部は除外）
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
