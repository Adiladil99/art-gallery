<template>
    <router-link :to="`/picture/${data.id}`" class="card" v-if="data?.image">
        <v-lazy-image :src="data.image" />
    </router-link>
</template>
<script>
import VLazyImage from "v-lazy-image";
export default {
    components: { VLazyImage },
    props: ['data']
}
</script>
<style lang="scss" scoped>
.card {
    transition: all 0.5s ease;
    height: min(max(321px, calc(20.0625rem + ((1vw - 3.2px) * 8.25))), 453px);
    img {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
    &:hover {
        transform: scale(1.03);
    }
}

.v-lazy-image {
  filter: blur(10px);
  transition: filter 1.2s;
}

.v-lazy-image-loaded {
  filter: blur(0);
}
</style>