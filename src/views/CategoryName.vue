/* eslint-disable */
<template lang="pug">
section.category
    .container
        h2.text-center.text-capitalize.pt-4.pb-4 category meal 
        .content.p-4.d-grid.justify-content-center.align-items-center(v-if="posts.categories !== null")
          router-link.card.rounded(:to ="modifierLink('categoryName',post.strCategory,post.idCategory)" v-for="post in posts.categories" :key="post.idCategory")
            img.rounded-top(:src="post.strCategoryThumb")
            .card__content.d-flex.justify-content-center.align-items-center
              h3.card__title.text-center(v-text="post.strCategory")
        .content.p-4.text-center.text-capitalize.fs-1 Not Found
</template>

<script>
export default {
  name: "categories",
  created() {
    return this.getData(`categories.php`);
  },
};
</script>
<style lang="scss" scoped>
@import "../scss/colors/_colors.scss";
@import "../scss/Screens/screen";
.category {
  color: $white-color;
  .content {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 20px;
    .card {
      margin: {
        left: auto;
        right: auto;
      }
      width: 350px;
      height: 350px;
      position: relative;
      background-color: rgba(#fff, 2);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
      img {
        width: 80%;
        transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
      }
      &:hover {
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      }
      .card__content {
        flex-direction: column;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        width: 100%;
        height: 100%;
        padding: 20px;
        box-sizing: border-box;
        background-color: $white-color;
        opacity: 0;
        transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
      }
      &:hover .card__content {
        transform: translate(-50%, -50%) rotate(0deg);
        opacity: 1;
      }
      .card__title {
        margin: 0;
        font-size: 24px;
        color: #333;
        font-weight: 700;
      }

      .card__description {
        margin: 10px 0 0;
        line-height: 1.4;
        &.type1::after {
          background-color: $main-color;
        }
      }

      &:hover img {
        scale: 0;
        transform: rotate(-45deg);
      }
    }
  }
}
</style>
