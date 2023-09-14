<template>
    <header class="backgroundHeader" :class="{header2: $route.path !== '/'}">
        <div class="header container">
            <router-link to="/" class="header__logo">
                <img src="@/assets/logo.svg"/>
            </router-link>
            <div class="header__left">
                <transition name="animatedSearch">
                    <label for="searchHeader" class="header__search dragnone" v-if="$route.path !== '/'">
                        <!-- <img src="@/assets/icons/search.svg" alt="wishlistHeader"/> -->
                        <input class="search" @input="searchPictures()" @focusout="close" @focusin="isOpen = true" v-model="search" id="searchHeader"/>
                        <p class="header__search-text">Поиск</p>
                        <div class="header__search-results" v-if="isOpen && search.length > 3">
                            <p v-if="!results.length">Not Found</p>
                            <div class="header__search-results-list" v-else>
                            <picture-card v-for="(item, index) in results" :key="index + 'picture'" :data="item"/>
                            </div>
                        </div>
                    </label>
                </transition>
                <router-link :to="{ path: '/wishlist' }" class="header__wishlist dragnone">
                    <img src="@/assets/icons/wishlist.svg" alt="wishlistHeader"/>
                    <p>Избранное</p>
                    <span v-if="getFavourites.length">{{  getFavourites.length }}</span>
                </router-link>
            </div>
        </div>
    </header>
</template>
<script>
import PictureCard from '@/components/PictureCard.vue'
import { mapGetters } from "vuex";
export default {
    components: { PictureCard },
    data: () => ({
        search: "",
        isOpen: false,
        results: []
    }),
    computed: {
        ...mapGetters(["getFavourites"])
    },
    methods: {        
        close() {
            setTimeout(() => {
                this.isOpen = false
            }, 100);
        },
        async searchPictures() {
        if (this.search.length > 3) {
            await this.$axios.get(`search/photos`, {
            params: {
                query: this.search,
                client_id: "Yti3NqGHbJTHi-m-8aLALDTNZfTLr-PGpNr3dDcvn0U",
            }
            })
            .then(res => {
            this.results = res.data.results.map(item => ({
            id: item.id,
            image: item.urls.small
            }))
            })
            .catch(err => {
            console.log(err);
            })
        }
        }
    },
    watch: {
        $route() {
            this.search = "",
            this.isOpen = false,
            this.results = []
        }
    }
}
</script>
<style lang="scss" scoped>
.header2 {
    padding: 23px 0 14px 0 !important;
    border-bottom: 16px solid #C4C4C4 !important;
    .header__logo {
        height: 43px !important;
    }
    .header__wishlist {
        font-size: 20px !important;
        gap: 9px !important;
    }
    .header__search {
        font-size: 20px !important;
    }
}
.backgroundHeader {
    transition: all 1s ease;
    padding: 37px 0 38px 0;
    background: #000000;
    border-bottom: 0px solid #C4C4C4;
}
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__logo {
        transition: all 1s ease;
        height: 73px;
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
    &__left {
        display: flex;
        align-items: center;
        gap: 38px;        
        @media screen and (max-width: 768px) {
            gap: 16px;
            p {
                display: none;
            }
        }
    }
    &__wishlist {
        position: relative;
        transition: all 1s ease;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 18px;
        font-weight: 400;
        color: #FFFFFF;
        span {
            width: 15px;
            height: 15px;
            background: white;
            color: black;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            font-size: 10px;
            position: absolute;
            top: -2px;
            left: 15px;
        }
    }
    &__search {
        transition: all 1s ease;
        cursor: pointer;
        display: flex;
        position: relative;
        align-items: center;
        gap: 12px;
        font-size: 18px;
        font-weight: 400;
        color: #FFFFFF;
        img {
            filter: brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%);
        }
        &-text {
            width: 60px;
            transition: all 0.5s ease;
        }
        
        &-results {
            position: absolute;
            z-index: 99;
            background: white;
            padding: 15px;
            top: 110%;
            left: 0;
            width: 100%;
            &-list {        
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
                gap: 10px;
                .card {
                height: 50px;
                }
            }
        }
    }
}

.animatedSearch-enter-active {
  animation: animatedSearch-in 1s;
}
.animatedSearch-leave-active {
  animation: animatedSearch-in 1s reverse;
}

@keyframes animatedSearch-in {
  0% {
    transform: scale(0.7);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.search {
    position: relative;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    color: transparent;
    transition-duration: 500ms;
    cursor: pointer;
    outline: none;
    font-size: 15px;
    background: transparent;
    border: 1px solid transparent;
    overflow: hidden;
    background-image: url('@/assets/icons/search.svg');
    background-repeat: no-repeat;
    background-size: 22px;
    background-position: 45% 50%;
    filter: brightness(0) saturate(100%) invert(100%) sepia(98%) saturate(0%) hue-rotate(355deg) brightness(102%) contrast(106%);
}
.search:hover {
    border: 1px solid white;
}
.search:focus {
    width: 300px;
    cursor: text;
    padding-left: 40px;
    color: white;
    border: 1px solid white !important;
    background: url('@/assets/icons/search.svg');
    background-repeat: no-repeat;
    background-size: 22px;
    border-radius: 25px;
    background-position: 10px 50%;
    
}

// .search:focus + .header__search-results {display: none !important;}

.search:focus + .header__search-text {
    width: 0px;
    opacity: 0;
    transform: scale(0);
}

</style>