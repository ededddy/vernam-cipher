export const charMap = () => {
  let mapping : {[key: string]: number;} = {};
  let chars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  chars.split("").forEach((element, index) => {
    mapping[element] = index; 
  });
  return mapping
};

export const getKeyByValue = (object: {[key:string] : any}, value: any) => {
  return Object.keys(object).find(key => object[key] === value);
}