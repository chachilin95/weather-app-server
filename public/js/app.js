console.log('client side js file is loaded');

fetch('http://localhost:42069/weather?address=Dallas').then((res) => {
    res.json().then((data) => {
        if (data.error) {
            return console.log(error);
        }

        console.log(data);
    });
})