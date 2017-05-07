EESchema Schematic File Version 2
LIBS:power
LIBS:device
LIBS:transistors
LIBS:conn
LIBS:linear
LIBS:regul
LIBS:74xx
LIBS:cmos4000
LIBS:adc-dac
LIBS:memory
LIBS:xilinx
LIBS:microcontrollers
LIBS:dsp
LIBS:microchip
LIBS:analog_switches
LIBS:motorola
LIBS:texas
LIBS:intel
LIBS:audio
LIBS:interface
LIBS:digital-audio
LIBS:philips
LIBS:display
LIBS:cypress
LIBS:siliconi
LIBS:opto
LIBS:atmel
LIBS:contrib
LIBS:valves
LIBS:L293D
LIBS:SparkFun-Boards
LIBS:piLazorTag_mainboard-cache
EELAYER 25 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 1 1
Title ""
Date ""
Rev ""
Comp ""
Comment1 ""
Comment2 ""
Comment3 ""
Comment4 ""
$EndDescr
Text Label 3200 1800 0    60   ~ 0
G2/i2c
Text Label 3200 1900 0    60   ~ 0
G3/i2c
Text Label 3200 2000 0    60   ~ 0
G4
$Comp
L GND #PWR01
U 1 1 58F6B83E
P 3200 2100
F 0 "#PWR01" H 3200 1850 50  0001 C CNN
F 1 "GND" H 3200 1950 50  0000 C CNN
F 2 "" H 3200 2100 50  0001 C CNN
F 3 "" H 3200 2100 50  0001 C CNN
	1    3200 2100
	0    1    1    0   
$EndComp
Text Label 3200 2200 0    60   ~ 0
G17
Text Label 3200 2300 0    60   ~ 0
G27
Text Label 3200 2400 0    60   ~ 0
G22
$Comp
L +3.3V #PWR02
U 1 1 58F6B925
P 3200 2500
F 0 "#PWR02" H 3200 2350 50  0001 C CNN
F 1 "+3.3V" H 3200 2640 50  0000 C CNN
F 2 "" H 3200 2500 50  0001 C CNN
F 3 "" H 3200 2500 50  0001 C CNN
	1    3200 2500
	0    -1   -1   0   
$EndComp
Text Label 3200 2600 0    60   ~ 0
G10/spi
Text Label 3200 2700 0    60   ~ 0
G9/spi
Text Label 3200 2800 0    60   ~ 0
G11/spi
$Comp
L pi_header RasperryZero1
U 1 1 58F6BD1F
P 3800 2650
F 0 "RasperryZero1" H 3800 3700 50  0000 C CNN
F 1 "pi_header" V 3800 2650 50  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_2x20_Pitch2.54mm" H 3800 1700 50  0001 C CNN
F 3 "" H 3800 1700 50  0001 C CNN
	1    3800 2650
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR03
U 1 1 58F6BE3A
P 3200 2900
F 0 "#PWR03" H 3200 2650 50  0001 C CNN
F 1 "GND" H 3200 2750 50  0000 C CNN
F 2 "" H 3200 2900 50  0001 C CNN
F 3 "" H 3200 2900 50  0001 C CNN
	1    3200 2900
	0    1    1    0   
$EndComp
Text Label 3200 3100 0    60   ~ 0
G5
Text Label 3200 3200 0    60   ~ 0
G6
Text Label 3200 3300 0    60   ~ 0
G13
Text Label 3200 3400 0    60   ~ 0
G19
Text Label 3200 3500 0    60   ~ 0
G26
$Comp
L GND #PWR04
U 1 1 58F6BEEB
P 3200 3600
F 0 "#PWR04" H 3200 3350 50  0001 C CNN
F 1 "GND" H 3200 3450 50  0000 C CNN
F 2 "" H 3200 3600 50  0001 C CNN
F 3 "" H 3200 3600 50  0001 C CNN
	1    3200 3600
	0    1    1    0   
