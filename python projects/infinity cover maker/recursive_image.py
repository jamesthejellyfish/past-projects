from PIL import Image
from typing import Tuple
image = Image.open('test.png')
mask_colour = (90, 255, 39)
tolerance = 50

def recursive_image(image: 'Image', new_width: int,
                    new_height: int, recurs: Tuple[int, int],
                    max_d: int, curr_d=0):
    if curr_d >= max_d or new_width == 0 or new_height == 0:
        return
    img_width, img_height = image.size
    new_img = image.copy().resize((new_width, new_height))
    image.paste(new_img, recurs)
    new_dims = (int(round(recurs[0] + recurs[0] / img_width * new_width)),
                int(round(recurs[1] + recurs[1] / img_height * new_height)))
    updated_width = new_width ** 2 // img_width
    updated_height = new_height ** 2 // img_height
    recursive_image(image, updated_width, updated_height, new_dims, max_d,
                    curr_d + 1)

width, height = image.size
dims = (width, height)
max_dims = (0, 0)
for num, name in enumerate(image.getdata()):
    if mask_colour[0] - tolerance <= name[0] <= mask_colour[0] + tolerance and \
            mask_colour[1] - tolerance <= name[1] <= mask_colour[1] + tolerance\
            and mask_colour[2] - tolerance <= name[2] \
            <= mask_colour[2] + tolerance:
        #print(num % width, num // width)
        if num % width < dims[0]:
            dims = (num % width, dims[1])
        if num // width < dims[1]:
            dims = (dims[0], num // width)
        if num % width > max_dims[0]:
            max_dims = (num % width, max_dims[1])
        if num // width > max_dims[1]:
            max_dims = (max_dims[0], num // width)

recursive_image(image, max_dims[0] - dims[0], max_dims[1] - dims[1], dims, 5)


new_im_data = []
replace_colour = None
for num, name in enumerate(image.getdata()):
    if mask_colour[0] - tolerance <= name[0] <= mask_colour[0] + tolerance and \
            mask_colour[1] - tolerance <= name[1] <= mask_colour[1] + tolerance \
            and mask_colour[2] - tolerance <= name[2] \
            <= mask_colour[2] + tolerance:
        if replace_colour is None:
            replace_colour = image.getdata()[num-5]
        new_im_data.append(replace_colour)
    else:
        new_im_data.append(name)

new_im = Image.new(image.mode,image.size)
new_im.putdata(new_im_data)
image = new_im

image.show()
image.save('test1.png')
