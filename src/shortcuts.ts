import { z } from 'zod';

type ShortcutData = {
	baseUrl: string;
	searchUrl: string;
	accountUrl?: string;
}

// SHORTCUTS ==========================================================================================================

// Start by adding the aliases for your shortcut here, they're split into multiple arrays for organization so please
// keep them that way :)
const socialShortcuts = ['insta', 'instagram', 'twt', 'twitter', 'yt', 'youtube', 'twitch', 'linkedin']  as const;
const devShortcuts = ['github', 'gh', 'lin', 'linear', 'vercel', 'fly'] as const;
const streamingShortcuts = ['netflix', 'prime'] as const;
const shoppingShortcuts = ['amazon', 'ebay'] as const;
const miscShortcuts = ['gdrive'] as const;


// If you create a new organization array, add it to this array
const availableShortcuts = [...socialShortcuts, ...devShortcuts, ...streamingShortcuts, ...shoppingShortcuts, ...miscShortcuts]  as const;
type AvailableShortcuts = typeof availableShortcuts[number];

// If you want to add multiple aliases for a shortcut, define the shortcut data here
const GithubData = { baseUrl: 'https://www.github.com/', searchUrl: 'https://github.com/search?q=%s', accountUrl: 'https://github.com/%s' }
const InstagramData = { baseUrl: 'https://instagram.com', searchUrl: 'https://www.instagram.com/explore/tags/%s', accountUrl: 'https://www.instagram.com/%s/' };
const TwitterData = { baseUrl: 'https://twitter.com', searchUrl: 'https://twitter.com/search?q=%s', accountUrl: 'https://twitter.com/%s' };
const YoutubeData = { baseUrl: 'https://youtube.com', searchUrl: 'https://www.youtube.com/results?search_query=%s',  accountUrl: "https://youtube.com/@%s" };

const LinearData = { baseUrl: 'https://linear.app', searchUrl: 'https://linear.app/%s', accountUrl: 'https://linear.app/%s' };

// Then map your aliases to the shortcut data in this object
export const shortcuts: Record<AvailableShortcuts, ShortcutData> = {
	// Social
	'insta': InstagramData,
	'instagram': InstagramData,
	'linkedin': { baseUrl: 'https://www.linkedin.com', searchUrl: 'https://www.linkedin.com/search/results/all/?keywords=%s', accountUrl: "https://www.linkedin.com/search/results/people/?keywords=%s" },
	'twt': TwitterData,
	'twitter': TwitterData,
	'twitch': { baseUrl: 'https://www.twitch.tv', searchUrl: 'https://www.twitch.tv/search?term=%s', accountUrl: "https://www.twitch.tv/%s" },
	'yt': YoutubeData,
	'youtube': YoutubeData,

	// Dev
	'github': GithubData,
	'gh': GithubData,
	'linear': LinearData,
	'lin': LinearData,
	'vercel': { baseUrl: 'https://vercel.com/', searchUrl: 'https://vercel.com/', accountUrl: 'https://vercel.com/%s' },
	'fly': { baseUrl: 'https://fly.io/dashboard', searchUrl: 'https://fly.io/dashboard', accountUrl: 'https://fly.io/dashboard/%s' },

	// Streaming
	'netflix': { baseUrl: 'https://www.netflix.com', searchUrl: 'https://www.netflix.com/search?q=%s' },
	'prime': { baseUrl: 'https://www.primevideo.com', searchUrl: 'https://www.primevideo.com/search/phrase=%s' },

	// Shopping
	'amazon': { baseUrl: 'https://www.amazon.co.uk', searchUrl: 'https://www.amazon.co.uk/s?k=%s' },
	'ebay': { baseUrl: 'https://www.ebay.co.uk', searchUrl: 'https://www.ebay.co.uk/sch/i.html?_nkw=%s' },

	// Misc
	'gdrive': { baseUrl: 'https://drive.google.com', searchUrl: 'https://drive.google.com/drive/search?q=%s' },
}

// SHORTCUT PARSING ===================================================================================================

export const ShortcutsZod: z.TypeOf<AvailableShortcuts> = z.union(availableShortcuts.map((s) => z.literal(s)));

export function getShortcut(input: string): ShortcutData | null {
	const parsed = ShortcutsZod.safeParse(input);
	if (!parsed.success) return null;
	else return shortcuts[parsed.data];
}

function getShortcutAndQuery(query: string) {
	const splitQuery = query.split(' ');
	if (splitQuery.length === 0) return null;

	const shortcut = getShortcut(splitQuery[0]);
	if (!shortcut) return null;

	return { shortcut, splitQuery };
}

function accountEncode(query: string) {
	const uriEncoded = encodeURIComponent(query);
	return uriEncoded.replace('%2F', '/');
}

export function getShortcutRedirect(query: string): string | null {
	const shortcutAndQuery = getShortcutAndQuery(query);
	if (shortcutAndQuery === null) return null;

	if (shortcutAndQuery.splitQuery.length === 1) return shortcutAndQuery.shortcut.baseUrl;
	else return shortcutAndQuery.shortcut.searchUrl.replace('%s', encodeURIComponent(shortcutAndQuery.splitQuery.slice(1).join(' ')));
}

export function getAccountRedirect(query: string): string | null {
	const shortcutAndQuery = getShortcutAndQuery(query);
	if (shortcutAndQuery === null) return null;
	else if (shortcutAndQuery.shortcut.accountUrl === undefined) return null;

	if (shortcutAndQuery.splitQuery.length === 1) return shortcutAndQuery.shortcut.baseUrl;
	else return shortcutAndQuery.shortcut.accountUrl.replace('%s', accountEncode(shortcutAndQuery.splitQuery.slice(1).join(' ')));
}
