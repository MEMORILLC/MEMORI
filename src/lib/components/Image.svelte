<script lang="ts">
  import { asset } from "$app/paths";
  import { dev } from "$app/environment";

  // Svelte 5 typed props definition
  let { 
    src, 
    alt, 
    loading = "lazy", 
    class: className = "" 
  }: { 
    src: string; 
    alt: string; 
    loading?: "lazy" | "eager"; 
    class?: string; 
  } = $props();

  // Svelte 5 reactive rune to handle your production vs dev switching automatically
  let displayImage = $derived(
    dev ? src : src.replace(/\.(png|jpe?g)$/i, ".webp")
  );
</script>

<picture class={className}>
  <source srcset={asset(displayImage)} type="image/webp" />
  <img src={asset(displayImage)} {alt} {loading} class={className} />
</picture>
