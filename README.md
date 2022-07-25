## 📦 API Client For DATA BMKG

- **Berita**
  - [Berita Home](https://bmkg-api.herokuapp.com/berita/home)
  - [Berita Release](https://bmkg-api.herokuapp.com/berita/press-release)
  - [Berita Foto](https://bmkg-api.herokuapp.com/berita/foto)
  - [Berita Daerah](https://bmkg-api.herokuapp.com/berita/daerah)

- **Cuaca**
  - [Semua](https://bmkg-api.herokuapp.com/cuaca/all)

- **Gempabumi**
  - [Terakhir](https://bmkg-api.herokuapp.com/gempa/terakhir)
  - [Dirasakan](https://bmkg-api.herokuapp.com/gempa/dirasakan)
  - [Terkini](https://bmkg-api.herokuapp.com/gempa/terkini)

## Parameters

> ☁️ Cuaca

```js
{
  date: [Array], // Waktu
  data: {
    index_one: {
      data: "00 Januari 203", // Waktu
      data: [
        {
          kota: "Banda Aceh", // Nama Kota
          perkiraan: {
            icon: "https://www.bmkg.go.id/asset/img/weather_icon/ID/cerah-pm.png", // URL Icon
            status: "Cerah" // Status
          },
          sensor: {
            suhu: "20 - 19",
            kelembapan: "60 - 95"
          },
          url: "https://www.bmkg.go.id/cuacaprakiraan-cuaca.bmkg?Kota=Banda%20Aceh"
        }
        ... 32 Items
      ]
    },
    index_two: {
      data: "01 Januari 203", // Waktu
      data: [
        {
          kota: "Banda Aceh", // Nama Kota
          perkiraan: {
            icon: [
              "https://www.bmkg.go.id/asset/img/weather_icon/ID/cerah-pm.png",
              "https://www.bmkg.go.id/asset/img/weather_icon/ID/cerah-pm.png",
              "https://www.bmkg.go.id/asset/img/weather_icon/ID/cerah-pm.png",
              "https://www.bmkg.go.id/asset/img/weather_icon/ID/cerah-pm.png"
            ]
            status: [
              "Cerah",
              "Cerah",
              "Cerah",
              "Cerah"
            ]
          },
          sensor: {
            suhu: "20 - 19",
            kelembapan: "60 - 100"
          },
          url: "https://www.bmkg.go.id/cuacaprakiraan-cuaca.bmkg?Kota=Banda%20Aceh"
        }
        ... 32 Items
      ]
    },
    index_three: {
      data: "02 Januari 203", // Waktu
      data: [
        {
          kota: "Banda Aceh", // Nama Kota
          perkiraan: {
            icon: [
              "https://www.bmkg.go.id/asset/img/weather_icon/ID/cerah-pm.png",
              "https://www.bmkg.go.id/asset/img/weather_icon/ID/cerah-pm.png",
              "https://www.bmkg.go.id/asset/img/weather_icon/ID/cerah-pm.png",
              "https://www.bmkg.go.id/asset/img/weather_icon/ID/cerah-pm.png"
            ]
            status: [
              "Cerah",
              "Cerah",
              "Cerah",
              "Cerah"
            ]
          },
          sensor: {
            suhu: "20 - 19",
            kelembapan: "60 - 100"
          },
          url: "https://www.bmkg.go.id/cuacaprakiraan-cuaca.bmkg?Kota=Banda%20Aceh"
        }
        ... 32 Items
      ]
    }
  }
}
```
