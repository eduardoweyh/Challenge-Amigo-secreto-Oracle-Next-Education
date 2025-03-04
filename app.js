const amigos = JSON.parse(localStorage.getItem('amigos')) || [];

function adicionarAmigo() {
    const input = document.getElementById('amigo');
    const nome = input.value.trim();

    if (nome !== '' && !amigos.includes(nome)) {
        amigos.push(nome);
        atualizarLista();
        input.value = '';
        input.focus();
    } else if (nome === '') {
        alert('O nome não pode estar vazio.');
    } else {
        alert('Esse nome já foi adicionado.');
    }

    salvarLista();
}

function removerAmigo(nome) {
    const index = amigos.indexOf(nome);
    if (index !== -1) {
        amigos.splice(index, 1);
        atualizarLista();
        salvarLista();
    }
}

function atualizarLista() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';

    amigos.forEach(amigo => {
        const li = document.createElement('li');
        li.textContent = amigo;
        li.classList.add('amigo-item');

        const button = document.createElement('button');
        button.textContent = 'Remover';
        button.classList.add('button-remove');
        button.onclick = () => removerAmigo(amigo);

        li.appendChild(button);
        lista.appendChild(li);
    });
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert('Adicione pelo menos dois amigos para realizar o sorteio.');
        return;
    }

    const resultado = [];
    const amigosTemp = [...amigos];

    amigos.forEach(amigo => {
        let index = Math.floor(Math.random() * amigosTemp.length);
        let sorteado = amigosTemp[index];

        while (sorteado === amigo) {
            index = Math.floor(Math.random() * amigosTemp.length);
            sorteado = amigosTemp[index];
        }

        resultado.push({ amigo, sorteado });
        amigosTemp.splice(index, 1);
    });

    salvarResultado(resultado);
    atualizarResultado();
}

function salvarResultado(resultado) {
    localStorage.setItem('resultado', JSON.stringify(resultado));
}

function atualizarResultado() {
    const listaResultado = document.getElementById('resultado');
    listaResultado.innerHTML = '';

    const resultado = JSON.parse(localStorage.getItem('resultado')) || [];

    resultado.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.amigo;
        li.classList.add('amigo-item');

        const button = document.createElement('button');
        button.textContent = 'Ver Amigo Secreto';
        button.classList.add('button-reveal');
        button.onclick = () => revelarAmigo(item.sorteado);

        li.appendChild(button);
        listaResultado.appendChild(li);
    });
}

function revelarAmigo(amigoSecreto) {
    alert(`Seu amigo secreto é: ${amigoSecreto}`);
}

function reiniciarJogo() {
    localStorage.removeItem('amigos');
    localStorage.removeItem('resultado');
    amigos.length = 0;
    atualizarLista();
    atualizarResultado();
}

function salvarLista() {
    localStorage.setItem('amigos', JSON.stringify(amigos));
}

document.addEventListener('DOMContentLoaded', () => {
    atualizarLista();
    atualizarResultado();
});
