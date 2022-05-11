#! /usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");
const assert = require("assert");

const IMAGE = process.argv[2] || 'debian';
const ROOT = path.resolve(__dirname, '..');
const V86_ROOT = path.resolve(__dirname, 'vendor/v86');;
const V86_LIB = path.join(V86_ROOT, "build/libv86.js");
assert.ok(fs.existsSync(V86_LIB), `make sure to run "make all" and build v86 before this`)

const { V86 } = require(V86_LIB);
const OUTPUT_FILE = path.join(ROOT, `dist/${IMAGE}/${IMAGE}-state-base.bin`);

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding("utf8");
process.stdin.on("data", (c) => c === "\u0003" ? stop() : emulator.serial0_send(c));

const emulator = new V86({
  bios: { url: path.join(V86_ROOT, "bios/seabios.bin") },
  vga_bios: { url: path.join(V86_ROOT, "bios/vgabios.bin") },
  autostart: true,
  memory_size: 512 * 1024 * 1024,
  vga_memory_size: 8 * 1024 * 1024,
  bzimage_initrd_from_filesystem: true,
  cmdline: "rw init=/bin/systemd root=host9p console=ttyS0 spectre_v2=off pti=off net.ifnames=0 biosdevname=0",
  filesystem: {
    basefs: {
      url: path.join(ROOT, `dist/${IMAGE}/${IMAGE}-base-fs.json`),
    },
    baseurl: path.join(ROOT, `dist/${IMAGE}/${IMAGE}-9p-rootfs-flat/`),
  },
  screen_dummy: true,
});

console.log("Now booting, please stand by ...");

const boot_start = Date.now();
let serial_text = "";
let booted = false;

emulator.add_listener("serial0-output-char", function (c) {
  process.stdout.write(c);

  serial_text += c;

  if (!booted && serial_text.endsWith("root@localhost:~# ")) {
    console.error("\nBooted in %d", (Date.now() - boot_start) / 1000);
    booted = true;

    // sync and drop caches: Makes it safer to change the filesystem as fewer files are rendered
    emulator.serial0_send("sync;echo 3 >/proc/sys/vm/drop_caches\n");
    console.log("Waiting 10 seconds before taking the disk snapshot...");

    setTimeout(function () {
      emulator.save_state(function (err, s) {
        if (err) throw err;
        fs.writeFile(OUTPUT_FILE, new Uint8Array(s), function (e) {
          if (e) throw e;
          console.error("Saved as " + OUTPUT_FILE);
          stop();
        });
      });
    }, 10 * 1000);
  }
});

function stop() {
  emulator.stop();
  process.stdin.pause();
}
