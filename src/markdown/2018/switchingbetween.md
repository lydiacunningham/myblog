# Switching between binaries

![](https://cdn-images-1.medium.com/max/800/1*TYr9ZaIGbFeWjARZCqWm7A.png?style=centerme)

I am constantly changing my binaries for installation prerequisites and testing. I used to spend a bit of time change paths or updating **.bashrc** . This is a quick example of a bit of bash I used to reduce the manual steps involve around changing the oc binary(Openshift command line binary). Currently I have four versions of the oc binary on my PC 3.7, 3.9, 3.10 and 3.11, I put each binary in its own directory in **/opt/openshift**

![](https://cdn-images-1.medium.com/max/800/1*zXG7mgEcd2CCmpWXBu6GOg.png?style=centerme)

I have the oc binary [sym-linked](https://www.shellhacks.com/symlink-create-symbolic-link-linux/) at **/usr/local/bin/oc** so I only need to change where the sym-link is pointing. This script checks the current version that is sym-linked , list the versions present on the PC , asks you what version you wish to install and removes the existing sym-link and adds an new one.

```bash
#!/bin/bash
echo "########################################################################################"
echo Current version of oc
ls -la /usr/local/bin/oc
echo "########################################################################################"
echo Versions of openshift oc on the system
ls /opt/openshift
echo "########################################################################################"
echo "What version do you wish to install ?"
read version
sudo rm /usr/local/bin/oc
sudo ln -s /opt/openshift/$version/oc /usr/local/bin/oc
echo " "
echo "########################################################################################"
oc version
echo " "
echo "########################################################################################"
```

Once you have your script written you can make it executable by changing the Linux permissions

```bash
chmod u+x change_oc.sh
```
It can then be run

```bash
./change_oc.sh
```
Running it looks like this

![](https://cdn-images-1.medium.com/max/800/1*jC7XC2re8v9JXIqRvtn_Lw.gif?style=centerme)
