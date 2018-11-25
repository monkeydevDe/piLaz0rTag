EESchema Schematic File Version 2
LIBS:piLaz0rTag_receiver-rescue
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
LIBS:pl8923
LIBS:piLaz0rTag_receiver-cache
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
L TSOP4838 IR_REC1
U 1 1 58F39155
P 7050 2000
F 0 "IR_REC1" H 6950 1750 60  0000 C CNN
F 1 "TSOP4838" H 7100 2250 60  0000 C CNN
F 2 "Opto-Devices:IRReceiver_Vishay_MOLD-3pin" H 7050 2000 60  0001 C CNN
F 3 "" H 7050 2000 60  0000 C CNN
	1    7050 2000
	0    -1   -1   0   
$EndComp
$Comp
L PL8923 LED1
U 1 1 58F5C0BB
P 4200 1150
F 0 "LED1" H 4200 750 60  0000 C CNN
F 1 "PL8923" H 4200 1550 60  0000 C CNN
F 2 "Socket_Strips:Socket_Strip_Straight_1x04_Pitch2.54mm" V 4150 1150 60  0001 C CNN
F 3 "" V 4150 1150 60  0000 C CNN
	1    4200 1150
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR01
U 1 1 590CA8D5
P 7150 2450
F 0 "#PWR01" H 7150 2200 50  0001 C CNN
F 1 "GND" H 7150 2300 50  0000 C CNN
F 2 "" H 7150 2450 50  0001 C CNN
F 3 "" H 7150 2450 50  0001 C CNN
	1    7150 2450
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR02
U 1 1 590CA905
P 4700 1350
F 0 "#PWR02" H 4700 1100 50  0001 C CNN
F 1 "GND" H 4700 1200 50  0000 C CNN
F 2 "" H 4700 1350 50  0001 C CNN
F 3 "" H 4700 1350 50  0001 C CNN
	1    4700 1350
	0    -1   -1   0   
$EndComp
$Comp
L +5V #PWR03
U 1 1 590CAA44
P 3700 950
F 0 "#PWR03" H 3700 800 50  0001 C CNN
F 1 "+5V" H 3700 1090 50  0000 C CNN
F 2 "" H 3700 950 50  0001 C CNN
F 3 "" H 3700 950 50  0001 C CNN
	1    3700 950 
	0    -1   -1   0   
$EndComp
$Comp
L +5V #PWR04
U 1 1 590CAAB3
P 6950 2450
F 0 "#PWR04" H 6950 2300 50  0001 C CNN
F 1 "+5V" H 6950 2590 50  0000 C CNN
F 2 "" H 6950 2450 50  0001 C CNN
F 3 "" H 6950 2450 50  0001 C CNN
	1    6950 2450
	-1   0    0    1   
$EndComp
$Comp
L RJ45-RESCUE-piLaz0rTag_receiver ConIn1
U 1 1 5AF828CC
P 5750 2450
F 0 "ConIn1" H 5950 2950 50  0000 C CNN
F 1 "RJ45" H 5600 2950 50  0000 C CNN
F 2 "kicad:rj45-seppel-small" H 5750 2450 50  0001 C CNN
F 3 "" H 5750 2450 50  0001 C CNN
	1    5750 2450
	1    0    0    -1  
$EndComp
$Comp
L RJ45-RESCUE-piLaz0rTag_receiver ConOut1
U 1 1 5AF829C5
P 7900 2450
F 0 "ConOut1" H 8100 2950 50  0000 C CNN
F 1 "RJ45" H 7750 2950 50  0000 C CNN
F 2 "kicad:rj45-seppel-small" H 7900 2450 50  0001 C CNN
F 3 "" H 7900 2450 50  0001 C CNN
	1    7900 2450
	1    0    0    -1  
$EndComp
$Comp
L +5V #PWR05
U 1 1 5AF82ADB
P 5400 2900
F 0 "#PWR05" H 5400 2750 50  0001 C CNN
F 1 "+5V" H 5400 3040 50  0000 C CNN
F 2 "" H 5400 2900 50  0001 C CNN
F 3 "" H 5400 2900 50  0001 C CNN
	1    5400 2900
	-1   0    0    1   
$EndComp
$Comp
L +5V #PWR06
U 1 1 5AF82AFB
P 7550 2900
F 0 "#PWR06" H 7550 2750 50  0001 C CNN
F 1 "+5V" H 7550 3040 50  0000 C CNN
F 2 "" H 7550 2900 50  0001 C CNN
F 3 "" H 7550 2900 50  0001 C CNN
	1    7550 2900
	-1   0    0    1   
$EndComp
Text Label 6200 2900 0    60   ~ 0
LedIn
Text Label 4700 3700 0    60   ~ 0
LedOut
Text Label 6100 3550 0    60   ~ 0
IrData
$Comp
L CP VStab1
U 1 1 5AF92F52
P 2900 2850
F 0 "VStab1" H 2925 2950 50  0000 L CNN
F 1 "CP" H 2925 2750 50  0000 L CNN
F 2 "Capacitors_THT:CP_Radial_D4.0mm_P2.00mm" H 2938 2700 50  0001 C CNN
F 3 "" H 2900 2850 50  0001 C CNN
	1    2900 2850
	1    0    0    -1  
