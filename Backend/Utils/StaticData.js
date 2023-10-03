
function getRandomDoctorImage() {
    const doctorsImages=[
        "https://images.pexels.com/photos/4021801/pexels-photo-4021801.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/4225880/pexels-photo-4225880.jpeg?auto=compress&cs=tinysrgb&w=400",
        "https://images.pexels.com/photos/5726794/pexels-photo-5726794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/5863366/pexels-photo-5863366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/305568/pexels-photo-305568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=400", 
        "https://th.bing.com/th?id=OIP.Nm1veNvgPX_af5ZkMbngagHaLJ&w=203&h=306&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
        "https://th.bing.com/th?id=OIP.IVwf85npYYUcwRp4EIhqDgHaJm&w=219&h=284&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
        "https://th.bing.com/th?id=OIP.rzvJIIoK4rs7kpN44Q5YegHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
        "https://th.bing.com/th/id/OIP.Hr64V0wGFl9eIcLewy3zYQHaE7?w=303&h=201&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        "https://th.bing.com/th/id/OIP.hUm7SvMrd0YtNdCGDn9dkwHaE6?w=285&h=189&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        "https://th.bing.com/th/id/OIP.p4vlmoloBMsldRbAkBF9yQHaE8?w=270&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        "https://th.bing.com/th?q=Sick+Doctor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
        "https://th.bing.com/th/id/OIP.M0FZeVMZa_n7zHGbAcJF1wHaFj?w=221&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        "https://th.bing.com/th/id/OIP.5KD0lQT8XkVYAaWjL2-dqgHaE8?w=226&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"   
    ]
    const randomIndex = Math.floor(Math.random() * doctorsImages.length);
    return doctorsImages[randomIndex];
}

module.exports=getRandomDoctorImage