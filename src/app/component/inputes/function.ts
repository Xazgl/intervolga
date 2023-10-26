import { ErrorObj } from "../form/type";

export function getBorderClass(errorObj:ErrorObj[], fieldName:string) {
    const hasError = errorObj.length > 0  && errorObj.find(error => error.fieldName === fieldName);
    return hasError ? 'border-[red] border-[solid] border-[2px]' : 'border-[#131313] border-[solid] border-[2px]';
  }