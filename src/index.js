const showData = (results) => {
    return `<div class="view-2 col align-items-center">
                <div class="card text-center" style="width: 18rem;">
                    <img class="card-img-top" src="${results.picture.large}" alt="image">
                    <div class="card-body">
                        <h5 class="h5">${results.name.title} ${results.name.first} ${results.name.last}</h5>
                        <p class="h5">Género: ${results.gender}</p>
                        <p class="h5">Edad: ${results.dob.age}</p>
                        <div class="card-text">
                            <p class="h6">Teléfono: ${results.cell}</p>
                            <p class="h6">Email: ${results.email}</p>
                            <p class="h6">País: ${results.location.country}, ${results.location.city}</p>
                            <a href="#" class="heart btn btn-primary stretched-link">
                            <i class="fas fa-heart"></i></a>
                            <a href="#" class="heart btn btn-primary stretched-link">
                            <i class=" fas fa-heart-broken"></i></a>
                        </div>
                    </div>
                </div>
            </div>`;
}
let data = undefined;
export const showApi = async (gender = undefined) => {
    if (!data) {
        fetch(`https://randomuser.me/api/?results=20`)
            .then((res) => res.json())
            .then((json) => {
                data = json;
                buildList(gender);
            })

            .catch((err) => {
                console.error(err);
            });
    } else {
        buildList(gender);
    }
};

const buildList = (gender) => {
    const containerGender = document.getElementById('container');
    containerGender.innerHTML = '';
    const res = data.results
        .filter((r) => !gender || r.gender == gender)
        .reduce((r, c) => r + showData(c), '');
    containerGender.innerHTML = `<div class="cards">${res}</div>`;
};

const btnChooseGenderMale = document.getElementById('btn-male');
btnChooseGenderMale.addEventListener('click', () => {
    showApi('male');
});

const btnChooseGenderFemale = document.getElementById('btn-female');
btnChooseGenderFemale.addEventListener('click', () => {
    showApi('female');
});

