# ne2k kernel driver

ne2k kernel driver is missing in debain images so we have to compile it oursleves.

if you are planning to upgrade the "bent" image and kernel, you should also upgrade these files.

currently they are grabbed for kernel version [5.10 (debian bullseye)](https://www.debian.org/releases/stable/amd64/release-notes/ch-whats-new.html) from:

- [ne2k-pci.c](https://github.com/torvalds/linux/blob/v5.10/drivers/net/ethernet/8390/ne2k-pci.c)
- [8390.h](https://github.com/torvalds/linux/blob/v5.10/drivers/net/ethernet/8390/8390.h)
- [8390.c](https://github.com/torvalds/linux/blob/v5.10/drivers/net/ethernet/8390/8390.c)
