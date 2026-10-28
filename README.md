# 宋若晗 · AI 产品经理作品集

一个以「问题 → 判断 → 方案 → 结果」为主线的个人作品集，面向 AI 产品经理 / 数据产品经理岗位。

## 在线预览

https://songruohan.github.io/songruohan-portfolio/

本地预览：

```bash
python -m http.server 5599
```

打开 `http://127.0.0.1:5599`。

## 内容结构

- **首页**：个人定位、核心数据、6 个项目、能力矩阵、实习经历、联系方式
- **智游邯郸**：AI 文旅 APP，从调研、PRD 到 5 套高保真界面
- **一体化智慧养老**：12 人项目组，4 大模块 + 2:32 项目演示视频
- **信贷风控**：95,938 样本，201→60 特征，LR / XGBoost / LightGBM 对比
- **星巴克数据分析**：6,945 家门店，6 张交互图表
- **AI 对话助手**：对话体验改版，CTR +14%、会话量 +26%
- **企业数据资产共享平台**：取数成本 −35%、复用率 +40%

## 技术说明

- 纯静态 HTML / CSS / JavaScript，无构建步骤
- 字体、ECharts、视频、简历均已本地化，不依赖外部 CDN
- 两个数据报告保留完整交互能力，以 iframe 嵌入并在新窗口提供全屏入口
- 视频来自项目 PPT，已压缩为 720p / 5.7 MB，支持 HTML5 播放
- 响应式布局，支持键盘操作、图片灯箱、项目筛选与视频弹窗

## 目录

```text
.
├── index.html
├── projects/
│   ├── handan.html
│   ├── elderly.html
│   ├── credit.html
│   ├── starbucks.html
│   ├── ai-assistant.html
│   └── data-asset.html
├── reports/
│   ├── credit.html
│   └── starbucks.html
└── assets/
    ├── img/
    ├── fonts/
    ├── video/
    ├── vendor/
    ├── style.css
    ├── app.js
    └── resume-product.pdf
```

## 部署到 GitHub Pages

```bash
git init
git add .
git commit -m "feat: personal product portfolio"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

然后在 GitHub 仓库的 **Settings → Pages** 中选择 `Deploy from a branch`，分支选 `main`，目录选 `/ (root)`。

## 更新内容

- 修改项目文案：对应 `projects/*.html`
- 替换简历：覆盖 `assets/resume-product.pdf`
- 替换视频：覆盖 `assets/video/elderly-demo.mp4`，同步更新 `poster` 与时长文案
- 修改首页信息：`index.html` 的 Hero、项目卡片与经历部分
- 调整视觉变量：`assets/style.css` 顶部的 `:root`
