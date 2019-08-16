

var fs = require('fs');
var join = require('path').join;

function getMDFiles(jsonPath) {
  let jsonFiles = {
    '/': []
  };
  function findJsonFile(path, dir) {
    let files = fs.readdirSync(path);
    console.log(files)
    files.forEach(function (item, index) {
      let fPath = join(path, item);
      let stat = fs.statSync(fPath);
      if (stat.isDirectory() === true && item !== '.vuepress') {
        jsonFiles[`/${item}/`] = []
        findJsonFile(fPath, `/${item}/`);
      }
      console.log('文件夹', jsonFiles[dir])
      const reg = /\.md$/
      if (stat.isFile() === true && reg.test(item)) {
        if(item==='README.md'){
          return
        }
        jsonFiles[dir].push(item.slice(0, -3))
      }
    });
  }
  findJsonFile(jsonPath, '/');
  return jsonFiles
}
const sider = getMDFiles('./docs')
const t = sider['/']
delete sider['/']
sider['/'] = t
module.exports = {
  title: '小小强的博客',
  description: '没事就瞅瞅',
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/blog/', // 这是部署到github相关的配置 下面会讲
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    sidebar: sider,
    sidebarDepth: 2,
    lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
    nav: [
      { text: '首页', link: '/' },
      { text: '随笔', link: '/article/' },
      { text: 'CSDN', link: 'https://blog.csdn.net/a8725585' },
    ]
  }
};