#!/bin/sh
# Prints a secret env var (default NPM_TOKEN) masked the way npmjs.com's token page shows it.

name="${1:-NPM_TOKEN}"
case "$name" in
    '' | [0-9]* | *[!A-Za-z0-9_]*)
        echo "invalid variable name: $name"
        exit 0
        ;;
esac

eval "value=\${$name-}"

if [ -z "$value" ]; then
    echo "$name: not set"
    exit 0
fi

token="${value#"${value%%[![:space:]]*}"}"
token="${token%"${token##*[![:space:]]}"}"

notes="${#value} chars"
if [ "$token" != "$value" ]; then
    notes="$notes, $((${#value} - ${#token})) of them leading/trailing whitespace"
fi

# Showing 8 + 4 characters must still leave most of the secret hidden.
if [ "${#token}" -ge 24 ]; then
    rest="${token#????????}"
    first="${token%"$rest"}"
    lead="${token%????}"
    last="${token#"$lead"}"
    fingerprint="$first......$last"
else
    fingerprint="(too short to show any part)"
fi

echo "$name: $fingerprint ($notes)"
exit 0
