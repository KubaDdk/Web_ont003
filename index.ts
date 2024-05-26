import express from "express"
import { Artist, RecordLabel } from "./interfaces/IArtist"
import artistData from "./data/artists"
import labelsData from "./data/recordLabels"
import dotenv from "dotenv";
import { connect } from "./database";


const app = express()

app.set('view engine', 'ejs')
app.set('port', process.env.PORT || 3000)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

const artists: Artist[] = artistData
const labels: RecordLabel[] = labelsData


app.use("/bands", (req, res) => {
    let filteredArtists: Artist[] = artists
    let query = ""
    if (typeof req.query.q === "string") {

        query = req.query.q.toLowerCase();

        filteredArtists = artists.filter((artist) => {
            return artist.name.toLowerCase().includes(query) || artist.description.toLowerCase().includes(query);
        })

    }

    const sortField = typeof req.query.sortField === "string" ? req.query.sortField : "name";
    const sortDirection = typeof req.query.sortDirection === "string" ? req.query.sortDirection : "asc";
    let sortedArtists = [...filteredArtists].sort((a, b) => {
        if (sortField === "name") {
            return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else if (sortField === "age") {
            return sortDirection === "asc" ? a.age - b.age : b.age - a.age;
        } else if (sortField === "recordLabel") {
            return sortDirection === "asc" ? a.recordLabel.name.localeCompare(b.recordLabel.name) : b.recordLabel.name.localeCompare(a.recordLabel.name);
        } else if (sortField === "isActive") {
            return sortDirection === "asc" ? (a.isActive ? -1 : 1) - (b.isActive ? -1 : 1) : (b.isActive ? -1 : 1) - (a.isActive ? -1 : 1);
        }
        else {
            return 0;
        }
    });

    const sortFields = [
        { value: 'name', text: 'Name', selected: sortField === 'name' ? 'selected' : '' },
        { value: 'age', text: 'Age', selected: sortField === 'age' ? 'selected' : '' },
        { value: 'recordLabel', text: 'Record Label', selected: sortField === 'recordLabel' ? 'selected' : '' },
        { value: 'isActive', text: 'Active', selected: sortField === 'isActive' ? 'selected' : '' }
    ];

    const sortDirections = [
        { value: 'asc', text: 'Ascending', selected: sortDirection === 'asc' ? 'selected' : '' },
        { value: 'desc', text: 'Descending', selected: sortDirection === 'desc' ? 'selected' : '' }
    ];


    res.render("artistsTable", {
        artists: sortedArtists,
        sortFields: sortFields,
        sortDirections: sortDirections,
        sortField: sortField,
        sortDirection: sortDirection,
        query: query
    });
});

app.use("/labels", (req, res) => {
    let filteredLabels: RecordLabel[] = labels
    let query = ""
    if (typeof req.query.q === "string") {

        query = req.query.q.toLowerCase();

        filteredLabels = labels.filter((label) => {
            return label.name.toLowerCase().includes(query);
        })

    }
    const sortField = typeof req.query.sortField === "string" ? req.query.sortField : "name";
    const sortDirection = typeof req.query.sortDirection === "string" ? req.query.sortDirection : "asc";
    let sortedLabels = [...filteredLabels].sort((a, b) => {
        if (sortField === "name") {
            return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else if (sortField === "foundedYear") {
            return sortDirection === "asc" ? a.foundedYear - b.foundedYear : b.foundedYear - a.foundedYear;
        } else if (sortField === "founder") {
            return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        }
        else {
            return 0;
        }
    });

    const sortFields = [
        { value: 'name', text: 'Name', selected: sortField === 'name' ? 'selected' : '' },
        { value: 'foundedYear', text: 'Founded Year', selected: sortField === 'age' ? 'selected' : '' },
        { value: 'founder', text: 'Founder', selected: sortField === 'name' ? 'selected' : '' },
    ];

    const sortDirections = [
        { value: 'asc', text: 'Ascending', selected: sortDirection === 'asc' ? 'selected' : '' },
        { value: 'desc', text: 'Descending', selected: sortDirection === 'desc' ? 'selected' : '' }
    ];


    res.render("labelTable", {
        labels: sortedLabels,
        sortFields: sortFields,
        sortDirections: sortDirections,
        sortField: sortField,
        sortDirection: sortDirection,
        query: query
    });
});

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/artist/:id", (req, res) => {
    const id = req.params.id;
    const artist = artists.find((artist) => {
        return artist.id === id;
    });
    res.render("artistDetail", { artist: artist });
});

app.get("/label/:id", (req, res) => {
    const id = req.params.id;
    const label = labels.find((label) => {
        return label.id === id;
    });
    res.render("labelDetail", { label: label });
});



app.listen(app.get("port"), async () => {
    await connect();
    console.log(`Server is running on port ${app.get("port")}`);
});



export { }
