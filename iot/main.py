import random
import time
import  sys
from  Adafruit_IO import  MQTTClient
from uart import *

AIO_FEED_IDs = ["servo","giatien","fan"]
AIO_USERNAME = "hibecung123"
AIO_KEY = "aio_tpcq72RxcF1b29pHwhDCbg1q2p9Z"

def  connected(client):
    print("Ket noi thanh cong...")
    for topic in AIO_FEED_IDs:
        client.subscribe(topic)

def  subscribe(client , userdata , mid , granted_qos):
    print("Subcribe thanh cong...")

def  disconnected(client):
    print("Ngat ket noi...")
    sys.exit (1)

def  message(client , feed_id , payload):
    writeSerial(feed_id , payload)
client = MQTTClient(AIO_USERNAME , AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()


while True:
    readSerial(client)
    time.sleep(1)