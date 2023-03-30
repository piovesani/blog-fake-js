const readPosts = async () => {
    let postArea = document.querySelector('.posts');
    postArea.innerHTML = 'Carregando...';

    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let json = await response.json();

    if (json.length > 0) {
        console.log(json);
        postArea.innerHTML = '';

        for (let i in json) {
            let title = document.createElement('h1');
            title.innerHTML += `#${json[i].id} - ${json[i].title}`;
            postArea.appendChild(title);

            let body = document.createElement('p');
            body.innerHTML += json[i].body;
            postArea.appendChild(body);

            let hr = document.createElement('hr');
            postArea.appendChild(hr);
        }
    }
    else {
        postArea.innerHTML = 'Nenhum post para exibir';
    }
}

const addNewPost = async (title, body) => {
    await fetch(
        'https://jsonplaceholder.typicode.com/posts', 
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                title,
                body,
                userId: 101,
            })
        }
    );
    document.querySelector('#titleField').value = '';
    document.querySelector('#bodyField').value = '';  
    
    readPosts();

}

document.querySelector('#insertButton').addEventListener('click', () => {
    let title = document.querySelector('#titleField').value;
    let body = document.querySelector('#bodyField').value;

    if (title && body) {
        addNewPost(title, body);
    }
    else {
        alert("Preencha todos os campos.");
    }
});

readPosts();