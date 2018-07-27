# Contoh Automated Unit Testing

[![Build Status](https://travis-ci.org/ktutnik/meetup-19.svg?branch=master)](https://travis-ci.org/ktutnik/meetup-19)

Repo ini adalah source code dari meetup BaliJS #19 slide bisa dilihat [di sini](https://swipe.to/5764hm)

## Permasalahan
Project yang besar akan memerlukan unit testing yang banyak jumlahnya bisa ribuan dan mungkin saja semua test case terkoneksi dengan database. Waktu eksekusi test cases di server CI bisa memakan waktu yang sangat lama dan tidak stabil.

## Solusi
Project di pecah menjadi dua bagian dengan repository pattern

- Bagian yang terkoneksi dengan database (repostiory) dipisahkan menjadi satu modul, tujuannya selain untuk menghilangkan kode yang redundan juga untuk mengisolasi testing agar lebih terorganisir. Dalam real-world case bagian yang terkoneksi database kita bisa skip untuk dijalankan di server CI. Contoh testing nya bisa dilihat di `test/repository.spec.ts`
- Bagian yang tidak terkoneksi database (controller) di test dengan bantuan mock. Bagian ini adalah bagian yang berisi logika pengolahan data, bagian ini harus tetap dijalankan di server CI untuk mencegah regression error untuk setiap update yang dibuat. Contoh testingnya bisa dilihat di `test/client-controller.spec.ts`

Permasalahan lain muncul setelah repository di pisahkan dari controller, controller mempunyai dependency ke repository di constructornya:

```typescript
class ClientController {
    constructor(private clientRepository:ClientRepository){}
}
```

Masalahnya adalah framework yang dipakai tidak akan bisa menemukan dimana posisi dari `ClientRepository`. Pemecahan masalahnya adalah dengan Dependency Injection. Di contoh kode ini memakai module [MyOwnIoCContainer](https://github.com/ktutnik/my-own-ioc-container) untuk melakukan injeksi otomatis ke konstruktor controller sehingga framework mengetahui dimana posisi dari `ClientRepository`. Proses registrasi dependency injection bisa dilihat di file `resolver.ts` yang kemudian di daftarkan di file `index.ts`

## Tools
- Test runner : Jest
- Git push protection: pre-push
- CI: TravisCI
  
## Penjelasan Kode

Contoh kode ini memakai framework [Plumier](https://github.com/ktutnik/plumier) a.k.a KambojaJS, kode ini akan menghasilakn nested restful api sebagai berikut:

Client Restful API di handle oleh `controller/client-controller.ts`

| Method | Route                         | Penjelasan                                               |
| ------ | ----------------------------- | -------------------------------------------------------- |
| GET    | `/client`                     | Return semua data client                                 |
| GET    | `/client/<id>`                | Return client dengan id tertentu                         |
| POST   | `/client`                     | Buat client baru                                         |
| PUT    | `/client/<id>`                | Modify client dengan id tertentu                         |
| DELETE | `/client/<id>`                | Hapus client dengan id tertentu                          |

Pet Restful API berupa nested restful api di handle oleh `controller/client-pet-controller.ts`

| Method | Route                         | Penjelasan                                               |
| ------ | ----------------------------- | -------------------------------------------------------- |
| GET    | `/client/<clientid>/pet`      | Return semua pet yang dimiliki client dengan id tertentu |
| GET    | `/client/<clientid>/pet/<id>` | Return pet yang dimiliki client dengan id tertentu       |
| POST   | `/client/<clientid>/pet`      | Buat pet baru yang di associate ke client                |
| PUT    | `/client/<clientid>/pet/<id>` | Modify pet yang di asosicate dengan client               |
| DELETE | `/client/<clientid>/pet/<id>` | Hapus pet yang di associate dengan client                |


Return status code

| Method/Issue     | Status |
| ---------------- | ------ |
| GET              | 200    |
| POST             | 201    |
| PUT              | 204    |
| DELETE           | 204    |
| Validation Error | 422    |
| Conversion Error | 400    |
| Internal Error   | 500    |

### Domain Model

Desain domain model bisa dilihat di directory `model`

Pet mempunyai 3 field yaitu `name`  `decease` dan `birthday` **Rule**: `birthday` tidak boleh berupa tanggal di masa depan

Client mempunyai 3 field yaitu `name` `email` dan `pets` **Rule**: `email` harus berupa email yang valid.


## Menjalankan aplikasi

- Git clone
- `$ npm install` (untuk menginstall dependency) setelah dependency diinstall file typescript otomatis akan di compile
- `$ npm test` untuk menjalankan unit testing
- `$ npm start` untuk menjalankan aplikasi, bisa di test dengan curl atau post man, coba berikan inputan data berupa json file yang tidak valid seperti: birthday yang di masa depan atau email yang tidak valid.

contoh inputan data yang valid untuk pet:

```json
{ "name": "Mimi", "decease": "yes", "birthday": "2015-1-1" }
```

Note: decease akan secara otomatis di konversi ke boolean karena kita menentukan tipe data boolean di domain modelnya untuk field decease. Value yang diterima `yes, no, on, off, true, false, 1, 0` 

## Melihat hasil Test Coverage

Coverage report bisa dilihat setelah `$ npm test` dijalankan hasilnya bisa dilihat di folder `coverage/lcov-report/index.html` jalankan di browser dan lihat kode-kode yang tidak tercover oleh testing.

## Melihat hasil di server CI

Aplikasi yang kita buat kita kondisikan untuk bisa berjalan di nodejs 8 dan nodejs stable, test dijalankan di server travis-ci, bisa dilihat [disini](https://travis-ci.org/ktutnik/meetup-19)

## Berkontribusi
Contoh kode ini belum di test dengan benar, untuk teman-teman yang gagal mencoba atau ada yang mau di tanyakan silakan submit issue.







