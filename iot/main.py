import time
import  sys
from  Adafruit_IO import  MQTTClient
from  uart import *
AIO_FEED_IDs =["nutnhan1,nutnhan2"]
AIO_USERNAME = "hibecung123"
AIO_KEY = "aio_lbtq23oB0afgjs4jTJAa3FlY1cBV"

def  connected(client):
    print("Ket noi thanh cong...")
    for topic in AIO_FEED_IDs:
        client.subscribe(topic)

def  subscribe(client , userdata , mid , granted_qos):
    print("Subscribe thanh cong...")

def  disconnected(client):
    print("Ngat ket noi...")
    sys.exit (1)

def  message(client , feed_id , payload):
    print("Nhan du lieu: " +"tu "+feed_id+" "+ payload)
    if isMicrobitConnected:
        ser.write((str(payload)+"#").encode())


client = MQTTClient(AIO_USERNAME , AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()

while True:
    if isMicrobitConnected:
        readSerial(client)
    time.sleep(1)