$EndComp
$Comp
L +3.3V #PWR05
U 1 1 58F6BFD2
P 3200 1700
F 0 "#PWR05" H 3200 1550 50  0001 C CNN
F 1 "+3.3V" H 3200 1840 50  0000 C CNN
F 2 "" H 3200 1700 50  0001 C CNN
F 3 "" H 3200 1700 50  0001 C CNN
	1    3200 1700
	0    -1   -1   0   
$EndComp
$Comp
L +5V #PWR06
U 1 1 58F6C083
P 4400 1700
F 0 "#PWR06" H 4400 1550 50  0001 C CNN
F 1 "+5V" H 4400 1840 50  0000 C CNN
F 2 "" H 4400 1700 50  0001 C CNN
F 3 "" H 4400 1700 50  0001 C CNN
	1    4400 1700
	0    1    1    0   
$EndComp
$Comp
L +5V #PWR07
U 1 1 58F6C0B1
P 4400 1800
F 0 "#PWR07" H 4400 1650 50  0001 C CNN
F 1 "+5V" H 4400 1940 50  0000 C CNN
F 2 "" H 4400 1800 50  0001 C CNN
F 3 "" H 4400 1800 50  0001 C CNN
	1    4400 1800
	0    1    1    0   
$EndComp
$Comp
L GND #PWR08
U 1 1 58F6C0E0
P 4400 1900
F 0 "#PWR08" H 4400 1650 50  0001 C CNN
F 1 "GND" H 4400 1750 50  0000 C CNN
F 2 "" H 4400 1900 50  0001 C CNN
F 3 "" H 4400 1900 50  0001 C CNN
	1    4400 1900
	0    -1   -1   0   
$EndComp
Text Label 4400 2000 2    60   ~ 0
G14/ua
Text Label 4400 2100 2    60   ~ 0
G15/ua
Text Label 4400 2200 2    60   ~ 0
G18
$Comp
L GND #PWR09
U 1 1 58F6C176
P 4400 2300
F 0 "#PWR09" H 4400 2050 50  0001 C CNN
F 1 "GND" H 4400 2150 50  0000 C CNN
F 2 "" H 4400 2300 50  0001 C CNN
F 3 "" H 4400 2300 50  0001 C CNN
	1    4400 2300
	0    -1   -1   0   
$EndComp
Text Label 4400 2400 2    60   ~ 0
G23
Text Label 4400 2500 2    60   ~ 0
G24
$Comp
L GND #PWR010
U 1 1 58F6C204
P 4400 2600
F 0 "#PWR010" H 4400 2350 50  0001 C CNN
F 1 "GND" H 4400 2450 50  0000 C CNN
F 2 "" H 4400 2600 50  0001 C CNN
F 3 "" H 4400 2600 50  0001 C CNN
	1    4400 2600
	0    -1   -1   0   
$EndComp
Text Label 4400 2700 2    60   ~ 0
G25
Text Label 4400 2800 2    60   ~ 0
G8/spi
Text Label 4400 2900 2    60   ~ 0
G7/spi
$Comp
L GND #PWR011
U 1 1 58F6C42F
P 4400 3100
F 0 "#PWR011" H 4400 2850 50  0001 C CNN
F 1 "GND" H 4400 2950 50  0000 C CNN
F 2 "" H 4400 3100 50  0001 C CNN
F 3 "" H 4400 3100 50  0001 C CNN
	1    4400 3100
	0    -1   -1   0   
$EndComp
Text Label 4400 3200 2    60   ~ 0
G12
$Comp
L GND #PWR012
U 1 1 58F6C4D9
P 4400 3300
F 0 "#PWR012" H 4400 3050 50  0001 C CNN
F 1 "GND" H 4400 3150 50  0000 C CNN
F 2 "" H 4400 3300 50  0001 C CNN
F 3 "" H 4400 3300 50  0001 C CNN
	1    4400 3300
	0    -1   -1   0   
$EndComp
Text Label 4400 3400 2    60   ~ 0
G16
Text Label 4400 3500 2    60   ~ 0
G20
Text Label 4400 3600 2    60   ~ 0
G21
$Comp
L CONN_01X06 MUZZLE_H1
U 1 1 58F7073F
P 10650 3150
F 0 "MUZZLE_H1" H 10650 3500 50  0000 C CNN
F 1 "CONN_01X06" V 10750 3150 50  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_1x06_Pitch2.54mm" H 10650 3150 50  0001 C CNN
F 3 "" H 10650 3150 50  0001 C CNN
	1    10650 3150
	1    0    0    -1  
