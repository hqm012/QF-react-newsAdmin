# 项目四步走
分别在控制台或cmd或terminal终端使用以下四条命令即可把项目跑起来
git clone 拉取项目
npm i 安装依赖
npm run server 启动 json-server 服务
新起一个 terminal 运行 npm start 等待浏览器打开 localhost:3000 即可

# 注意版本问题，该项目使用的是 react16 和 antd3.x
# 一些笔记：
一开始数据文件放在了 public 中，发现每次更新数据都会刷新页面，把 newsSever放到根目录就好了