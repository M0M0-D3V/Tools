import maya.cmds as cmds

# ******************************************
# Change this List to strings you need to find

list_to_change = ["pCylinder", "pSphere", "pCube"]

# Change this List to what you want the found strings to be changed to
change_to_list = ["Momo", "Momo", "Momo"]

# double check both lists have same # of index
# *******************************************

list = cmds.ls(transforms=True)
for obj in list:
    for idx in range(len(list_to_change)):
        if list_to_change[idx] not in obj:
            continue
        else:
            new_obj = obj.replace(list_to_change[idx], change_to_list[idx])
            cmds.rename(obj, new_obj)