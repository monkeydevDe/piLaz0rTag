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
LIBS:rur
LIBS:shardy
LIBS:pHAT-cache
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
L Raspberry_Pi_2_3 J?
U 1 1 58F5C332
P 1900 2400
F 0 "J?" H 2600 1150 50  0000 C CNN
F 1 "Raspberry_Pi_2_3" H 1500 3300 50  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_2x20" H 2900 3650 50  0001 C CNN
F 3 "" H 1950 2250 50  0001 C CNN
	1    1900 2400
	1    0    0    -1  
$EndComp
$Comp
L BS170 Q?
U 1 1 58F5C3DF
P 4250 1450
F 0 "Q?" H 4450 1525 50  0000 L CNN
F 1 "BS170" H 4450 1450 50  0000 L CNN
F 2 "TO_SOT_Packages_THT:TO-92_Molded_Narrow" H 4450 1375 50  0001 L CIN
F 3 "" H 4250 1450 50  0001 L CNN
	1    4250 1450
	1    0    0    -1  
$EndComp
$Comp
L R R?
U 1 1 58F5C448
P 4300 2250
F 0 "R?" V 4380 2250 50  0000 C CNN
F 1 "R" V 4300 2250 50  0000 C CNN
F 2 "" V 4230 2250 50  0001 C CNN
F 3 "" H 4300 2250 50  0001 C CNN
	1    4300 2250
	1    0    0    -1  
$EndComp
$Comp
L GND #PWR?
U 1 1 58F5C5B1
P 4300 3050
F 0 "#PWR?" H 4300 2800 50  0001 C CNN
F 1 "GND" H 4300 2900 50  0000 C CNN
F 2 "" H 4300 3050 50  0001 C CNN
F 3 "" H 4300 3050 50  0001 C CNN
	1    4300 3050
	1    0    0    -1  
$EndComp
$Comp
L +5V #PWR?
U 1 1 58F5C5CB
P 4800 3150
F 0 "#PWR?" H 4800 3000 50  0001 C CNN
F 1 "+5V" H 4800 3290 50  0000 C CNN
F 2 "" H 4800 3150 50  0001 C CNN
F 3 "" H 4800 3150 50  0001 C CNN
	1    4800 3150
	1    0    0    -1  
$EndComp
$Comp
L 74AHC125 U?
U 1 1 58F5C6AC
P 7050 1950
F 0 "U?" H 6650 2650 50  0000 C CNN
F 1 "74AHC125" H 7300 1250 50  0000 C CNN
F 2 "" H 7050 1950 60  0000 C CNN
F 3 "" H 7050 1950 60  0000 C CNN
	1    7050 1950
	1    0    0    -1  
$EndComp
$EndSCHEMATC
