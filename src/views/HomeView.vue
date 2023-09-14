<template>
    <div class="home">
        <div class="home__searchBackground"> 
            <div class="container">
              <div class="home__search">
                  <input type="search" @input="searchPictures()" v-model="search" placeholder="Поиск"/>
                  <img src="@/assets/icons/search.svg"/>
                  <div class="home__search-results" v-if="search.length > 3">
                    <p v-if="!results.length">Not Found</p>
                    <div class="home__search-results-list" v-else>
                      <picture-card v-for="(item, index) in results" :key="index + 'picture'" :data="item"/>
                    </div>
                  </div>
              </div>
            </div>
        </div>
        <div class="home__pictures container" v-if="pictures.length">
          <!-- {{ pictures }} -->
            <picture-card v-for="(item, index) in pictures" :key="index + 'picture'" :data="item"/>
        </div>
    </div>
</template>

<script>
import PictureCard from '@/components/PictureCard.vue'
export default {
  components: { PictureCard },
  data() {
    return {
      pictures: [],
      search: "",
      results: []
    }
  },

  methods: {
    async getPictures() {
      await this.$axios.get('photos/random', {
        params: {
          client_id: "Yti3NqGHbJTHi-m-8aLALDTNZfTLr-PGpNr3dDcvn0U",
          count: 9
        }
      }) 
      .then(res => {
        this.pictures = res.data.map(item => ({
          id: item.id,
          image: item.urls.small
        }));
      })
      .catch(err => {
        console.log(err);
      })
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

  async created() {
    await this.getPictures();
  }
}
</script>

<style lang="scss" scoped>
.home {
  &__searchBackground {
    padding: 92px 0;
    background: url('@/assets/images/searchBackground.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    border-bottom: 16px solid #C4C4C4;
    &::before {
      content: "";
      top: 0;
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      background: #00000080;
    }
  }
  &__search {
    position: relative;
    height: fit-content;
    max-height: 70px;
    width: 100%;
    max-width: 866px;
    margin: auto;
    position: relative;
    z-index: 2;
    padding: 21px 34px 21px 39px;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      cursor: pointer;
    }
    input {
      width: 100%;
      margin-right: 24px;
      font-size: 24px;
      outline: none;
      border: none;
      padding: 0;
    }
    &-results {
      position: absolute;
      background: white;
      padding: 25px;
      top: 100%;
      left: 0;
      width: 100%;
      &-list {        
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 30px;
        .card {
          height: 100px;
        }
      }
    }
  }

  &__pictures {
    margin-top: min(max(45px, calc(2.8125rem + ((1vw - 3.2px) * 3.875))), 107px);
    margin-bottom: 12.5rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 30px;
  }
}
</style>