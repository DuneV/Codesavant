from tkinter import Tk
from tkinter import filedialog

Tk().withdraw() # prevents an empty tkinter window from appearing
folder_path = filedialog.askopenfilename()
print(folder_path)