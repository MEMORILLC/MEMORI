<script lang="ts">
  import type { GalleryItem } from "$lib/data/gallery";
  import Image from "$lib/components/Image.svelte";

  let { items }: { items: GalleryItem[] } = $props();

  let selectedItem: GalleryItem | null = $state(null);
  let currentIndex = $state(-1);

  let isZoomed = $state(false);
  let zoomX = $state(50);
  let zoomY = $state(50);

  let touchStartX = $state(0);
  let touchStartY = $state(0);
  let currentTranslateX = $state(0);
  let isDragging = $state(false);
  let isAnimating = $state(false);
  let targetSlideOffset = $state(0);

  const GAP_REM = 2;

  let prevIndex = $derived(currentIndex !== -1 ? (currentIndex - 1 + items.length) % items.length : -1);
  let nextIndex = $derived(currentIndex !== -1 ? (currentIndex + 1) % items.length : -1);

  function resetInteractionState() {
    isDragging = false;
    isAnimating = false;
    currentTranslateX = 0;
    targetSlideOffset = 0;
  }

  function openImage(item: GalleryItem) {
    if (!items.length) return;

    selectedItem = item;
    currentIndex = items.findIndex((i) => i.image === item.image);
    if (currentIndex === -1) return;

    resetInteractionState();
    isZoomed = false;
  }

  function closeImage() {
    selectedItem = null;
    currentIndex = -1;
    isZoomed = false;
    resetInteractionState();
  }

  function navigate(direction: "next" | "prev") {
    if (currentIndex === -1 || isAnimating || items.length <= 1) return;

    isZoomed = false;
    isAnimating = true;
    isDragging = false;
    targetSlideOffset = direction === "next" ? 1 : -1;
    currentTranslateX = 0;

    setTimeout(() => {
      if (direction === "next") {
        currentIndex = nextIndex;
      } else {
        currentIndex = prevIndex;
      }

      if (currentIndex >= 0 && currentIndex < items.length) {
        selectedItem = items[currentIndex];
      }

      targetSlideOffset = 0;
      isAnimating = false;
    }, 400);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (currentIndex === -1 || isAnimating) return;

    if (event.key === "ArrowRight") navigate("next");
    else if (event.key === "ArrowLeft") navigate("prev");
    else if (event.key === "Escape") closeImage();
  }

  function isControlEvent(event: MouseEvent | TouchEvent) {
    return event.target instanceof Element && event.target.closest("button") !== null;
  }

  function handleMouseMove(event: MouseEvent) {
    if (!isZoomed) return;

    const container = event.currentTarget as HTMLDivElement;
    const rect = container.getBoundingClientRect();

    zoomX = ((event.clientX - rect.left) / rect.width) * 100;
    zoomY = ((event.clientY - rect.top) / rect.height) * 100;
  }

  function handleDragStart(clientX: number, clientY: number) {
    if (isAnimating || currentIndex === -1) return;

    isDragging = true;
    touchStartX = clientX;
    touchStartY = clientY;
  }

  function handleDragMove(clientX: number, clientY: number, event: TouchEvent | MouseEvent) {
    if (!isDragging || currentIndex === -1) return;

    const deltaX = clientX - touchStartX;
    const deltaY = clientY - touchStartY;

    if (isZoomed) {
      if (event.cancelable) event.preventDefault();

      zoomX = Math.max(0, Math.min(100, zoomX - (deltaX / window.innerWidth) * 45));
      zoomY = Math.max(0, Math.min(100, zoomY - (deltaY / window.innerHeight) * 45));
      touchStartX = clientX;
      touchStartY = clientY;
    } else {
      currentTranslateX = Math.max(-200, Math.min(200, deltaX));
    }
  }

  function handleDragEnd() {
    isDragging = false;
    if (isZoomed) return;

    const swipeThreshold = Math.min(window.innerWidth, window.innerHeight) * 0.18;

    if (currentTranslateX < -swipeThreshold) {
      navigate("next");
    } else if (currentTranslateX > swipeThreshold) {
      navigate("prev");
    } else {
      currentTranslateX = 0;
    }
  }

  function handleImageClick(event: MouseEvent) {
    event.stopPropagation();
    if (isAnimating) return;

    if (isZoomed) {
      isZoomed = false;
      currentTranslateX = 0;
      return;
    }

    const container = event.currentTarget as HTMLDivElement;
    const rect = container.getBoundingClientRect();

    zoomX = ((event.clientX - rect.left) / rect.width) * 100;
    zoomY = ((event.clientY - rect.top) / rect.height) * 100;
    isZoomed = true;
  }
