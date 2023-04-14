import serial.tools.list_ports
import random
import time
import  sys
from  Adafruit_IO import  MQTTClient

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
    ser.write(("!"+feed_id+ ":" + str(payload) + "#").encode())
    print("!"+feed_id+ ":" + str(payload) + "#")

client = MQTTClient(AIO_USERNAME , AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()

def getPort(type):
    ports = serial.tools.list_ports.comports()
    N = len(ports)
    commPort = "None"
    for i in range(0, N):
        port = ports[i]
        strPort = str(port)
        if(type == 1):
            if "USB-SERIAL CH340" in strPort:
                splitPort = strPort.split(" ")
                commPort = (splitPort[0])
        elif(type== 2):
            if "Arduino Uno" in strPort:
                splitPort = strPort.split(" ")
                commPort = (splitPort[0])
    return commPort

ser = serial.Serial(getPort(1), 115200)
rfid = serial.Serial(getPort(2), 9600)
mess = ""
rfidmess = ""
def processData(data):
    data = data.replace("!", "")
    data = data.replace("#", "")
    splitData = data.split(":")
    print(splitData)
    if splitData[0] == "T":
        client.publish("cambiennhiet", splitData[1])
    if splitData[0] == "L":
        client.publish("cambienanhsang", splitData[1])
    if splitData[0] == "rfid":
        client.publish("thongbao", splitData[1])

def serial_parser(message):
    while ("#" in message) and ("!" in message):
        start = message.find("!")
        end = message.find("#")
        processData(message[start:end + 1])
        if (end == len(message)):
            message = ""
        else:
            message = message[end+1:]
def readSerial():
    bytesToRead = ser.inWaiting()
    rfidbytesToRead = rfid.inWaiting()
    if (bytesToRead > 0):
        global mess
        mess =  ser.read(bytesToRead).decode("UTF-8")
        serial_parser(mess)
    if (rfidbytesToRead > 0):
        global rfidmess
        rfidmess = rfid.read(rfidbytesToRead).decode("UTF-8")
        serial_parser(rfidmess)
while True:
    readSerial()
    time.sleep(1)