FROM --platform=linux/386 i386/debian:bullseye

ENV HOME /root
ENV DEBIAN_FRONTEND noninteractive

COPY data/boot-9p /etc/initramfs-tools/scripts/boot-9p
COPY data/networking.sh $HOME
COPY data/ne2k /ne2k

RUN apt-get update && \
  apt-get upgrade -y && \
  apt-get --yes --no-install-recommends --no-install-suggests install \
    linux-image-686 systemd initramfs-tools \
    ca-certificates net-tools dhcpcd5 \
    # packages needed to build 32 bit binaries and kernel modules, will be removed later
    build-essential make cmake linux-headers-686-pae \
  && \
  chmod +x ~/networking.sh && \
  # build the ne2k network driver
  cd /ne2k && make && make install && cd ~ && rm -rf /ne2k && \
  # change shell to bash and change root password
  chsh -s /bin/bash && \
  echo "root:root" | chpasswd && \
  # setup for serial access
  mkdir -p /etc/systemd/system/serial-getty@ttyS0.service.d/ && \
  systemctl enable serial-getty@ttyS0.service && \
  # disable "normal" services that aren't needed
  rm /lib/systemd/system/getty.target.wants/getty-static.service && \
  systemctl disable systemd-journal-flush.service && \
  systemctl disable systemd-journald.service && \
  systemctl disable systemd-timesyncd.service && \
  systemctl disable apt-daily.timer && \
  systemctl disable apt-daily-upgrade.timer && \
  # make sure fstab is configured with tmpfs
  echo "tmpfs /tmp tmpfs nodev,nosuid 0 0" >> /etc/fstab && \
  # boot with 9pfs (comment out to boot from hdd)
  printf '%s\n' 9p 9pnet 9pnet_virtio virtio virtio_ring virtio_pci | tee -a /etc/initramfs-tools/modules && \
  echo 'BOOT=boot-9p' | tee -a /etc/initramfs-tools/initramfs.conf && \
  update-initramfs -u && \
  # clean up as much as possible to reduce image space
  apt-get remove --yes --purge build-essential make cmake linux-headers-686-pae && \
  apt-get --yes autoremove --purge && \
  apt-get --yes autoclean && \
  apt-get --yes clean && \
  rm -r /var/lib/apt/lists/* && \
  rm -r /usr/share/doc/* && \
  rm -r /usr/share/man/* && \
  rm /var/log/*.log /var/log/lastlog /var/log/wtmp /var/log/apt/*.log /var/log/apt/*.xz && \
  # get bent.
  echo "done :)"

COPY data/getty-noclear.conf data/getty-override.conf /etc/systemd/system/getty@tty1.service.d/
COPY data/getty-autologin-serial.conf /etc/systemd/system/serial-getty@ttyS0.service.d/
COPY data/logind.conf /etc/systemd/logind.conf
