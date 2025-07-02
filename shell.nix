let pkgs = import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/e00e1aba2a7016e8e85736144b7529454440c8c4.tar.gz") {};
in
  pkgs.mkShell {
    packages = [ pkgs.hugo ];
  }
