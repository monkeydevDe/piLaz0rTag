# Pi Setup

## LIRC

http://alexba.in/blog/2013/01/06/setting-up-lirc-on-the-raspberrypi/

```bash
sudo apt-get install lirc
```

edit **/boot/config.txt**

```bash
dtoverlay=lirc-rpi,gpio_in_pin=23,gpio_out_pin=22
```

edit **/etc/lirc/hardware.conf**

```bash
# /etc/lirc/hardware.conf
#
# Arguments which will be used when launching lircd
#LIRCD_ARGS="--uinput"

#Don't start lircmd even if there seems to be a good config file
#START_LIRCMD=false

#Don't start irexec, even if a good config file seems to exist.
#START_IREXEC=false

#Try to load appropriate kernel modules
LOAD_MODULES=true

# Run "lircd --driver=help" for a list of supported drivers.
DRIVER="default"
# usually /dev/lirc0 is the correct setting for systems using udev
DEVICE="/dev/lirc0"
MODULES="lirc_rpi"

# Default configuration files for your hardware if any
LIRCD_CONF=""
LIRCMD_CONF=""
```

restart lirc

```bash
sudo /etc/init.d/lirc stop
sudo /etc/init.d/lirc start
```

## Node

https://github.com/creationix/nvm

Install the nvm as user **pi** 

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
```

Install the node version

```bash
nvm install v7.7.3
```

## Disable soundcard

For the **rpi-ws281x-native** library disable the soundcard

**/etc/modprobe.d/snd-blacklist.conf**

```bash
blacklist snd_bcm2835
```