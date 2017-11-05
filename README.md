# 项目运行：
- npm install
- npm run build
- npm run dev

# 项目结构：
src
- common 共公类（数据、环境、公共方法）
- component 项目组件
- images 图片地址(目前没用到)
- pages 项目页面
- styles css目录
- vendor 第三方依赖(目前没用到)
- view 模板(目前没用到)

# 进度：
- 2017/10/21
- 新建项目
- 2017/10/28
- 家里电脑搭建环境，win遇到了一些问题:node-sass和fsevent一直有问题，后临时不用sass直接用css处理
- 2017/10/29
- 构建目录结构，跑起项目
- 2017/10/30
- 添加topic列表和topic详情页面相关内容
- 2017/11/5
- 处理了几个优先提及的问题：
- 1). 支持无限下滚（当前实际在浏览器打开是有问题的)
- 2). 手机端适配
- 3). 至少新增一个 Tab (例如精华)
- 4). 修复样式上的明显问题 (某个帖子的详情页可以直接跳转到 CNode 的页面，可以不用实现)


# todo：

## 剩余页面完成：
- 新增topic
- 编辑topic
- 登录页
- 消息页面

## 页面相关组件增加：
- 顶部导航
- 下拉滚动组件（从列表页抽离）
- 回复评论
- 点赞组件
- 收藏按钮组件

## 基础功能相关：
- ajax请求封装
- 环境配置信息完善

## 其他：
- 样式拆分到页面独立文件
