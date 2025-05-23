const app = getApp();
const { exercisePlans, exerciseRecords, healthKnowledge, communityPosts } = require('../../utils/mockData');

Page({
  data: {
    userInfo: null,
    isLoggedIn: false,
    exercisePlan: null,
    todayRecord: null,
    healthArticles: [],
    trendingTopics: [],
    loading: true
  },

  onLoad: function (options) {
    // 页面加载时检查登录状态和数据
    this.checkLoginStatus();
    
    // 添加登录状态监听
    this.loginStateListener();
  },

  onShow: function () {
    // 页面显示时也检查数据
    if (app.globalData.isLoggedIn) {
      this.loadData();
    }
  },

  // 检查登录状态
  checkLoginStatus: function () {
    if (app.globalData.isLoggedIn) {
      this.setData({
        isLoggedIn: true,
        userInfo: app.globalData.userInfo
      });
      
      // 加载数据
      this.loadData();
    } else {
      this.setData({
        isLoggedIn: false,
        loading: false
      });
    }
  },

  // 加载数据（统一入口）
  loadData: function() {
    // 根据是否是演示模式选择不同的数据加载方式
    if (app.globalData.isDemoMode) {
      this.loadMockData();
    } else {
      this.loadRealData();
    }
  },

  // 加载模拟数据
  loadMockData: function() {
    // 显示loading
    wx.showLoading({
      title: '加载中',
    });
    
    // 随机选择一个运动计划作为最新计划
    const randomPlan = exercisePlans[Math.floor(Math.random() * exercisePlans.length)];
    
    // 获取今日日期的记录（如果模拟数据中有）
    const today = new Date().toISOString().split('T')[0];
    const todayRecords = exerciseRecords.filter(record => record.date === today) || null;
    
    // 获取最多4篇健康文章
    const articles = healthKnowledge.slice(0, 4);
    
    // 获取最多3个热门社区话题
    const trending = communityPosts
      .filter(post => post.type === '话题交流')
      .slice(0, 3);
    
    // 延迟一点设置数据，模拟加载过程
    setTimeout(() => {
      this.setData({
        exercisePlan: randomPlan,
        todayRecord: todayRecords,
        healthArticles: articles,
        trendingTopics: trending,
        loading: false
      });
      wx.hideLoading();
    }, 300);
  },

  // 加载真实API数据
  loadRealData: function() {
    const token = app.globalData.token;
    if (!token) return;

    wx.showLoading({
      title: '加载中',
    });

    Promise.all([
      this.getLatestExercisePlan(token),
      this.getTodayExerciseRecord(token),
      this.getRecommendedArticles(token),
      this.getTrendingTopics(token)
    ]).then(([exercisePlan, todayRecord, healthArticles, trendingTopics]) => {
      this.setData({
        exercisePlan: exercisePlan,
        todayRecord: todayRecord,
        healthArticles: healthArticles,
        trendingTopics: trendingTopics,
        loading: false
      });
      wx.hideLoading();
    }).catch(err => {
      console.error('获取数据失败', err);
      
      // 在API请求失败时使用模拟数据
      this.loadMockData();
      
      wx.showToast({
        title: '网络异常，使用模拟数据',
        icon: 'none'
      });
    });
  },

  // 获取最新运动计划
  getLatestExercisePlan: function (token) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${app.globalData.apiBaseUrl}/api/exercises/plans`,
        method: 'GET',
        header: {
          'Authorization': `Bearer ${token}`
        },
        success: (res) => {
          if (res.data.success && res.data.data.length > 0) {
            // 取最新的计划
            resolve(res.data.data[0]);
          } else {
            resolve(null);
          }
        },
        fail: reject
      });
    });
  },

  // 获取今日运动记录
  getTodayExerciseRecord: function (token) {
    return new Promise((resolve, reject) => {
      const today = new Date().toISOString().split('T')[0];
      wx.request({
        url: `${app.globalData.apiBaseUrl}/api/exercises/records?startDate=${today}&endDate=${today}`,
        method: 'GET',
        header: {
          'Authorization': `Bearer ${token}`
        },
        success: (res) => {
          if (res.data.success && res.data.data.length > 0) {
            resolve(res.data.data);
          } else {
            resolve(null);
          }
        },
        fail: reject
      });
    });
  },

  // 获取推荐健康文章
  getRecommendedArticles: function (token) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${app.globalData.apiBaseUrl}/api/knowledge/recommended`,
        method: 'GET',
        header: {
          'Authorization': `Bearer ${token}`
        },
        success: (res) => {
          if (res.data.success) {
            resolve(res.data.data);
          } else {
            resolve([]);
          }
        },
        fail: reject
      });
    });
  },

  // 获取热门社区话题
  getTrendingTopics: function (token) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${app.globalData.apiBaseUrl}/api/community/trending`,
        method: 'GET',
        header: {
          'Authorization': `Bearer ${token}`
        },
        success: (res) => {
          if (res.data.success) {
            resolve(res.data.data);
          } else {
            resolve([]);
          }
        },
        fail: reject
      });
    });
  },

  // 跳转到登录页
  goToLogin: function () {
    wx.navigateTo({
      url: '/pages/login/login',
    });
  },

  // 跳转到健康档案
  goToHealthProfile: function () {
    wx.navigateTo({
      url: '/pages/healthProfile/healthProfile',
    });
  },

  // 跳转到计划详情
  goToPlanDetail: function (e) {
    const planId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/exercisePlan/detail?id=${planId}`,
    });
  },

  // 跳转到新建运动计划
  goToCreatePlan: function () {
    wx.navigateTo({
      url: '/pages/exercisePlan/generate',
    });
  },

  // 跳转到记录运动
  goToRecordExercise: function () {
    wx.navigateTo({
      url: '/pages/exerciseRecord/create',
    });
  },

  // 跳转到文章详情
  goToArticleDetail: function (e) {
    const articleId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/knowledge/detail?id=${articleId}`,
    });
  },

  // 查看更多健康知识
  goToKnowledgeList: function () {
    wx.navigateTo({
      url: '/pages/knowledge/list',
    });
  },

  // 查看更多社区内容
  goToCommunityList: function () {
    wx.switchTab({
      url: '/pages/community/list',
    });
  },

  // 下拉刷新
  onPullDownRefresh: function () {
    if (app.globalData.isLoggedIn) {
      this.loadData();
      wx.stopPullDownRefresh();
    } else {
      wx.stopPullDownRefresh();
    }
  },

  // 添加登录状态的监听
  loginStateListener: function() {
    // 监听登录状态变化
    const that = this;
    Object.defineProperty(app.globalData, 'isLoggedIn', {
      configurable: true,
      enumerable: true,
      set: function(newValue) {
        // 当isLoggedIn发生变化时的处理
        this._isLoggedIn = newValue;
        if (newValue) {
          // 登录状态改变为已登录
          that.setData({
            isLoggedIn: true,
            userInfo: app.globalData.userInfo
          });
          that.loadData();
        } else {
          // 登录状态改变为未登录
          that.setData({
            isLoggedIn: false,
            loading: false
          });
        }
      },
      get: function() {
        return this._isLoggedIn;
      }
    });
  }
}); 