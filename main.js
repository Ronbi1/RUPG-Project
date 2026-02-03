class UserPage {

    constructor() {
        this.mainUserSection = document.getElementById("main-user");
        this.friendsContainer = document.getElementById("friends-container");
        this.quoteText = document.getElementById("quote-text");
        this.pokemonImg = document.getElementById("pokemon-image");
        this.pokemonName = document.getElementById("pokemon-name");
        this.aboutText = document.getElementById("about-text");
        this.genButton = document.getElementById("generate-btn")

        this.genButton.addEventListener("click", () => {
            this.generateNewUser();
        });
    }

    generateNewUser() {
        console.log('Button clicked');
        this.fetchUsers();
        this.fetchQuote();
        this.fetchPokemon();
        this.fetchAbout();

    }

    fetchUsers() {
        fetch("https://randomuser.me/api/?format=json&results=7")
            .then(response => response.json())
            .then(data => {
                const mainUser = data.results[0];
                this.mainUserSection.querySelector('img').src = mainUser.picture.large;
                this.mainUserSection.querySelector('h1').textContent = mainUser.name.first + ' ' + mainUser.name.last;
                this.mainUserSection.querySelector('#city').textContent = mainUser.location.city;
                this.mainUserSection.querySelector('#state').textContent = mainUser.location.country;
                this.friendsContainer.innerHTML = '';
                for (let i = 1; i < data.results.length; i++) {
                    const newFriend = document.createElement('div');
                    newFriend.className = 'friend';
                    const img = document.createElement('img');
                    img.src = data.results[i].picture.large;
                    newFriend.appendChild(img);
                    const p = document.createElement('p');
                    p.textContent = data.results[i].name.first + ' ' + data.results[i].name.last;
                    newFriend.appendChild(p);
                    this.friendsContainer.appendChild(newFriend);
                }


                console.log(data);
            })
            .catch(error => {
                console.log("error", error);
            })

    }

    fetchQuote() {
        fetch("https://api.kanye.rest")
            .then(response => response.json())
            .then(data => {
                this.quoteText.textContent = data.quote;
                console.log(data.quote)
            })
            .catch(error => {
                console.log("error", error);
            })


    }

    fetchPokemon() {
        let number = this.getRandomArbitrary(1, 1025);
        fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
            .then(response => response.json())
            .then(data => {
                this.pokemonImg.src = data.sprites.front_default
                this.pokemonName.textContent = data.name
            })
            .catch(error => {
                console.log("error", error);
            })

    }

    getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    fetchAbout() {
        fetch("https://baconipsum.com/api/?type=meat-and-filler")
            .then(response => response.json())
            .then(data => {
                this.aboutText.textContent = data[0]
            })
            .catch(error => {
                console.log("error", error);
            })
    }
}

const page = new UserPage()