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
L TSOP4838 U1
U 1 1 58F39155
P 3400 2850
F 0 "U1" H 3300 2600 60  0000 C CNN
F 1 "TSOP4838" H 3450 3100 60  0000 C CNN
F 2 "Opto-Devices:IRReceiver_Vishay_MOLD-3pin" H 3400 2850 60  0001 C CNN
F 3 "" H 3400 2850 60  0000 C CNN
	1    3400 2850
	1    0    0    -1  
$EndComp
$Comp
L CONN_01X05 Input1
U 1 1 58F39230
P 1850 1550
F 0 "Input1" H 1850 1850 50  0000 C CNN
F 1 "CONN_01X05" V 1950 1550 50  0000 C CNN
F 2 "Socket_Strips:Socket_Strip_Straight_1x05_Pitch2.54mm" H 1850 1550 50  0001 C CNN
F 3 "" H 1850 1550 50  0001 C CNN
	1    1850 1550
	0    -1   -1   0   
$EndComp
$Comp
L CONN_01X05 Output1
U 1 1 58F54864
P 2650 3900
F 0 "Output1" H 2650 4200 50  0000 C CNN
F 1 "CONN_01X05" V 2750 3900 50  0000 C CNN
F 2 "Socket_Strips:Socket_Strip_Straight_1x05_Pitch2.54mm" H 2650 3900 50  0001 C CNN
F 3 "" H 2650 3900 50  0001 C CNN
	1    2650 3900
	1    0    0    -1  
$EndComp
Wire Wire Line
	1650 1750 1100 1750
Wire Wire Line
	1100 950  1100 3700
Wire Wire Line
	1100 950  3700 950 
Wire Wire Line
	1850 1750 1850 3900
Wire Wire Line
	1850 1900 4700 1900
Wire Wire Line
	4700 1900 4700 1350
Wire Wire Line
	1850 2950 2950 2950
Connection ~ 1850 1900
Wire Wire Line
	1100 2750 2950 2750
Connection ~ 1100 1750
Wire Wire Line
	1100 3700 2450 3700
Connection ~ 1100 2750
Wire Wire Line
	1850 3900 2450 3900
Connection ~ 1850 2950
Wire Wire Line
	1950 1750 1950 4000
Wire Wire Line
	1950 2850 2950 2850
Wire Wire Line
	1950 4000 2450 4000
Connection ~ 1950 2850
Wire Wire Line
	2050 1750 3250 1750
Wire Wire Line
	3250 1750 3250 600 
Wire Wire Line
	3250 600  4700 600 
Wire Wire Line
	4700 600  4700 950 
Wire Wire Line
	3700 1350 3700 4450
Wire Wire Line
	3700 4450 2450 4450
Wire Wire Line
	2450 4450 2450 4100
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
$EndSCHEMATC
