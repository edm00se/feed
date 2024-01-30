<script>
  const parm = new URLSearchParams(window.location.search);
  const feedUrl = parm.get('url') ?? 'https://edm00se.codes/feed/feed.rss';
  let promise = fetch(feedUrl)
    .then((response) => response.text())
    .then((data) => transformFeedData(data))
    .catch(err => console.error(err));

  function transformFeedData(data) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, 'text/xml');
    const items = [...xml.querySelectorAll('item')].map((el) => {
      return {
        link: el.querySelector('link').innerHTML,
        title: el.querySelector('title').innerHTML,
        content: el
          .querySelector('description')
          .innerHTML
            .replaceAll('<!', '')
            .replaceAll('-->', '')
            .replaceAll('[CDATA[', '')
            .replaceAll(']]>', '')
      };
    });
    return {
      ok: true,
      items: items
    }
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
    max-height: 40em;
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