</script>

<svelte:window onkeydown={handleKeyDown} />

<div class="gallery-grid">
  {#each items as item (item)}
    <div class="gallery-item">
      <Image
        src={item.image}
        alt={item.alt}
        back={item.back}
        flipLabel={item.title}
        class="gallery-image"
      />
      <button
        class="gallery-open"
        type="button"
        onclick={() => openImage(item)}
        aria-label={`View ${item.title}`}
      ></button>
      <div class="overlay" aria-hidden="true">
        <span>{item.title}</span>
      </div>
    </div>
  {/each}
</div>

{#if selectedItem && currentIndex !== -1}
  <div
    class="lightbox"
    role="presentation"
    onclick={(event) => {
      if (event.target === event.currentTarget) closeImage();
    }}
    ontouchstart={(e) => {
      if (!isControlEvent(e)) handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
    }}
    ontouchmove={(r) => handleDragMove(r.touches[0].clientX, r.touches[0].clientY, r)}
    ontouchend={handleDragEnd}
    onmousedown={(e) => {
      if (!isZoomed && !isControlEvent(e)) handleDragStart(e.clientX, e.clientY);
    }}
    onmousemove={(e) => {
      if (!isZoomed) handleDragMove(e.clientX, e.clientY, e);
    }}
    onmouseup={() => {
      if (!isZoomed) handleDragEnd();
    }}
    onmouseleave={() => {
      if (!isZoomed) handleDragEnd();
    }}
  >
    <div class="lightbox-content" role="dialog" aria-modal="true" tabindex="-1">
      <button class="close-button" type="button" aria-label="Close image" onclick={closeImage}>×</button>

      <button class="nav-button prev-button" type="button" aria-label="Previous image" onclick={(e) => { e.stopPropagation(); navigate('prev'); }}>‹</button>

      <div class="slider-window">
        <div
          class="slider-track"
          class:dragging={isDragging}
          class:animating={isAnimating}
          style="transform: translateX(calc((-100% - {targetSlideOffset * 100}%) - {GAP_REM + (targetSlideOffset * GAP_REM)}rem + {currentTranslateX}px));"
        >
          <div class="slide-wrapper">
            {#key items[prevIndex].image}
              <div class="zoom-container">
                <Image
                  src={items[prevIndex].image}
                  alt={items[prevIndex].alt}
                  back={items[prevIndex].back}
                  flipLabel={items[prevIndex].title}
                  loading="lazy"
                />
              </div>
            {/key}
          </div>

          <div class="slide-wrapper">
            {#key items[currentIndex].image}
              <div
                class="zoom-container"
                class:zoomed={isZoomed}
                onclick={handleImageClick}
                onmousemove={handleMouseMove}
                style="--zoom-x: {zoomX}%; --zoom-y: {zoomY}%;"
                role="presentation"
              >
                <Image
                  src={items[currentIndex].image}
                  alt={items[currentIndex].alt}
                  back={items[currentIndex].back}
                  flipLabel={items[currentIndex].title}
                  loading="eager"
                />
              </div>
            {/key}
          </div>

          <div class="slide-wrapper">
            {#key items[nextIndex].image}
              <div class="zoom-container">
                <Image
                  src={items[nextIndex].image}
                  alt={items[nextIndex].alt}
                  back={items[nextIndex].back}
                  flipLabel={items[nextIndex].title}
                  loading="lazy"
                />
              </div>
            {/key}
          </div>
        </div>
      </div>

      <button class="nav-button next-button" type="button" aria-label="Next image" onclick={(e) => { e.stopPropagation(); navigate('next'); }}>›</button>

      <div class="lightbox-info-window">
        <div
          class="lightbox-info-track"
          class:animating={isAnimating}
          class:dragging={isDragging}
          style="transform: translateX(calc((-100% - {targetSlideOffset * 100}%) - {GAP_REM + (targetSlideOffset * GAP_REM)}rem + {currentTranslateX}px));"
        >
          {#each [items[prevIndex], items[currentIndex], items[nextIndex]] as item, index (index)}
            <div class="lightbox-info">
              <h2>{item.title}</h2>
              {#if item.description}<p>{item.description}</p>{/if}
            </div>
          {/each}
        </div>
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
    background: #eee;
    overflow: visible;
    aspect-ratio: 1 / 1;
  }

  .gallery-item :global(.gallery-image) {
    position: relative;
    z-index: 2;
    display: block;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .gallery-item :global(.flip-button) {
    pointer-events: auto;
  }

  .gallery-item :global(.flip-card),
  .gallery-item :global(.face) {
    width: 100%;
    height: 100%;
  }

  .gallery-item :global(.face) {
    position: absolute;
    inset: 0;
  }

  .gallery-item :global(.face-front) {
    position: relative;
  }

  .gallery-item :global(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .gallery-open {
    position: absolute;
    z-index: 1;
    inset: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
  }

  .overlay {
    position: absolute;
    z-index: 3;
    inset: 0;
    display: flex;
    align-items: flex-end;
    padding: 1.5rem;
    background: linear-gradient(transparent 45%, rgba(0, 0, 0, 0.7));
    color: white;
    font: inherit;
    opacity: 0;
    transition: opacity 0.25s ease;
    pointer-events: none;
  }

  .gallery-item:hover .overlay {
    opacity: 1;
  }

  .gallery-open:focus-visible + .overlay {
    opacity: 1;
    outline: 3px solid white;
    outline-offset: -0.375rem;
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
    touch-action: none;
  }

  .lightbox-content {
    position: relative;
    width: min(62.5rem, 100%);
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .close-button {
    position: fixed;
    top: max(0.75rem, env(safe-area-inset-top));
    right: max(0.75rem, env(safe-area-inset-right));
    border: none;
    background: none;
    color: white;
    font-size: 2.5rem;
    line-height: 1;
    cursor: pointer;
    z-index: 1020;
  }

  .nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    font-size: 3rem;
    width: 3.5rem;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
    z-index: 1010;
    user-select: none;
    padding-bottom: 0.5rem;
  }

  .nav-button:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  .prev-button {
    left: -4.5rem;
  }

  .next-button {
    right: -4.5rem;
  }

  .slider-window {
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
  }

  .slider-track {
    display: flex;
    width: 100%;
    gap: 2rem;
    will-change: transform;
  }

  .slider-track.animating {
    transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .slider-track.dragging {
    transition: none;
  }

  .slide-wrapper {
    flex: 0 0 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .zoom-container {
    position: relative;
    max-width: 100%;
    max-height: 75vh;
    overflow: visible;
    cursor: zoom-in;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .zoom-container :global(img) {
    max-width: 100%;
    max-height: 75vh;
    object-fit: contain;
    transform-origin: var(--zoom-x, 50%) var(--zoom-y, 50%);
    transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    will-change: transform, transform-origin;
  }

  .zoom-container :global(.face) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .zoom-container :global(.face-back) {
    position: absolute;
    inset: 0;
  }

  .zoom-container.zoomed {
    cursor: zoom-out;
    overflow: hidden;
  }

  .zoom-container.zoomed :global(img) {
    transition: transform 0.1s linear;
    transform: scale(2.2);
  }

  .lightbox-info-window {
    width: 100%;
    overflow: hidden;
  }

  .lightbox-info-track {
    display: flex;
    width: 100%;
    gap: 2rem;
    will-change: transform;
  }

  .lightbox-info-track.animating {
    transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .lightbox-info-track.dragging {
    transition: none;
  }

  .lightbox-info {
    flex: 0 0 100%;
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

  @media (max-width: 72rem) {
    .prev-button {
      left: 1rem;
    }

    .next-button {
      right: 1rem;
    }
  }

  @media (max-width: 50rem) {
    .gallery-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
    }

    .lightbox {
      padding: 1.25rem;
    }

    .close-button {
      width: 2.75rem;
      height: 2.75rem;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.6);
    }

    .nav-button {
      width: 2.75rem;
      height: 2.75rem;
      font-size: 2.25rem;
    }
  }

  @media (max-width: 31.25rem) {
    .gallery-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
