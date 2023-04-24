import moment from "moment";

export function formatDate (date:Date , format:any){
    return moment(date).format(format)
}
