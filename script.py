"""A basic Python script: reads a name from the command line and prints a greeting."""

import argparse


def greet(name: str) -> str:
    """Return a greeting for the given name."""
    return f"Hello, {name}!"


def main() -> None:
    parser = argparse.ArgumentParser(description="Print a greeting.")
    parser.add_argument("name", nargs="?", default="world", help="name to greet")
    args = parser.parse_args()
    print(greet(args.name))


if __name__ == "__main__":
    main()
