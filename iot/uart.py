import serial.tools.list_ports

isMicrobitconnected=False
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
ser=""
rfid=""
rfidconnected=False
def get_RFID_serial():
    try:
        global rfid,rfidconnected
        rfid = serial.Serial(getPort(2), 9600)
        print("RFID been connected")
        rfidconnected=True
    except:
        print("RFID not found")
        rfidconnected=False
def get_microbit_serial():
    try:
        global ser,isMicrobitconnected
        ser = serial.Serial(getPort(1), 115200)
        print("Microbit been connected")
        isMicrobitconnected=True
    except:
        print("Microbit not found")
        isMicrobitconnected=False
mess = ""
rfidmess = ""
def processData(data,client):
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

def serial_parser(message,client):
    while ("#" in message) and ("!" in message):
        start = message.find("!")
        end = message.find("#")
        processData(message[start:end + 1],client)
        if (end == len(message)):
            message = ""
        else:
            message = message[end+1:]
def readSerial(client):
    try:
        bytesToRead = ser.inWaiting()
        if (bytesToRead > 0):
            global mess
            mess =  ser.read(bytesToRead).decode("UTF-8")
            serial_parser(mess,client)
    except:
        if(not isMicrobitconnected):
            get_microbit_serial()
    try:
        rfidbytesToRead = rfid.inWaiting()
        if (rfidbytesToRead > 0):
            global rfidmess
            rfidmess = rfid.read(rfidbytesToRead).decode("UTF-8")
            serial_parser(rfidmess,client)
    except:
        if(not rfidconnected):
            get_RFID_serial()

def writeSerial(feed_id, payload):
    if(isMicrobitconnected):
        ser.write(("!"+feed_id+ ":" + str(payload) + "#").encode())
        print("!"+feed_id+ ":" + str(payload) + "#")
