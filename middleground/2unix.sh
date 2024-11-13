#!/bin/bash
source ~/version
echo "nvOC_v$VERSION"
echo ""
curHASH=$(md5sum /media/m1/1263-A96E/1bash | sed 's/[^0-9]*//g')
echo "curHASH:" $curHASH
echo ""
echo ""
if [ $HASH != $curHASH ]
then
echo "wait 15 seconds to minimize errors with dos2unix"
sudo dos2unix /media/m1/1263-A96E/1bash
sleep 15
curHASH=$(md5sum /media/m1/1263-A96E/1bash | sed 's/[^0-9]*//g')
cat <<EOF >/home/m1/version
#!/bin/bash
VERSION="$VERSION"
HASH="$curHASH"
EOF
echo ""
echo "curHASH: UPDATED"
echo ""
fi
pkill -f 1bash
sleep 2
bash '/media/m1/1263-A96E/1bash'
