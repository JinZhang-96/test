
# Word-Entry

[![Build Status](https://travis-ci.org/cipchk/ng-alain.svg?branch=master)](https://travis-ci.org/cipchk/ng-alain)
[![Dependency Status](https://david-dm.org/cipchk/ng-alain/status.svg)](https://david-dm.org/cipchk/ng-alain)


更多信息见[中文 README](README-zh_CN.md)

[DEMO](https://cipchk.github.io/ng-alain/)

## Quick start

Make sure you have Node version >= 6.9.0 and NPM >= 3 or higher.

```bash
# clone ng-alain repo
# --depth 1 removes all but one .git commit history
git clone --depth 1 https://github.com/cipchk/ng-alain.git

# change directory
cd ng-alain

# install npm package
npm install
# in china please use cnpm （https://github.com/cnpm/cnpm）
# cnpm install --by=npm

# start the serve
npm start

# use HMR
npm run serve:hmr
```

> [vscode] recommended install [ng-zorro-vscode](https://marketplace.visualstudio.com/items?itemName=cipchk.ng-zorro-vscode) plugins, that includes `nz-alain-*` snippets.

## Environment

| package | version |
| ------- | ------- |
| `ng-alain` | 0.1.2-rc.0 | 
| `ng-zorro-antd` | ^0.5.3 |
| `@angular` | ^4.4.5 |
| `@angular/cli` | ^1.4.7 |

**Third Library[Optional]**

| package | dependencie | remark |
| ------- | ------- | ------- |
| `font-awesome` |  |  |
| `simple-line-icons` |  |  |
| `weather-icons` |  |  |
| `angular-baidu-maps` |  | BaidDu Map |
| `angular-qq-maps` |  | QQ Map |
| `angular-web-storage` |  | LocalStorage |
| `ng2-charts` | `chart.js` |  |
| `d3` |  |  |
| `g2-angular` | `g2` |  |
| `jquery-sparkline` | `jquery` |  |
| `ng2-file-upload` |  |  |
| `ng2-img-cropper` |  |  |
| `ngx-color-picker` |  |  |
| `ng-tree-antd` | `angular-tree-component` |  |
| `ng2-dnd` |  |  |
| `sweetalert` |  |  |
| `file-saver` |  |  |

## Guide Lines

+ [antd gruid lines](https://ant.design/docs/spec/introduce)
+ [`ng-alain` Layout Rule](_documents/layout.md)
+ [CSS Component Patch](_documents/component-patch.md)
+ [CSS Utility Rule](_documents/utils.md)
+ [Pipe](_documents/pipe.md)
+ [ACL](_documents/acl.md)
+ [Upgrade](_documents/upgrade.md)

## Features

+ `ng-zorro-antd` based
+ Responsive Layout
+ I18n
+ ACL
+ Lazy load Assets
+ UI Router States
+ Multiple color options
+ Less preprocessor
+ Well organized & commented code
+ Simple upgrade
+ Hot Module Replacement
+ Support [Docker](_documents/docker.md) deploy

## App Shots

![desktop](_screenshot/desktop.png)
![ipad](_screenshot/ipad.png)
![iphone](_screenshot/iphone.png)

## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/cipchk/ng-alain/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

### License

The MIT License (see the [LICENSE](https://github.com/cipchk/ng-alain/blob/master/LICENSE) file for the full text)

	项目结构
	
# wordentry

## src/main/java

### com.zb.wordentry.business

### com.zb.wordentry.util

### com.zb.wordentry.system

## src/main/resource

### properties

### xml

#### spring-servlet.xml

#### applicationContext.xml

#### spring.xml

#### mybatis-config.xml
# 项目部署
<div>
使用maven管理项目的时候；<code><localRepository>E:\developDepand\m2\Repository</localRepository><code>配置本地jar包管理的仓库地址；
国内用不了maven,请配置阿里云镜像
<cade><mirror>
		  <id>alimaven</id>
		  <name>aliyun maven</name>
		  <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
		  <mirrorOf>central</mirrorOf>        
</mirror>
</code>
</div>
	
	
	                

