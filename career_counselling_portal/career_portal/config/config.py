from pusher import Pusher

app_id = "1757982"
key = "66a0704e45889e2fdd5a"
secret = "3a9fb5c7316a1640fda6"
cluster = "ap1"

pusher_client = Pusher(
    app_id=app_id,
    key=key,
    secret=secret,
    cluster=cluster
)