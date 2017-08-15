
# ![Qbox logo](http://otwcctfiu.bkt.clouddn.com/logo-blue.png)

[![Build status](https://ci.appveyor.com/api/projects/status/soh7mapv45levrxy?svg=true)](https://ci.appveyor.com/project/LanceGin/qbox)


> QBox是一款方便的[七牛](https://www.qiniu.com/)仓库以及文件管理工具，是一款可以跨平台运行在`OS X`，`Linux` 以及 `Windows` 系统的开源软件。QBox基于 [electron-vue](https://github.com/SimulatedGREG/electron-vue) 开发。

## 软件截图

#### 仓库面板

![bucket panel](http://otwcctfiu.bkt.clouddn.com/bucket-panel.png)

#### 文件管理面板

![bucket panel](http://otwcctfiu.bkt.clouddn.com/manage-panel.png)

#### 上传文件面板

![bucket panel](http://otwcctfiu.bkt.clouddn.com/upload-panel.png)

## 功能

#### 仓库面板

- [x] 通过本地设置 `accessKey` 和 `secretKey`获取管理权限。
- [x] 可清除本地token（包括 `accessKey` 和 `secretKey`）从而退出。
- [x] 获取所有的仓库（包含私有仓库）。
- [x] 新建一个专门的 `管理面板` 进行文件管理。

#### 管理面板

- [x] 列出仓库中的所有文件。
- [x] 分页显示仓库中的文件，每次加载100条。
- [x] 可通过 `文件名`，`文件类型`，`文件大小` 或者 `修改时间` 进行排序。
- [x] `图片` 以及 `多媒体文件` 预览功能。
- [x] 删除单个文件。
- [x] 批量删除文件。
- [x] 复制文件外链。
- [x] 刷新文件列表。
- [x] 下载单个文件。
- [x] 上传文件（支持拖拽）。
- [x] 文件名前缀搜索。

## 计划

#### 导航栏

- [ ] 设置默认仓库。
- [ ] 拖动至导航栏图标进行上传。

#### 仓库面板

- [x] 删除仓库。
- [x] 创建仓库。

#### 管理面板

- [x] 搜索框提供回车响应。
- [ ] 批量上传文件。
- [ ] 批量下载文件。
- [ ] 重命名文件。

## 协议

[AGPL](https://github.com/LanceGin/QBox/blob/master/LICENSE)

## 代码贡献

``` bash
# 安装依赖
npm install

# 本地开放版本测试
npm run dev

# 编译线上版本
npm run build

# 单元测试（目前暂无）
npm test

# 检查代码规范
npm run lint
```

## [Document](https://github.com/LanceGin/QBox/blob/master/README.md)
