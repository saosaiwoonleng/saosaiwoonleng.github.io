#!/usr/bin/env python3
"""Check that local href/src references in HTML files resolve to real files."""
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

REPO_ROOT = Path(__file__).resolve().parents[2]
ATTRS_TO_CHECK = {"src", "href"}
SKIP_PREFIXES = ("http://", "https://", "//", "mailto:", "tel:", "javascript:", "data:")


class LinkExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []

    def handle_starttag(self, tag, attrs):
        for name, value in attrs:
            if name in ATTRS_TO_CHECK and value:
                self.refs.append(value)


def local_path_for(ref, html_file):
    if ref.startswith(SKIP_PREFIXES) or ref.startswith("#"):
        return None
    path = urlsplit(ref).path
    if not path:
        return None
    if path.startswith("/"):
        return REPO_ROOT / path.lstrip("/")
    return html_file.parent / path


def main():
    html_files = sorted(REPO_ROOT.glob("*.html"))
    missing = []
    for html_file in html_files:
        parser = LinkExtractor()
        parser.feed(html_file.read_text(encoding="utf-8", errors="replace"))
        for ref in parser.refs:
            target = local_path_for(ref, html_file)
            if target is not None and not target.exists():
                missing.append(f"{html_file.relative_to(REPO_ROOT)}: missing '{ref}'")

    if missing:
        print("Broken local references found:")
        for line in missing:
            print(f"  - {line}")
        return 1

    print(f"All local references in {len(html_files)} HTML file(s) resolve correctly.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
