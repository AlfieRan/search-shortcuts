import { ExecutionContext } from '@cloudflare/workers-types';
import { search } from './search';

export interface Env {}

const ProjectInfo = {
	Project: 'Search Shortcuts',
	Author: 'https://alfieranstead.com',
	description: 'A simple search engine redirector supporting shortcuts.',
	source: 'https://github.com/alfieran/search-shortcuts',
	host: 'Cloudflare Workers',
	license: 'MIT',
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		const path = url.pathname;

		switch (path) {
			case '/info':
				return new Response(JSON.stringify(ProjectInfo));

			case '/author':
			case '/alfie':
				return Response.redirect(ProjectInfo.Author);

			case '/code':
			case '/source':
				return Response.redirect(ProjectInfo.source);

			case '/search':
			case '/q':
			default:
				return search(url.searchParams);
		}
	}
};
