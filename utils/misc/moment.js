import moment from 'moment';


export const convertMilliToDate = (millis) => {
    return  moment(new Date(parseInt(millis))).format('DD/MM/YY')
}