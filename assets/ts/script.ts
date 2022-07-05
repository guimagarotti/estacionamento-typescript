interface Veiculo {
    nome: string,
    placa: string,
    entrada: Date | string
}

(function () {
    const $ = (query: string): HTMLInputElement | null => document.querySelector(query);

    function calcTempo(mil: number): String {
        const min = Math.floor(mil/60000);
        const sec = Math.floor((mil % 60000) / 1000)

        return `${min}m e ${sec}s`;
    }

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
                    <button class="delete" data-placa="${veiculo.placa}">X</button>
                </td>             
            `

            linha.querySelector('.delete')?.addEventListener('click', function() {
                remover(this.dataset.placa);
            })

            $('#area')?.appendChild(linha);
            if (salva) salvar([...ler(), veiculo]);
        }

        function remover(placa: string) {
            const { entrada, nome } = ler().find(veiculo => veiculo.placa);

            const timer = calcTempo(new Date().getTime() - new Date(entrada).getTime());

            if (!confirm(`O veículo ${nome} permaneceu por ${timer}. Deseja encerrar?`)) return;
            
            salvar(ler().filter(veiculo => veiculo.placa !== placa))
            renderizar();
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

        return({ ler, adicionar, remover, salvar, renderizar })
    }
    
    area().renderizar();
    $('#cadastrar')?.addEventListener('click', () => {
        const nome = $("#nome")?.value; // ? -> null / opcional
        const placa = $("#placa")?.value;
        
        if (!nome || !placa) {
            window.alert("[ERRO] Nome e Placa são obrigatórios!");
            return;
        }
        
        area().adicionar({ nome, placa, entrada: new Date().toISOString() }, true);
    })
})();