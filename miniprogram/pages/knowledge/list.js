// pages/knowledge/list.js
const app = getApp();
const { healthKnowledge } = require('../../utils/mockData');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [
      { id: 'all', name: '全部' },
      { id: '饮食', name: '饮食' },
      { id: '运动', name: '运动' },
      { id: '疾病', name: '疾病' },
      { id: '心理', name: '心理' },
      { id: '护理', name: '护理' }
    ],
    selectedCategory: 'all',
    articles: [],
    allArticles: [],
    searchText: '',
    isLoading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 如果从其他页面带参数过来，设置选中的分类
    if (options.category) {
      this.setData({
        selectedCategory: options.category
      });
    }
    
    this.loadArticles();
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
   * 加载文章数据
   */
  loadArticles() {
    this.setData({ isLoading: true });
    
    setTimeout(() => {
      // 使用模拟数据
      let articles = [...healthKnowledge];
      
      // 保存所有文章用于搜索
      this.setData({
        allArticles: articles,
        isLoading: false
      });
      
      this.filterArticles();
    }, 500);
  },
  
  /**
   * 根据分类和搜索词筛选文章
   */
  filterArticles() {
    const { selectedCategory, allArticles, searchText } = this.data;
    
    let filteredArticles = [...allArticles];
    
    // 按分类筛选
    if (selectedCategory !== 'all') {
      filteredArticles = filteredArticles.filter(article => 
        article.category === selectedCategory
      );
    }
    
    // 按搜索词筛选
    if (searchText) {
      const lowerSearchText = searchText.toLowerCase();
      filteredArticles = filteredArticles.filter(article => 
        article.title.toLowerCase().includes(lowerSearchText) || 
        article.summary.toLowerCase().includes(lowerSearchText)
      );
    }
    
    this.setData({
      articles: filteredArticles
    });
  },
  
  /**
   * 切换分类
   */
  switchCategory(e) {
    const category = e.currentTarget.dataset.category;
    
    this.setData({
      selectedCategory: category
    });
    
    this.filterArticles();
  },
  
  /**
   * 搜索输入
   */
  onSearchInput(e) {
    this.setData({
      searchText: e.detail.value
    });
    
    this.filterArticles();
  },
  
  /**
   * 清除搜索
   */
  clearSearch() {
    this.setData({
      searchText: ''
    });
    
    this.filterArticles();
  },
  
  /**
   * 查看文章详情
   */
  viewArticle(e) {
    const articleId = e.currentTarget.dataset.id;
    
    wx.navigateTo({
      url: `/pages/knowledge/detail?id=${articleId}`
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.loadArticles();
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

  }
})