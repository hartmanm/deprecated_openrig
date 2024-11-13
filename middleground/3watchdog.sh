#!/bin/bash
source ~/rig
sleep 2
export DISPLAY=:0
LOG=""
wtelegram()
{
sleep 2
MSG="
RIG#: $RIG_NUMBER
MAC: $MAC_AS_WORKER
GPU_COUNT: $GPU_COUNT
IP: $IP_AS_WORKER
LOG: $LOG
"
/usr/bin/curl -m 5 -s -X POST --output /dev/null https://api.telegram.org/bot${APIKEY}/sendMessage -d "text=${MSG}" -d chat_id=${CHATID}
echo $MSG
sleep 5
}
IPW=$(ifconfig | sed -En 's/127.0.0.1//;s/.*inet (addr:)?(([0-9]*\.){3}[0-9]*).*/\2/p')
IP_AS_WORKER=$(echo -n $IPW | tail -c -3 | sed 'y/./0/')
MAC=$(ifconfig -a | grep -Po 'HWaddr \K.*$')
MAC_AS_WORKER=$(echo -n $MAC | tail -c -4 | sed 's|[:,]||g')
LOG+="$(date) - Watchdog Started"
LOG+=$'\n'
sleep 2
echo "$(date) - waiting 40 seconds before going 'on watch'"
sleep 40
THRESHOLD=90
RESTART=0
GPU_COUNT=$(nvidia-smi --query-gpu=count --format=csv,noheader,nounits | tail -1)
COUNT=$((6 * $GPU_COUNT))
while true
do
sleep 10
TOP=0
GPU=0
REBOOTRESET=$(($REBOOTRESET + 1))
echo ""
echo "      GPU_COUNT: " $GPU_COUNT
UTILIZATIONS=$(nvidia-smi --query-gpu=utilization.gpu --format=csv,noheader,nounits)
echo ""
echo "GPU UTILIZATION: " $UTILIZATIONS
echo ""
numtest='^[0-9]+$'  
for UTIL in $UTILIZATIONS
do
if ! [[ $UTIL =~ $numtest ]]
then
LOG+="$(date) - GPU FAIL - restarting system"
LOG+=$'\n'
echo "$(date) - GPU FAIL - restarting system"
echo ""
echo "current GPU activity:"
LOG+="current GPU activity:"
LOG+=$(nvidia-smi --query-gpu=gpu_bus_id --format=csv)
echo "$(date) - reboot in 10 seconds"  
echo ""
wtelegram
sleep 10
sudo reboot
fi
if [ $UTIL -lt $THRESHOLD ]
then
echo "$(date) - GPU under threshold found - GPU UTILIZATION: " $UTILIZATIONS
echo ""
COUNT=$(($COUNT - 1))
TOP=$(($TOP + 1))
fi
GPU=$(($GPU + 1))
done
if [ $TOP -gt 0 ]
then
if [ $COUNT -le 0 ]
then
INTERNET_IS_GO=0
if nc -vzw1 google.com 443;
then
INTERNET_IS_GO=1
fi
echo ""
if [[ $RESTART -gt 2 && $INTERNET_IS_GO == 1 ]]
then
echo "$(date) - Utilization is too low: reviving did not work so restarting system in 10 seconds"
LOG+="$(date) - Utilization is too low: reviving did not work so restarting system in 10 seconds"
LOG+=$'\n'
echo ""
wtelegram
sleep 10
sudo reboot
fi
echo "$(date) - Utilization is too low: restart 1bash"
LOG+="$(date) - Low GPU Utilization Detected: restart 1bash"
LOG+=$'\n'
pkill -e miner
pkill -f miner
wtelegram
target=$(ps -ef | awk '$NF~"1bash" {print $2}')
kill $target
echo ""
RESTART=$(($RESTART + 1))
REBOOTRESET=0
COUNT=$GPU_COUNT
sleep 60
else
echo "$(date) - Low GPU Utilization Detected"
echo ""
fi
else
COUNT=$((6 * $GPU_COUNT))
echo "$(date) - 5 by 5"
fi
if [ $REBOOTRESET -gt 5 ]
then
RESTART=0
REBOOTRESET=0
fi
done
