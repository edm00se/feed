<script>
  // import htmlToAbsoluteUrls from "@11ty/eleventy-plugin-rss/src/htmlToAbsoluteUrls";

  const ytRegEx = /(?:https?:)?(?:\/\/)(?:www\.)?(?:(?:youtube(?:-nocookie)?\.com\/(?:(?:(?:watch|embed)(?:\?v=|\/)((?!videoseries)[\w-]{11}))|(?:playlist|embed\/videoseries)\?list=([\w-]{34}))|youtu.be\/([\w-]{11})))[?=&+%\w.-]*/i;

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

  // loosely inspired by https://github.com/noxify/gridsome-plugin-remark-embed/blob/master/src/providers/Youtube.js
  function handleYouTubeEmbeds(itemHtml) {
    let updatedItemHtml = itemHtml;
    console.log('itemHtml match YouTube? ', ytRegEx.test(itemHtml));
    
    if(ytRegEx.test(itemHtml)){
      console.log('matched value: ', itemHtml.match(ytRegEx));
      const ytVidId = getEmbedId(itemHtml.match(ytRegEx)[0]);
      console.log('found video id: ', ytVidId);
      const ytEmbed = `<div class="youtube-embed" style="width: 75vw; margin-left: auto; margin-right: auto;">
      <div style="width: '100%';">
          <div style="position: relative; padding-bottom: 56.25%; padding-top: 25px; height: 0;">
              <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                  src="https://www.youtube.com/embed/${ytVidId}"
                  allow="autoplay; encrypted-media" allowfullscreen>
              </iframe>
          </div>
      </div>
  </div>`;
      // append to item, replacing has too many caveats
      updatedItemHtml = updatedItemHtml += ytEmbed;
    }
    
    return updatedItemHtml;
  }

  function getEmbedId(url) {
    const res = url.match(ytRegEx).filter(x => undefined !== x );
    return (res) ? res[1] : false;
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
      {@const updatedContentForEmbeds = handleYouTubeEmbeds(item.content)}
      <div class="item">{@html updatedContentForEmbeds}</div>
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
