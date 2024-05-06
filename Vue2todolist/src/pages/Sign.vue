<template>
  <div class="body">
    <div class="login">
      <p>SIGN-UP</p>
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
        <input
          type="text"
          name="password"
          placeholder="个人链接"
          v-model="link"
          required
        />
        <input
          type="text"
          name="password"
          placeholder="个人介绍"
          v-model="bio"
          required
        />
        <input type="submit" class="btn" value="注  册" @click="userSign" />
      </div>
      <router-link class="signLink" to="/login">登 录</router-link>
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
      userInfos: JSON.parse(localStorage.getItem("userInfos")) || [],
    };
  },
  methods: {
    userSign() {
      if (!this.username.trim()) {
        alert("用户名为空，请重新输入");
        return;
      }
      if (!this.password.trim()) {
        alert("密码为空，请重新输入");
        return;
      }
      if (!this.link.trim()) {
        alert("个人链接为空，请重新输入");
        return;
      }
      if (!this.bio.trim()) {
        alert("个人介绍为空，请重新输入");
        return;
      }

      this.$post('/user/register', {
        username: this.username,
        password: this.password,
        link: this.link,
        bio: this.bio,
      }).then(res => {
        if (res) {
          alert("注册成功,即将进行登录页面的跳转")
          this.$router.push("/login")
        }
      }).catch(err => {
        alert(err)
      })
    },
  },
};
</script>

<style scoped>
.signLink {
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
  margin-left: -250px;
  background-color: #afd8d0;
  width: 500px;
  height: 530px;
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

<!--
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="CSS/adminLogin.css">
    <title>Document</title>
    <base href="http://localhost:8080/OnlineShopping/">
</head>
<body>
<form action="admin/check" method="post" class="login">
    <p>Login</p>
    <div class="inputArea">
        <input type="text" name="adminName" placeholder="用户名" required>
        <input type="password" name="password" placeholder="密码" required>
        <input type="verificationCode" name="verificationCode" placeholder="后台验证码" required>
        <input type="submit" class="btn" value="登  录">
    </div>
</form>
</body>
<script>
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
        }
    }
    xhr.open("GET", "generate/verificationCode", true);
    xhr.send();
</script>

</html>














 -->
