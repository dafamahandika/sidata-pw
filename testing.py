input_nilai = int(input("Masukan Nilai: "))

if input_nilai >= 90 and input_nilai <= 100:
    print("Nilai anda A")
elif input_nilai >= 80 and input_nilai < 90:
    print("Nilai anda B")
elif input_nilai >= 70 and input_nilai < 80:
    print("Nilai anda C")
elif input_nilai >= 60 and input_nilai < 70:
    print("Nilai anda D")
else:
    print("Nilai anda sangat buruk")
