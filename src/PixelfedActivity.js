import { AtomActivity } from './AtomActivity.js';

class PixelfedActivity extends AtomActivity {
  cleanEntry(entry, data) {
		return {
			type: "atom",
			title: entry.title,
			url: this.getUrlFromEntry(entry),
			author: {
				name: entry?.author?.name || data.feed?.author?.name,
			},
			published: entry.published || entry.updated,
			updated: entry.updated,
			content: entry.content['#text']
		}
	}
}

export {PixelfedActivity};