#!/bin/bash

USER_ID=""
EXPECTED_HASHRATE="30"
RIG_NUMBER="001"
REST="NO"

ETC_ADDRESS="YOUR_ETC_ADDRESS"
POWERLIMIT_WATTS="106"
CORE_OVERCLOCK="-200"
MEMORY_OVERCLOCK="900"
FAN_SPEED="49"
CHATID=""
APIKEY=""

#########################################################################
getRigs()
{
RIGS=$(/usr/bin/curl https://overlord-nv.appspot.com/user/$USER_ID/rigs)
sleep 2
t=$RIGS
t=${t// /}
t=${t//,/ }
t=${t##[}
t=${t%]}
eval a=($t)
target=$(($RIG_NUMBER - 1))
RIG=$(/usr/bin/curl https://overlord-nv.appspot.com${a[target]})
var=ETC_ADDRESS
out=$(echo $RIG | sed 's/\\\\\//\//g' | sed 's/[{}]//g' | awk -v k="text" '{n=split($0,a,","); for (i=1; i<=n; i++) print a[i]}' | sed 's/\"\:\"/\|/g' | sed 's/[\,]/ /g' | sed 's/\"//g' | grep -w $var)
eval b=($out)
ETC_ADDRESS=${b[1]}
var=POWERLIMIT_WATTS
out=$(echo $RIG | sed 's/\\\\\//\//g' | sed 's/[{}]//g' | awk -v k="text" '{n=split($0,a,","); for (i=1; i<=n; i++) print a[i]}' | sed 's/\"\:\"/\|/g' | sed 's/[\,]/ /g' | sed 's/\"//g' | grep -w $var)
eval b=($out)
POWERLIMIT_WATTS=${b[1]}
var=CORE_OVERCLOCK
out=$(echo $RIG | sed 's/\\\\\//\//g' | sed 's/[{}]//g' | awk -v k="text" '{n=split($0,a,","); for (i=1; i<=n; i++) print a[i]}' | sed 's/\"\:\"/\|/g' | sed 's/[\,]/ /g' | sed 's/\"//g' | grep -w $var)
eval b=($out)
CORE_OVERCLOCK=${b[1]}
var=MEMORY_OVERCLOCK
out=$(echo $RIG | sed 's/\\\\\//\//g' | sed 's/[{}]//g' | awk -v k="text" '{n=split($0,a,","); for (i=1; i<=n; i++) print a[i]}' | sed 's/\"\:\"/\|/g' | sed 's/[\,]/ /g' | sed 's/\"//g' | grep -w $var)
eval b=($out)
MEMORY_OVERCLOCK=${b[1]}
var=FAN_SPEED
out=$(echo $RIG | sed 's/\\\\\//\//g' | sed 's/[{}]//g' | awk -v k="text" '{n=split($0,a,","); for (i=1; i<=n; i++) print a[i]}' | sed 's/\"\:\"/\|/g' | sed 's/[\,]/ /g' | sed 's/\"//g' | grep -w $var)
eval b=($out)
FAN_SPEED=${b[1]}
var=CHATID
out=$(echo $RIG | sed 's/\\\\\//\//g' | sed 's/[{}]//g' | awk -v k="text" '{n=split($0,a,","); for (i=1; i<=n; i++) print a[i]}' | sed 's/\"\:\"/\|/g' | sed 's/[\,]/ /g' | sed 's/\"//g' | grep -w $var)
eval b=($out)
CHATID=${b[1]}
var=APIKEY
out=$(echo $RIG | sed 's/\\\\\//\//g' | sed 's/[{}]//g' | awk -v k="text" '{n=split($0,a,","); for (i=1; i<=n; i++) print a[i]}' | sed 's/\"\:\"/\|/g' | sed 's/[\,]/ /g' | sed 's/\"//g' | grep -w $var)
eval b=($out)
APIKEY=${b[1]}
}
toRig()
{
cat <<EOF >/home/m1/rig
#!/bin/bash
USER_ID="$USER_ID"
RIG_NUMBER="$RIG_NUMBER"
CHATID="$CHATID"
APIKEY="$APIKEY"
MIN_HASHRATE="$MIN_HASHRATE"
EOF
}
telegram()
{
sleep 2
GPU_COUNT=$(nvidia-smi --query-gpu=count --format=csv,noheader,nounits | tail -1)
MSG="
RIG#: $RIG_NUMBER
MAC: $MAC_AS_WORKER
GPU_COUNT: $GPU_COUNT
IP: $IP_AS_WORKER
https://etc.ethermine.org/miners/$ETC_ADDRESS/dashboard
"
/usr/bin/curl -m 5 -s -X POST --output /dev/null https://api.telegram.org/bot${APIKEY}/sendMessage -d "text=${MSG}" -d chat_id=${CHATID}
echo $MSG
sleep 5
}
telegramXR()
{
sleep 2
GPU_COUNT=$(nvidia-smi --query-gpu=count --format=csv,noheader,nounits | tail -1)
MSG="
XORG UPDATED: REBOOTING
RIG#: $RIG_NUMBER
MAC: $MAC_AS_WORKER
GPU_COUNT: $GPU_COUNT
IP: $IP_AS_WORKER
https://etc.ethermine.org/miners/$ETC_ADDRESS/dashboard
"
/usr/bin/curl -m 5 -s -X POST --output /dev/null https://api.telegram.org/bot${APIKEY}/sendMessage -d "text=${MSG}" -d chat_id=${CHATID}
echo $MSG
sleep 5
}
if [ $REST == "YES" ]
then
getRigs
fi
sudo nvidia-xconfig --enable-all-gpus --cool-bits=31 --allow-empty-initial-configuration
MIN_HASHRATE=$(awk "BEGIN {printf \"%.0f\n\", 92/100 * $EXPECTED_HASHRATE}")
XORG="FAIL"
if grep -q '"Coolbits" "31"' /etc/X11/xorg.conf;
then
XORG="OK"
fi
if [ $XORG == "FAIL" ]
then
telegramXR
echo "XORG UPDATED"
echo ""
echo "Rebooting in 5"
echo ""
sleep 5
sudo reboot
fi
IPW=$(ifconfig | sed -En 's/127.0.0.1//;s/.*inet (addr:)?(([0-9]*\.){3}[0-9]*).*/\2/p')
IP_AS_WORKER=$(echo -n $IPW | tail -c -3 | sed 'y/./0/')
MAC=$(ifconfig -a | grep -Po 'HWaddr \K.*$')
MAC_AS_WORKER=$(echo -n $MAC | tail -c -4 | sed 's|[:,]||g')
sleep 2
toRig
sleep 2
sudo nvidia-smi -pl $POWERLIMIT_WATTS
GPUS=$(nvidia-smi --query-gpu=count --format=csv,noheader,nounits | tail -1)
NVD=nvidia-settings
gpu=0
crash=0
while [ $gpu -lt $GPUS ]
do
${NVD} -a [gpu:$gpu]/GPUGraphicsClockOffset[2]=$CORE_OVERCLOCK
${NVD} -a [gpu:$gpu]/GPUMemoryTransferRateOffset[2]=$MEMORY_OVERCLOCK
${NVD} -a [gpu:$gpu]/GPUGraphicsClockOffset[3]=$CORE_OVERCLOCK
${NVD} -a [gpu:$gpu]/GPUMemoryTransferRateOffset[3]=$MEMORY_OVERCLOCK
gpu=$(($gpu+1))
done
gpu=0
MANUAL_FANS=1
while [ $gpu -lt $GPUS ]
do
if [ $FAN_SPEED -lt 50 ]
then
MANUAL_FANS=0
fi
${NVD} -a [gpu:$gpu]/GPUFanControlState=$MANUAL_FANS
${NVD} -a [fan:$gpu]/GPUTargetFanSpeed=$FAN_SPEED
gpu=$(($gpu+1))
done
WORKERNAME=$RIG_NUMBER'__'$MAC_AS_WORKER
telegram

HCD='/home/m1/3watchdog'
echo ""
echo "LAUNCHING:  Watchdog"
sleep 2
running=$(ps -ef | awk '$NF~"3watchdog" {print $2}')
if [ "$running" == "" ]
then
guake -n $HCD -r watchdog -e "bash $HCD"
echo ""
echo "process in guake terminal Tab (press f12 to view)"
echo ""
running=""
fi
CLIENT="/home/m1/eth/fullzero/ETHASH -U -S us1-etc.ethermine.org:4444 -O $ETC_ADDRESS.$WORKERNAME:x;"
screen -dmS miner $CLIENT
echo "mining in screen: screen -r miner"
# if rig is intended to ssh in remotely comment out the next line:  add a # at the beginning of the next line
screen -r miner
while [ 1 ]
do
sleep 9001
done
fi
