interface Veiculo {
    nome: string,
    placa: string,
    entrada: Date | string
}

(function () {
    const $ = (query: string): HTMLInputElement | null => document.querySelector(query);

    function area() {
        function ler(): Veiculo[] {
            return localStorage.area ? JSON.parse(localStorage.area) : [];
        }
        
        function adicionar(veiculo: Veiculo, salva?: boolean) {
            const linha = document.createElement('tr');

            linha.innerHTML = `
                <td>${veiculo.nome}</td>
                <td>${veiculo.placa}</td>
                <td>${veiculo.entrada}</td>
                <td>
                    <button class="delete" data-placa="${veiculo.placa}">[X]</button>
                </td>             
            `

            $('#area')?.appendChild(linha);
            if (salva) salvar([...ler(), veiculo]);
        }
        
        function salvar(veiculos: Veiculo[]) {
            localStorage.setItem('area', JSON.stringify(veiculos))
        }
        
        function renderizar() {
            $('#area')!.innerHTML = "";
            const area = ler();

            if (area.length) {
                area.forEach((veiculo) => adicionar(veiculo))
            }
        }
        
        function remover() {

        }

        return({ ler, adicionar, remover, salvar, renderizar })
    }
    
    area().renderizar();
    $('#cadastrar')?.addEventListener('click', () => {
        const nome = $("#nome")?.value; // ? -> null
        const placa = $("#placa")?.value;
        
        if (nome || placa === '') {
            window.alert("[ERRO] Nome e Placa são obrigatórios!");
            return;
        }
        
        area().adicionar({ nome, placa, entrada: new Date() }, true);
    })
})();