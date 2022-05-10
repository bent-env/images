#! /bin/bash -eux

# restart the ne2k driver
rmmod ne2k-pci && modprobe ne2k-pci
# shutdown eth0 to clear the "initial_state"'s dhcp cache
ifconfig eth0 down
# restart the dhcp server so we get new networking config
/etc/init.d/dhcpcd restart
# find out whet the default gateway is
_gw=$(cat /etc/resolv.conf | grep -m 1 nameserver | sed 's/nameserver //g')
# setting the default gateway
route add default gw $_gw
# cleanup if successful
unset _gw
