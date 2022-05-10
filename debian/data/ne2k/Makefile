obj-m = ne2k-pci.o
KVERSION = $(shell ls /lib/modules/ | head -1)
all:
	@echo using kernel headers $(KVERSION)
	make -C /lib/modules/$(KVERSION)-pae/build M=$(PWD) modules
install:
	mkdir -p /lib/modules/$(KVERSION)/kernel/drivers/ne2k-pci
	cp ne2k-pci.ko /lib/modules/$(KVERSION)/kernel/drivers/ne2k-pci/
clean:
	make -C /lib/modules/$(KVERSION)-pae/build M=$(PWD) clean
