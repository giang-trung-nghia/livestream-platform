# livestream-platform

## Frontend
.env.local
VUE_APP_IP = "http://<ip_address>:"
VUE_APP_PORT_API = "3000"
VUE_APP_PORT_WEBSOCKET = "3001"
VUE_APP_PORT_HLS = "8888/hls"
VUE_APP_PORT_LIVE = "1935/live"

## Backend
.env
SECRET_KEY=NGHIA_KEY
DATABASE_USER=root
DATEBASE_PASSWORD=root
MONGO_URI=mongodb+srv://nghia2905per:nghiA2905@livestream-platform.2ii1nwi.mongodb.net/?retryWrites=true&w=majority&appName=livestream-platform
MONGO_URI=<mongo_connection_string>

## Nginx
on_publish http://<ip_address>:3000/auth;