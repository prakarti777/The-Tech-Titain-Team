function searchTalent() {
    const searchInput = document.getElementById("searchBar").value.toLowerCase();
    const trendingDiv = document.getElementById("trendingCreators");

    const results = [
        { name: "Priya Sharma", skill: "designer", location: "mumbai" },
        { name: "Arjun Mehta", skill: "developer", location: "delhi" },
        { name: "Simran Kaur", skill: "musician", location: "amritsar" },
        { name: "Ravi Patel", skill: "writer", location: "ahmedabad" },
        {name: "keshav Sharma", skill: "game developer", location: "hyderabad"}  ,
        { name: "Ahan Rayzada ", skill: "musician", location: "assam" },
        { name: "Anymootion ", skill: "Anime Creator ", location: "Uttar Pradesh" },
    ];

    const filtered = results.filter(item =>
        item.name.toLowerCase().includes(searchInput) ||
        item.skill.toLowerCase().includes(searchInput) ||
        item.location.toLowerCase().includes(searchInput)
    );

    trendingDiv.innerHTML = "";

    if (filtered.length === 0) {
        trendingDiv.innerHTML = "<p>No matches found</p>";
    } else {
        filtered.forEach(item => {
            const div = document.createElement("div");
            div.innerHTML = `<h4>${item.name}</h4><p>${item.skill} | ${item.location}</p>`;
            trendingDiv.appendChild(div);
        });
    }
}
