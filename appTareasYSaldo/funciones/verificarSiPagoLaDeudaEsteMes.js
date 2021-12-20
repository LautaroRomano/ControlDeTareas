export function verificarMes(data, viewDeudasPagadas) {
    let deudas = [];
    const fecha = new Date();
    let añoactual = parseInt(fecha.getFullYear());
    let mesactual = fecha.getUTCMonth();
    let ultimomespagado = 0;
    let ultimoañopagado = 0;

    for (let i = 0; i < data.length; i++) {
        if (data[i].ultmespagado) {

            ultimomespagado = parseInt(data[i].ultmespagado.slice(5, 7));
            ultimoañopagado = parseInt(data[i].ultmespagado.slice(0, 4));
            if (viewDeudasPagadas) {
                if (ultimoañopagado === añoactual) {
                    if (ultimomespagado >= mesactual) {
                        deudas.push(data[i])
                    }
                }
            } else {
                if (ultimoañopagado <= añoactual) {
                    if (ultimomespagado < mesactual) {
                        deudas.push(data[i])
                    } else if (ultimoañopagado < añoactual) {
                        deudas.push(data[i])
                    }
                }
            }
        } else if (!viewDeudasPagadas) { deudas.push(data[i]) }
    }
    return deudas;
}

export function verificarMesBoolean(data) {
    const fecha = new Date();
    let añoactual = parseInt(fecha.getFullYear());
    let mesactual = fecha.getUTCMonth();
    let ultimomespagado = 0;
    let ultimoañopagado = 0;
        if (data.ultmespagado) {
            ultimomespagado = parseInt(data.ultmespagado.slice(5, 7));
            ultimoañopagado = parseInt(data.ultmespagado.slice(0, 4));
            if (ultimoañopagado >= añoactual) {
                if (ultimomespagado >= mesactual) {
                    return true;
                }
            }
        }
    return false; 
}
