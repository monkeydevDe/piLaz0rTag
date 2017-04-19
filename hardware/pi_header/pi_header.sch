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
LIBS:pi_header
LIBS:valves
LIBS:pi_header-cache
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
Wire Wire Line
	3550 1800 3200 1800
Wire Wire Line
	3550 1900 3200 1900
Wire Wire Line
	3550 2000 3200 2000
Wire Wire Line
	3550 2100 3200 2100
Wire Wire Line
	3550 2200 3200 2200
Wire Wire Line
	3550 2300 3200 2300
Wire Wire Line
	3550 2400 3200 2400
Wire Wire Line
	3550 2500 3200 2500
Wire Wire Line
	3550 2600 3200 2600
Wire Wire Line
	3550 2700 3200 2700
Wire Wire Line
	3550 2800 3200 2800
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
L pi_header J1
U 1 1 58F6BD1F
P 3800 2650
F 0 "J1" H 3800 3700 50  0000 C CNN
F 1 "pi_header" V 3800 2650 50  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_2x20_Pitch2.54mm" H 3800 1700 50  0001 C CNN
F 3 "" H 3800 1700 50  0001 C CNN
	1    3800 2650
	1    0    0    -1  
$EndComp
Wire Wire Line
	3550 2900 3200 2900
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
Wire Wire Line
	3550 3100 3200 3100
Wire Wire Line
	3550 3200 3200 3200
Wire Wire Line
	3550 3300 3200 3300
Wire Wire Line
	3550 3400 3200 3400
Wire Wire Line
	3550 3500 3200 3500
Wire Wire Line
	3550 3600 3200 3600
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
Wire Wire Line
	3550 1700 3200 1700
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
Wire Wire Line
	4050 1700 4400 1700
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
Wire Wire Line
	4050 1800 4400 1800
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
Wire Wire Line
	4050 1900 4400 1900
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
Wire Wire Line
	4050 2000 4400 2000
Wire Wire Line
	4050 2100 4400 2100
Text Label 4400 2000 2    60   ~ 0
G14/ua
Text Label 4400 2100 2    60   ~ 0
G15/ua
Wire Wire Line
	4050 2200 4400 2200
Text Label 4400 2200 2    60   ~ 0
G18
Wire Wire Line
	4050 2300 4400 2300
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
Wire Wire Line
	4050 2400 4400 2400
Wire Wire Line
	4050 2500 4400 2500
Text Label 4400 2400 2    60   ~ 0
G23
Text Label 4400 2500 2    60   ~ 0
G24
Wire Wire Line
	4050 2600 4400 2600
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
Wire Wire Line
	4050 2700 4400 2700
Text Label 4400 2700 2    60   ~ 0
G25
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
Wire Wire Line
	4050 2800 4400 2800
Wire Wire Line
	4050 3400 4400 3400
$EndSCHEMATC