export const dateISO = (ISO) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    if(ISO !== null){
        const date = new Date(ISO);
        return monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
    } else {
        return '';
    }

};
