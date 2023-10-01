import { getEngine } from './engines';
import { getAccountRedirect, getShortcutRedirect } from './shortcuts';

export function search(searchParams: URLSearchParams): Response {
	const query = searchParams.get('q');
	const engine = getEngine(searchParams.get('e'));

	// Handle non-shortcut search
	const baseReturn = Response.redirect(engine.searchUrl.replace('%s', encodeURIComponent(query ?? "")));
	if (!query || query.length === 0) return baseReturn;

	switch (query[0]) {
		case '!':
			const shortcutRedirect = getShortcutRedirect(query.slice(1));
			if (shortcutRedirect) return Response.redirect(shortcutRedirect);
			else break;
		case '@':
			const accountRedirect = getAccountRedirect(query.slice(1));
			if (accountRedirect) return Response.redirect(accountRedirect);
			else break;
	}

	return baseReturn;
}
