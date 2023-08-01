<template>

  <div class="dashboard-container" >
    <div class="dashboard-text">name: {{ name }}</div>
    <div id="yy">
     fsd
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
#yy{

  background-image:url('img_1.png');
  background-size:100% 100%;
  height: 1080px;
}
.dashboard {

  &-container {
    margin: 1px;


  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
