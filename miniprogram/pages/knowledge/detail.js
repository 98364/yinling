// pages/knowledge/detail.js
const app = getApp();
const { healthKnowledge } = require('../../utils/mockData');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    article: null,
    isLoading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { id } = options;
    
    if (id) {
      this.setData({ id: parseInt(id) });
      this.loadArticleDetail();
    } else {
      wx.showToast({
        title: '文章不存在',
        icon: 'none',
        complete: () => {
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        }
      });
    }
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
   * 加载文章详情
   */
  loadArticleDetail() {
    const { id } = this.data;
    this.setData({ isLoading: true });
    
    setTimeout(() => {
      // 使用模拟数据查找文章
      const article = healthKnowledge.find(a => a.id === id);
      
      if (article) {
        // 更新页面标题
        wx.setNavigationBarTitle({
          title: article.title
        });
        
        this.setData({
          article: article,
          isLoading: false
        });
      } else {
        this.setData({ isLoading: false });
        wx.showToast({
          title: '文章不存在',
          icon: 'none',
          complete: () => {
            setTimeout(() => {
              wx.navigateBack();
            }, 1500);
          }
        });
      }
    }, 500);
  },
  
  /**
   * 查看原图
   */
  previewImage(e) {
    const { article } = this.data;
    if (!article) return;
    
    wx.previewImage({
      urls: [article.image],
      current: article.image
    });
  },
  
  /**
   * 分享文章
   */
  onShareAppMessage() {
    const { article } = this.data;
    if (!article) return {};
    
    return {
      title: article.title,
      path: `/pages/knowledge/detail?id=${article.id}`
    };
  }
})