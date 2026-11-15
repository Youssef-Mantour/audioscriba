#!/usr/bin/env python3
"""mthlab: a basic starter script.

Usage:
    python mthlab.py                 # runs with the default greeting
    python mthlab.py --name Youssef  # custom greeting
    python mthlab.py --verbose       # extra output
"""

from __future__ import annotations

import argparse
import logging
import sys


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="mthlab",
        description="A basic starter script for mthlab.",
    )
    parser.add_argument(
        "--name",
        default="world",
        help="name to greet (default: %(default)s)",
    )
    parser.add_argument(
        "-v",
        "--verbose",
        action="store_true",
        help="enable debug logging",
    )
    return parser


def greet(name: str) -> str:
    """Return a greeting message for the given name."""
    return f"Hello, {name}! mthlab is running."


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)

    logging.basicConfig(
        level=logging.DEBUG if args.verbose else logging.INFO,
        format="%(levelname)s: %(message)s",
    )
    log = logging.getLogger("mthlab")
    log.debug("Parsed arguments: %s", vars(args))

    print(greet(args.name))
    return 0


if __name__ == "__main__":
    sys.exit(main())