$EndComp
$Comp
L +5V #PWR013
U 1 1 58F708B4
P 10100 2650
F 0 "#PWR013" H 10100 2500 50  0001 C CNN
F 1 "+5V" H 10100 2790 50  0000 C CNN
F 2 "" H 10100 2650 50  0001 C CNN
F 3 "" H 10100 2650 50  0001 C CNN
	1    10100 2650
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR014
U 1 1 58F70929
P 10100 3050
F 0 "#PWR014" H 10100 2800 50  0001 C CNN
F 1 "GND" H 10100 2900 50  0000 C CNN
F 2 "" H 10100 3050 50  0001 C CNN
F 3 "" H 10100 3050 50  0001 C CNN
	1    10100 3050
	0    1    1    0   
$EndComp
Text Label 10000 3200 0    60   ~ 0
LED_IR_GND
Text Label 10000 3300 0    60   ~ 0
M_LED_DI
Text Label 10000 3400 0    60   ~ 0
M_LED_DO
$Comp
L CONN_01X02 5V_POWER1
U 1 1 58F70C26
P 9850 1150
F 0 "5V_POWER1" H 9850 1300 50  0000 C CNN
F 1 "CONN_01X02" V 9950 1150 50  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_2x01_Pitch2.54mm" H 9850 1150 50  0001 C CNN
F 3 "" H 9850 1150 50  0001 C CNN
	1    9850 1150
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR015
U 1 1 58F70D86
P 9450 1350
F 0 "#PWR015" H 9450 1100 50  0001 C CNN
F 1 "GND" H 9450 1200 50  0000 C CNN
F 2 "" H 9450 1350 50  0001 C CNN
F 3 "" H 9450 1350 50  0001 C CNN
	1    9450 1350
	1    0    0    -1  
$EndComp
$Comp
L +5V #PWR016
U 1 1 58F70DA0
P 9450 950
F 0 "#PWR016" H 9450 800 50  0001 C CNN
F 1 "+5V" H 9450 1090 50  0000 C CNN
F 2 "" H 9450 950 50  0001 C CNN
F 3 "" H 9450 950 50  0001 C CNN
	1    9450 950 
	1    0    0    -1  
$EndComp
$Comp
L CONN_01X05 RECEIVER_H1
U 1 1 58F70948
P 10650 5050
F 0 "RECEIVER_H1" H 10650 5350 50  0000 C CNN
F 1 "CONN_01X05" V 10750 5050 50  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_1x05_Pitch2.54mm" H 10650 5050 50  0001 C CNN
F 3 "" H 10650 5050 50  0001 C CNN
	1    10650 5050
	1    0    0    -1  
$EndComp
$Comp
L +5V #PWR017
U 1 1 58F70A20
P 9950 4650
F 0 "#PWR017" H 9950 4500 50  0001 C CNN
F 1 "+5V" H 9950 4790 50  0000 C CNN
F 2 "" H 9950 4650 50  0001 C CNN
F 3 "" H 9950 4650 50  0001 C CNN
	1    9950 4650
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR018
U 1 1 58F70AB7
P 9950 5000
F 0 "#PWR018" H 9950 4750 50  0001 C CNN
F 1 "GND" H 9950 4850 50  0000 C CNN
F 2 "" H 9950 5000 50  0001 C CNN
F 3 "" H 9950 5000 50  0001 C CNN
	1    9950 5000
	0    1    1    0   
$EndComp
Text Label 10100 5150 0    60   ~ 0
IR_SIG
Text Label 10100 5250 0    60   ~ 0
H_LED_DI
$Comp
L BS170 IR_LED_DRIVER1
U 1 1 58F7369D
P 8750 3350
F 0 "IR_LED_DRIVER1" H 8950 3425 50  0000 L CNN
F 1 "BS170" H 8950 3350 50  0000 L CNN
F 2 "TO_SOT_Packages_THT:TO-92_Inline_Wide" H 8950 3275 50  0000 L CIN
F 3 "" H 8750 3350 50  0000 L CNN
	1    8750 3350
	1    0    0    -1  
