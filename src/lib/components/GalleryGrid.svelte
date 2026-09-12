<script lang="ts">
  import type { GalleryItem } from "$lib/data/gallery";
  import Image from "$lib/components/Image.svelte";

  let { items }: { items: GalleryItem[] } = $props();
  let selectedItem: GalleryItem | null = $state(null);
  let currentIndex = $state(-1);
  
  // ZOOM PARAMETERS
  let isZoomed = $state(false);
  let zoomX = $state(50);
  let zoomY = $state(50);

  // REAL-TIME DRAG & TRACK SPACING PARAMETERS
  let touchStartX = $state(0);
  let touchStartY = $state(0);
  let currentTranslateX = $state(0);
  let isDragging = $state(false);

  // VIRTUAL TRACK SPACING BOUNDS
  const GAP_REM = 2; // Matches the 2rem gap defined in CSS

  // Derived indices for a clean 3-panel infinite slide track
  let prevIndex = $derived(currentIndex !== -1 ? (currentIndex - 1 + items.length) % items.length : -1);
  let nextIndex = $derived(currentIndex !== -1 ? (currentIndex + 1) % items.length : -1);

  function openImage(item: GalleryItem) {
    selectedItem = item;
    currentIndex = items.findIndex(i => i.image === item.image);
  }

  function closeImage() {
    selectedItem = null;
    currentIndex = -1;
    isZoomed = false;
    currentTranslateX = 0;
  }

  function navigate(direction: 'next' | 'prev') {
    if (currentIndex === -1) return;
    isZoomed = false;
    currentTranslateX = 0; // Seamlessly clear structural offset limits

    if (direction === 'next') {
      currentIndex = nextIndex;
    } else {
      currentIndex = prevIndex;
    }
    selectedItem = items[currentIndex];
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (currentIndex === -1) return;
    if (event.key === "ArrowRight") navigate("next");
    else if (event.key === "ArrowLeft") navigate("prev");
    else if (event.key === "Escape") closeImage();
  }

  // DESKTOP CURSOR ZOOM & PAN ENGINE
  function handleMouseMove(event: MouseEvent) {
    if (!isZoomed) return;
    const container = event.currentTarget as HTMLDivElement;
    const rect = container.getBoundingClientRect();
    
    // Calculates percentage tracking point dynamically relative to mouse speed vectors
    zoomX = ((event.clientX - rect.left) / rect.width) * 100;
    zoomY = ((event.clientY - rect.top) / rect.height) * 100;
  }

  // MULTI-INPUT START SELECTION (Handles mouse and touch drags universally)
  function handleDragStart(clientX: number, clientY: number) {
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
      
      // DESKTOP & MOBILE INTEGRATED PANNING (Adjusting active center offsets)
      zoomX = Math.max(0, Math.min(100, zoomX - (deltaX / window.innerWidth) * 45));
      zoomY = Math.max(0, Math.min(100, zoomY - (deltaY / window.innerHeight) * 45));
      touchStartX = clientX;
      touchStartY = clientY;
    } else {
      currentTranslateX = deltaX;
    }
  }

  function handleDragEnd() {
    isDragging = false;
    if (isZoomed) return;

    const swipeThreshold = window.innerWidth * 0.18; // 18% viewport change bounds
    
    if (currentTranslateX < -swipeThreshold) {
      navigate("next");
    } else if (currentTranslateX > swipeThreshold) {
      navigate("prev");
    } else {
      currentTranslateX = 0; // Return smoothly to center if threshold isn't met
    }
  }

  function handleImageClick(event: MouseEvent) {
    event.stopPropagation();
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
    <button
      class="gallery-item"
      type="button"
      onclick={() => openImage(item)}
      aria-label={`View ${item.title}`}
    >
      <Image src={item.image} alt={item.alt} />
      <div class="overlay"><span>{item.title}</span></div>
    </button>
  {/each}
</div>

{#if selectedItem && currentIndex !== -1}
  <div
    class="lightbox"
    role="presentation"
    onclick={closeImage}
    onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') closeImage(); }}
    
    ontouchstart={(e) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY)}
    ontouchmove={r => handleDragMove(r.touches[0].clientX, r.touches[0].clientY, r)}
    ontouchend={handleDragEnd}
    
    onmousedown={(e) => { if(!isZoomed) handleDragStart(e.clientX, e.clientY); }}
    onmousemove={(e) => { if(!isZoomed) handleDragMove(e.clientX, e.clientY, e); }}
    onmouseup={() => { if(!isZoomed) handleDragEnd(); }}
    onmouseleave={() => { if(!isZoomed) handleDragEnd(); }}
  >
    <div 
      class="lightbox-content" 
      role="dialog" 
      aria-modal="true"
      tabindex="-1"
      onclick={(e) => e.stopPropagation()}
      onkeydown={(e) => e.stopPropagation()}
    >
      <button class="close-button" type="button" aria-label="Close image" onclick={closeImage}>×</button>

      <button class="nav-button prev-button" type="button" aria-label="Previous image" onclick={(e) => { e.stopPropagation(); navigate('prev'); }}>‹</button>

      <div class="slider-window">
        <!-- 3-PANEL VIRTUAL INFINITE TRACK: Stays perfectly fluid and factors in gaps -->
        <div 
          class="slider-track" 
          class:dragging={isDragging}
          style="transform: translateX(calc(-100% - {GAP_REM}rem + {currentTranslateX}px));"
        >
          <!-- Left Slide Panel (Always holds previous item) -->
          <div class="slide-wrapper">
            <div class="zoom-container"><Image src={items[prevIndex].image} alt={items[prevIndex].alt} /></div>
          </div>

          <!-- Active Center Slide Panel -->
          <div class="slide-wrapper">
            <div
              class="zoom-container"
              class:zoomed={isZoomed}
              onclick={handleImageClick}
              onmousemove={handleMouseMove}
              style="--zoom-x: {zoomX}%; --zoom-y: {zoomY}%;"
              role="presentation"
            >
              <Image src={items[currentIndex].image} alt={items[currentIndex].alt} />
            </div>
          </div>

          <!-- Right Slide Panel (Always holds next item) -->
          <div class="slide-wrapper">
            <div class="zoom-container"><Image src={items[nextIndex].image} alt={items[nextIndex].alt} /></div>
          </div>
        </div>
      </div>

      <button class="nav-button next-button" type="button" aria-label="Next image" onclick={(e) => { e.stopPropagation(); navigate('next'); }}>›</button>

      <div class="lightbox-info">
        <h2>{selectedItem.title}</h2>
        {#if selectedItem.description}<p>{selectedItem.description}</p>{/if}
      </div>
    </div>
  </div>
{/if}

<style>
  /* [Keep your existing gallery-grid, overlay configurations completely identical] */
  .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
  .gallery-item { position: relative; display: block; width: 100%; padding: 0; border: none; background: #eee; cursor: pointer; overflow: hidden; aspect-ratio: 1 / 1; }
  .gallery-item :global(img) { width: 100%; height: 100%; object-fit: cover; transition: transform 0.35s ease; }
  .gallery-item:hover :global(img) { transform: scale(1.04); }
  .overlay { position: absolute; inset: 0; display: flex; align-items: flex-end; padding: 1.5rem; background: linear-gradient(transparent 45%, rgba(0, 0, 0, 0.7)); opacity: 0; transition: opacity 0.25s ease; }
  .gallery-item:hover .overlay { opacity: 1; }
  .overlay span { color: white; font-size: 1rem; font-weight: 600; }

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

  .close-button { position: absolute; top: -2.8125rem; right: 0; border: none; background: none; color: white; font-size: 2.5rem; line-height: 1; cursor: pointer; }
  .nav-button { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(0, 0, 0, 0.5); color: white; border: none; font-size: 3rem; width: 3.5rem; height: 3.5rem; display: flex; align-items: center; justify-content: center; border-radius: 50%; cursor: pointer; transition: background 0.2s ease, transform 0.2s ease; z-index: 1010; user-select: none; padding-bottom: 0.5rem; }
  .nav-button:hover { background: rgba(0, 0, 0, 0.8); }
  .prev-button { left: -4.5rem; }
  .next-button { right: -4.5rem; }

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
    /* FIX 3: Implements a clean 2rem spatial gap separation between images */
    gap: 2rem; 
    transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    will-change: transform;
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
    overflow: hidden;
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
    
  /* FIX 1: Activates the smooth cursor hover panning tracker across desktop screens */.zoom-container.zoomed {
    cursor: zoom-out;
  }
  
  .zoom-container.zoomed :global(img) {
    transition: transform 0.1s linear; /* Responsive tracking without visual rubber-banding */transform: scale(2.2);
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