(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    function calcTempo(mil) {
        const min = Math.floor(mil / 60000);
        const sec = Math.floor((mil % 60000) / 1000);
        return `${min}m e ${sec}s`;
    }
    function area() {
        function ler() {
            return localStorage.area ? JSON.parse(localStorage.area) : [];
        }
        function adicionar(veiculo, salva) {
            var _a, _b;
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${veiculo.nome}</td>
                <td>${veiculo.placa}</td>
                <td>${veiculo.entrada}</td>
                <td>
                    <button class="delete" data-placa="${veiculo.placa}">X</button>
                </td>             
            `;
            (_a = linha.querySelector('.delete')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
                remover(this.dataset.placa);
            });
            (_b = $('#area')) === null || _b === void 0 ? void 0 : _b.appendChild(linha);
            if (salva)
                salvar([...ler(), veiculo]);
        }
        function remover(placa) {
            const { entrada, nome } = ler().find(veiculo => veiculo.placa);
            const timer = calcTempo(new Date().getTime() - new Date(entrada).getTime());
            if (!confirm(`O veículo ${nome} permaneceu por ${timer}. Deseja encerrar?`))
                return;
            salvar(ler().filter(veiculo => veiculo.placa !== placa));
            renderizar();
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
        return ({ ler, adicionar, remover, salvar, renderizar });
    }
    area().renderizar();
    (_a = $('#cadastrar')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        var _a, _b;
        const nome = (_a = $("#nome")) === null || _a === void 0 ? void 0 : _a.value; // ? -> null / opcional
        const placa = (_b = $("#placa")) === null || _b === void 0 ? void 0 : _b.value;
        if (!nome || !placa) {
            window.alert("[ERRO] Nome e Placa são obrigatórios!");
            return;
        }
        area().adicionar({ nome, placa, entrada: new Date().toISOString() }, true);
    });
})();
