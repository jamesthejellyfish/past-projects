from pdfminer.layout import LAParams, LTTextBox
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfinterp import PDFResourceManager
from pdfminer.pdfinterp import PDFPageInterpreter
from pdfminer.converter import PDFPageAggregator
from reportlab.pdfgen import canvas
from PyPDF2 import PdfFileWriter, PdfFileReader
import os
import datetime

output_file = PdfFileWriter()
input_file = PdfFileReader(open("CP SUBSCRIPTIONS.pdf", "rb"))
outputStream = open("CP SUBSCRIPTIONS(edited).pdf", "wb")
fp = open('CP SUBSCRIPTIONS.pdf', 'rb')
rsrcmgr = PDFResourceManager()
laparams = LAParams()
device = PDFPageAggregator(rsrcmgr, laparams=laparams)
interpreter = PDFPageInterpreter(rsrcmgr, device)
pages = PDFPage.get_pages(fp)
num = 0
date = datetime.datetime.now()
month = date.month
year = date.year
def subscription( text, x, y ):
    if len(text) > 30:
        x = x+10
        y = y-25
    if (str(year-1) in text or str(year-2) in text or str(year-3) in text or str(year-4) in text or str(year-5) in text) and not("/" in text):
        #print("20XX: " + text)
        c.drawImage('red_X.png', x-50, y-10, 30, 30)
    if str(year) in text and not("/" in text):
        if month >= 1:
            if "Jan " in text or "Jan. " in text:
                #print("Jan: " + text)
                c.drawImage('red_X.png', x-50, y-10, 30, 30)
        if month >= 2:
            if "Feb " in text or "Feb. " in text:
                #print("Feb: " + text)
                c.drawImage('red_X.png', x-50, y-10, 30, 30)
        if month >= 3:
            if "March " in text:
                c.drawImage('red_X.png', x-50, y-10, 30, 30)
                #print("Mar: " + text)
        if month >= 4:
            if "April " in text:
                c.drawImage('red_X.png', x-50, y-10, 30, 30)
                #print("Apr: " + text)
        if month >= 5:
            if "May " in text:
                c.drawImage('red_X.png', x-50, y-10, 30, 30)
                #print("May: " + text)
        if month >= 6:
            if "June " in text:
                c.drawImage('red_X.png', x-50, y-10, 30, 30)
                #print("June: " + text)
        if month >= 7:
            if "July " in text:
                c.drawImage('red_X.png', x-50, y-10, 30, 30)
                #print("July: " + text)
        if month >= 8:
            if "Aug " in text or "Aug. " in text:
                c.drawImage('red_X.png', x-50, y-10, 30, 30)
                #print("Aug: " + text)
        if month >= 9:
            if "Sept " in text or "Sept. " in text:
                c.drawImage('red_X.png', x-50, y-10, 30, 30)
                #print("Sept: " + text)
        if month >= 10:
            if "Oct " in text or "Oct. " in text:
                c.drawImage('red_X.png', x-50, y-10, 30, 30)
                #print("Oct: " + text)
        if month >= 11:
            if "Nov " in text or "Nov. " in text:
                c.drawImage('red_X.png', x-50, y-10, 30, 30)
                #print("Nov: " + text)
        if month >= 12:
            if "Dec " in text or "Dec. " in text:
                c.drawImage('red_X.png', x-50, y-10, 30, 30)
                #print("Dec: " + text)
for page in pages:
    c = canvas.Canvas('red_x.pdf')
    print('Processing page ' + str(num+1) + ' of ' + str(input_file.getNumPages()))
    interpreter.process_page(page)
    layout = device.get_result()
    c.drawString(15, 720," ")
    for lobj in layout:
        if isinstance(lobj, LTTextBox):
            x, y, text = lobj.bbox[0], lobj.bbox[3], lobj.get_text()
            #print('At %r is text: %s' % ((x, y), text))
            subscription(text, x, y)
            
    c.save()
    with open('red_x.pdf', "rb") as pdf:
        watermark = PdfFileReader(pdf)
        input_page = input_file.getPage(num)
        #print(num)
        #print(input_page)
        #print(input_file.getNumPages())
        num = num+1
        input_page.mergePage(watermark.getPage(0))
        # add page from input file to output document
        #os.remove(str(num-1) + '.pdf')
        output_file.addPage(input_page)
        #with open("document-output.pdf", "wb") as outputStream:
        output_file.write(outputStream)    

os.remove('red_x.pdf')