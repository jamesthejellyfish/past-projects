import time
import turtle as t
from math import sin, cos
import win32api as auto
import win32con
pi = 3.14159265358979323846264338327950288419716939937510582097494459230781640


def sierpinski(size: int, max_depth: int, current_depth: int = 0):
    """recursively draws a sierpinski triangle up to a maximum depth of
    <max_depth>."""
    if current_depth > max_depth:
        return
    for _ in range(3):
        t.forward(size // 2)
        t.left(120)
        sierpinski(size // 2, max_depth, current_depth + 1)


def sierpinski_auto(size: int, max_depth: int, current_depth=0, angle_mult = 0):
    """use win32api to draw a sierpinski triangle."""
    x, y = auto.GetCursorPos()
    cos_angles = [1, -0.5, -0.5]
    sin_angles = [0, (3) ** 0.5 / 2, -(3) ** 0.5 / 2]
    if current_depth > max_depth:
        return
    for _ in range(3):
        x = round(x - size * cos_angles[angle_mult % 3])
        y = round(y - size * sin_angles[angle_mult % 3])
        x = int(x)
        y = int(y)
        auto.SetCursorPos((x, y))
        time.sleep(0.05)
        auto.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,x,y,0,0)
        sierpinski_auto(size / 2, max_depth, current_depth + 1, angle_mult + 1)
        angle_mult += 1
    #auto.mouse_event(win32con.MOUSEEVENTF_LEFTUP,0,0,0,0)


if __name__ == '__main__':
    size = 2 ** 7
    # """
    time.sleep(5)
    sierpinski_auto(size, 0)
    auto.mouse_event(win32con.MOUSEEVENTF_LEFTUP,0,0,0,0)
    # x, y = auto.GetCursorPos()
    # auto.SetCursorPos((x - size // 2, y))
    """
    t.shape('turtle')
    t.screensize(canvwidth=size, canvheight=size)
    t.speed(10000)
    sierpinski(size, 8)
    ts = t.getscreen()
    ts.getcanvas().postscript(file="sierpinski.eps")
    #time.sleep(100000)
    """
