# Ionic v1 种子项目

一个基于 ionic v1 + angular v1 的 Hybrid app环境

>建议: 推荐 Cordova 5.4.1以及以上 + gulp + bower

# 环境搭建

```
# 下载源代码
$ git clone https://github.com/HandMobileForce/Hamp-ionic-v1-seed.git

# 切换到根目录
$ cd ..

# 切换到develop 分支下载最新代码
$ git checkout develop

# 安装gulp构建环境
$ npm install

# 安装js依赖库
$ bower install

# 构建测试环境开发目录
$ gulp run

# 浏览器运行app程序
$ ionic serve
```

# Git 操作规范
```
st=>start: 开始
e=>end: 结束
clone=>operation: git clone url
pullA=>operation: git pull origin develop:develop
checkoutA=>operation: git checkout -b feature/A
code=>operation: 编写代码/修改代码
add=>operation: git add
commit=>operation: git commit
checkoutB=>operation: git checkout develop
pullB=>operation: git pull origin develop:develop
merge=>operation: git merge feature/A
conflict=>operation: 如果有冲突，解决冲突
push=>operation: git push origin develop:develop

st->clone->pullA->checkoutA->code->add->commit->checkoutB->pullB->merge->conflict->push->e
```

# IDE
WebStorm
Android Studio
Xcode
