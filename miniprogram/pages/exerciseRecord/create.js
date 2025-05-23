// pages/exerciseRecord/create.js
const app = getApp();
const { exercisePlans } = require('../../utils/mockData');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    exerciseTypes: ['散步', '快走', '慢跑', '太极拳', '八段锦', '广场舞', '健身操', '瑜伽', '游泳', '其他'],
    intensities: ['轻松', '适中', '较强', '剧烈'],
    selectedType: '散步',
    selectedIntensity: '适中',
    duration: 30,  // 默认30分钟
    date: '',
    time: '',
    notes: '',
    showPicker: false,
    pickerType: '',  // 'type', 'intensity'
    isLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取当前日期和时间
    const now = new Date();
    const date = this.formatDate(now);
    const time = this.formatTime(now);
    
    this.setData({
      date: date,
      time: time
    });
    
    // 如果有计划ID，预先填充运动类型
    if (options.planId) {
      const planId = parseInt(options.planId);
      const plan = exercisePlans.find(p => p.id === planId);
      if (plan) {
        this.setData({
          selectedType: plan.category,
          duration: plan.duration
        });
      }
    }
  },

  // 格式化日期为YYYY-MM-DD
  formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  },
  
  // 格式化时间为HH:MM
  formatTime(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  },
  
  // 选择日期
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    });
  },
  
  // 选择时间
  bindTimeChange(e) {
    this.setData({
      time: e.detail.value
    });
  },
  
  // 调整持续时间
  adjustDuration(e) {
    const action = e.currentTarget.dataset.action;
    let duration = this.data.duration;
    
    if (action === 'decrease' && duration > 5) {
      duration -= 5;
    } else if (action === 'increase' && duration < 180) {
      duration += 5;
    }
    
    this.setData({
      duration: duration
    });
  },
  
  // 输入持续时间
  inputDuration(e) {
    let value = parseInt(e.detail.value);
    
    // 确保值在有效范围内
    if (isNaN(value) || value < 1) {
      value = 1;
    } else if (value > 180) {
      value = 180;
    }
    
    this.setData({
      duration: value
    });
  },
  
  // 输入备注
  inputNotes(e) {
    this.setData({
      notes: e.detail.value
    });
  },
  
  // 显示选择器
  showPicker(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      showPicker: true,
      pickerType: type
    });
  },
  
  // 隐藏选择器
  hidePicker() {
    this.setData({
      showPicker: false
    });
  },
  
  // 确认选择器
  confirmPicker(e) {
    const { value } = e.detail;
    const { pickerType, exerciseTypes, intensities } = this.data;
    
    if (pickerType === 'type') {
      this.setData({
        selectedType: exerciseTypes[value]
      });
    } else if (pickerType === 'intensity') {
      this.setData({
        selectedIntensity: intensities[value]
      });
    }
    
    this.hidePicker();
  },
  
  // 保存记录
  saveRecord() {
    const { selectedType, selectedIntensity, duration, date, time, notes } = this.data;
    
    // 验证输入
    if (!selectedType || !selectedIntensity || !duration || !date || !time) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }
    
    this.setData({ isLoading: true });
    
    // 模拟保存记录
    setTimeout(() => {
      this.setData({ isLoading: false });
      
      wx.showToast({
        title: '记录已保存',
        icon: 'success',
        duration: 1500,
        success: () => {
          // 延迟返回
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        }
      });
    }, 1000);
  },
  
  // 取消并返回
  cancel() {
    wx.showModal({
      title: '提示',
      content: '确定要放弃当前的记录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.navigateBack();
        }
      }
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

  }
})