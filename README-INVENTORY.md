# Inventory data contract — /inventory.json

The website renders inventory from this file. The DealerCenter sync job's only task:
regenerate this file from the DMS feed and commit (site auto-deploys).

## Fields (per vehicle)
- name     string  "2017 Toyota Camry SE" (year make model trim)
- miles    number  88140
- price    number  13990  (advertised price, excludes tax/tag/title/$499 fee)
- mo       number  monthly estimate — currently unused on site, reserved
- body     enum    "Sedans" | "SUVs" | "Trucks" | "Vans"
- badge    enum    null | "new" (Just Revamped tag) | "pending" (Sale Pending)
- photos   number  photo count (future: photoUrls array from DMS feed)
- unit     string  stock/lot unit number

## DealerCenter mapping (confirm on demo call)
name <- Year+Make+Model+Trim · miles <- Odometer · price <- Internet Price
body <- Body Style · unit <- Stock # · photos/photoUrls <- Photo URLs column
badge: "new" first 7 days on lot, "pending" from deal status.

## Behavior
Pages fetch /inventory.json on load; if unreachable/invalid they fall back to
built-in data. Updating inventory = replace this file only. Never edit page files.
