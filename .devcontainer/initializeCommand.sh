#!/bin/bash
echo "Gathering IP for dev container"

##############################################################################################
# Interface types:
# en (Ethernet)
# ib (InfiniBand)
# sl (Serial line IP (slip))
# wl (Wireless local area network (WLAN))
# ww (Wireless wide area network (WWAN))
#############################################################################################

your_interface_name="eno"
interface_prefix="en" # Choose the interface network.
iname=$(ip -o link show | sed -rn '/^[0-9]+: '$interface_prefix'/{s/.: ([^:]*):.*/\1/p}')
ip=$(ip addr show $iname | grep -Eo 'inet ([0-9]*\.){3}[0-9]*' | sed 's#inet ##g' | head -2 | tail -1)

echo "REACT_NATIVE_PACKAGER_HOSTNAME=$ip" > .devcontainer/.env
