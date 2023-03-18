import { ActivityFeed } from "./activityFeed.js";

let feed = new ActivityFeed();

feed.setCacheDuration("15m");

// YouTube
feed.addSource("youtubeUser", "YouTube", "UC_vr254x82ZrrSFO6XgnWvg");

// Blogs
feed.addSource("atom", "Blog", "https://edm00se.io/feed.atom"); // overrides atom type due to missing description content
feed.addSource("rss", "Misc Blog", "https://misc.edm00se.codes/feed.xml");

// Mastodon, Pixelfed
feed.addSource("rss", "Mastodon", "https://hachyderm.io/users/edm00se.rss");
feed.addSource("pixelfed", "Pixelfed", "https://pixelfed.social/users/edm00se.atom");

let content = await feed.toRssFeed({
	title: "Eric McCormick's Activity Feed",
	language: "en",
	url: "https://edm00se.codes/feed/",
	subtitle: "One centralized feed of @edm00se activity across the web.",
});

console.log( content );
