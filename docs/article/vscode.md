# Vscode-常用插件
## 使用
1.  跳行

右下角<font color="#FA541C">显示光标行和列</font>

![](https://cdn.nlark.com/yuque/0/2019/png/364508/1560849958533-adca2e35-0505-4677-a363-aca0514e54e3.png)

2.  拆分编辑器
方便代码比对等

![](https://cdn.nlark.com/yuque/0/2019/png/364508/1560850251971-71ad12ce-44f4-41aa-8069-05f557bcaa38.png)
![](https://cdn.nlark.com/yuque/0/2019/png/364508/1561703278339-ebcd339f-3710-4e02-b290-4ad64f44e5fe.png)
## 插件
> 可根据个人情况按需使用
1.  Chinese (Simplified) Language
简体中文插件
![](https://cdn.nlark.com/yuque/0/2019/png/364508/1561703686091-7e529758-842b-4612-b444-c61681d5633d.png)
2.  Bracket Pair Colorizer
让括号拥有独立的颜色，易于区分。可以配合任意主题使用。
![](https://cdn.nlark.com/yuque/0/2019/png/364508/1560743036426-c1317cf2-d44a-4b7e-8fc4-c7ca2e813691.png)
3.  GitLens
当前代码中查看git日志
![](https://cdn.nlark.com/yuque/0/2019/png/364508/1560743932801-e10a359f-f07f-478e-902c-913702c77de6.png)
GitLens插件
• 每一行代码旁边都有日志
![](https://cdn.nlark.com/yuque/0/2019/webp/364508/1560744262326-d671e936-05ab-4a17-a7fc-ec2f8657172a.webp?x-oss-process=image/format,png)
• 也可以查看全部的日志，在VsCode左侧菜单栏，点击GitLens图标即可查看History。
![](https://cdn.nlark.com/yuque/0/2019/png/364508/1560745044286-ba862b1f-14a4-457d-86a5-1e744bf68d47.png)
git脚本 webpack一键使用原配置项打包
![](https://cdn.nlark.com/yuque/0/2019/gif/364508/1561531301697-a8fa83cc-a4fb-41c3-bfd4-855956e21b2d.gif)
4.  filesize
在底部状态栏显示当前文件大小，点击后还可以看到详细创建、修改时间
![](https://cdn.nlark.com/yuque/0/2019/png/364508/1560758543211-08d87dc9-08bc-4cfa-b616-786467e57f20.png)
5. Import Cost
计算引入包大小,对于项目打包后体积掌握很有帮助
![](https://cdn.nlark.com/yuque/0/2019/png/364508/1560758879511-34d073a6-5061-4c8c-a8e6-8278813fd267.png)
6. koroFileHeader
读取用户自定义模板，通过快捷键添加文件头部注释、在光标处添加函数注释
![](https://cdn.nlark.com/yuque/0/2019/png/364508/1560771520608-7c880407-c7cd-47c2-8c2e-c8e086e95f82.png)
头部注释配置
``` json
"fileheader.customMade": {
        "Author": "xiangyulong",
        "Date": "Do not edit",
        "LastEditTime": "Do not edit",
        "LastEditors": "xiangyulong",
        "Description": ""
    }
```
7.  CSS Peek （Vue CSS Peek）
跳转到css定义位置
• 未使用
![未使用css peek时](https://cdn.nlark.com/yuque/0/2019/gif/364508/1561002377220-d8520690-89f0-498a-a682-43c004036472.gif)

• 使用后
![使用css peek时](https://cdn.nlark.com/yuque/0/2019/gif/364508/1561002428060-b40795ce-aad3-4637-9f56-c2102c8f84ec.gif)
• 快捷键全局查找mac (cmd+T)
![全局查找快捷键](https://cdn.nlark.com/yuque/0/2019/gif/364508/1561002585897-e2ccccd2-8882-4caa-b810-70b4bfec4c97.gif)
8.  IntelliSense for CSS class names in HTML
提供css联想补全功能
![class联想](https://cdn.nlark.com/yuque/0/2019/gif/364508/1561002289401-71a06df3-0c5e-4439-aecd-d53a2bc7a357.gif)

合并使用
![与css peek合并使用](https://cdn.nlark.com/yuque/0/2019/gif/364508/1561002646722-06b89d98-7865-48bf-80ed-228667a3875f.gif)
9.  TODO插件
• TODO Highlight
![](https://cdn.nlark.com/yuque/0/2019/png/364508/1561525413997-56be3ead-dabc-4ec6-bebf-b7912b409c27.png)
• Todo Tree
![](https://cdn.nlark.com/yuque/0/2019/png/364508/1561525422890-81eaa0c2-7565-4778-b066-22f424843446.png)
![](https://cdn.nlark.com/yuque/0/2019/png/364508/1561525482411-8b0a0e06-29fb-4efb-ab64-ae8ecfed46a4.png)

配置
``` json
{
    "js-beautify-html": {
        "wrap_attributes": "force-aligned"
    },
    "prettyhtml": {
        "printWidth": 100,
        "singleQuote": false,
        "wrapAttributes": false,
        "sortAttributes": true
    },
    "prettier": {
        "semi": false,
        "singleQuote": true,
        "trailingComma": "all",
        "useTabs": true,
    },
    "px2rem.rootFontSize": 37.5,
    "px2rem.isNeedNotes": false,
    "fileheader.customMade": {
        "Author": "xiangyulong",
        "Date": "Do not edit",
        "LastEditTime": "Do not edit",
        "LastEditors": "xiangyulong",
        "Description": ""
    },
    "vetur.format.options.tabSize": 4,
    "editor.formatOnSave": true,
    "editor.insertSpaces": true,
    "workbench.startupEditor": "welcomePage",
    "editor.quickSuggestions": {
        "strings": true
    },
    // vue设置
    "emmet.syntaxProfiles": {
        "vue-html": "html",
        "vue": "html"
    },
    "files.associations": {
        "*.vue": "vue",
        "*.cjson": "jsonc",
        "*.wxss": "css",
        "*.wxs": "javascript"
    },
    // vetur设置
    "vetur.format.defaultFormatter.js": "vscode-typescript",
    "vetur.format.defaultFormatter.html": "js-beautify-html",
    "vetur.validation.template": false,
    "vetur.format.defaultFormatterOptions": {
        "js-beautify-html": {
            "wrap_line_length": 100,
            "wrap_attributes": "auto"
            // 自定义组件风格
            // "wrap_attributes": "force-aligned"
        }
    },
    // eslint设置
    // 保存时自动fix
    // "eslint.autoFixOnSave": true,
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        {
            "language": "html",
            "autoFix": true
        },
        {
            "language": "vue",
            "autoFix": true
        }
    ]
}
```