$EndComp
$Comp
L R 100K1
U 1 1 58F737B3
P 8300 3550
F 0 "100K1" V 8380 3550 50  0000 C CNN
F 1 "R" V 8300 3550 50  0000 C CNN
F 2 "Resistors_THT:R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal" V 8230 3550 50  0001 C CNN
F 3 "" H 8300 3550 50  0000 C CNN
	1    8300 3550
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR019
U 1 1 58F73808
P 8850 3950
F 0 "#PWR019" H 8850 3700 50  0001 C CNN
F 1 "GND" H 8850 3800 50  0000 C CNN
F 2 "" H 8850 3950 50  0000 C CNN
F 3 "" H 8850 3950 50  0000 C CNN
	1    8850 3950
	1    0    0    -1  
$EndComp
$Comp
L L293D RUMBLE_DRIVER1
U 1 1 590D950F
P 4750 6400
F 0 "RUMBLE_DRIVER1" H 4350 7240 50  0000 L CNN
F 1 "L293D" H 4350 5500 50  0000 L CNN
F 2 "L293D:DIL16" H 4750 6400 50  0001 L CNN
F 3 "STMicroelectronics" H 4750 6400 50  0001 L CNN
F 4 "Driver; 36V; Power DIP; 600mA Low LevelO/P; 1.2A O/P High Level; 4 Drivers; 7V" H 4750 6400 50  0001 L CNN "Description"
F 5 "2.62 USD" H 4750 6400 50  0001 L CNN "Price"
F 6 "L293D" H 4750 6400 50  0001 L CNN "MP"
F 7 "Good" H 4750 6400 50  0001 L CNN "Availability"
F 8 "DIP-16 STMicroelectronics" H 4750 6400 50  0001 L CNN "Package"
	1    4750 6400
	1    0    0    -1  
$EndComp
$Comp
L +3.3V #PWR020
U 1 1 590D9646
P 4150 5700
F 0 "#PWR020" H 4150 5550 50  0001 C CNN
F 1 "+3.3V" H 4150 5840 50  0000 C CNN
F 2 "" H 4150 5700 50  0001 C CNN
F 3 "" H 4150 5700 50  0001 C CNN
	1    4150 5700
	0    -1   -1   0   
$EndComp
$Comp
L +3.3V #PWR021
U 1 1 590D9676
P 5350 5700
F 0 "#PWR021" H 5350 5550 50  0001 C CNN
F 1 "+3.3V" H 5350 5840 50  0000 C CNN
F 2 "" H 5350 5700 50  0001 C CNN
F 3 "" H 5350 5700 50  0001 C CNN
	1    5350 5700
	0    1    1    0   
$EndComp
$Comp
L +5V #PWR022
U 1 1 590D9698
P 4150 7100
F 0 "#PWR022" H 4150 6950 50  0001 C CNN
F 1 "+5V" H 4150 7240 50  0000 C CNN
F 2 "" H 4150 7100 50  0001 C CNN
F 3 "" H 4150 7100 50  0001 C CNN
	1    4150 7100
	0    -1   -1   0   
$EndComp
$Comp
L GND #PWR023
U 1 1 590D96DD
P 5350 6300
F 0 "#PWR023" H 5350 6050 50  0001 C CNN
F 1 "GND" H 5350 6150 50  0000 C CNN
F 2 "" H 5350 6300 50  0001 C CNN
F 3 "" H 5350 6300 50  0001 C CNN
	1    5350 6300
	0    -1   -1   0   
$EndComp
$Comp
L GND #PWR024
U 1 1 590D96FF
P 5350 6500
F 0 "#PWR024" H 5350 6250 50  0001 C CNN
F 1 "GND" H 5350 6350 50  0000 C CNN
F 2 "" H 5350 6500 50  0001 C CNN
F 3 "" H 5350 6500 50  0001 C CNN
	1    5350 6500
	0    -1   -1   0   
