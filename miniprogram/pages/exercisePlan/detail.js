// pages/exercisePlan/detail.js
const { exercisePlans } = require('../../utils/mockData');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    plan: null,
    isTimerVisible: false,
    isTimerRunning: false,
    timerSeconds: 0,
    timerDisplay: '00:00',
    timerId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { id } = options;
    if (id) {
      this.loadPlanDetail(id);
    }
  },

  /**
   * 加载运动计划详情
   */
  loadPlanDetail(id) {
    wx.showLoading({
      title: '加载中...',
    });
    
    // 使用模拟数据
    setTimeout(() => {
      // 查找对应ID的计划
      const planId = parseInt(id);
      const plan = exercisePlans.find(p => p.id === planId);
      
      if (plan) {
        this.setData({ plan });
      } else {
        wx.showToast({
          title: '未找到计划信息',
          icon: 'none'
        });
      }
      
      wx.hideLoading();
    }, 500);
  },

  /**
   * 开始运动
   */
  startExercise() {
    this.setData({
      isTimerVisible: true,
      isTimerRunning: false,
      timerSeconds: 0,
      timerDisplay: '00:00'
    });
    
    // 滚动到计时器位置
    wx.pageScrollTo({
      selector: '.timer-section',
      duration: 300
    });
  },

  /**
   * 开始/暂停计时器
   */
  toggleTimer() {
    const { isTimerRunning, timerId } = this.data;
    
    if (isTimerRunning) {
      // 暂停计时器
      if (timerId) {
        clearInterval(timerId);
      }
      
      this.setData({
        isTimerRunning: false,
        timerId: null
      });
    } else {
      // 开始计时器
      const newTimerId = setInterval(() => {
        const { timerSeconds } = this.data;
        const newSeconds = timerSeconds + 1;
        
        // 格式化时间显示
        const minutes = Math.floor(newSeconds / 60);
        const seconds = newSeconds % 60;
        const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        this.setData({
          timerSeconds: newSeconds,
          timerDisplay: display
        });
      }, 1000);
      
      this.setData({
        isTimerRunning: true,
        timerId: newTimerId
      });
    }
  },

  /**
   * 重置计时器
   */
  resetTimer() {
    const { timerId } = this.data;
    
    if (timerId) {
      clearInterval(timerId);
    }
    
    this.setData({
      isTimerRunning: false,
      timerSeconds: 0,
      timerDisplay: '00:00',
      timerId: null
    });
  },

  /**
   * 设置提醒
   */
  setReminder() {
    wx.showActionSheet({
      itemList: ['每天提醒', '仅工作日提醒', '自定义提醒'],
      success: (res) => {
        // 模拟设置提醒
        if (res.tapIndex === 0 || res.tapIndex === 1) {
          this.showTimePicker('设置提醒时间');
        } else if (res.tapIndex === 2) {
          this.showCustomReminder();
        }
      }
    });
  },

  /**
   * 显示时间选择器
   */
  showTimePicker(title) {
    wx.showToast({
      title: '设置了提醒',
      icon: 'success'
    });
    
    // 实际开发中，这里应该弹出时间选择器
    // 并且将用户选择的时间保存到服务器或本地
  },

  /**
   * 显示自定义提醒设置
   */
  showCustomReminder() {
    wx.showToast({
      title: '设置了提醒',
      icon: 'success'
    });
    
    // 实际开发中，这里应该弹出自定义提醒设置界面
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    const { plan } = this.data;
    if (!plan) return {};
    
    return {
      title: `银铃健康管家 - ${plan.name}`,
      path: `/pages/exercisePlan/detail?id=${plan.id}`,
      imageUrl: plan.image
    };
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // 清除计时器
    const { timerId } = this.data;
    if (timerId) {
      clearInterval(timerId);
    }
  }
})