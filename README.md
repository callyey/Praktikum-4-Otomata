# Praktikum-4-Otomata
| NRP | Nama    | 
| ----- | -------- | 
|5025241073    | Nabilah Bunga Sulistia | 
|5025241086    | Callista Fidelya Roba Gultom | 

  Program ini mensimulasikan Deterministic Pushdown Automata (DPDA) untuk mengenali bahasa Palindrome. Secara teori, pengenalan palindrome murni (w w^R) bersifat non-deterministik karena mesin harus menebak di mana titik tengah string berada. Namun, untuk kebutuhan simulasi fungsional, program ini menggunakan pendekatan algoritmik untuk menentukan titik tengah berdasarkan panjang string guna memvisualisasikan operasi stack secara sistematis.

## **Komponen Otomata dalam Kode:**

* Alfabet Input (Sigma):
Karakter alfanumerik yang mencakup huruf [a-z, A-Z] dan angka [0-9].
* Alfabet Stack (Gamma):
Seluruh karakter yang ada pada alfabet input ditambah dengan simbol awal Z sebagai penanda dasar stack.
* State Utama:

  -> State PUSH:
Berfungsi untuk memproses setengah bagian pertama dari string. Setiap karakter yang dibaca pada tahap ini akan dimasukkan ke dalam stack.
 
    -> State SKIP:
    Digunakan khusus untuk menangani string dengan jumlah karakter ganjil. State ini berfungsi untuk melewati satu karakter yang berada tepat di tengah (poros) tanpa memasukkannya ke dalam stack.
 
    -> State POP:
    Berfungsi untuk memproses setengah bagian kedua dari string. Pada tahap ini, karakter yang dibaca akan dibandingkan dengan karakter yang dikeluarkan dari stack untuk memastikan kesamaan nilai secara terbalik (simetri).

## **LOGIKA OPERASIONAL PUSHDOWN AUTOMATA (PDA) PENGENAL PALINDROME**

### 1. Prinsip Dasar Stack (LIFO)
Logika utama pengenalan palindrome menggunakan PDA terletak pada pemanfaatan struktur data Stack yang bersifat Last In First Out (LIFO). Karakter yang terakhir dimasukkan ke dalam memori stack akan menjadi karakter pertama yang dikeluarkan. Hal ini secara alami memungkinkan mesin untuk membalikkan urutan karakter guna pengecekan simetri.
### 2. State Awal
Pada kondisi awal, mesin berada pada State q0 dengan simbol awal stack Z. Simbol Z berfungsi sebagai penanda dasar (bottom marker) untuk mengetahui kapan stack telah kembali dalam keadaan kosong sepenuhnya setelah proses komparasi selesai.
### 3. Penentuan Titik Tengah (Midpoint)
Karena mesin ini dirancang untuk mengenali palindrome alfanumerik (huruf dan angka), program terlebih dahulu menghitung panjang string untuk menentukan titik tengah. Langkah ini krusial untuk menentukan kapan mesin harus berhenti menyimpan data (Push) dan kapan harus mulai mencocokkan data (Pop).
### 4. Fase Pengisian (Push Phase)
Mesin membaca karakter dari urutan pertama hingga mencapai setengah dari panjang string. Setiap karakter alfanumerik yang dibaca akan dimasukkan ke dalam stack. Sebagai contoh, jika string adalah "12BA", maka "1" dan "2" akan disimpan di dalam stack dengan urutan "2" berada di posisi paling atas.

### 5. Penanganan Karakter Tengah (Transition Phase)
* Jika panjang string adalah genap (contoh: "1221"), mesin langsung beralih dari fase Push ke fase Pop setelah mencapai titik tengah.
* Jika panjang string adalah ganjil (contoh: "12B21"), mesin akan membaca karakter di posisi paling tengah namun tidak memasukkannya ke dalam stack (Skip). Karakter tengah ini dianggap sebagai poros simetri yang tidak memerlukan pasangan komparasi.
    #### 1. Fase Pencocokan (Popping/Matching Phase)
    Setelah melewati titik tengah, mesin membaca sisa karakter string satu per satu. Untuk setiap karakter yang dibaca, mesin akan melakukan operasi Pop (mengeluarkan satu elemen dari puncak stack).
* Jika karakter yang sedang dibaca identik dengan karakter yang dikeluarkan dari stack, maka simetri palindrome masih terjaga dan proses berlanjut.
* Jika ditemukan perbedaan karakter antara input dan top stack, maka simetri telah rusak dan mesin akan langsung menuju kondisi penolakan (Rejected).
    #### 2. Kondisi Penerimaan Akhir (Acceptance Criteria)
    String dinyatakan sebagai palindrome (Accepted) jika dan hanya jika memenuhi tiga kriteria berikut:
* Seluruh karakter input telah selesai dibaca.
* Tidak ditemukan ketidaksamaan karakter pada saat fase pencocokan.
* Isi stack telah kembali pada simbol awal Z, yang menandakan bahwa jumlah karakter yang dimasukkan (Push) sama persis dengan jumlah karakter yang dikeluarkan (Pop) dengan urutan yang simetris.
    #### 3. Contoh Analisis Logika pada String "A1B1A"
* Input "A", "1" dibaca dan dimasukkan ke Stack: [Z, A, 1].
* Input "B" (karakter tengah) dibaca dan diabaikan (Skip).
* Input "1" dibaca, cocok dengan Top Stack "1", Stack sisa: [Z, A].
* Input "A" dibaca, cocok dengan Top Stack "A", Stack sisa: [Z].
* Input habis, Stack sisa Z. Hasil: Diterima.