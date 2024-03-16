/* eslint-disable */
<template lang="pug">
section.landing
  .container.h-100
      .meal-content.gap-3.flex-wrap.d-flex.justify-content-between.align-items-center.h-100(v-for="post in posts.meals" :key="post.idMeal")
        .meal-info
            h3.title.text-uppercase.mb-4(v-text="post.strMeal")
            router-link.d-flex.justify-content-center.align-items-center.button.type1(:to="modifierLink(`how to cook`, post.strMeal, post.idMeal)")
              span.btn-text.text-capitalize how to cook
        .meal-image 
          img.rounded-circle(:src="post.strMealThumb")
</template>

<script>
export default {
  name: "home",
  mounted() {
    return this.getData(`random.php`);
  },
};
</script>
<style lang="scss" scoped>
@import "../scss/colors/_colors.scss";
@import "../scss/Screens/screen";
.landing {
  height: calc(100vh - 87.1px);
  color: $white-color;
  .meal-info {
    width: 50%;
    .title {
      font: {
        size: 2em;
        weight: bold;
      }
      line-height: 1.7;
      @include mobile {
        font: {
          size: 1.7em;
        }
      }
    }
    .button {
      &.type1::after {
        background-color: $main-color;
      }
      @include mobile {
        margin: {
          left: auto;
          right: auto;
        }
      }
    }
    @include mobile {
      width: 100%;
      margin-bottom: 15px;
      text-align: center;
      padding-top: 20px;
    }
  }
  .meal-image {
    width: 600px;
    height: 600px;
    img {
      width: 100%;
      height: 100%;
    }
    @include mobile {
      width: 400px;
      height: 400px;
      margin: {
        left: auto;
        right: auto;
      }
    }
  }
}
</style>
