import moment from 'moment';


export const horaMes = ( fecha ) => {

    const hoyMes = moment( fecha );

    return hoyMes.format('HH:mm a | MMMM Do');

}

export const diffhoraMes = ( fechaA, fechaB ) => {
    moment().startOf('hour').fromNow();
    const difFecha=fechaB.diff(fechaA, 'minutes')
    
    console.log(difFecha)
    const tiempo = difFecha.toString();
    return  tiempo;

}