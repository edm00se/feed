import { ActivityFeed } from "./activityFeed.js";

let feed = new ActivityFeed();

feed.setCacheDuration("4h");

// YouTube
feed.addSource("youtubeUser", "YouTube", "UC_vr254x82ZrrSFO6XgnWvg");

// Blog
feed.addSource("atom", "Blog", "https://edm00se.io/feed.atom");
feed.addSource("rss", "Misc Blog", "https://misc.edm00se.codes/feed.xml");

// Mastodon
feed.addSource("rss", "Mastodon", "https://honk.farm/users/eric.rss");
feed.addSource("atom", "Pixelfed", "https://pixelfed.social/users/edm00se.atom");

// Twitter
//feed.addSource("twitterUser", "Twitter", "edm00se", "bearer-token");

let content = await feed.toRssFeed({
	title: "Eric McCormick's Activity Feed",
	language: "en",
	url: "https://edm00se.codes/feed/",
	subtitle: "One centralized feed of @edm00se activity across the web.",
});

console.log( content );
