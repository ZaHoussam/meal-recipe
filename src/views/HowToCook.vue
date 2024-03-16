/* eslint-disable */
<template lang="pug">
section.meal-recipe
    .container.gap-3.h-100.flex-wrap.d-flex.justify-content-between.align-items-center.h-100(v-for="post in posts.meals" :key="post.idMeal") 
          .meal-image.text-center
              img.rounded-circle.mb-4(:src="post.strMealThumb")
              h3.title.text-uppercase(v-text="post.strMeal")
          .meal-info 
              h3.title.text-capitalize materials used
              .d-flex.justify-content-between
                ul.ingrediants.ps-2.mb-4.mt-4(v-takeingrediantsOne="posts.meals")
                ul.ingrediants.ps-2.mb-4.mt-4(v-takeingrediantsTwo="posts.meals")
              a.d-flex.justify-content-center.align-items-center.button.type1(:href="post.strYoutube" target="_blank").text-capitalize
                i.fa-solid.fa-play.btn-txt
</template>

<script>
export default {
  name: "howToCook",
  created() {
    return this.getData(`lookup.php?i=${this.$route.query.id}`);
  },
  directives: {
    takeingrediantsOne: {
      bind: (el, posts) => {
        let obj = posts.value[0];
        let keys = Object.keys(obj);
        let ingreArr = [];
        for (let i = 0; i < keys.length; i++) {
          for (let j = 0; j < keys.length; j++) {
            if (keys[i] === `strIngredient${j}`) {
              ingreArr.push(keys[i]);
            }
          }
        }
        for (let i = 0; i < Math.floor(ingreArr.length / 2); i++) {
          if (obj[ingreArr[i]] !== "" && obj[ingreArr[i]] !== null) {
            el.innerHTML += `<li>${i + 1}- ${obj[ingreArr[i]]}</li>`;
          }
        }
      },
    },
    takeingrediantsTwo: {
      bind: (el, posts) => {
        let obj = posts.value[0];
        let keys = Object.keys(obj);
        let ingreArr = [];
        for (let i = 0; i < keys.length; i++) {
          for (let j = 0; j < keys.length; j++) {
            if (keys[i] === `strIngredient${j}`) {
              ingreArr.push(keys[i]);
            }
          }
        }
        for (
          let i = Math.floor(ingreArr.length / 2);
          i < ingreArr.length;
          i++
        ) {
          if (obj[ingreArr[i]] !== "" && obj[ingreArr[i]] !== null) {
            el.innerHTML += `<li>${i + 1}- ${obj[ingreArr[i]]}</li>`;
          }
        }
      },
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../scss/colors/_colors.scss";
@import "../scss/Screens/screen";
$full: 100%;
.meal-recipe {
  height: calc(100vh - 87.1px);
  @include mobile {
    height: $full;
    padding: {
      top: 20px;
      bottom: 20px;
    }
  }
  color: $white-color;
  .meal-info {
    @include mobile {
      width: $full;
      padding: {
        top: 20px;
        bottom: 20px;
      }
    }
    width: $full / 2;
    .title {
      @include mobile {
        text-align: center;
      }
      font: {
        size: 2em;
        weight: bold;
      }
      line-height: 1.7;
    }
    .ingrediants {
      width: 300px;
      li {
        font: {
          size: 20px;
          weight: 500;
        }
        margin-bottom: 10px;
      }
    }
    .button {
      width: 80px;
      &.type1::after {
        background-color: $red-color;
      }
      @include mobile {
        width: 100px;
        margin: {
          left: auto;
          right: auto;
        }
      }
    }
  }
  .meal-image {
    width: 600px;
    height: 600px;
    img {
      width: 80%;
      height: 80%;
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
