// pages/exercisePlan/list.js
const { exercisePlans } = require('../../utils/mockData');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommendPlan: null,
    planList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadRecommendedPlan();
    this.loadPlanList();
  },

  /**
   * 加载推荐的运动计划
   */
  loadRecommendedPlan() {
    wx.showLoading({
      title: '加载推荐...',
    });
    
    // 使用模拟数据
    setTimeout(() => {
      // 随机选择一个推荐计划
      const randomIndex = Math.floor(Math.random() * exercisePlans.length);
      this.setData({ 
        recommendPlan: exercisePlans[randomIndex]
      });
      
      wx.hideLoading();
    }, 500);
  },

  /**
   * 加载用户的运动计划列表
   */
  loadPlanList() {
    wx.showLoading({
      title: '加载计划...',
    });
    
    // 使用模拟数据
    setTimeout(() => {
      this.setData({ 
        planList: exercisePlans
      });
      
      wx.hideLoading();
    }, 500);
  },

  /**
   * 跳转到运动计划详情页
   */
  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/exercisePlan/detail?id=${id}`,
    });
  },

  /**
   * 跳转到生成新运动计划页面
   */
  goToGenerate() {
    wx.navigateTo({
      url: '/pages/exercisePlan/generate',
    });
  },

  /**
   * 跳转到记录运动页面
   */
  goToRecord() {
    wx.navigateTo({
      url: '/pages/exerciseRecord/create',
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 每次显示页面时刷新数据
    this.loadPlanList();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    // 下拉刷新
    this.loadRecommendedPlan();
    this.loadPlanList();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '银铃健康管家 - 我的运动计划',
      path: '/pages/exercisePlan/list'
    };
  }
})