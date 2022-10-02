import re

file = open('coords.ngc','r')
output = open('colour.txt','a+')

gcode = file.readlines()

coordinates = []

for line in gcode:

       coord = re.findall(r'[XY]\d.....', line)
       inates = re.findall('G00',line)
       coordinates.append(coord)
       """if inates:
               coordinates.append(str(round(float(coord[1][1:])/24, 1))+':')
       else:

               coordinates.append(round(float(coord[1][1:])/24, 1))"""
output.write(str(coordinates))