import tkinter as tk
import subprocess
from tkinter import ttk
import keyboard
import time



# bp: 'robocopy "D:\\1_kibab_dev\\VSCODE FOLDER PROJECTS\\Itemize Addon\\itemize\\Itemize Addon BP" "D:\\1_kibab_dev\\Minecraft Bedrock Launcher\\net6.0-windows10.0.17763.0\\data\\installations\\packageData\\development_behavior_packs\\Itemize Addon BP" /E /MIR'
# rp: 'robocopy "D:\\1_kibab_dev\\VSCODE FOLDER PROJECTS\\Itemize Addon\\itemize\\Itemize Addon RP" "D:\\1_kibab_dev\\Minecraft Bedrock Launcher\\net6.0-windows10.0.17763.0\\data\\installations\\packageData\\development_resource_packs\\Itemize Addon RP" /E /MIR'

def clear_status_label():
    status_label.config(text="")


def sync_bp():
    time.sleep(1)
    command = 'robocopy "C:\\Users\\user\\Documents\\devess\\kib-anvils-addon\\kib-anvils-addon\\BP" "C:\\Users\\user\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\anvils fall addon recreation BP" /E /MIR'
    subprocess.run(command, shell=True)
    status_label.config(text="Sync BP completed!")
    root.after(3000, clear_status_label)


def sync_rp():
    time.sleep(1)
    command = 'robocopy "C:\\Users\\lawre\Desktop\\ITEMIZE\\itemize\\Itemize Addon RP" "C:\\Users\\lawre\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_resource_packs\\Itemize Addon RP" /E /MIR'
    subprocess.run(command, shell=True)
    status_label.config(text="Sync RP completed!")
    root.after(3000, clear_status_label)


def sync_operations():
    if sync_bp_var.get():
        sync_bp()
    if sync_rp_var.get():
        sync_rp()


def handle_hotkey():
    sync_operations()


keyboard.add_hotkey('ctrl+s', handle_hotkey)

root = tk.Tk()
root.title("Sync BP and RP")
root.geometry("250x220")

root.attributes("-topmost", True)
root.resizable(width=False, height=False)

sync_bp_var = tk.BooleanVar(value=False)
sync_rp_var = tk.BooleanVar(value=False)

sync_bp_check = ttk.Checkbutton(root, text="Sync BP", variable=sync_bp_var)
sync_bp_check.pack(pady=10, padx=10, anchor=tk.W)

sync_rp_check = ttk.Checkbutton(root, text="Sync RP", variable=sync_rp_var)
sync_rp_check.pack(pady=10, padx=10, anchor=tk.W)

status_label = tk.Label(root, text="", bg="white",
                        fg="green", font=("Arial", 12))
status_label.pack(pady=10)

sync_bp_button = ttk.Button(root, text="Sync BP", command=sync_bp)
sync_bp_button.pack(pady=10, padx=10, fill=tk.X)

sync_rp_button = ttk.Button(root, text="Sync RP", command=sync_rp)
sync_rp_button.pack(pady=10, padx=10, fill=tk.X)

root.mainloop()