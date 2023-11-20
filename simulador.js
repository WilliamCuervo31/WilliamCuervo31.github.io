// Esperar a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencia al botón Consultar
    const btnConsultar = document.getElementById('ConsultarCuotas');

    // Verificar si el botón existe antes de agregar el evento click
    if (btnConsultar) {
        // Función para calcular cuotas al hacer clic en el botón Consultar
        btnConsultar.addEventListener('click', function(event) {
            event.preventDefault(); // Evitar que el formulario se envíe

            // Obtener valores de los campos del formulario
            const valorT = parseFloat(document.getElementById('valorT').value);
            const periodos = parseFloat(document.getElementById('periodos').value);
            const interes = parseFloat(document.getElementById('interes').value) / 100;

            // Realizar el cálculo de las cuotas
            const resultado = CalcularCuotas(valorT, periodos, interes);

            // Mostrar resultado (puedes imprimirlo en la consola o mostrarlo en algún elemento HTML)
            console.log('Cuota mensual a pagar:', resultado);

            MostrarTablaResultados(valorT, periodos, resultado, interes)
        });
    }

    // Función para calcular cuotas
    function CalcularCuotas(valorT, periodos, interes) {
        const resultado = interes * valorT / (1 - (1 + interes) ** -periodos);
        return resultado;
    }


    function MostrarTablaResultados(valorT, periodos, cuota, interes) {
        const tabla = document.getElementById('tablaResultados');
        const tbody = tabla.getElementsByTagName('tbody')[0];
        let saldo = valorT;
        let intereses = 0;
        let amortizacion = 0;
        tbody.innerHTML = '';

        function CambiarDisplay(){
            tabla.classList.add('d-block');
        }


        CambiarDisplay();

        for (let i = 0; i <= periodos; i++) {
            const nuevaFila = `<tr><th scope="row">${i}</th><td>${cuota.toFixed(2)}</td><td>${saldo}</td><td>${amortizacion}</td><td>${intereses}</td></tr>`;
            tbody.innerHTML += nuevaFila;
            intereses = saldo * interes;
            intereses = intereses.toFixed(2);
            amortizacion = cuota - intereses;
            amortizacion = amortizacion.toFixed(2);
            saldo = saldo - amortizacion;
            saldo = saldo.toFixed(2);

            if (saldo < -6){
                break;
            }

        }

        

    }

});


