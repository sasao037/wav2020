<template>
  <nav>
    <v-app-bar app color="primary" style="z-index:99" dark dense>
      <v-app-bar-nav-icon @click.stop="navDrawer = !navDrawer" />
    </v-app-bar>

    <v-navigation-drawer
      v-model="navDrawer"
      app width="200"
      style="z-index:100"
    >
      <v-list nav dense>
        <v-list-item
          v-for="(menu, i) in mainMenuList"
          :key="`main_${i}`"
          :to="menu.linkTo"
        >
          <v-list-item-icon>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ menu.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>
  </nav>

</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      navDrawer: null,
      mainMenuList: [
        {
          linkTo: '/home',
          title: 'Home',
          icon: 'mdi-home'
        },
        {
          linkTo: '/reserve',
          title: 'Reserve',
          icon: 'mdi-calendar-clock'
        },
        {
          linkTo: '/video',
          title: 'Video',
          icon: 'mdi-play-circle-outline'
        },
        {
          linkTo: '/shop',
          title: 'Shop',
          icon: 'mdi-shopping'
        },
        {
          linkTo: '/instagram',
          title: 'Instagram',
          icon: 'mdi-instagram'
        },
        {
          linkTo: '/settings',
          title: 'Settings',
          icon: 'mdi-account'
        }
      ],
    };
  }
}

</script>
