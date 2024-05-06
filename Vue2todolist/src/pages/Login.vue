<template>
  <div class="body">
    <div class="login">
      <p>LOGIN-IN</p>
      <div class="inputArea">
        <input
          type="text"
          name="adminName"
          placeholder="用户名"
          v-model="username"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="密码"
          v-model="password"
          required
        />
        <input type="submit" class="btn" value="登  录" @click="userLogin" />
      </div>
      <router-link class="loginLink" to="/sign">注 册</router-link>
    </div>
  </div>
</template>

  <script>
export default {
  name: "signLogin",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    userLogin() {
      // const userInfos = JSON.parse(localStorage.getItem("userInfos"));
      // 设置一个用户登录成功的令牌，一旦令牌失效，用户就需要重新进行登录，完成令牌的绑定
      const username = this.username;
      const password = this.password;

      this.$post('/user/login', {
        username,
        password
      }).then(res => {
        if (res.data.token) {
          localStorage.setItem("userinfos", username);
          localStorage.setItem("todo_token", res.data.token)

          this.$get('/user/info').then(res => {

            localStorage.setItem("userinfosObj", JSON.stringify(res.data));

            this.$router.push("/myDay")
          }).catch(err => {
            console.log(err)
          })
        }
      }).catch(err => {
        alert(err)
      })

      // if (flag) {
      //   localStorage.setItem("isRegister", "true");
      //   this.$router.push({ name: "myDay" });
      // } else {
      //   alert("账号密码错误，请重新输入");
      // }
    },
  },
};
</script>

  <style scoped>
.loginLink {
  position: absolute;
  bottom: 30px;
  right: 40px;
  font-size: 20px;
}

* {
  user-select: none;
  /* 无法选中，整体感更强 */
}

.body {
  width: 100vw;
  height: 100vh;
  background: url(../../public/login.jpg);
  background-size: cover;
  text-align: center;
}

.login {
  position: absolute;
  top: 50%;
  margin-top: -250px;
  left: 50%;
  margin-left: -180px;
  background-color: #afd8d0;
  width: 400px;
  height: 450px;
  border-radius: 25px;
  text-align: center;
  padding: 5px 40px;
  box-sizing: border-box;
  opacity: 0.7;
}

p {
  margin-top: 50px;
  font-size: 42px;
  font-weight: 600;
}

input {
  background-color: #89d6e0;
  width: 80%;
  height: 48px;
  margin-bottom: 10px;
  border: none;
  border-bottom: 2px solid silver;
  /* 下面的会覆盖上面的步伐 */
  outline: none;
  font-size: 22px;
  padding-left: 15px;
}

.btn {
  background-color: #59c2c5;
  width: 38%;
  height: 48px;
  border-radius: 8px;
  margin-top: 40px;
  font-size: 28px;
  font-weight: 600;
  color: white;
}
.btn:hover {
  background-color: #59c2a0;
}
.inputArea {
  position: absolute;
  left: 0px;
  top: 145px;
}
</style>
