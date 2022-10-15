export const getInt = (n, d) => {
    if (isNaN(n)){
        return d; 
    } else return parseInt(n); 
  }
  
export const isValidZipCode = async (n) => {
    let m = getInt(n, 12345); 
    let resp = await fetch(`check_zip/${m}`).then(response => response.json()).then(data => {
            if(data["region"] !== "Unknown"){
                return true; 
            }
            else{
                return false; 
            }
        })
    return resp; 
    
}