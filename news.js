import { ActivityFeed } from "./activityFeed.js";

let feed = new ActivityFeed();

feed.setCacheDuration("15m");

// local
feed.addSource("rss", "Neenah News Now", "https://neenahnewsnow.com/feed/");

// state
feed.addSource("rss", "WPR", "https://www.wpr.org/feed");

// national
feed.addSource("rss", "NPR", "https://feeds.npr.org/1002/rss.xml");
feed.addSource("atom", "Ars Technica", "https://feeds.arstechnica.com/arstechnica/index");

let content = await feed.toRssFeed({
	title: "Eric McCormick's News Feed",
	language: "en",
	url: "https://edm00se.codes/feed/",
	subtitle: "One centralized feed of news on behalf of @edm00se from across the web.",
});

console.log( content );
