<template>
  <div class="home">
     <ul v-if="trips && trips.length">
        <li v-for="trip of trips">
          <p><strong>Trip ID:{{trip.ID}} {{trip.Name}}</strong></p>
          <p><strong>from :{{trip.CreatedAt}}</strong></p>
          <p><strong>to: {{trip.UpdatedAt}}</strong></p>
          <p><strong>members: {{trip.Members}}</strong></p>
        </li>
     </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import axios from 'axios';

@Component({
  components: {
  HelloWorld,
  },
  })
export default class Home extends Vue {
  data() {
    return {
      trips: [],
    };
  }
  created() {
    axios.get('https://shielded-refuge-72430.herokuapp.com/trip')
      .then(response => this.trips = response.data)
      .catch(e => console.log('err', e));
  }
}
</script>
