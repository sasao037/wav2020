<template>
  <v-app>
    <v-container>
      <v-subheader>イベント一覧</v-subheader>

      <v-list three-line>
        <v-list-item v-for="(item, index) in currentEvents" :key="index">
          <v-list-item-avatar>
            <v-img :src=item.avatar></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ item.eventName }}</v-list-item-title>
            <v-list-item-subtitle>{{ formatDateTime(item.dateTime, item.time) }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-subheader>過去のイベント一覧</v-subheader>
      <v-list three-line>
        <v-list-item v-for="(item, index) in pastEvents" :key="index">
          <v-list-item-avatar>
            <v-img :src=item.avatar></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ item.eventName }}</v-list-item-title>
            <v-list-item-subtitle>{{ formatDateTime(item.dateTime, item.time) }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-container>

  </v-app>
</template>

<script>
import router from "../../router";
import { ref } from 'vue'
import axios from 'axios';

export default {
  name: "Reserve",
  mounted() {
    this.test();
  },
  setup() {
    const img1 = ref(require('@/pictures/futsal.jpg'))
    const img2 = ref(require('@/pictures/volley.jpg'))
    const img3 = ref(require('@/pictures/bbq.jpg'))
    const img4 = ref(require('@/pictures/beer.jpg'))

    return {
      img1, img2, img3, img4,
    }

  },
  data() {
    return {
      items: [
        {
          avatar: this.img1,
          eventName: '',
          dateTime: '',
          time: '',
        }
      ],
    }
  },
  computed: {
    currentEvents() {
      const now = new Date();
      return this.items
        .filter(item => new Date(item.dateTime) > now) // 現在のイベントをフィルタリング
        .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime)); // 日付の古い順にソート
    },
    pastEvents() {
      const now = new Date();
      return this.items
        .filter(item => new Date(item.dateTime) <= now) // 過去のイベントをフィルタリング
        .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)); // 日付の新しい順にソート
    }
  },
  methods: {
      checkLoggedIn() {
        this.$session.start();
        if (!this.$session.has("token")) {
          router.push("/auth");
        }
      },
      formatDateTime(dateTime, time) {
        const date = new Date(dateTime);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const endHours = hours + parseInt(time);

        const formattedHours = hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedEndHours = endHours < 10 ? `0${endHours}` : endHours;


        return `${year}年${month}月${day}日${formattedHours}:${formattedMinutes}~${formattedEndHours}:${formattedMinutes}`;
      },

      test() {
          axios.get('http://localhost:8000/api/event/')
          .then(response => {
            this.items = response.data.map(data => {
              let img;
              switch (data.EventType) {
                case 'futsal1':
                case 'futsal2':
                  img = this.img1;
                  break;
                case 'volley':
                  img = this.img2;
                  break;
                case 'bbq':
                  img = this.img3;
                  break;
                case 'beer':
                  img = this.img4;
                  break;
                default:
                  img = this.img1;
              }

              return {
                avatar: img,
                eventName: data.EventName,
                dateTime: data.DateTime,
                time: data.Time,
              };
            })
      })
    },
  },
}

</script>
