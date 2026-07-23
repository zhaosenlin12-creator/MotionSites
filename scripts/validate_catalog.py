"""Validate that every prompt referenced in docs/catalog.json exists on disk.

Also validates front-matter and id uniqueness. Run as:

    python scripts/validate_catalog.py
"""
import json
import pathlib
import re
import sys

REPO = pathlib.Path(__file__).resolve().parent.parent
CATALOG = REPO / "docs" / "catalog.json"

FRONT_MATTER = re.compile(r"^---\n(.*?)\n---", re.DOTALL)


def main() -> int:
    catalog = json.loads(CATALOG.read_text(encoding="utf-8"))
    errors = []
    seen_ids = set()

    for entry in catalog.get("prompts", []):
        pid = entry.get("id")
        if pid in seen_ids:
            errors.append(f"duplicate id: {pid}")
        seen_ids.add(pid)

        path = REPO / entry.get("path", "")
        if not path.exists():
            errors.append(f"missing prompt file for {pid}: {path}")
            continue

        text = path.read_text(encoding="utf-8")
        m = FRONT_MATTER.match(text)
        if not m:
            errors.append(f"{pid}: missing YAML front-matter")
            continue
        fm = {}
        for line in m.group(1).splitlines():
            if ":" in line:
                k, _, v = line.partition(":")
                fm[k.strip()] = v.strip()
        if fm.get("id") != pid:
            errors.append(f"{pid}: front-matter id mismatch ({fm.get('id')!r})")
        if not fm.get("category"):
            errors.append(f"{pid}: missing category in front-matter")
        if not fm.get("type"):
            errors.append(f"{pid}: missing type in front-matter")

        preview = REPO / entry.get("preview", "")
        if not preview.exists():
            errors.append(f"{pid}: missing preview {preview}")

    if errors:
        print("FAIL:")
        for e in errors:
            print(" -", e)
        return 1
    print(f"OK: {len(catalog.get('prompts', []))} prompts validated")
    return 0


if __name__ == "__main__":
    sys.exit(main())
