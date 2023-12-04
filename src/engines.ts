import { z } from 'zod';

type EngineData = {
	baseUrl: string;
	searchUrl: string;
};

// To add a new engine, add the engine name to the array below, then add the engine to the engines object.

const availableEngines = ['google', 'duckduckgo', 'bing'] as const;
type AvailableEngines = (typeof availableEngines)[number];

export const engines: { [engine in AvailableEngines]: EngineData } = {
	bing: { searchUrl: 'https://www.bing.com/search?q=%s', baseUrl: 'https://bing.com' },
	duckduckgo: { searchUrl: 'https://duckduckgo.com/?q=%s', baseUrl: 'https://duckduckgo.com' },
	google: { searchUrl: 'https://www.google.com/search?q=%s', baseUrl: 'https://google.com' },
};

// Please keep any new engines in alphabetical order and in between this comment and the one above.

export const EnginesZod: z.TypeOf<AvailableEngines> = z.union(availableEngines.map((e) => z.literal(e)));

export function getEngine(input: string): EngineData {
	const parsed = EnginesZod.safeParse(input);
	if (!parsed.success) return engines.google;
	else return engines[parsed.data];
}
