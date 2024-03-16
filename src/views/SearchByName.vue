/* eslint-disable */
<template lang="pug">
section.search
    .container
        h2.text-center.text-capitalize.pt-4.pb-4 search meal 
        .input
            input(type="text" placeholder="Username" @input="filterByLettersAndSearch('s='+ nameMeal)" v-model="nameMeal")
        .letters.pt-4.d-flex.justify-content-between.align-items-center.ms-auto.me-auto
          span.text-uppercase.text-center.d-block(v-for="(letter,index) in letters" @click="filterByLettersAndSearch(`f=${letter}`); toggleActive(index)") {{ letter }}
        .loader.hide
          each i in ["loader__bar","loader__bar","loader__bar","loader__bar","loader__bar"]
            div(class=i)
          .loader__ball
        .content.hide.p-4.d-grid.justify-content-center.align-items-center(v-if="posts !== null")
          .card.rounded(v-for="post in posts" :key="post.idMeal")
            img.w-100.rounded-top(:src="post.strMealThumb")
            .card__content.d-flex.justify-content-center.align-items-center
              h3.card__title.text-center(v-text="post.strMeal")
              router-link(:to="modifierLink('how to cook', post.strMeal, post.idMeal)").d-flex.justify-content-center.align-items-center.button.type1.card__description.text-capitalize
                span.btn-txt read more
        .content.hide.p-4.text-center.fs-1.hide.text-capitalize(v-else)
            | There is not meal
</template>

