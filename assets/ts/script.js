"use strict";
(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    function area() {
        function ler() {
            return localStorage.area ? JSON.parse(localStorage.area) : [];
        }
        function adicionar(veiculo) {
            var _a;
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${veiculo.nome}</td>
                <td>${veiculo.placa}</td>
                <td>${veiculo.entrada}</td>
                <td>
                    <button class="delete" data-placa="${veiculo.placa}">[X]</button>
                </td>             
            `;
            (_a = $('#area')) === null || _a === void 0 ? void 0 : _a.appendChild(linha);
            salvar([...ler(), veiculo]);
        }
        function salvar(veiculos) {
            localStorage.setItem('area', JSON.stringify(veiculos));
        }
        function renderizar() {
            $('#area').innerHTML = "";
            const area = ler();
            if (area.length) {
                area.forEach((veiculo) => adicionar(veiculo));
            }
        }
        function remover() {
        }
        return ({ ler, adicionar, remover, salvar, renderizar });
    }
    (_a = $('#cadastrar')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        var _a, _b;
        const nome = (_a = $('#nome')) === null || _a === void 0 ? void 0 : _a.value; // ? -> null
        const placa = (_b = $('#placa')) === null || _b === void 0 ? void 0 : _b.value;
        if (nome || placa === '') {
            window.alert("[ERRO] Nome e Placa são obrigatórios!");
            return;
        }
        area().adicionar({ nome, placa, entrada: new Date() });
    });
})();
