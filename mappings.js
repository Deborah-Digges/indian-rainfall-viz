
/*
    Mapping from the state names in the original data to the state names on the modern daty map
    1. One Region Name in the data can correspond to more than one states; 
       hence the need for a list value
    2. Multiple Regions in the data can correspond to the same state. For example: West Rajasthan and 
       East Rajasthan both correspond to Rajasthan
*/
var stateMappings = {
    "COSTAL ANDHRA PRADESH": ["Andhra Pradesh"],
    "RAYALSEEMA": ["Andhra Pradesh"],
    "TELENGANA": ["Andhra Pradesh"],
    "ARUNACHAL PRADESH": ["Arunachal Pradesh"],
    "ASSAM & MEGHALAYA": ["Assam", "Meghalaya"],
    "BIHAR" : ["Bihar"],
    "CHATTISGARH": ["Chhattisgarh"],
    "KOKAN & GOA": ["Goa"],
    "GUJARAT REGION, DADRA & NAGAR HAVELI": ["Gujarat"],
    "HARYANA, DELHI & CHANDIGARH": ["Haryana", "Delhi"],
    "HIMACHAL PRADESH": ["Himachal Pradesh"],
    "JAMMU & KASHMIR": ["Jammu and Kashmir"],
    "JHARKHAND": ["Jharkhand"],
    "COASTAL KARNATAKA": ["Karnataka"],
    "NORTH INTERIOR KARNATAKA": ["Karnataka"],
    "SOUTH INTERIOR KARNATAKA": ["Karnataka"],
    "KERALA": ["Kerala"],
    "WEST MADHYA PRADESH": ["Madhya Pradesh"],
    "EAST MADHYA PRADESH": ["Madhya Pradesh"],
    "MADHYA MAHARASHTRA": ["Maharashtra"],
    "MARATWADA": ["Maharashtra"],
    "VIDARBHA": ["Maharashtra"],
    "NAGALAND, MANIPUR, MIZORAM,TRIPURA": ["Nagaland", "Manipur", "Mizoram", "Tripura"],
    "ORISSA": ["Orissa"],
    "PUNJAB": ["Punjab"],
    "WEST RAJASTHAN": ["Rajasthan"],
    "EAST  RAJASTHAN": ["Rajasthan"],
    "SAURASHTRA KUTCH & DIU", ["Rajasthan"],
    "SUB-HIMALAYAN W BENGAL & SIKKIM": ["Sikkim", "West Bengal"],
    "GANGETIC WEST BENGAL": ["West Bengal"],
    "TAMIL NADU & PONDICHERRY": ["Tamil Nadu"],

    "EAST UTTAR PRADESH": ["Uttar Pradesh"],
    "WEST UTTAR PRADESH": ["Uttar Pradesh"],
    "UTTARANCHAL": ["Uttaranchal"]
};

/*
    Islands are not currently shown on the map
*/ 
var noMappings = [
    "ANDAMAN & NICOBAR ISLANDS",
    "LAKSHADWEEP"
];
