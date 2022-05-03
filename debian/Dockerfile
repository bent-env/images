FROM i386/debian:bullseye

ENV HOME /root
ENV PODMAN_ARGS "--storage-driver=vfs --cgroup-manager=cgroupfs --events-backend=none"
ENV DEBIAN_FRONTEND noninteractive

COPY data/boot-9p /etc/initramfs-tools/scripts/boot-9p

RUN apt-get update && \
  apt-get upgrade -y && \
  apt-get --yes --no-install-recommends install \
    linux-image-686 grub2 systemd initramfs-tools \
    ca-certificates nano podman crun \
  && \
  # 32 bit podman sanity pull and setup
  echo "alias docker='podman $PODMAN_ARGS'" >> ~/.bashrc && \
  bash -c "podman $PODMAN_ARGS pull docker.io/hello-world" && \
  # change shell to bash and change root password
  chsh -s /bin/bash && \
  echo "root:root" | chpasswd && \
  # setup for serial access
  mkdir -p /etc/systemd/system/serial-getty@ttyS0.service.d/ && \
  systemctl enable serial-getty@ttyS0.service && \
  # disable "normal" services that aren't needed
  rm /lib/systemd/system/getty.target.wants/getty-static.service && \
  systemctl disable systemd-timesyncd.service && \
  systemctl disable apt-daily.timer && \
  systemctl disable apt-daily-upgrade.timer && \
  systemctl disable dhcpcd.service && \
  # make sure fstab is configured with tmpfs
  echo "tmpfs /tmp tmpfs nodev,nosuid 0 0" >> /etc/fstab && \
  # boot with 9pfs (comment out to boot from hdd)
  printf '%s\n' 9p 9pnet 9pnet_virtio virtio virtio_ring virtio_pci | tee -a /etc/initramfs-tools/modules && \
  echo 'BOOT=boot-9p' | tee -a /etc/initramfs-tools/initramfs.conf && \
  update-initramfs -u && \
  # clean up as much as possible to reduce image space
  apt-get autoremove -y && \
  apt-get --yes clean && \
  rm -r /var/lib/apt/lists/* && \
  rm -r /usr/share/doc/* && \
  rm -r /usr/share/man/* && \
  rm -r /usr/share/locale/?? && \
  rm /var/log/*.log /var/log/lastlog /var/log/wtmp /var/log/apt/*.log /var/log/apt/*.xz && \
  # get bent.
  echo "done :)"

COPY data/getty-noclear.conf data/getty-override.conf /etc/systemd/system/getty@tty1.service.d/
COPY data/getty-autologin-serial.conf /etc/systemd/system/serial-getty@ttyS0.service.d/
COPY data/logind.conf /etc/systemd/logind.conf
COPY data/containers /usr/share/containers
