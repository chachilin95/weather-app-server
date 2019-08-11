const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const address = search.value;
    fetch(`http://localhost:42069/weather?address=${address}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                return console.log(data.error);
            }

            console.log(data);
        });
    });

    search.value = '';
});
