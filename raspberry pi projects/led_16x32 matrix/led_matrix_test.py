#!/usr/bin/env python
import time
import urllib2
from samplebase import SampleBase
from rgbmatrix import RGBMatrix, RGBMatrixOptions, graphics
from PIL import Image
from PIL import GifImagePlugin
import os
import random
import cStringIO
measure1 = time.time()
measure2 = time.time()

png_url = "https://www.whichonevapes.ca/assets/rpi/image.png"
gif_url = "https://www.whichonevapes.ca/assets/rpi/image.gif"
options = RGBMatrixOptions()
options.rows = 16
options.chain_length = 1
options.parallel = 1
options.hardware_mapping = 'regular'
matrix = RGBMatrix(options = options)


text = urllib2.urlopen("https://www.whichonevapes.ca/assets/rpi/instructions.txt")
png = urllib2.urlopen("https://www.whichonevapes.ca/assets/rpi/image.png")
gif = urllib2.urlopen("https://www.whichonevapes.ca/assets/rpi/image.gif")
image_url = cStringIO.StringIO(png.read())
gif_url = cStringIO.StringIO(gif.read())
text = text.read()
old_text = ''
if 'text' in text:
            texter = text.split('~')
            offscreen_canvas = matrix.CreateFrameCanvas()
            font = graphics.Font()
            font.LoadFont("../../../fonts/9x18P.bdf")
            textColor = graphics.Color(int(texter[1]), int(texter[2]), int(texter[3]))
            pos = offscreen_canvas.width
            my_text = texter[4]
count = 0
old_image = 0
xpos = 0
while True:
    if measure2 - measure1 >= 3:
        measure1 = measure2
        count += 1
        text = open('instructions.txt', 'r')
        text = text.read()
        if old_text != text:
            old_text = text
            png = urllib2.urlopen("https://www.whichonevapes.ca/assets/rpi/image.png")
            gif = urllib2.urlopen("https://www.whichonevapes.ca/assets/rpi/image.gif")
            image_url = cStringIO.StringIO(png.read())
            gif_url = cStringIO.StringIO(gif.read())
            if 'text' in text:
                texter = text.split('~')
                offscreen_canvas = matrix.CreateFrameCanvas()
                font = graphics.Font()
                font.LoadFont("../../../fonts/9x18P.bdf")
                textColor = graphics.Color(int(texter[1]), int(texter[2]), int(texter[3]))
                pos = offscreen_canvas.width
                my_text = texter[4]
        print(text)
    if 'text' in text:
        offscreen_canvas.Clear()
        len = graphics.DrawText(offscreen_canvas, font, pos, 13, textColor, my_text)
        pos -= 1
        if (pos + len < 0):
            pos = offscreen_canvas.width

        time.sleep(float(texter[5]))
        offscreen_canvas = matrix.SwapOnVSync(offscreen_canvas)
        
    if 'png' in text:
        image = Image.open(image_url)
        img_width, img_height = image.size
        if 'scroll' in text:
            texter = text.split('~')
            old_image = image.copy()
            test = matrix.CreateFrameCanvas()
            xpos += 1
            if (xpos > img_width):
                xpos = 0
            old_image = old_image.convert('RGB')
            test.SetImage(old_image, -xpos)
            test.SetImage(old_image, -xpos + img_width)
            test = matrix.SwapOnVSync(test)
            time.sleep(1 / float(texter[1]))
            image.close()
        else:
            old_image = image.copy()
            test = matrix.CreateFrameCanvas()
            test.SetImage(old_image.convert('RGB'))
            test = matrix.SwapOnVSync(test)
            time.sleep(3)
            image.close()
    if 'gif' in text:
        image = Image.open(gif_url)
        img_width, img_height = image.size
        test = matrix.CreateFrameCanvas()
        for frame in range(0,image.n_frames):
            image.seek(frame)
            test.SetImage(image.convert('RGB'))
            test = matrix.SwapOnVSync(test) 
            time.sleep(float(image.info['duration'])/1000)
        image.close()
    measure2 = time.time()
