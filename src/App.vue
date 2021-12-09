<template>
  <div id="app">
    <div class="container">
      <div class="box" v-for="item in imageDate" :key="item.id">
        <div class="img-box">
          <img v-lazy="item.src" :alt="item.title">
        </div>
        <div class="content-box">
          <h1>{{ item.title }}</h1>
          <p>{{ item.teacher }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      imageDate: []
    };
  },
  mounted() {
    this.handleReq()
  },
  methods:{
    async handleReq(){
      const res = await axios("http://localhost:3000/imgs")
      console.log(res)
      this.imageDate = res.data
    }
  }
}
</script>

<style lang="scss">
  html,
  body,
  #app,
  .container{
    height: 100%;
    margin: 0;
  }
  .container{
    overflow: auto;
    .box{
      position: relative;
      height: 110px;
      padding: 5px 10px;
      box-sizing: border-box;
      border-bottom: 1px solid #ededed;
      .img-box{
        height: 100%;
        img{
          height: 100%;
        }
      }
    }
    .content-box{
      position: absolute;
      top: 0;
      left: 0;
      padding-left: 10rem;
      h1{
        font-size: 16px;
      }
      p{
        font-size: 14px;
        color: #666;
      }
    }
  }
</style>