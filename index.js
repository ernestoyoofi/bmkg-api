const axios = require("axios")
const cheerio = require("cheerio")
const app = require("express")()
const PORT = 5000
const cors = require('cors')

const option = { headers: { 'User-Agent': 'Muezza Fetch/12.15.1' }  }

app.use(cors())
// HOME APIs
app.get("/", (req, res) => {
  res.setHeader('X-Powered-By', 'Muezza.js')
  res.setHeader('Create-By', 'Ernestoyoofi')
  const protocol = req.headers['x-forwarded-proto']? "https://" : "http://"
  res.send({
    message: "Welcome To BMKG API !",
    berita: {
      home:`${protocol}${req.headers.host || "localhost"+PORT}/berita/home`,
      release:`${protocol}${req.headers.host || "localhost"+PORT}/berita/press-release`,
      foto:`${protocol}${req.headers.host || "localhost"+PORT}/berita/foto`,
      daerah:`${protocol}${req.headers.host || "localhost"+PORT}/berita/daerah`
    },
    cuaca: {
      semua: `${protocol}${req.headers.host || "localhost"+PORT}/cuaca/all`
    },
    gempa: {
      terakhir: `${protocol}${req.headers.host || "localhost"+PORT}/gempa/terakhir`,
      dirasakan: `${protocol}${req.headers.host || "localhost"+PORT}/gempa/dirasakan`,
      terkini: `${protocol}${req.headers.host || "localhost"+PORT}/gempa/terkini`
    }
  })
})

// CUACA / 
app.get("/cuaca/all", (req, res) => {
  res.setHeader('X-Powered-By', 'Muezza.js')
  res.setHeader('Create-By', 'Ernestoyoofi')
  axios.get("https://www.bmkg.go.id/cuaca/prakiraan-cuaca-indonesia.bmkg").then(resd => {
    const html = cheerio.load(resd.data)
    let date = []
    let index_one = []
    let index_two = []
    let index_three = []
    html('.prakicu-kabkota.tab-v1 .nav.nav-tabs a').each((i, el) => {
      date.push(html(el).text())
    })
    html('.prakicu-kabkota.tab-v1 #TabPaneCuaca1 tbody tr').each((i, el) => {
      index_one.push({
        kota: html('a', el).text(),
        perkiraan: {
          icon: html('img', el).attr('src'),
          status: html('span.tekscuaca', el).text()
        },
        sensor: {
          suhu: html('td:nth-of-type(3)', el).text(),
          kelembapan: html('td:nth-of-type(4)', el).text()
        },
        url: "https://www.bmkg.go.id/cuaca" + html('a', el).attr('href')
      })
    })
    // Index Two
    html('.prakicu-kabkota.tab-v1 #TabPaneCuaca2 tbody tr').each((i, el) => {
      let icon = []
      let status = []
      html('img', el).each((i, el) => {
        icon.push(html(el).attr('src'))
      })
      html('.tekscuaca', el).each((i, el) => {
        status.push(html(el).text())
      })
      index_two.push({
        kota: html('a', el).text(),
        perkiraan: {
          icon: icon,
          status: status
        },
        sensor: {
          suhu: html('td:nth-of-type(6)', el).text(),
          kelembapan: html('td:nth-of-type(7)', el).text()
        },
        url: "https://www.bmkg.go.id/cuaca" + html('a', el).attr('href')
      })
    })
    // Index Three
    html('.prakicu-kabkota.tab-v1 #TabPaneCuaca3 tbody tr').each((i, el) => {
      let icon = []
      let status = []
      html('img', el).each((i, el) => {
        icon.push(html(el).attr('src'))
      })
      html('.tekscuaca', el).each((i, el) => {
        status.push(html(el).text())
      })
      index_three.push({
        kota: html('a', el).text(),
        perkiraan: {
          icon: icon,
          status: status
        },
        sensor: {
          suhu: html('td:nth-of-type(6)', el).text(),
          kelembapan: html('td:nth-of-type(7)', el).text()
        },
        url: "https://www.bmkg.go.id/cuaca" + html('a', el).attr('href')
      })
    })
    const json = {
      date,
      data: {
        index_one: {
          date: date[0],
          data: index_one
        },
        index_two: {
          date: date[1],
          data: index_two
        },
        index_three: {
          date: date[1],
          data: index_three
        }
      }
    }
    res.send(json)
  })
})

