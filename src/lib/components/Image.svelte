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
  let versionedImage = $derived(`${asset(displayImage)}?v=${import.meta.env.VITE_BUILD_ID}`);
</script>

<picture class={className}>
  {#if !dev}
    <source srcset={versionedImage} type="image/webp" />
  {/if}
  <img src={versionedImage} {alt} {loading} decoding="async" class={className} />
</picture>
