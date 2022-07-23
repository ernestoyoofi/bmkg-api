const axios = require("axios")
const cheerio = require("cheerio")
const app = require("express")()
const PORT = 5000

const option = { headers: { 'User-Agent': 'Muezza Fetch/12.15.1' }  }

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
    cuaca: "Coming Soon !",
    gempa: {
      terakhir: `${protocol}${req.headers.host || "localhost"+PORT}/gempa/terakhir`,
      dirasakan: `${protocol}${req.headers.host || "localhost"+PORT}/gempa/dirasakan`,
      terkini: `${protocol}${req.headers.host || "localhost"+PORT}/gempa/terkini`
    }
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

app.listen(PORT, () => {
  console.log(`Server Running In Port http://localhost:${PORT}/\n`)
})