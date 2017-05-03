# DEVELOPMENT SETUP

## SMB SHARE

### Installation

```bash
sudo apt-get install samba samba-common smbclient
```

add the following to the **/etc/samba/smb.conf**

```bash
workgroup = LASERTAG
```

and the share

```bash
[LaserTag]
  path = /home/pi/share
  comment = Lasertag
  browseable = yes
  writeable = yes
  guest ok = yes
  create mask = 0664
  directory mask = 0775
  force user = pi
  force group = pi
```

create the directory

```bash
mkdir -p /home/pi/share
chmod 0777 /home/pi/share
```

restart the samba server

```bash
sudo /etc/init.d/samba restart
```

## Install git

```
sudo apt-get install git
```

## Checkout the source

```bash
cd /home/pi/share/
git clone https://github.com/monkeydevDe/piLaz0rTag.git 
```

## Init node modules dependencies

```bash
cd /home/pi/share/piLaz0rTag/code
npm install 
```

now you can mount the samba share and work with the code with your favorite ide.

## For i2c install the tools

```bash
sudo apt-get install -y i2c-tools
```

Search for i2c devices

```bash
 ****
```