$EndComp
$Comp
L GND #PWR025
U 1 1 590D9721
P 4150 6300
F 0 "#PWR025" H 4150 6050 50  0001 C CNN
F 1 "GND" H 4150 6150 50  0000 C CNN
F 2 "" H 4150 6300 50  0001 C CNN
F 3 "" H 4150 6300 50  0001 C CNN
	1    4150 6300
	0    1    1    0   
$EndComp
$Comp
L GND #PWR026
U 1 1 590D976C
P 4150 6500
F 0 "#PWR026" H 4150 6250 50  0001 C CNN
F 1 "GND" H 4150 6350 50  0000 C CNN
F 2 "" H 4150 6500 50  0001 C CNN
F 3 "" H 4150 6500 50  0001 C CNN
	1    4150 6500
	0    1    1    0   
$EndComp
$Comp
L GND #PWR027
U 1 1 590D9999
P 4150 6900
F 0 "#PWR027" H 4150 6650 50  0001 C CNN
F 1 "GND" H 4150 6750 50  0000 C CNN
F 2 "" H 4150 6900 50  0001 C CNN
F 3 "" H 4150 6900 50  0001 C CNN
	1    4150 6900
	0    1    1    0   
$EndComp
Text Label 3800 5900 0    60   ~ 0
PI_RUMBLE
$Comp
L CONN_01X02 MOTOR_RUMBLE1
U 1 1 590D9C3D
P 3250 6400
F 0 "MOTOR_RUMBLE1" H 3250 6550 50  0000 C CNN
F 1 "CONN_01X02" V 3350 6400 50  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_1x02_Pitch2.54mm" H 3250 6400 50  0001 C CNN
F 3 "" H 3250 6400 50  0001 C CNN
	1    3250 6400
	-1   0    0    1   
$EndComp
$Comp
L CONN_01X04 SSD1603
U 1 1 590DAB97
P 1900 4250
F 0 "SSD1603" H 1900 4500 50  0000 C CNN
F 1 "CONN_01X04" V 2000 4250 50  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_1x04_Pitch2.54mm" H 1900 4250 50  0001 C CNN
F 3 "" H 1900 4250 50  0001 C CNN
	1    1900 4250
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR028
U 1 1 590DAC36
P 1700 4100
F 0 "#PWR028" H 1700 3850 50  0001 C CNN
F 1 "GND" H 1700 3950 50  0000 C CNN
F 2 "" H 1700 4100 50  0001 C CNN
F 3 "" H 1700 4100 50  0001 C CNN
	1    1700 4100
	-1   0    0    1   
$EndComp
$Comp
L +3.3V #PWR029
U 1 1 590DAC6E
P 1700 4200
F 0 "#PWR029" H 1700 4050 50  0001 C CNN
F 1 "+3.3V" H 1700 4340 50  0000 C CNN
F 2 "" H 1700 4200 50  0001 C CNN
F 3 "" H 1700 4200 50  0001 C CNN
	1    1700 4200
	0    -1   -1   0   
$EndComp
Text Label 1350 4300 0    60   ~ 0
SCK
Text Label 1350 4400 0    60   ~ 0
SDA
$Comp
L CONN_01X08 INPUT1
U 1 1 590DB402
P 2200 3200
F 0 "INPUT1" H 2200 3650 50  0000 C CNN
F 1 "CONN_01X08" V 2300 3200 50  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_1x08_Pitch2.54mm" H 2200 3200 50  0001 C CNN
F 3 "" H 2200 3200 50  0001 C CNN
	1    2200 3200
	-1   0    0    1   
$EndComp
$Comp
L GND #PWR030
U 1 1 590DB4A8
P 2400 3550
F 0 "#PWR030" H 2400 3300 50  0001 C CNN
F 1 "GND" H 2400 3400 50  0000 C CNN
F 2 "" H 2400 3550 50  0001 C CNN
F 3 "" H 2400 3550 50  0001 C CNN
	1    2400 3550
	0    -1   -1   0   
