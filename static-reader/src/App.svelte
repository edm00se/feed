<script>
  const feedUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
		  "https://edm00se.codes/feed/feed.rss"
		)}`;
		let promise = getFeedContent();

		async function getFeedContent() {
		  const res = await fetch(feedUrl);
		  const text = await res.json();

		  if (res.ok) {
		    return text;
		  } else {
		    throw new Error(text);
		  }
		}

		function handleClick() {
		  promise = getFeedContent();
		}
</script>

<style>
  main {
    font-family: sans-serif;
    text-align: center;
    max-width: 100vw;
    overflow-wrap: break-word;
  }
  :global(.item img) {
    max-width: 100%;
    height: auto;
  }
</style>

<main>
  <h1><a href="https://github.com/edm00se/feed">edm00se / feed</a></h1>
  <h2><a href="https://edm00se.codes/feed/feed.rss">feed.rss</a></h2>
	{#await promise}
    <p>...loading</p>
  {:then resp}
    {#each resp.items as item, i}
      <a href="{item.link}"><h3>{item.title}</h3></a>
      <div class="item">{@html item.content}</div>
      {#if i < (resp.items.length - 1)}
        <hr />
      {/if}
    {:else}
      <p style="color: yellow">no feed items found</p>
    {/each}
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</main>
