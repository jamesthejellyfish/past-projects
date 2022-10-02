x = open('bohemian_rhapsody.txt').readlines()
with open('bohemian_rhapsody_altered.txt', 'a+') as file:
    for line in x:
        parts = line.split(' ')
        parts[1] = str(round(float(parts[0]) + float(parts[1]), 2))
        print(' '.join(parts))
        file.write(' '.join(parts))