$EndComp
$Comp
L GND #PWR031
U 1 1 590DB4DA
P 2400 3450
F 0 "#PWR031" H 2400 3200 50  0001 C CNN
F 1 "GND" H 2400 3300 50  0000 C CNN
F 2 "" H 2400 3450 50  0001 C CNN
F 3 "" H 2400 3450 50  0001 C CNN
	1    2400 3450
	0    -1   -1   0   
$EndComp
$Comp
L GND #PWR032
U 1 1 590DBD15
P 5900 2600
F 0 "#PWR032" H 5900 2350 50  0001 C CNN
F 1 "GND" H 5900 2450 50  0000 C CNN
F 2 "" H 5900 2600 50  0001 C CNN
F 3 "" H 5900 2600 50  0001 C CNN
	1    5900 2600
	0    1    1    0   
$EndComp
$Comp
L GND #PWR033
U 1 1 590DBD3D
P 7400 2600
F 0 "#PWR033" H 7400 2350 50  0001 C CNN
F 1 "GND" H 7400 2450 50  0000 C CNN
F 2 "" H 7400 2600 50  0001 C CNN
F 3 "" H 7400 2600 50  0001 C CNN
	1    7400 2600
	0    -1   -1   0   
$EndComp
$Comp
L +5V #PWR034
U 1 1 590DBD65
P 7400 2500
F 0 "#PWR034" H 7400 2350 50  0001 C CNN
F 1 "+5V" H 7400 2640 50  0000 C CNN
F 2 "" H 7400 2500 50  0001 C CNN
F 3 "" H 7400 2500 50  0001 C CNN
	1    7400 2500
	0    1    1    0   
$EndComp
$Comp
L +3.3V #PWR035
U 1 1 590DBD8D
P 5900 2500
F 0 "#PWR035" H 5900 2350 50  0001 C CNN
F 1 "+3.3V" H 5900 2640 50  0000 C CNN
F 2 "" H 5900 2500 50  0001 C CNN
F 3 "" H 5900 2500 50  0001 C CNN
	1    5900 2500
	0    -1   -1   0   
$EndComp
Wire Wire Line
	1050 1800 3550 1800
Wire Wire Line
	1200 1900 3550 1900
Wire Wire Line
	3550 2000 3200 2000
Wire Wire Line
	3550 2100 3200 2100
Wire Wire Line
	3550 2200 3200 2200
Wire Wire Line
	3550 2300 3200 2300
Wire Wire Line
	2850 2400 3550 2400
Wire Wire Line
	3550 2500 3200 2500
Wire Wire Line
	3550 2600 3200 2600
Wire Wire Line
	3550 2700 3200 2700
Wire Wire Line
	3550 2800 3200 2800
Wire Wire Line
	3550 2900 3200 2900
Wire Wire Line
	2950 3100 3550 3100
Wire Wire Line
	2900 3200 3550 3200
Wire Wire Line
	2850 3300 3550 3300
Wire Wire Line
	2800 3400 3550 3400
Wire Wire Line
	2750 3500 3550 3500
Wire Wire Line
	3550 3600 3200 3600
Wire Wire Line
	3550 1700 3200 1700
Wire Wire Line
	4050 1700 4400 1700
Wire Wire Line
	4050 1800 4400 1800
Wire Wire Line
	4050 1900 4400 1900
Wire Wire Line
	4050 2000 4400 2000
Wire Wire Line
	4050 2100 4400 2100
Wire Wire Line
	4050 2300 4400 2300
Wire Wire Line
	4050 2400 5600 2400
Wire Wire Line
	4050 2500 5500 2500
Wire Wire Line
	4050 2600 4400 2600
Wire Wire Line
	4050 2700 4400 2700
Wire Wire Line
	4050 2900 4400 2900
Wire Wire Line
	4050 3100 4400 3100
Wire Wire Line
	4050 3200 4400 3200
Wire Wire Line
	4050 3300 4400 3300
Wire Wire Line
	4050 3500 4400 3500
Wire Wire Line
	4050 3600 4400 3600
Wire Wire Line
	4050 2800 4400 2800
