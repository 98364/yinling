const app = getApp();
const { userStats } = require('../../utils/mockData');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    hasUserInfo: false,
    avatarUrl: "/assets/images/default-avatar.png",
    isDemoMode: true, // 保留演示模式标志用于功能逻辑
    featuredMenu: [
      { id: 'healthProfile', text: '健康档案', icon: 'health-icon' },
      { id: 'exerciseRecord', text: '运动记录', icon: 'exercise-icon' },
      { id: 'healthStats', text: '健康数据', icon: 'stats-icon' },
      { id: 'reminders', text: '健康提醒', icon: 'reminder-icon' }
    ],
    menuList: [
      { id: 'favorites', text: '我的收藏', icon: 'favorite-icon' },
      { id: 'feedback', text: '意见反馈', icon: 'feedback-icon' },
      { id: 'settings', text: '设置', icon: 'settings-icon' },
      { id: 'about', text: '关于我们', icon: 'about-icon' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkLoginStatus();
    // 在演示模式下直接加载模拟数据
    if (this.data.isDemoMode) {
      this.loadDemoData();
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.checkLoginStatus();
  },

  /**
   * 检查登录状态
   */
  checkLoginStatus: function () {
    try {
      const token = wx.getStorageSync('token');
      const userInfo = wx.getStorageSync('userInfo');
      
      if (token && userInfo) {
        // 检查userInfo是否已经是对象
        let userInfoObj = userInfo;
        if (typeof userInfo === 'string') {
          try {
            userInfoObj = JSON.parse(userInfo);
          } catch (e) {
            console.error('解析用户信息失败:', e);
            userInfoObj = {};
          }
        }
        
        this.setData({
          userInfo: userInfoObj,
          hasUserInfo: true,
          avatarUrl: userInfoObj.avatarUrl || this.data.avatarUrl
        });
      } else if (this.data.isDemoMode) {
        // 演示模式下模拟登录
        this.setData({
          hasUserInfo: true,
          userInfo: {
            nickname: '张健康',
            avatarUrl: '/assets/images/default-avatar.png'
          },
          avatarUrl: '/assets/images/default-avatar.png'
        });
      } else {
        this.setData({
          userInfo: null,
          hasUserInfo: false,
          avatarUrl: "/assets/images/default-avatar.png"
        });
      }
    } catch (e) {
      console.error('检查登录状态出错:', e);
      // 出错时使用演示模式数据
      if (this.data.isDemoMode) {
        this.setData({
          hasUserInfo: true,
          userInfo: {
            nickname: '张健康',
            avatarUrl: '/assets/images/default-avatar.png'
          },
          avatarUrl: '/assets/images/default-avatar.png'
        });
      }
    }
  },

  /**
   * 加载演示数据
   */
  loadDemoData: function() {
    // 使用模拟数据替代真实数据
    const { exerciseStats, healthStats } = userStats;
    this.setData({
      'exerciseDays': exerciseStats.totalDays,
      'exerciseStreak': exerciseStats.streak,
      'healthPoints': exerciseStats.healthPoints
    });
  },

  /**
   * 跳转到登录页面
   */
  goToLogin: function () {
    if (this.data.isDemoMode) {
      // 演示模式下模拟登录成功
      this.setData({
        hasUserInfo: true,
        userInfo: {
          nickname: '张健康',
          avatarUrl: '/assets/images/default-avatar.png'
        },
        avatarUrl: '/assets/images/default-avatar.png'
      });
      
      // 显示登录成功的提示
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 2000
      });
      
      // 加载模拟数据
      this.loadDemoData();
      return;
    }
    
    wx.navigateTo({
      url: '/pages/login/login',
    });
  },

  /**
   * 菜单项点击事件
   */
  onMenuItemTap: function (e) {
    const id = e.currentTarget.dataset.id;
    
    // 演示模式下根据不同菜单项执行相应操作
    if (this.data.isDemoMode) {
      if (id === 'healthProfile') {
        wx.navigateTo({ url: '/pages/health/profile' });
        return;
      } else if (id === 'exerciseRecord') {
        wx.navigateTo({ url: '/pages/exerciseRecord/list' });
        return;
      } else if (id === 'healthStats') {
        wx.navigateTo({ url: '/pages/health/stats' });
        return;
      } else if (id === 'exercisePlan') {
        wx.navigateTo({ url: '/pages/exercisePlan/list' });
        return;
      } else if (id === 'about') {
        wx.showModal({
          title: '关于我们',
          content: '银铃健康管家是一款专注于个人健康管理的小程序，提供运动计划、健康数据统计等功能，帮助用户保持健康的生活方式。',
          showCancel: false
        });
        return;
      } else {
        wx.showToast({
          title: '功能开发中',
          icon: 'none',
          duration: 2000
        });
        return;
      }
    }
    
    // 根据id跳转到不同页面
    switch (id) {
      case 'healthProfile':
        wx.navigateTo({ url: '/pages/health/profile' });
        break;
      case 'exerciseRecord':
        wx.navigateTo({ url: '/pages/exerciseRecord/list' });
        break;
      case 'exercisePlan':
        wx.navigateTo({ url: '/pages/exercisePlan/list' });
        break;
      case 'healthStats':
        wx.navigateTo({ url: '/pages/health/stats' });
        break;
      case 'reminders':
        wx.navigateTo({ url: '/pages/reminders/list' });
        break;
      case 'favorites':
        wx.navigateTo({ url: '/pages/favorites/list' });
        break;
      case 'feedback':
        wx.navigateTo({ url: '/pages/feedback/create' });
        break;
      case 'settings':
        wx.navigateTo({ url: '/pages/settings/index' });
        break;
      case 'about':
        wx.navigateTo({ url: '/pages/about/index' });
        break;
      default:
        console.log('未知菜单项:', id);
    }
  },

  /**
   * 退出登录
   */
  logout: function () {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 演示模式下，直接改变状态即可
          if (this.data.isDemoMode) {
            this.setData({
              userInfo: null,
              hasUserInfo: false,
              avatarUrl: '/assets/images/default-avatar.png'
            });
            
            wx.showToast({
              title: '已退出登录',
              icon: 'success',
              duration: 2000
            });
            return;
          }
          
          // 清除本地存储的登录信息
          wx.removeStorageSync('token');
          wx.removeStorageSync('userInfo');
          
          // 更新页面状态
          this.setData({
            userInfo: null,
            hasUserInfo: false,
            avatarUrl: '/assets/images/default-avatar.png'
          });
          
          wx.showToast({
            title: '已退出登录',
            icon: 'success',
            duration: 2000
          });
        }
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '银铃健康管家',
      path: '/pages/index/index',
      imageUrl: '/assets/images/share-image.png'
    }
  }
}) 