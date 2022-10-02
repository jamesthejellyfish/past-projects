import re
import os
os.remove("colour.txt")
file = open('coords.ngc','r')
filer = open('colour.txt','a+')
input_start = 0    
input_end = 360
output_start = 600
output_end = 270
value = input('enter hue')
output = output_start + ((output_end - output_start) / (input_end - input_start)) * (int(value) - input_start)
print(output)
filer.write(str(round(output/24, 1))+',')
input_start = 0    
input_end = 100
output_start = 0
output_end = 1024
value = input('enter brightness')
output = output_start + ((output_end - output_start) / (input_end - input_start)) * (int(value) - input_start)
print(output)
filer.write(str(round(output/11, 1))+':')
gcode = file.readlines()
coordinates = []
for line in gcode:
    coord = re.findall(r'[XY]\d.....', line)
    inates = re.findall('G00',line)
    if coord:
        #print(coord)
        print("{} - {}".format(coord[0], coord[1]))
        coordinates.append(round(float(coord[0][1:])/11, 1))
        if inates:
            coordinates.append(str(round(float(coord[1][1:])/24, 1))+':')
        else:
            coordinates.append(round(float(coord[1][1:])/24, 1))
        
print(coordinates)
filer.write(str(coordinates[0])+','+str(coordinates[1])[:len(str(coordinates[1]))-1]+','+str(coordinates[2])+','+str(coordinates[3])+';')
for x in range(4, len(coordinates), 2):
    if (str(coordinates[x+1])[-1] == ':'):
        print("Oh yeah, it's all coming together..."+str(x))
        #filer.write(str(coordinates[x-2])+','+str(coordinates[x-1])+','+str(coordinates[x])+','+str(coordinates[x+1])[:len(str(coordinates[1]))-1]+';:')
    else:
        filer.write(str(coordinates[x-2]).replace(':','')+','+str(coordinates[x-1]).replace(':','')+','+str(coordinates[x]).replace(':','')+','+str(coordinates[x+1]).replace(':','')+';')