/* eslint-disable */
<template lang="pug">
header.header 
  .container.d-flex.justify-content-between.align-items-center.text-capitalize
    router-link.logo.p-4(to="/") 
      .fa-solid.fa-bowl-food
    .icon-menu
        input(type="checkbox" id="checkbox")
        label(for="checkbox" class="toggle" @click.stop="()=>{$refs['icon-menu'].parentNode.classList.toggle('show')}" ref="icon-menu")
          .bars#bar1
          .bars#bar2
          .bars#bar3
    ul.links.d-flex.justify-content-between.align-items-center.mb-0.ps-0
      li(v-for="link in links" :key="link.name").text-center  
          router-link.pt-4.pb-4(:to="link.path") {{ link.name }}
</template>

<script>
export default {
  name: "headerContent",
  data: function () {
    return {
      links: [],
    };
  },
  mounted() {
    const routes = this.$router.options.routes;
    for (let i = 0; i < routes.length; i++) {
      this.links.push(routes[i]);
      if (i === 2) {
        break;
      }
    }
  },
};
</script>
<style lang="scss" scoped>
@import "../scss/colors/_colors.scss";
@import "../scss/Screens/screen";
$full-100: 100%;
.header {
  border-bottom: 2px solid $white-color;
  .logo {
    font: {
      size: 25px;
      weight: 600;
    }
    letter-spacing: 1px;
    color: $main-color;
  }
  .icon-menu {
    &.show + .links {
      top: 29%;
    }
    #checkbox,
    & {
      display: none;
    }
    @include mobile {
      display: block;
    }
    .toggle {
      position: relative;
      width: 40px;
      height: 40px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      transition-duration: 0.5s;
      .bars {
        width: $full-100;
        height: 4px;
        background-color: $main-color;
        border-radius: 4px;
      }
      #bar2 {
        transition-duration: 0.8s;
      }
      #bar1,
      #bar3 {
        width: 70%;
      }
    }
    #checkbox:checked + .toggle .bars {
      position: absolute;
      transition-duration: 0.5s;
    }
    #checkbox:checked + .toggle #bar2 {
      transform: scaleX(0);
      transition-duration: 0.5s;
    }
    #checkbox:checked + .toggle #bar1 {
      width: $full-100;
      transform: rotate(45deg);
      transition-duration: 0.5s;
    }
    #checkbox:checked + .toggle #bar3 {
      width: $full-100;
      transform: rotate(-45deg);
      transition-duration: 0.5s;
    }
    #checkbox:checked + .toggle {
      transition-duration: 0.5s;
      transform: rotate(180deg);
    }
  }
  .links {
    width: 22%;
    a {
      color: $white-color;
      display: block;
      width: fit-content;
      font-size: 22px;
      transition: 0.4s;
      position: relative;
      &:hover,
      &.router-link-exact-active.router-link-active {
        color: $main-color;
      }
      &::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: -4px;
        transition: 0.4s;
        background-color: $main-color;
        width: 0;
        height: 2px;
      }
      &:hover::before,
      &.router-link-exact-active.router-link-active::before {
        width: $full-100;
      }
    }
    @include mobile {
      position: absolute;
      width: 400px;
      flex-direction: column;
      top: -$full-100;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 10px;
      background: #333333;
      box-shadow: inset 20px 20px 60px #2b2b2b, inset -20px -20px 60px #3b3b3b;
      z-index: 2;
      transition: 0.4s;
      li {
        width: $full-100;
        a {
          width: $full-100;
          z-index: 2;
          &::before {
            height: 0;
          }
        }
      }
    }
  }
}
</style>
