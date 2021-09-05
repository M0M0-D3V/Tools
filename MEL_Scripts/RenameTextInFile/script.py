
# ******************************************
# Change this List to strings you need to find
list_to_change = ["pCylinder", "pSphere", "pCube"]
# Change this List to what you want the found strings to be changed to
change_to_list = ["MomoC", "MomoC", "MomoC"]
# double check both lists have same # of index
# *******************************************


file2 = open("new.txt", "a+")
text = ""
with open("C:\\Users\\mimi_\\Documents\\Projects\\Tools\\MEL_Scripts\\RenameTextInFile\\test.txt", "r+") as entire_file:

    while True:
        next_line = entire_file.readline()

        if not next_line:
            break;

        for idx in range(len(list_to_change)):
            
            if list_to_change[idx] in next_line:
                print(f"in if stmt, idx is: {idx}")

                next_line = next_line.replace(list_to_change[idx], change_to_list[idx], -1)
                print(next_line)
        text += next_line

    entire_file.close()

file2.write(text)
file2.close()