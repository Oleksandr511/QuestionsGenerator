const text = document.getElementById('textarea');
const loadGif = document.querySelector('#info');
const art = document.querySelector('.art');
const geography = document.querySelector('.geography');
const film = document.querySelector('.film');
const any = document.querySelector('.general');





async function loading(e) {

    loadGif.innerHTML = `
    <div class="question_loading">
        <img src="loading.gif" alt="Loading..." width="50px" height="50px">
    </div>
    `;
}



async function generateQuestion() {
    const responce = await fetch('https://opentdb.com/api.php?amount=1');
    const data = await responce.json();
    console.log(data.results[0].question);
    return data.results[0].question;
}
//category: 9-32
async function general() {
    try {


        let index = 9;
        if (art.checked) {
            index = 25;
        }
        if (film.checked) {
            index = 11;
        }
        if (geography.checked) {
            index = 22;
        }
        if (any.checked) {
            index = Math.floor(Math.random() * 24) + 9;
        }

        const responce = await fetch(`https://opentdb.com/api.php?amount=1&category=${index}`);
        const data = await responce.json();
        console.log(data.results[0].category);

        return data.results[0].question;
    } catch (error) {
        console.log(error);

    }

}



function debounce(func, timeout = 3500) {
    let timer;
    return (...args) => {
        loading();
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);

    };
}
async function saveInput() {
    console.log('Saving data');
    let result = await general();
    text.innerHTML = result;
    loadGif.innerHTML = '';
}
const processChange = debounce(() => saveInput());