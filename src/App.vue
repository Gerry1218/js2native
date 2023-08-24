<template>
  <div id="app" class="container">
    <h1>Hello {{ title }} </h1>
    <button class="btn" @click="onClick">call native方法</button>
    <div class="content">
      <label>params: {{ params }}</label>
      <label>消息: {{ msg }}</label>
      <label>平台: {{ platform }}</label>
    </div>
    <input class="text" name="测试"/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      title: "world",
      params: '',
      msg: '',
      platform : ''
    }

  }, 
  beforeCreate() {
      console.log('onCreate')
      this.$bridge.registerHandler('callJS', (data, responseCallback)=> {
        console.log("data: ", data)
        let cbData = JSON.parse(data)
        this.platform = cbData.platform
        this.params = data
        this.msg = '调用了callJS方法:'
        let x = {
          "platform":"js",
          "type":2
        }
        responseCallback(x)
      })
    },
  methods: {
    
    onClick() {
      console.log(this)
      let data = {
        "action" : "go_goods_detail",
        "params" : {
          "name": "gerry"
        }
      }
      this.$bridge.callhandler('callNative', data,
        (cb) => {
          let cbData = JSON.parse(cb)
          let val = cbData.platform
          console.log(cb)
          this.params = cb
          this.platform = val
          this.title = 'gerry'
          this.msg = '调用了callNative方法:'
        })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  display: flex;
  flex-direction: column;
}

.text {
  /* background-color: aquamarine;
  height: 40px; */
}

.btn {
  height: 35px;
  width: 150px;
  background-color: dodgerblue;
  color: white;
  border: none;
  font-size: 16px;
  border-radius: 5px;
}

.content {
  margin-top: 10px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  font-size: 16px;
}
</style>
