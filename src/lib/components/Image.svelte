<script lang="ts">
  import { asset } from "$app/paths";
  import { dev } from "$app/environment";

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

  let displayImage = $derived(dev ? src : src.replace(/\.(png|jpe?g)$/i, ".webp"));
</script>

<picture class={className}>
  {#if !dev}
    <source srcset={asset(displayImage)} type="image/webp" />
  {/if}
  <img src={asset(displayImage)} {alt} {loading} decoding="async" class={className} />
</picture>