$EndComp
$Comp
L +5V #PWR07
U 1 1 5AF9301E
P 2900 2700
F 0 "#PWR07" H 2900 2550 50  0001 C CNN
F 1 "+5V" H 2900 2840 50  0000 C CNN
F 2 "" H 2900 2700 50  0001 C CNN
F 3 "" H 2900 2700 50  0001 C CNN
	1    2900 2700
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR08
U 1 1 5AF9303C
P 2900 3000
F 0 "#PWR08" H 2900 2750 50  0001 C CNN
F 1 "GND" H 2900 2850 50  0000 C CNN
F 2 "" H 2900 3000 50  0001 C CNN
F 3 "" H 2900 3000 50  0001 C CNN
	1    2900 3000
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR09
U 1 1 5AFEA6A2
P 5500 2900
F 0 "#PWR09" H 5500 2650 50  0001 C CNN
F 1 "GND" H 5500 2750 50  0000 C CNN
F 2 "" H 5500 2900 50  0001 C CNN
F 3 "" H 5500 2900 50  0001 C CNN
	1    5500 2900
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR010
U 1 1 5AFEA6C0
P 5600 2900
F 0 "#PWR010" H 5600 2650 50  0001 C CNN
F 1 "GND" H 5600 2750 50  0000 C CNN
F 2 "" H 5600 2900 50  0001 C CNN
F 3 "" H 5600 2900 50  0001 C CNN
	1    5600 2900
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR011
U 1 1 5AFEA6DE
P 5800 2900
F 0 "#PWR011" H 5800 2650 50  0001 C CNN
F 1 "GND" H 5800 2750 50  0000 C CNN
F 2 "" H 5800 2900 50  0001 C CNN
F 3 "" H 5800 2900 50  0001 C CNN
	1    5800 2900
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR012
U 1 1 5AFEA6FC
P 6000 2900
F 0 "#PWR012" H 6000 2650 50  0001 C CNN
F 1 "GND" H 6000 2750 50  0000 C CNN
F 2 "" H 6000 2900 50  0001 C CNN
F 3 "" H 6000 2900 50  0001 C CNN
	1    6000 2900
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR013
U 1 1 5AFEA740
P 7650 2900
F 0 "#PWR013" H 7650 2650 50  0001 C CNN
F 1 "GND" H 7650 2750 50  0000 C CNN
F 2 "" H 7650 2900 50  0001 C CNN
F 3 "" H 7650 2900 50  0001 C CNN
	1    7650 2900
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR014
U 1 1 5AFEA75E
P 7750 2900
F 0 "#PWR014" H 7750 2650 50  0001 C CNN
F 1 "GND" H 7750 2750 50  0000 C CNN
F 2 "" H 7750 2900 50  0001 C CNN
F 3 "" H 7750 2900 50  0001 C CNN
	1    7750 2900
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR015
U 1 1 5AFEA77C
P 7950 2900
F 0 "#PWR015" H 7950 2650 50  0001 C CNN
F 1 "GND" H 7950 2750 50  0000 C CNN
F 2 "" H 7950 2900 50  0001 C CNN
F 3 "" H 7950 2900 50  0001 C CNN
	1    7950 2900
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR016
U 1 1 5AFEA79A
P 8150 2900
F 0 "#PWR016" H 8150 2650 50  0001 C CNN
F 1 "GND" H 8150 2750 50  0000 C CNN
F 2 "" H 8150 2900 50  0001 C CNN
F 3 "" H 8150 2900 50  0001 C CNN
	1    8150 2900
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR017
U 1 1 5AFEA7BF
P 8450 2100
F 0 "#PWR017" H 8450 1850 50  0001 C CNN
F 1 "GND" H 8450 1950 50  0000 C CNN
F 2 "" H 8450 2100 50  0001 C CNN
F 3 "" H 8450 2100 50  0001 C CNN
	1    8450 2100
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR018
U 1 1 5AFEA7DD
P 6300 2100
F 0 "#PWR018" H 6300 1850 50  0001 C CNN
F 1 "GND" H 6300 1950 50  0000 C CNN
F 2 "" H 6300 2100 50  0001 C CNN
F 3 "" H 6300 2100 50  0001 C CNN
	1    6300 2100
	1    0    0    -1  
$EndComp
Wire Wire Line
	6100 2900 6650 2900
Wire Wire Line
	6650 2900 6650 950 
Wire Wire Line
	6650 950  4700 950 
Wire Wire Line
	3700 1350 3700 3700
Wire Wire Line
	3700 3700 8250 3700
Wire Wire Line
	8250 3700 8250 2900
Wire Wire Line
	7050 2450 7050 3550
Connection ~ 7050 3550
Wire Wire Line
	5900 3550 8050 3550
Wire Wire Line
	8050 3550 8050 2900
Wire Wire Line
	5900 2900 5900 3550
$Comp
L GND #PWR019
U 1 1 5AF82B3B
P 5700 2900
F 0 "#PWR019" H 5700 2650 50  0001 C CNN
F 1 "GND" H 5700 2750 50  0000 C CNN
F 2 "" H 5700 2900 50  0001 C CNN
F 3 "" H 5700 2900 50  0001 C CNN
	1    5700 2900
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR020
U 1 1 5AF82E31
P 7850 2900
F 0 "#PWR020" H 7850 2650 50  0001 C CNN
F 1 "GND" H 7850 2750 50  0000 C CNN
F 2 "" H 7850 2900 50  0001 C CNN
F 3 "" H 7850 2900 50  0001 C CNN
	1    7850 2900
	1    0    0    -1  
$EndComp
$EndSCHEMATC
