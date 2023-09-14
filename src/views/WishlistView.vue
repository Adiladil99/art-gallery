<template>
    <div class="wishlist container">
        <p class="wishlist-title">Избранное</p>
        <div class="wishlist__pictures container" v-if="getFavourites.length">
            <picture-card v-for="(item, index) in getFavourites" :key="index + 'picture'" :data="item"/>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import PictureCard from '@/components/PictureCard.vue'
export default {
    components: { PictureCard },
    computed: {
        ...mapGetters(["getFavourites"]),
    },
}
</script>

<style lang="scss" scoped>
.wishlist {
    &-title {
        margin: 5.9rem 0 6.313rem 0;
        font-size: 72px;
        font-weight: 700;
        text-align: center;
    }
    &__pictures {
        margin-bottom: 10.45rem;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 30px;
    }
}
</style>