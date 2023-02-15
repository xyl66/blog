# linux环境部署
## 安装git
```sh
yum -y install git 
```

## 安装docker
  - 安装
  ```sh
  yum install -y yum-utils
  yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
  yum install docker-ce docker-ce-cli containerd.io
  ```
  - 开机自启
  ```sh
  systemctl enable docker
  ```
