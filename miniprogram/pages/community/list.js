// pages/community/list.js
const { communityPosts } = require('../../utils/mockData');
const innerAudioContext = wx.createInnerAudioContext();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeTab: 'all', // all, checkin, topic
    selectedTopic: 'all',
    searchText: '',
    postList: [],
    originalPostList: [],
    isPlaying: false,
    currentVoiceId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 加载模拟数据
    this.setData({
      postList: communityPosts,
      originalPostList: [...communityPosts]
    });
    
    this.initAudio();
  },

  /**
   * 初始化音频播放器
   */
  initAudio() {
    innerAudioContext.onPlay(() => {
      this.setData({
        isPlaying: true
      });
    });
    
    innerAudioContext.onStop(() => {
      this.setData({
        isPlaying: false,
        currentVoiceId: null
      });
    });
    
    innerAudioContext.onEnded(() => {
      this.setData({
        isPlaying: false,
        currentVoiceId: null
      });
    });
    
    innerAudioContext.onError((res) => {
      wx.showToast({
        title: '播放失败',
        icon: 'none'
      });
      this.setData({
        isPlaying: false,
        currentVoiceId: null
      });
    });
  },

  /**
   * 切换标签页
   */
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      activeTab: tab
    });
    
    this.filterPosts();
  },

  /**
   * 选择话题
   */
  selectTopic(e) {
    const topic = e.currentTarget.dataset.topic;
    this.setData({
      selectedTopic: topic
    });
    
    this.filterPosts();
  },

  /**
   * 搜索输入
   */
  onSearchInput(e) {
    this.setData({
      searchText: e.detail.value
    });
    
    // 使用防抖，避免频繁搜索
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }
    
    this.searchTimer = setTimeout(() => {
      this.filterPosts();
    }, 300);
  },

  /**
   * 筛选帖子
   */
  filterPosts() {
    const { activeTab, selectedTopic, searchText, originalPostList } = this.data;
    
    let filteredList = [...originalPostList];
    
    // 按标签筛选
    if (activeTab === 'checkin') {
      filteredList = filteredList.filter(post => post.type === '运动打卡');
    } else if (activeTab === 'topic') {
      filteredList = filteredList.filter(post => post.type === '话题交流');
      
      // 按话题筛选
      if (selectedTopic !== 'all') {
        // 这里需要根据实际话题标签匹配逻辑修改
        // 示例中假设内容或标题包含话题关键词就算匹配
        const topicKeywords = {
          'exercise': '运动',
          'health': '健康',
          'diet': '饮食',
          'joint': '关节',
          'chronic': '高血压|糖尿病|慢病'
        };
        
        const keyword = topicKeywords[selectedTopic];
        if (keyword) {
          const regex = new RegExp(keyword);
          filteredList = filteredList.filter(post => 
            regex.test(post.content) || 
            (post.title && regex.test(post.title))
          );
        }
      }
    }
    
    // 按搜索文本筛选
    if (searchText) {
      const regex = new RegExp(searchText, 'i');
      filteredList = filteredList.filter(post => 
        regex.test(post.content) || 
        (post.title && regex.test(post.title))
      );
    }
    
    this.setData({
      postList: filteredList
    });
  },

  /**
   * 点赞/取消点赞
   */
  toggleLike(e) {
    const postId = e.currentTarget.dataset.id;
    const { postList, originalPostList } = this.data;
    
    // 更新显示列表
    const updatedPostList = postList.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    });
    
    // 同步更新原始列表
    const updatedOriginalList = originalPostList.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    });
    
    this.setData({
      postList: updatedPostList,
      originalPostList: updatedOriginalList
    });
  },

  /**
   * 播放语音
   */
  playVoice(e) {
    const { url, id } = e.currentTarget.dataset;
    const { isPlaying, currentVoiceId } = this.data;
    
    // 如果当前有语音在播放，停止它
    if (isPlaying) {
      innerAudioContext.stop();
    }
    
    // 如果点击的是当前正在播放的语音，则停止播放
    if (isPlaying && currentVoiceId === id) {
      return;
    }
    
    // 播放新的语音
    innerAudioContext.src = url;
    innerAudioContext.play();
    
    this.setData({
      currentVoiceId: id
    });
  },

  /**
   * 预览图片
   */
  previewImage(e) {
    const current = e.currentTarget.dataset.src;
    const urls = e.currentTarget.dataset.images;
    
    wx.previewImage({
      current,
      urls
    });
  },

  /**
   * 分享帖子
   */
  share(e) {
    // 实际开发中可以调用小程序分享接口
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  /**
   * 跳转到详情页
   */
  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/community/detail?id=${id}`,
    });
  },

  /**
   * 跳转到发布页
   */
  goToPublish() {
    wx.navigateTo({
      url: '/pages/community/create',
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    // 刷新数据
    this.setData({
      postList: [...this.data.originalPostList]
    });
    
    wx.stopPullDownRefresh();
    
    wx.showToast({
      title: '刷新成功',
      icon: 'success'
    });
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // 页面卸载时停止语音播放
    if (innerAudioContext) {
      innerAudioContext.stop();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '银铃健康管家 - 健康社区',
      path: '/pages/community/list'
    };
  }
})