Wire Wire Line
	4050 3400 4400 3400
Wire Wire Line
	10450 2900 10100 2900
Wire Wire Line
	10100 2900 10100 2650
Wire Wire Line
	10450 3000 10450 3100
Wire Wire Line
	10450 3050 10100 3050
Connection ~ 10450 3050
Wire Wire Line
	9000 3200 10450 3200
Wire Wire Line
	9800 3300 10450 3300
Wire Wire Line
	9500 3400 10450 3400
Wire Wire Line
	9650 1100 9450 1100
Wire Wire Line
	9450 1100 9450 950 
Wire Wire Line
	9650 1200 9450 1200
Wire Wire Line
	9450 1200 9450 1350
Wire Wire Line
	10450 4850 9950 4850
Wire Wire Line
	9950 4850 9950 4650
Wire Wire Line
	10450 4950 10350 4950
Wire Wire Line
	10350 4950 10350 5050
Wire Wire Line
	10350 5050 10450 5050
Wire Wire Line
	10350 5000 9950 5000
Connection ~ 10350 5000
Wire Wire Line
	8050 5150 10450 5150
Wire Wire Line
	9500 5250 10450 5250
Wire Wire Line
	8850 3550 8850 3950
Wire Wire Line
	8300 3700 8850 3700
Connection ~ 8850 3700
Wire Wire Line
	7400 3400 8550 3400
Wire Wire Line
	9500 3400 9500 5250
Wire Wire Line
	4150 5900 3800 5900
Wire Wire Line
	3450 6350 3450 6100
Wire Wire Line
	3450 6100 4150 6100
Wire Wire Line
	3450 6450 3450 6700
Wire Wire Line
	3450 6700 4150 6700
Wire Wire Line
	1200 4300 1700 4300
Wire Wire Line
	1050 4400 1700 4400
Wire Wire Line
	1050 4400 1050 1800
Wire Wire Line
	1200 1900 1200 4300
Wire Wire Line
	2400 3350 2750 3350
Wire Wire Line
	2750 3350 2750 3500
Wire Wire Line
	2400 3250 2800 3250
Wire Wire Line
	2800 3250 2800 3400
Wire Wire Line
	2400 3150 2850 3150
Wire Wire Line
	2850 3150 2850 3300
Wire Wire Line
	2400 3050 2900 3050
Wire Wire Line
	2900 3050 2900 3200
Wire Wire Line
	2400 2950 2950 2950
Wire Wire Line
	2950 2950 2950 3100
Wire Wire Line
	2400 2850 2850 2850
Wire Wire Line
	2850 2850 2850 2400
Wire Wire Line
	5500 2500 5500 2800
Wire Wire Line
	5500 2800 5900 2800
Wire Wire Line
	5600 2400 5600 2700
Wire Wire Line
	5600 2700 5900 2700
Wire Wire Line
	5900 2200 5900 2300
Wire Wire Line
	4050 2200 5900 2200
$Comp
L LOGIC_LEVEL_CONVERTER M1
U 1 1 590DBB7B
P 7100 3500
F 0 "M1" H 7100 3500 50  0001 C CNN
F 1 "LOGIC_LEVEL_CONVERTER" H 7100 3500 50  0001 C CNN
F 2 "SparkFun-Boards:LOGIC_LEVEL_CONVERTER" H 7130 3650 20  0001 C CNN
F 3 "" H 7100 3500 60  0001 C CNN
	1    7100 3500
	1    0    0    -1  
$EndComp
Wire Wire Line
	7400 2300 9800 2300
Wire Wire Line
	9800 2300 9800 3300
Wire Wire Line
	7400 2800 7400 3400
Connection ~ 8300 3400
Wire Wire Line
	7400 2700 8050 2700
Wire Wire Line
	8050 2700 8050 5150
Wire Wire Line
	3800 5900 3800 3800
Wire Wire Line
	3800 3800 4400 3800
Wire Wire Line
	4400 3800 4400 3600
Wire Wire Line
	9000 3200 9000 3150
Wire Wire Line
	9000 3150 8850 3150
$EndSCHEMATC
