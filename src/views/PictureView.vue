<template>
    <div class="picture" v-if="image">
        <div class="picture-banner">
            <img :src="image.urls.small" alt="banner" />
        </div>
        <div class="content container">
            <div class="content__top">
                <div class="content__top-author">
                    <!-- <img :src="image.user.profile_image.small" alt="profile image" /> -->
                    <img :src="image.user.profile_image.small" alt="profile image" />
                    <span>
                        <p>{{image.user.name}}</p>
                        <p>@{{image.user.instagram_username}}</p>
                    </span>
                </div>
                <div class="content__top-actions">
                    <div class="content__top-actions-favour">
                        <label class="favourites">
                            <input @change="favouritesAction()" id="fav" :checked="isFavourites" type="checkbox">
                            <div class="checkmark" :class="{isActive: isFavourites}">
                                <svg viewBox="0 0 256 256">
                                <rect fill="none" height="256" width="256"></rect>
                                <path d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z" stroke-width="12px" stroke="#000" fill="none"></path></svg>
                            </div>
                        </label>
                    </div>
                    <a :href="image.urls.full" download>
                        <img :src="require('@/assets/icons/download.svg')" alt="download" />
                        <p>Download</p>
                    </a>
                </div>
            </div>
            <div class="content-image">
                <img :src="image.urls.regular" alt="main image" />
            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
    export default {
        data:() => ({
            image: null
        }),
        computed: {
            ...mapGetters(["getFavourites"]),
            isFavourites() {
                return this.getFavourites.some(i => i.id === this.image.id)
            }
        },
        methods: {
            ...mapMutations(["removeFavourires", "addFavourires"]),
            favouritesAction() {
                if (!this.isFavourites) {
                    this.addFavourires(this.image)
                } else {
                    this.removeFavourires(this.image.id)
                }
                
            },
            async getImage() {
                await this.$axios.get(`photos/${this.$route.params.slug}`, {
                    params: {
                        client_id: "Yti3NqGHbJTHi-m-8aLALDTNZfTLr-PGpNr3dDcvn0U",
                    }
                })
                .then(res => {
                    this.image = res.data
                })
                .catch(err => {
                    console.log(err);
                })
            }
        },
        created() {
            this.getImage()
        },
        watch: {
            $route() {
                this.getImage()
            }
        }
    }
</script>
<style lang="scss" scoped>
.picture {
    position: relative;
    &-banner {
        position: absolute;
        top: 0;
        left: 0;
        height: 70vh;
        width: 100%;
        filter: grayscale(var(--value, 100%));
        &::before {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px);
        }
        img {
            width: 100%;
            height: 100%;
        object-fit: cover;        
        }
    }
    .content {
        position: relative;
        z-index: 2;
        display: flex;
        flex-direction: column;
        gap: 40px;
        padding-top: 43px;
        &__top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            &-author {
                display: flex;
                align-items: center;
                gap: 10px;
                img {
                    border-radius: 8px;
                    border: 1px solid #FFF;
                    width: 55px;
                    height: 55px;
                    @media screen and (max-width: 768px) {
                        width: 48px;
                        height: 48px;                        
                    }
                }
                p {
                    color: #F2F2F2;
                    font-weight: 400;
                    line-height: normal;
                    &:first-child {
                        font-size: min(max(18px, calc(1.125rem + ((1vw - 3.2px) * 0.75))), 30px);
                    }
                    &:last-child {
                        font-size: min(max(14px, calc(0.875rem + ((1vw - 3.2px) * 0.25))), 18px);
                    }
                }
            }
            &-actions {
                display: flex;
                align-items: stretch;
                gap: 20px;
                height: 50px;
                &-favour {
                    width: 50px;
                    height: 50px;
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
                }
                a { 
                    padding: 0 22px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 16px;
                    border-radius: 8px;
                    border: 1px solid #FFF200;
                    background: #FFF200;
                    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
                    
                    @media screen and (max-width: 768px) {
                        width: 50px;
                        padding: 0;
                        p {
                            display: none;
                        }
                    }
                }
            }
        }
        &-image {
            width: 100%;
            height: min(max(227px, calc(14.1875rem + ((1vw - 3.2px) * 32.3125))), 744px);
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0px 4px 50px 0px rgba(0, 0, 0, 0.50);
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        padding-bottom: 100px;
    }
}

.favourites input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.favourites {
  display: block;
  position: relative;
  cursor: pointer;
  font-size: 20px;
  user-select: none;
  width: 100%;
  height: 100%;
  transition: 100ms;
    display: flex;
    align-items: center;
    justify-content: center;
}

.checkmark {
  top: 0;
  left: 0;
  height: 1.4em;
  width: 1.4em;
  transition: 100ms;
  animation: dislike_effect 400ms ease;
}

.isActive path {
  fill: #FF5353;
  stroke-width: 0;
}

.isActive {
  animation: like_effect 400ms ease;
}

.favourites:hover {
  transform: scale(1.1);
}

@keyframes like_effect {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes dislike_effect {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}
</style>