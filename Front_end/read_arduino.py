from flask import session
import serial
import time
import threading
import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import Front_end.gconfig as gconfig

notified = False

def sendNotification(subject, message):

    sender_email = "amythegreenhouseapp@gmail.com"
    sender_password = "aqch wtwi xvmr fawl"

    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = gconfig.email
    msg["Subject"] = subject

    msg.attach(MIMEText(message, "html"))

    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(sender_email, sender_password)
    server.send_message(msg)
    server.quit()


def whenNotify(temp):
    global notified
    if not gconfig.email:
        print("No hay nadie a quien enviar")
    elif temp > 35 and notified == False:
        sendNotification("AMY is hot", f"The current temperature is {temp}")
        notified = True
    elif temp < 8 and notified == False:
        sendNotification("AMY is cold", f"The current temperature is {temp}")
        notified = True
    elif temp >= 8 and temp <= 35:
        notified = False

'''
temperature = None
humidity = None
arduino = None
watch = ["Na", "Na", "Na", "Na", "Na"]
temperaturesRegister = ["Na", "Na", "Na", "Na", "Na"]
humidityRegister = ["Na", "Na", "Na", "Na", "Na"]

def arduinoConnection(port="COM3", baudrate = 9600):
    global arduino
    try:
        arduino = serial.Serial(port = port, baudrate = baudrate, timeout = 1)
        time.sleep(4)
        return True
    except serial.SerialException as e:
        print(f"Arduino no se pudo conectar {e}")
        arduino = None
        return False
    

def read_from_arduino():
    global temperature, humidity
    if not arduino:
        print("arduino no esta conectado")
        return
    while True:
        if arduino.in_waiting > 0:
            line = arduino.readline().decode("utf-8").rstrip()
            parts = line.split(",")
            if len(parts) == 2:
                humidity, temperature = map(float, parts)
                whenNotify(temperature)
        time.sleep(2)



def start_arduino_treat():
    t = threading.Thread(target=read_from_arduino, daemon=True)
    t.start()

def lastTemperatures():
    global temperaturesRegister, temperature
    lastMinute = -1
    while True:
        time.sleep(5)
        now = datetime.datetime.now()
        if now.minute in [15, 30, 45, 0] and now.minute != lastMinute:
            if temperature is not None:
                temperaturesRegister.insert(0, temperature)
                lastMinute = now.minute
                if len(temperaturesRegister) > 5:
                    temperaturesRegister.pop()

def lastHumidities():
    global humidityRegister, humidity, watch
    lastMinute = -1
    while True:
        time.sleep(5)
        now = datetime.datetime.now()
        if now.minute in [15, 30, 45, 0] and now.minute != lastMinute:
            if humidity is not None:
                humidityRegister.insert(0, humidity)
                reloj = f"{now.hour:02d}:{now.minute:02d}"
                watch.insert(0, reloj)
                lastMinute = now.minute
                if len(humidityRegister) > 5:
                    humidityRegister.pop()
                    watch.pop()

def threadingLastTemperatures():
    t = threading.Thread(target=lastTemperatures, daemon=True)
    t.start()

def threadingLastHumidities():
    h = threading.Thread(target=lastHumidities, daemon=True)
    h.start()
'''






            

        
            


