ENDPOINT_URI := http://localhost:5501/api/v1/headers/check
TARGET_URI := https://login.authdog.com

test:
	curl -X POST \
     -H "Content-Type: application/json" \
    --data '{"uri":"$(TARGET_URI)"}' \
    $(ENDPOINT_URI)