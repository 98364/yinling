// pages/community/detail.js
const { communityPosts, postComments } = require('../../utils/mockData');
const innerAudioContext = wx.createInnerAudioContext();
const recorderManager = wx.getRecorderManager();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    post: null,
    commentList: [],
    isPlaying: false,
    inputPlaceholder: '说点什么...',
    commentText: '',
    inputFocus: false,
    currentReplyId: null,
    currentReplyUsername: '',
    isRecording: false,
    isRecordCanceled: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { id } = options;
    if (id) {
      this.loadPostDetail(id);
    }
    
    this.initAudio();
    this.initVoiceRecord();
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
        isPlaying: false
      });
    });
    
    innerAudioContext.onEnded(() => {
      this.setData({
        isPlaying: false
      });
    });
    
    innerAudioContext.onError((res) => {
      wx.showToast({
        title: '播放失败',
        icon: 'none'
      });
      this.setData({
        isPlaying: false
      });
    });
  },

  /**
   * 初始化语音录制
   */
  initVoiceRecord() {
    // 监听录音开始事件
    recorderManager.onStart(() => {
      this.setData({
        isRecording: true,
        isRecordCanceled: false
      });
    });
    
    // 监听录音停止事件
    recorderManager.onStop((res) => {
      if (this.data.isRecordCanceled) {
        this.setData({
          isRecording: false,
          isRecordCanceled: false
        });
        return;
      }
      
      this.setData({
        isRecording: false
      });
      
      const { tempFilePath, duration } = res;
      
      // 语音时长过短
      if (duration < 1000) {
        wx.showToast({
          title: '语音时间太短',
          icon: 'none'
        });
        return;
      }
      
      // 发送语音评论
      // 实际开发中，这里应该上传语音文件到服务器
      // 然后将语音URL作为评论内容保存
      wx.showToast({
        title: '语音评论已发送',
        icon: 'success'
      });
      
      this.addNewComment({
        content: '[语音评论]',
        voiceUrl: tempFilePath,
        voiceDuration: Math.floor(duration / 1000)
      });
    });
    
    // 监听录音错误事件
    recorderManager.onError((res) => {
      wx.showToast({
        title: '录音失败: ' + res.errMsg,
        icon: 'none'
      });
      this.setData({
        isRecording: false,
        isRecordCanceled: false
      });
    });
  },

  /**
   * 加载帖子详情
   */
  loadPostDetail(id) {
    wx.showLoading({
      title: '加载中...',
    });
    
    // 使用模拟数据
    setTimeout(() => {
      const postId = parseInt(id);
      
      // 查找帖子
      const post = communityPosts.find(p => p.id === postId);
      
      // 查找评论
      let comments = [];
      if (postComments[postId]) {
        comments = postComments[postId];
      }
      
      if (post) {
        this.setData({
          post,
          commentList: comments
        });
      } else {
        wx.showToast({
          title: '未找到帖子',
          icon: 'none'
        });
      }
      
      wx.hideLoading();
    }, 500);
  },

  /**
   * 播放语音
   */
  playVoice(e) {
    const url = e.currentTarget.dataset.url;
    const { isPlaying } = this.data;
    
    if (isPlaying) {
      innerAudioContext.stop();
    }
    
    innerAudioContext.src = url;
    innerAudioContext.play();
  },

  /**
   * 点赞/取消点赞
   */
  toggleLike() {
    const { post } = this.data;
    
    this.setData({
      'post.isLiked': !post.isLiked,
      'post.likes': post.isLiked ? post.likes - 1 : post.likes + 1
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
   * 评论输入
   */
  onCommentInput(e) {
    this.setData({
      commentText: e.detail.value
    });
  },

  /**
   * 回复评论
   */
  replyComment(e) {
    const { id, username } = e.currentTarget.dataset;
    
    this.setData({
      inputPlaceholder: `回复 ${username}：`,
      inputFocus: true,
      currentReplyId: id,
      currentReplyUsername: username
    });
  },

  /**
   * 提交评论
   */
  submitComment() {
    const { commentText, currentReplyId, currentReplyUsername } = this.data;
    
    if (!commentText.trim()) {
      return;
    }
    
    if (currentReplyId) {
      // 回复评论
      this.addNewReply({
        content: commentText,
        replyTo: currentReplyUsername
      });
    } else {
      // 发表新评论
      this.addNewComment({
        content: commentText
      });
    }
    
    // 清空输入框
    this.setData({
      commentText: '',
      inputPlaceholder: '说点什么...',
      currentReplyId: null,
      currentReplyUsername: ''
    });
  },

  /**
   * 添加新评论
   */
  addNewComment(commentData) {
    const { commentList, post } = this.data;
    
    // 构建评论对象
    const newComment = {
      id: Date.now(), // 模拟ID
      username: '当前用户', // 实际应该是当前登录用户
      avatar: '/assets/images/avatar_self.png', // 实际应该是当前用户头像
      content: commentData.content,
      time: '刚刚',
      replies: [],
      voiceUrl: commentData.voiceUrl || '',
      voiceDuration: commentData.voiceDuration || 0
    };
    
    // 更新评论列表和帖子评论数
    this.setData({
      commentList: [newComment, ...commentList],
      'post.comments': post.comments + 1
    });
  },

  /**
   * 添加新回复
   */
  addNewReply(replyData) {
    const { commentList, currentReplyId, post } = this.data;
    
    // 构建回复对象
    const newReply = {
      id: Date.now(), // 模拟ID
      username: '当前用户', // 实际应该是当前登录用户
      content: replyData.content,
      time: '刚刚',
      replyTo: replyData.replyTo
    };
    
    // 更新指定评论的回复列表和帖子评论数
    const updatedCommentList = commentList.map(comment => {
      if (comment.id === currentReplyId) {
        return {
          ...comment,
          replies: [...comment.replies, newReply]
        };
      }
      return comment;
    });
    
    this.setData({
      commentList: updatedCommentList,
      'post.comments': post.comments + 1
    });
  },

  /**
   * 开始录音
   */
  startVoiceRecord() {
    // 检查录音权限
    wx.authorize({
      scope: 'scope.record',
      success: () => {
        const options = {
          duration: 60000, // 最长录音时间，单位ms
          sampleRate: 16000, // 采样率
          numberOfChannels: 1, // 录音通道数
          encodeBitRate: 64000, // 编码码率
          format: 'mp3' // 音频格式
        };
        
        recorderManager.start(options);
      },
      fail: () => {
        wx.showModal({
          title: '提示',
          content: '需要您授权录音权限',
          success: (res) => {
            if (res.confirm) {
              wx.openSetting();
            }
          }
        });
      }
    });
  },

  /**
   * 结束录音
   */
  endVoiceRecord() {
    if (this.data.isRecording && !this.data.isRecordCanceled) {
      recorderManager.stop();
    }
  },

  /**
   * 取消录音
   */
  cancelVoiceRecord(e) {
    if (this.data.isRecording) {
      // 判断手指上滑距离，超过一定值则取消录音
      const touchY = e.touches[0].clientY;
      const startY = this.startY || touchY;
      
      if (!this.startY) {
        this.startY = touchY;
      }
      
      if (startY - touchY > 100) {
        this.setData({
          isRecordCanceled: true
        });
      } else {
        this.setData({
          isRecordCanceled: false
        });
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    const { post } = this.data;
    if (!post) return {};
    
    return {
      title: post.title || post.content.substring(0, 30),
      path: `/pages/community/detail?id=${post.id}`
    };
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // 页面卸载时停止语音播放
    if (innerAudioContext) {
      innerAudioContext.stop();
    }
  }
})