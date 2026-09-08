<script lang="ts">
  import type { GalleryItem } from "$lib/data/gallery";
  import { asset } from "$app/paths";

  let { items }: { items: GalleryItem[] } = $props();

  let selectedItem: GalleryItem | null = $state(null);

  function openImage(item: GalleryItem) {
    selectedItem = item;
  }

  function closeImage() {
    selectedItem = null;
  }
</script>

<div class="gallery-grid">
  {#each items as item (item)}
    <button
      class="gallery-item"
      type="button"
      onclick={() => openImage(item)}
      aria-label={`View ${item.title}`}
    >
      <img src={asset(item.image)} alt={item.alt} loading="lazy" />

      <div class="overlay">
        <span>{item.title}</span>
      </div>
    </button>
  {/each}
</div>

{#if selectedItem}
  <div class="lightbox" role="presentation">
    <div class="lightbox-content" role="dialog" aria-modal="true" tabindex="-1">
      <button
        class="close-button"
        type="button"
        aria-label="Close image"
        onclick={closeImage}
      >
        ×
      </button>

      <img src={asset(selectedItem.image)} alt={selectedItem.alt} />

      <div class="lightbox-info">
        <h2>{selectedItem.title}</h2>

        {#if selectedItem.description}
          <p>{selectedItem.description}</p>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  .gallery-item {
    position: relative;
    display: block;
    width: 100%;
    padding: 0;
    border: none;
    background: #eee;
    cursor: pointer;
    overflow: hidden;
    aspect-ratio: 1 / 1;
  }

  .gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.35s ease;
  }

  .gallery-item:hover img {
    transform: scale(1.04);
  }

  .overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: flex-end;
    padding: 1.5rem;

    background: linear-gradient(transparent 45%, rgba(0, 0, 0, 0.7));

    opacity: 0;
    transition: opacity 0.25s ease;
  }

  .gallery-item:hover .overlay {
    opacity: 1;
  }

  .overlay span {
    color: white;
    font-size: 1rem;
    font-weight: 600;
  }

  .lightbox {
    position: fixed;
    z-index: 1000;
    inset: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 1.875rem;
    background: rgba(0, 0, 0, 0.9);
  }

  .lightbox-content {
    position: relative;
    width: min(62.5rem, 100%);
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .lightbox-content img {
    max-width: 100%;
    max-height: 75vh;
    object-fit: contain;
  }

  .close-button {
    position: absolute;
    top: -2.8125rem;
    right: 0;

    border: none;
    background: none;
    color: white;

    font-size: 2.5rem;
    line-height: 1;
    cursor: pointer;
  }

  .lightbox-info {
    width: 100%;
    padding-top: 1.25rem;
    color: white;
    text-align: center;
  }

  .lightbox-info h2 {
    margin: 0 0 0.5rem;
    font-size: 1.4rem;
  }

  .lightbox-info p {
    margin: 0;
    color: #ccc;
  }

  @media (max-width: 50rem) {
    .gallery-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
    }

    .lightbox {
      padding: 1.25rem;
    }
  }

  @media (max-width: 31.25rem) {
    .gallery-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
