const fetch = require('../../utils/testfetch')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    slides: [],
    categories: [],
    interval: 5000,
    duration: 1000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 轮播图数据渲染
    fetch("/getslides").then(res => {
      this.setData({ "slides": res.data });
   })

    // grid 列表渲染
    fetch("/theme").then(res => {
      this.setData({ "categories": res.data });
    })

  //   const slides = [
  //     { image: 'http://ww1.sinaimg.cn/mw690/006ThXL5ly1fj7zx3w751j30u00dmgy3.jpg', link: '' },
  //     { image: 'http://ww1.sinaimg.cn/mw690/006ThXL5ly1fj6ckx9tlwj30u00fqk8n.jpg', link: '/pages/list/list?cat=10' }
  //   ]

/*     const categories = [
       { icon: 'http://ww1.sinaimg.cn/large/006ThXL5ly1fj8w5i2onyj302u02umwz.jpg', name: '美食', id: 1 },
       { icon: 'http://ww1.sinaimg.cn/large/006ThXL5ly1fj8w5i2j4dj302u02umwy.jpg', name: '洗浴足疗', id: 2 },
       { icon: 'http://ww1.sinaimg.cn/large/006ThXL5ly1fj8w5i56i0j302u02u744.jpg', name: '结婚啦', id: 3 },
       { icon: 'http://ww1.sinaimg.cn/large/006ThXL5ly1fj8w5i2uzvj302u02udfo.jpg', name: '卡拉OK', id: 4 },
       { icon: 'http://ww1.sinaimg.cn/large/006ThXL5ly1fj8w5i2rnlj302u02umwz.jpg', name: '找工作', id: 5 },
       { icon: 'http://ww1.sinaimg.cn/large/006ThXL5ly1fj8w5i2zloj302u02udfn.jpg', name: '辅导班', id: 6 },
       { icon: 'http://ww1.sinaimg.cn/large/006ThXL5ly1fj8w5i69eij302u02ua9w.jpg', name: '汽车保养', id: 7 },
       { icon: 'http://ww1.sinaimg.cn/large/006ThXL5ly1fj8w5i6j2lj302u02u0sj.jpg', name: '租房', id: 8 },
       { icon: 'http://ww1.sinaimg.cn/large/006ThXL5ly1fj8w5i6z1pj302u02ua9u.jpg', name: '装修', id: 9 }
     ]
*/
    this.setData({ slides })
  }
})
