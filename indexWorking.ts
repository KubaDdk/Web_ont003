import express from "express"
import { Artist, RecordLabel } from "./interfaces/IArtist"
import artistData from "./data/artists"
import labelsData from "./data/recordLabels"


const app = express()

app.set('view engine', 'ejs')
app.set('port', 3000)
app.use(express.static('public'))

const artists: Artist[] = artistData
const labels: RecordLabel[] = labelsData

app.get("/", (req, res) => {
    res.render("artists", { artists });
});

app.get("/artist/:id", (req, res) => {
    const id = req.params.id;
    const artist = artists.find((artist) => {
        return artist.id === id;
    });
    res.render("artistDetail", { artist: artist });
});


app.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`);
});



export {}