// BERITA FOTO & BERITA DAERAH
app.get("/berita/home", (req, res) => {
    res.setHeader('X-Powered-By', 'Muezza.js')
    res.setHeader('Create-By', 'Ernestoyoofi')
    axios.get("https://www.bmkg.go.id/").then(resu => {
      const html = cheerio.load(resu.data)
      let berita = []
      html('.ms-slide.blog-slider').each((i, el) => {
        const title = html('a', el).text()
        const image = html('img', el).attr('data-src')
        const date = html('span.blog-slider-posted', el).text().replace(/\n/g, "").replace(/\t/g, "")
        const url = "https://www.bmkg.go.id/"+html('a', el).attr('href')
        berita.push({ title, image, date, url })
      })
          
      res.send(berita)
    })
  })
app.get("/berita/press-release", (req, res) => {
  res.setHeader('X-Powered-By', 'Muezza.js')
  res.setHeader('Create-By', 'Ernestoyoofi')
  axios.get("https://www.bmkg.go.id/").then(resu => {
    const html = cheerio.load(resu.data)
    let berita = []
    html('.press-release-home-bg.margin-bottom-20 .blog-thumb.margin-bottom-20').each((i, el) => {
      const title = html('a', el).text()
      const image = html('img', el).attr('data-src')
      const date = html('.blog-thumb-info', el).text().replace(/\n/g, "").replace(/\t/g, "")
      const url = "https://www.bmkg.go.id"+html('a', el).attr('href')
      berita.push({ title, image, date, url })
    })
    res.send(berita)
  })
})
app.get("/berita/foto", (req, res) => {
  res.setHeader('X-Powered-By', 'Muezza.js')
  res.setHeader('Create-By', 'Ernestoyoofi')
  axios.get("https://www.bmkg.go.id/").then(resu => {
    const html = cheerio.load(resu.data)
    let berita = []
    html('.tab-content.foto-daerah-home-bg.margin-top-13 #foto .blog-thumb.margin-bottom-20').each((i, el) => {
      const title = html('a', el).text()
      const image = html('img', el).attr('data-original')
      const date = html('.blog-thumb-info', el).text().replace(/\n/g, "").replace(/\t/g, "")
      const url = "https://www.bmkg.go.id/" + html('a', el).attr('href')
      berita.push({ title, image, date, url })
    })
        
    res.send(berita)
  })
})
app.get("/berita/daerah", (req, res) => {
  res.setHeader('X-Powered-By', 'Muezza.js')
  res.setHeader('Create-By', 'Ernestoyoofi')
  axios.get("https://www.bmkg.go.id/").then(resu => {
    const html = cheerio.load(resu.data)
    let berita = []
    html('.tab-content.foto-daerah-home-bg.margin-top-13 #daerah .blog-thumb.margin-bottom-20').each((i, el) => {
      const title = html('a', el).text()
      const image = html('img', el).attr('data-original')
      const date = html('.blog-thumb-info', el).text().replace(/\n/g, "").replace(/\t/g, "")
      const url = "https://www.bmkg.go.id/" + html('a', el).attr('href')
      berita.push({ title, image, date, url })
    })
    res.send(berita)
  })
})
app.get("/berita/beranda", (req, res) => {
  res.setHeader('X-Powered-By', 'Muezza.js')
  res.setHeader('Create-By', 'Ernestoyoofi')
  axios.get("https://www.bmkg.go.id/").then(resu => {
    const html = cheerio.load(resu.data)
    let berita = []
    html('.tab-content.foto-daerah-home-bg.margin-top-13 #daerah .blog-thumb.margin-bottom-20').each((i, el) => {
      const title = html('a', el).text()
      const image = html('img', el).attr('data-original')
      const date = html('.blog-thumb-info', el).text().replace(/\n/g, "").replace(/\t/g, "")
      const url = "https://www.bmkg.go.id/" + html('a', el).attr('href')
      berita.push({ title, image, date, url })
    })
    res.send(berita)
  })
})

// DATA GEMPABUMI TERAKHIR / DIRASAKAN / TERKINI
app.get("/gempa/terakhir", (req, res) => {
  axios.get("https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json").then(resd => {
    const dataAp = 
    res.send(resd.data.Infogempa.gempa)
  })
})
app.get("/gempa/dirasakan", (req, res) => {
  axios.get("https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json").then(resd => {
    const dataAp = 
    res.send(resd.data.Infogempa.gempa)
  })
})
app.get("/gempa/terkini", (req, res) => {
  axios.get("https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json").then(resd => {
    const dataAp = 
    res.send(resd.data.Infogempa.gempa)
  })
})

// ERROR 404
app.use((req, res, next) => {
  res.status(404).sendFile(__dirname+"/404.html")
})

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server Running In Port http://localhost:${process.env.PORT || PORT}/\n`)
})