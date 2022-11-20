

 export const setFormatDate = (DateString) => {
 
    let ReturnDate = new Date(DateString);
    /* Date format you have */
    let ReturnDateMDY = `${ReturnDate.getMonth() + 1}/${ReturnDate.getDate()}/${ReturnDate.getFullYear()}`;
    /* Date converted to MM-DD-YYYY format */
   return ReturnDateMDY ;
  }