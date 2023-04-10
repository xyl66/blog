(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{348:function(e,t,r){e.exports=r.p+"assets/img/img.95b39148.png"},380:function(e,t,r){"use strict";r.r(t);var v=r(42),s=Object(v.a)({},(function(){var e=this,t=e.$createElement,v=e._self._c||t;return v("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[v("h2",{attrs:{id:"分支管理"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#分支管理"}},[e._v("#")]),e._v(" 分支管理")]),e._v(" "),v("ol",[v("li",[e._v("每个独立的需求都有自己的独立的feature分支，该分支应该持续集成该feature相关的全部代码。所以所有非live环境的bug的修复，都应该在feature分支进行，然后再同步到各个环境（UAT，test）。")]),e._v(" "),v("li",[e._v("保持每个feature分支的独立性，如果没有强依赖关系，所有feature分支应该基于master。前后版本之间的featrue分支如果有依赖关系，也应该只依赖上个版本对应的feature分支，而不是整个上个版本。")]),e._v(" "),v("li",[e._v("UAT环境上的代码应该尽量贴合未来的上线环境。")])]),e._v(" "),v("p",[v("code",[e._v("master")]),e._v("（长期分支）")]),e._v(" "),v("p",[e._v("职能：用于拉 feature 分支，用于staging和发布上线，不能 commit ，只接受release分支和hotfix分支的合并。每次改动后，需要将master分支合并回所有UAT上的release分支和所有test分支。另外每次对master的合并，都应该增加一个tag，tag规范为live-[版本号]-[发布日期]-(hotfix-[Jira单])")]),e._v(" "),v("p",[v("code",[e._v("release-[版本号]-[发布日期]")]),e._v("（临时分支，可能存在多个）")]),e._v(" "),v("p",[e._v("职能：用于虚拟多套测试环境和uat，不能 commit 以及尽量避免频繁修改。只接受来自feature分支的合并，每次进行uat的时候，都从master分支拉出release-[版本号]-[发布日期]分支，然后再将会在它之前上Live，但是还没有合并入master的所有release分支合并进去，最后合并入全部版本需要的需求分支。")]),e._v(" "),v("p",[e._v("注意：")]),e._v(" "),v("p",[e._v("如果某个版本会分多次发布，就应该拉出多个release分支，根据上面的要求，每个release分支，都从master拉出，然后合并入上个和这个版本计划在它之前上Live的release分支。\n在UAT期间，如果master分支有hotfix，应该将master分支合并回在UAT中的release分支。\n有任何UAT的bug，都不可以直接在上面修改，你需要在对应的feature分支上修复，然后再合并入release和test分支。")]),e._v(" "),v("p",[v("code",[e._v("feature")])]),e._v(" "),v("p",[e._v("职能：用于开发需求。每次从master分支新建一个 feature 分支，命名为feature-MITAR-XXXX-[描述]，MITRA-XXXX 表示 JIRA 的 TASK 编号，比如feature-MITRA-1234-transaction-history。")]),e._v(" "),v("p",[v("code",[e._v("hotfix")])]),e._v(" "),v("p",[e._v("职能：用于修改 master 等各个分支环境下产生的BUG，需要从 master 分支拉取，命名为 hotfix-XXXX，XXXX 表示 JIRA 的 BUG 编号。")]),e._v(" "),v("h2",{attrs:{id:"代码合并规范"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#代码合并规范"}},[e._v("#")]),e._v(" 代码合并规范")]),e._v(" "),v("ol",[v("li",[v("p",[e._v("背景\nFE和BE在做版本迭代时，如果遇到并行的几个版本合并，会出现已有的代码被冲突解决解掉导致功能丢失的问题，针对此问题，我们需要确定合并代码的规范。")])]),e._v(" "),v("li",[v("p",[e._v("名词解释")])])]),e._v(" "),v("table",[v("thead",[v("tr",[v("th",[e._v("名词")]),e._v(" "),v("th",[e._v("解释")])])]),e._v(" "),v("tbody",[v("tr",[v("td",[e._v("feature分支")]),e._v(" "),v("td",[e._v("对应版本内每个dev需求"),v("br"),e._v("每个版本的feature分支都需要从master分支拉出来")])]),e._v(" "),v("tr",[v("td",[e._v("release分支")]),e._v(" "),v("td",[e._v("对应每个迭代版本，一般的命名规范是release-[version name]"),v("br"),e._v("每个release分支需要从master分支拉出来")])]),e._v(" "),v("tr",[v("td",[e._v("master分支")]),e._v(" "),v("td",[e._v("线上运行的代码分支")])]),e._v(" "),v("tr",[v("td",[e._v("各端版本发布负责人")]),e._v(" "),v("td",[e._v("负责当前版本发布的所有事宜，包括代码合并、冲突解决和cicd上发布版本的流水线管理等"),v("br"),e._v("在version确定之初由leader来分配 (需要职级在senior或以上)")])])])]),e._v(" "),v("ol",{attrs:{start:"3"}},[v("li",[e._v("场景\n正常的需求版本检出和合并过程")])]),e._v(" "),v("p",[v("img",{attrs:{src:r(348),alt:""}})]),e._v(" "),v("p",[e._v("操作1和操作6涉及release-version1分支的checkout和merge，需要由version1的版本发布负责人来操作；")]),e._v(" "),v("p",[e._v("操作2和操作3涉及feature1的checkout和merge，需要由feature1的dev来操作；")]),e._v(" "),v("p",[e._v("操作4涉及version2合并到master的操作需要version2的版本负责人来操作；")]),e._v(" "),v("p",[e._v("操作5在version2上live后需要同步最新的master代码到version1分支，需要version1的版本负责人来操作；")]),e._v(" "),v("p",[v("font",{attrs:{color:"red"}},[e._v("注意：涉及到当前version分支的merge、checkout和resolve conflict等操作都需要各端的版本负责人参与。")])],1),e._v(" "),v("p",[v("strong",[e._v("question1：如何确定各端版本负责人？")])]),e._v(" "),v("p",[e._v("answer：在版本需求宣讲之前由各端leader确定 (需要职级在senior或以上)")]),e._v(" "),v("p",[v("strong",[e._v("question2：操作3feature1分支的提测合并出现冲突，如何解决？")])]),e._v(" "),v("p",[e._v("answer：")]),e._v(" "),v("p",[e._v("dev需要从version1分支切出来一个fix-version1-feature1分支；\n将feature1合入fix-version1-feature分支，如果出现冲突需要跟version1的版本负责人一并修改；\n如果出现了较多冲突，需要版本负责人拉上相关冲突的dev，在会议中进行review修改；\n处理好冲突后将fix分支合并到release version版本中")]),e._v(" "),v("p",[v("strong",[e._v("question3：操作4和操作6从version2合并到master产生冲突，如何解决？")])]),e._v(" "),v("p",[e._v("answer：")]),e._v(" "),v("p",[e._v("版本负责人需要从master拉一个fix-master-version的分支\n出现冲突需要拉对应的dev一起解决")]),e._v(" "),v("p",[v("strong",[e._v("question4：操作5从master合并到version1产生冲突，如何解决？")])]),e._v(" "),v("p",[e._v("answer：")]),e._v(" "),v("p",[e._v("版本负责人需要从version1分支拉一个fix-version1-master分支；\n出现冲突需要拉对应的dev一起解决")])])}),[],!1,null,null,null);t.default=s.exports}}]);