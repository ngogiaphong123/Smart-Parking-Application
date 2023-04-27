
function handleBalanceCalFromDBS(time: string, pricePerHour: string, timeOut?:string) {
    const timeIn = new Date(time);
    let newTimeOut
    if(timeOut)
        newTimeOut = new Date(timeOut);
    else
        newTimeOut = new Date();
    const diff = newTimeOut.getTime() - timeIn.getTime();
    const diffHours = diff / (1000 * 3600);
    const price = Math.ceil(diffHours) * parseInt(pricePerHour);
    return price;
}

export default handleBalanceCalFromDBS;