<script>
export default {
  name: "search",
  data: function () {
    return {
      letters: [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
      ],
      nameMeal: "",
      posts: [],
    };
  },
  methods: {
    sendId: (id) => {
      localStorage.setItem("idMeal", id);
    },
    async filterByLettersAndSearch(letter) {
      let conentChildren = document.querySelector(".content");
      conentChildren.classList.add("hide");
      try {
        const response = await this.$http.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?${letter}`
        );
        this.posts = response.data.meals;
      } catch (error) {
        // eslint-disable-next-line
        console.log(Error(error));
      }
      let loader = document.querySelector(".loader");

      loader.style.display = "block";
      loader.classList.remove("hide");
      setTimeout(() => {
        loader.classList.add("hide");
        setTimeout(() => {
          loader.style.display = "none";
          conentChildren.classList.remove("hide");
        }, 800);
      }, 800);
    },
    toggleActive(id) {
      let letters = [...document.querySelectorAll(".letters span")];
      letters.forEach((el) => {
        el.classList.remove("active");
      });
      letters[id].classList.add("active");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/colors/_colors.scss";
@import "../scss/Screens/screen";

.search {
  color: $white-color;
  .input {
    width: 80%;
    margin: auto;
    input {
      outline: none;
      width: 100%;
      padding: 10px;
      border-radius: 5px;
      letter-spacing: 1px;
      transition: 0.4s;
      background-color: transparent;
      color: $white-color;
      border: 1px solid $white-color;
      &:focus {
        border-color: $main-color;
      }
    }
  }
  .letters {
    width: 80%;
    flex-wrap: wrap;
    span {
      border: 1px solid $main-color;
      width: 35px;
      height: 35px;
      line-height: 35px;
      margin: {
        bottom: 5px;
      }
      position: relative;
      &:hover {
        cursor: pointer;
      }
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        transform: scale(0);
        transition: 0.4s;
        background-color: $main-color;
        z-index: -1;
      }
      &:hover::before,
      &.active::before {
        transform: scale(1);
      }
    }
  }
  .content {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 20px;
    transition: 0.4s;
    &.hide {
      opacity: 0;
    }
    .card {
      position: relative;
      background: linear-gradient(-45deg, $main-color 0%, $red-color 100%);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
      img {
        width: 48px;
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
        background-color: #fff;
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
  .loader {
    transition: 0.4s;
    opacity: 1;
    position: relative;
    width: 75px;
    height: 100px;
    margin: {
      left: auto;
      right: auto;
    }
    &.hide {
      opacity: 0;
    }
    .loader__bar {
      position: absolute;
      bottom: 0;
      width: 10px;
      height: 50%;
      background: $white-color;
      transform-origin: center bottom;
      box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.2);
      &:nth-child(1) {
        left: 0px;
        transform: scale(1, 0.2);
        -webkit-animation: barUp1 4s infinite;
        animation: barUp1 4s infinite;
      }

      &:nth-child(2) {
        left: 15px;
        transform: scale(1, 0.4);
        -webkit-animation: barUp2 4s infinite;
        animation: barUp2 4s infinite;
      }

      &:nth-child(3) {
        left: 30px;
        transform: scale(1, 0.6);
        -webkit-animation: barUp3 4s infinite;
        animation: barUp3 4s infinite;
      }

      &:nth-child(4) {
        left: 45px;
        transform: scale(1, 0.8);
        -webkit-animation: barUp4 4s infinite;
        animation: barUp4 4s infinite;
      }

      &:nth-child(5) {
        left: 60px;
        transform: scale(1, 1);
        -webkit-animation: barUp5 4s infinite;
        animation: barUp5 4s infinite;
      }
    }
    .loader__ball {
      position: absolute;
      bottom: 10px;
      left: 0;
      width: 10px;
      height: 10px;
      background: $main-color;
      border-radius: 50%;
      -webkit-animation: ball624 4s infinite;
      animation: ball624 4s infinite;
    }
  }
}
// Aniamtions
@keyframes ball624 {
  0% {
    transform: translate(0, 0);
  }

  5% {
    transform: translate(8px, -14px);
  }

  10% {
    transform: translate(15px, -10px);
  }

  17% {
    transform: translate(23px, -24px);
  }

  20% {
    transform: translate(30px, -20px);
  }

  27% {
    transform: translate(38px, -34px);
  }

  30% {
    transform: translate(45px, -30px);
  }

  37% {
    transform: translate(53px, -44px);
  }

  40% {
    transform: translate(60px, -40px);
  }

  50% {
    transform: translate(60px, 0);
  }

  57% {
    transform: translate(53px, -14px);
  }

  60% {
    transform: translate(45px, -10px);
  }

  67% {
    transform: translate(37px, -24px);
  }

  70% {
    transform: translate(30px, -20px);
  }

  77% {
    transform: translate(22px, -34px);
  }

  80% {
    transform: translate(15px, -30px);
  }

  87% {
    transform: translate(7px, -44px);
  }

  90% {
    transform: translate(0, -40px);
  }

  100% {
    transform: translate(0, 0);
  }
}

@-webkit-keyframes barUp1 {
  0% {
    transform: scale(1, 0.2);
  }

  40% {
    transform: scale(1, 0.2);
  }

  50% {
    transform: scale(1, 1);
  }

  90% {
    transform: scale(1, 1);
  }

  100% {
    transform: scale(1, 0.2);
  }
}

@keyframes barUp1 {
  0% {
    transform: scale(1, 0.2);
  }

  40% {
    transform: scale(1, 0.2);
  }

  50% {
    transform: scale(1, 1);
  }

  90% {
    transform: scale(1, 1);
  }

  100% {
    transform: scale(1, 0.2);
  }
}

@-webkit-keyframes barUp2 {
  0% {
    transform: scale(1, 0.4);
  }

  40% {
    transform: scale(1, 0.4);
  }

  50% {
    transform: scale(1, 0.8);
  }

  90% {
    transform: scale(1, 0.8);
  }

  100% {
    transform: scale(1, 0.4);
  }
}

@keyframes barUp2 {
  0% {
    transform: scale(1, 0.4);
  }

  40% {
    transform: scale(1, 0.4);
  }

  50% {
    transform: scale(1, 0.8);
  }

  90% {
    transform: scale(1, 0.8);
  }

  100% {
    transform: scale(1, 0.4);
  }
}

@-webkit-keyframes barUp3 {
  0% {
    transform: scale(1, 0.6);
  }

  100% {
    transform: scale(1, 0.6);
  }
}

@keyframes barUp3 {
  0% {
    transform: scale(1, 0.6);
  }

  100% {
    transform: scale(1, 0.6);
  }
}

@-webkit-keyframes barUp4 {
  0% {
    transform: scale(1, 0.8);
  }

  40% {
    transform: scale(1, 0.8);
  }

  50% {
    transform: scale(1, 0.4);
  }

  90% {
    transform: scale(1, 0.4);
  }

  100% {
    transform: scale(1, 0.8);
  }
}

@keyframes barUp4 {
  0% {
    transform: scale(1, 0.8);
  }

  40% {
    transform: scale(1, 0.8);
  }

  50% {
    transform: scale(1, 0.4);
  }

  90% {
    transform: scale(1, 0.4);
  }

  100% {
    transform: scale(1, 0.8);
  }
}

@-webkit-keyframes barUp5 {
  0% {
    transform: scale(1, 1);
  }

  40% {
    transform: scale(1, 1);
  }

  50% {
    transform: scale(1, 0.2);
  }

  90% {
    transform: scale(1, 0.2);
  }

  100% {
    transform: scale(1, 1);
  }
}

@keyframes barUp5 {
  0% {
    transform: scale(1, 1);
  }

  40% {
    transform: scale(1, 1);
  }

  50% {
    transform: scale(1, 0.2);
  }

  90% {
    transform: scale(1, 0.2);
  }

  100% {
    transform: scale(1, 1);
  }
}
</style>
