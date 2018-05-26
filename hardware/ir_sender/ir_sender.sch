EESchema Schematic File Version 2
LIBS:power
LIBS:device
LIBS:switches
LIBS:relays
LIBS:motors
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
LIBS:ir_sender-cache
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
$Comp
L NeoPixel_THT D1
U 1 1 5B083583
P 2700 1900
F 0 "D1" H 2900 2125 50  0000 R BNN
F 1 "NeoPixel_THT" H 2750 1675 50  0000 L TNN
F 2 "Socket_Strips:Socket_Strip_Straight_1x04_Pitch2.54mm" H 2750 1600 50  0001 L TNN
F 3 "" H 2800 1525 50  0001 L TNN
	1    2700 1900
	1    0    0    -1  
$EndComp
$Comp
L TSAL4400 D2
U 1 1 5B0835EE
P 3600 1350
F 0 "D2" H 3620 1420 50  0000 L CNN
F 1 "TSAL4400" H 3560 1240 50  0000 C CNN
F 2 "Socket_Strips:Socket_Strip_Straight_1x02_Pitch2.54mm" H 3600 1525 50  0001 C CNN
F 3 "" H 3550 1350 50  0001 C CNN
	1    3600 1350
	1    0    0    -1  
$EndComp
$Comp
L Conn_01x05 J1
U 1 1 5B083621
P 4350 2650
F 0 "J1" H 4350 2950 50  0000 C CNN
F 1 "Conn_01x05" H 4350 2350 50  0000 C CNN
F 2 "Connectors_JST:JST_XH_B05B-XH-A_05x2.50mm_Straight" H 4350 2650 50  0001 C CNN
F 3 "" H 4350 2650 50  0001 C CNN
	1    4350 2650
	1    0    0    -1  
$EndComp
$Comp
L +5V #PWR01
U 1 1 5B08366A
P 3700 1350
F 0 "#PWR01" H 3700 1200 50  0001 C CNN
F 1 "+5V" H 3700 1490 50  0000 C CNN
F 2 "" H 3700 1350 50  0001 C CNN
F 3 "" H 3700 1350 50  0001 C CNN
	1    3700 1350
	-1   0    0    1   
$EndComp
$Comp
L GND #PWR02
U 1 1 5B083684
P 2700 2200
F 0 "#PWR02" H 2700 1950 50  0001 C CNN
F 1 "GND" H 2700 2050 50  0000 C CNN
F 2 "" H 2700 2200 50  0001 C CNN
F 3 "" H 2700 2200 50  0001 C CNN
	1    2700 2200
	1    0    0    -1  
$EndComp
$Comp
L +5V #PWR03
U 1 1 5B08369E
P 4150 2550
F 0 "#PWR03" H 4150 2400 50  0001 C CNN
F 1 "+5V" H 4150 2690 50  0000 C CNN
F 2 "" H 4150 2550 50  0001 C CNN
F 3 "" H 4150 2550 50  0001 C CNN
	1    4150 2550
	0    -1   -1   0   
$EndComp
$Comp
L GND #PWR04
U 1 1 5B0836B8
P 4150 2750
F 0 "#PWR04" H 4150 2500 50  0001 C CNN
F 1 "GND" H 4150 2600 50  0000 C CNN
F 2 "" H 4150 2750 50  0001 C CNN
F 3 "" H 4150 2750 50  0001 C CNN
	1    4150 2750
	0    1    1    0   
$EndComp
Wire Wire Line
	3400 1350 3400 2650
Wire Wire Line
	3400 2650 4150 2650
Wire Wire Line
	2400 2750 2400 1900
Wire Wire Line
	3000 1900 3200 1900
Wire Wire Line
	3200 1900 3200 2850
Wire Wire Line
	3200 2850 4150 2850
$Comp
L +5V #PWR05
U 1 1 5B0836E8
P 2700 1600
F 0 "#PWR05" H 2700 1450 50  0001 C CNN
F 1 "+5V" H 2700 1740 50  0000 C CNN
F 2 "" H 2700 1600 50  0001 C CNN
F 3 "" H 2700 1600 50  0001 C CNN
	1    2700 1600
	1    0    0    -1  
$EndComp
Text Label 3050 1900 0    60   ~ 0
DoutLed
Text Label 2550 2750 0    60   ~ 0
DinLed
Wire Wire Line
	2900 2450 2900 2750
Wire Wire Line
	2900 2750 2400 2750
Wire Wire Line
	2900 2450 4150 2450
$EndSCHEMATC