// app.js
App({
  onLaunch: function () {
    // 获取系统信息（尽量使用新API）
    try {
      const systemInfo = wx.getSystemInfoSync();
      this.globalData.systemInfo = systemInfo;
    } catch (e) {
      console.error('获取系统信息失败', e);
    }
    
    // 检查是否是演示模式（最优先检查）
    this.checkDemoMode();
  },
  
  // 检查是否是演示模式
  checkDemoMode: function() {
    const isDemoMode = wx.getStorageSync('isDemoMode');
    
    if (isDemoMode) {
      console.log('应用运行在演示模式');
      this.globalData.isDemoMode = true;
      
      // 演示模式下，读取存储的token和用户信息
      const token = wx.getStorageSync('token');
      const userInfo = wx.getStorageSync('userInfo');
      
      if (token && userInfo) {
        this.globalData.token = token;
        this.globalData.isLoggedIn = true;
        this.globalData.userInfo = userInfo;
      }
    } else {
      // 非演示模式
      this.checkLoginStatus();
    }
  },
  
  // 检查普通登录状态
  checkLoginStatus: function() {
    const token = wx.getStorageSync('token');
    
    if (token) {
      this.globalData.token = token;
      this.globalData.isLoggedIn = true;
      
      // 从本地存储读取用户信息
      const userInfo = wx.getStorageSync('userInfo');
      if (userInfo) {
        this.globalData.userInfo = userInfo;
      } else {
        // 只有在有token但没有用户信息时才调用API
        this.getUserInfo();
      }
    }
  },

  // 获取用户信息的方法
  getUserInfo: function() {
    // 安全检查：演示模式下不调用API
    if (this.globalData.isDemoMode) return;
    
    // 安全检查：没有token不调用API
    if (!this.globalData.token) return;
    
    const that = this;
    wx.request({
      url: `${this.globalData.apiBaseUrl}/api/users/profile`,
      method: 'GET',
      header: {
        'Authorization': `Bearer ${this.globalData.token}`
      },
      success: (res) => {
        if (res.data && res.data.success && res.data.data) {
          that.globalData.userInfo = res.data.data;
          // 将用户信息保存到本地
          wx.setStorageSync('userInfo', res.data.data);
        } else {
          // Token可能过期，重新登录
          that.handleLoginFailure();
        }
      },
      fail: () => {
        // 网络请求失败，但不一定是token无效
        // 只显示提示，不清除登录状态
        wx.showToast({
          title: '网络连接失败',
          icon: 'none'
        });
      }
    });
  },
  
  // 处理登录失败
  handleLoginFailure: function() {
    // 清除登录状态
    this.globalData.isLoggedIn = false;
    this.globalData.token = '';
    this.globalData.userInfo = null;
    this.globalData.isDemoMode = false;
    
    // 清除存储
    wx.removeStorageSync('token');
    wx.removeStorageSync('userInfo');
    wx.removeStorageSync('isDemoMode');
    
    // 重定向到登录页
    wx.redirectTo({
      url: '/pages/login/login',
    });
  },
  
  // 判断是否处于演示模式（供页面使用）
  isDemoMode: function() {
    return this.globalData.isDemoMode;
  },

  // 全局数据
  globalData: {
    userInfo: null,
    systemInfo: null,
    isLoggedIn: false,
    token: '',
    apiBaseUrl: 'http://localhost:3000', // 开发环境API地址
    version: '1.0.0',
    isDemoMode: false // 是否为演示模式
  }
}); 