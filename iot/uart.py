import serial.tools.list_ports
def getPort():
    ports = serial.tools.list_ports.comports()
    N = len(ports)
    commPort = "None"
    for i in range(0, N):
        port = ports[i]
        strPort = str(port)
        if "USB Serial Device" in strPort:
            splitPort = strPort.split(" ")
            commPort = (splitPort[0])
    return commPort
isMicrobitConnected = False
if getPort()!="None":
    ser=serial.Serial(getPort(),115200)
    print("Ket noi thanh cong ...")
    isMicrobitConnected = True

def processData(data,client):
    data = data.replace("!", "")
    data = data.replace("#", "")
    splitData = data.split(":")
    print(splitData)
    if splitData[0] == "T":
        client.publish("cambiennhiet", splitData[1])
    if splitData[0] == "L":
        client.publish("cambienanhsang", splitData[1])
mess = ""
def readSerial(client):
    bytesToRead = ser.inWaiting()
    if (bytesToRead > 0):
        global mess
        mess = mess + ser.read(bytesToRead).decode("UTF-8")
        while ("#" in mess) and ("!" in mess):
            start = mess.find("!")
            end = mess.find("#")
            processData(mess[start:end + 1],client)
            if (end == len(mess)):
                mess = ""
            else:
                mess = mess[end+1:]
