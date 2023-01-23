import { AtomActivity } from "./AtomActivity.js";

class PixelfedActivity extends AtomActivity {

	cleanEntry(entry, data) {
		return {
			type: "atom",
			title: entry.title,
			url: entry.id,
			author: {
				name: data.feed.author.name,
			},
			published: entry.published || entry.updated,
			updated: entry.updated,
      content: entry.content,
		}
	}
}

export {PixelfedActivity};