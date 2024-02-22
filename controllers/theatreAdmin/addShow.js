const theatre = require("../../models/theatre")
const theatreAdmin = require("../../models/theatreAdmin")

const defaultSeating = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

const addShow = async (req, res) => {
    const { adminName, location, movieName, timings } = req.body

    let movieLoc
    try {
        movieLoc = await theatre.findOne({ location: location }).exec()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({ error: "Internal error occurred!" })
    }


    if (!movieLoc) {
        const newLocation = new theatre({
            location: location,
            movieInfo: []
        })

        let checkMovieName = false
        for (let i=0; i<newLocation.movieInfo.length; i++) {
            if (newLocation.movieInfo[i].movieName === movieName) {
                checkMovieName = true
                break
            }
        }
        if (!checkMovieName) {
            newLocation.movieInfo.push({
                movieName: movieName,
                timings: []
            })
        }

        for (let i=0; i<newLocation.movieInfo.length; i++) {
            if (newLocation.movieInfo[i].movieName === movieName) {
                for (let j=0; j<timings.length; j++) {
                    newLocation.movieInfo[i].timings.push({
                        timing: timings[j],
                        seating: defaultSeating
                    })
                }
                break
            }
        }

        try {
            await newLocation.save()
        } catch (err) {
            console.log(err)
            return res
                .status(500)
                .json({ error: "Internal error occurred!" })
        }
    }
    else {
        let checkMovieName = false
        for (let i=0; i<movieLoc.movieInfo.length; i++) {
            if (movieLoc.movieInfo[i].movieName === movieName) {
                checkMovieName = true
                break
            }
        }
        if (!checkMovieName) {
            movieLoc.movieInfo.push({
                movieName: movieName,
                timings: []
            })
        }

        for (let i=0; i<movieLoc.movieInfo.length; i++) {
            if (movieLoc.movieInfo[i].movieName === movieName) {
                for (let j=0; j<timings.length; j++) {
                    movieLoc.movieInfo[i].timings.push({
                        timing: timings[j],
                        seating: defaultSeating
                    })
                }
                break
            }
        }

        try {
            await movieLoc.save()
        } catch (err) {
            console.log(err)
            return res
                .status(500)
                .json({ error: "Internal error occurred!" })
        }
    }

    let tAdmin
    try {
        tAdmin = await theatreAdmin.findOne({ username: adminName }).exec()
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .json({error: "Some internal error occurred!"})
    }

    let present = false
    for (let i=0; i<tAdmin.locations.length; i++) {
        if (tAdmin.locations[i] === location) {
            present = true
            break
        }
    }

    if (!present) {
        tAdmin.locations.push(location)
        try {
            await tAdmin.save()
        } catch (err) {
            console.log(err)
            return res
                .status(500)
                .json({error: "Internal error occurred!"})
        }
    }

    return res  
        .status(200)
        .json({ message: "Shows added successfully!" })
}

module.exports = addShow