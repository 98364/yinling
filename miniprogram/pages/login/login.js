const app = getApp();

Page({
  data: {
    phone: '',
    password: '',
    isPasswordLogin: true, // 当前是否为密码登录模式
    countdown: 0, // 验证码倒计时
    loading: false, // 登录按钮状态
    phoneError: '', // 手机号错误提示
    passwordError: '', // 密码错误提示
    showPassword: false, // 是否显示密码
  },

  onLoad: function (options) {
    // 如果已经登录，直接跳转到首页
    if (app.globalData.isLoggedIn) {
      wx.switchTab({
        url: '/pages/index/index',
      });
    }
  },

  // 切换登录方式
  switchLoginType: function () {
    this.setData({
      isPasswordLogin: !this.data.isPasswordLogin,
      phoneError: '',
      passwordError: ''
    });
  },

  // 输入手机号
  inputPhone: function (e) {
    this.setData({
      phone: e.detail.value,
      phoneError: ''
    });
  },

  // 输入密码
  inputPassword: function (e) {
    this.setData({
      password: e.detail.value,
      passwordError: ''
    });
  },

  // 显示/隐藏密码
  togglePasswordVisibility: function () {
    this.setData({
      showPassword: !this.data.showPassword
    });
  },

  // 获取验证码
  getVerificationCode: function () {
    const phone = this.data.phone;
    // 验证手机号
    if (!this.validatePhone(phone)) {
      return;
    }

    // 模拟验证码发送
    wx.showLoading({
      title: '发送中...',
    });

    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '验证码已发送',
        icon: 'success'
      });

      // 开始倒计时
      this.startCountdown();
    }, 1000);
  },

  // 开始倒计时
  startCountdown: function () {
    this.setData({
      countdown: 60
    });

    const timer = setInterval(() => {
      if (this.data.countdown <= 1) {
        clearInterval(timer);
        this.setData({
          countdown: 0
        });
      } else {
        this.setData({
          countdown: this.data.countdown - 1
        });
      }
    }, 1000);
  },

  // 验证手机号
  validatePhone: function (phone) {
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phone) {
      this.setData({
        phoneError: '请输入手机号'
      });
      return false;
    } else if (!phoneRegex.test(phone)) {
      this.setData({
        phoneError: '手机号格式不正确'
      });
      return false;
    }
    return true;
  },

  // 验证密码
  validatePassword: function (password) {
    if (!password) {
      this.setData({
        passwordError: this.data.isPasswordLogin ? '请输入密码' : '请输入验证码'
      });
      return false;
    } else if (this.data.isPasswordLogin && password.length < 6) {
      this.setData({
        passwordError: '密码至少6位'
      });
      return false;
    } else if (!this.data.isPasswordLogin && password.length !== 6) {
      this.setData({
        passwordError: '验证码为6位数字'
      });
      return false;
    }
    return true;
  },

  // 登录
  login: function () {
    const { phone, password, isPasswordLogin } = this.data;

    // 验证输入
    if (!this.validatePhone(phone) || !this.validatePassword(password)) {
      return;
    }

    this.setData({ loading: true });

    // 根据登录方式调用不同API
    if (isPasswordLogin) {
      this.passwordLogin(phone, password);
    } else {
      this.verificationCodeLogin(phone, password);
    }
  },

  // 密码登录
  passwordLogin: function (phone, password) {
    wx.request({
      url: `${app.globalData.apiBaseUrl}/api/users/login`,
      method: 'POST',
      data: {
        phone,
        password
      },
      success: (res) => {
        if (res.data.success) {
          this.loginSuccess(res.data.data);
        } else {
          this.setData({
            loading: false,
            passwordError: res.data.message || '登录失败，请检查账号密码'
          });
        }
      },
      fail: (err) => {
        console.error('登录请求失败', err);
        this.setData({
          loading: false,
          passwordError: '网络请求失败，请重试'
        });
      }
    });
  },

  // 验证码登录 (模拟)
  verificationCodeLogin: function (phone, verificationCode) {
    // 简化处理，实际应调用短信验证码登录API
    setTimeout(() => {
      // 模拟登录成功
      const mockUserData = {
        id: 1,
        phone: phone,
        nickname: '新用户' + phone.substring(7),
        token: 'mock_token_' + Date.now()
      };
      this.loginSuccess(mockUserData);
    }, 1000);
  },

  // 登录成功的处理
  loginSuccess: function (userData) {
    // 保存token
    wx.setStorageSync('token', userData.token);
    
    // 更新全局数据
    app.globalData.isLoggedIn = true;
    app.globalData.token = userData.token;
    app.globalData.userInfo = userData;
    
    this.setData({ loading: false });
    
    // 提示登录成功
    wx.showToast({
      title: '登录成功',
      icon: 'success',
      duration: 1500,
      success: () => {
        // 导航到首页
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/index/index',
          });
        }, 1500);
      }
    });
  },

  // 微信快捷登录
  wxLogin: function () {
    this.setData({ loading: true });
    
    wx.login({
      success: (res) => {
        if (res.code) {
          // 发送code到后端
          wx.request({
            url: `${app.globalData.apiBaseUrl}/api/users/wx-login`,
            method: 'POST',
            data: {
              code: res.code
            },
            success: (response) => {
              if (response.data.success) {
                this.loginSuccess(response.data.data);
              } else {
                this.setData({
                  loading: false
                });
                wx.showToast({
                  title: response.data.message || '微信登录失败',
                  icon: 'none'
                });
              }
            },
            fail: () => {
              this.setData({
                loading: false
              });
              wx.showToast({
                title: '网络请求失败',
                icon: 'none'
              });
            }
          });
        } else {
          this.setData({
            loading: false
          });
          wx.showToast({
            title: '微信登录失败',
            icon: 'none'
          });
        }
      },
      fail: () => {
        this.setData({
          loading: false
        });
        wx.showToast({
          title: '微信登录失败',
          icon: 'none'
        });
      }
    });
  },

  // 前往注册
  goToRegister: function () {
    wx.navigateTo({
      url: '/pages/register/register',
    });
  },

  // 演示登录
  demoLogin: function () {
    this.setData({ loading: true });
    
    wx.showLoading({
      title: '正在登录...',
    });
    
    setTimeout(() => {
      // 模拟登录成功，使用演示账号数据
      const demoUserData = {
        id: 999,
        phone: '13800138000',
        nickname: '演示用户',
        avatar: '/assets/images/avatar2.png',
        token: 'demo_token_' + Date.now()
      };
      
      // 保存token和演示模式标记
      wx.setStorageSync('token', demoUserData.token);
      wx.setStorageSync('isDemoMode', true);
      wx.setStorageSync('userInfo', demoUserData);
      
      // 更新全局数据
      app.globalData.isLoggedIn = true;
      app.globalData.token = demoUserData.token;
      app.globalData.userInfo = demoUserData;
      app.globalData.isDemoMode = true; // 标记为演示模式
      
      this.setData({ loading: false });
      
      wx.hideLoading();
      
      // 提示登录成功并跳转
      wx.showToast({
        title: '演示登录成功',
        icon: 'success',
        duration: 1000,
        complete: () => {
          // 因为首页是tabBar页面，只能使用switchTab跳转
          wx.switchTab({
            url: '/pages/index/index',
            success: () => {
              console.log('跳转到首页成功');
            },
            fail: (error) => {
              console.error('跳转到首页失败:', error);
            }
          });
        }
      });
    }, 1000);
  },
}); 