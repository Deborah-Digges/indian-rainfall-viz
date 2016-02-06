
/*
    Mapping from the state names in the modern day map to the state names in the original data 
*/
var stateMappings = {
    "Andhra Pradesh": ["COSTAL ANDHRA PRADESH", "RAYALSEEMA", "TELENGANA"],
    "Arunachal Pradesh": ["ARUNACHAL PRADESH"],
    "Assam": ["ASSAM & MEGHALAYA"],
    "Meghalaya": ["ASSAM & MEGHALAYA"],
    "Bihar" : ["BIHAR"],
    "Chhattisgarh": ["CHATTISGARH"],
    "Goa": ["KOKAN & GOA"],
    "Gujarat": ["GUJARAT REGION, DADRA & NAGAR HAVELI", "SAURASHTRA KUTCH & DIU"],
    "Haryana": ["HARYANA, DELHI & CHANDIGARH"],
    "Delhi": ["HARYANA, DELHI & CHANDIGARH"],
    "Himachal Pradesh": ["HIMACHAL PRADESH"],
    "Jammu and Kashmir": ["JAMMU & KASHMIR"],
    "Jharkhand": ["JHARKHAND"],
    "Karnataka": ["COASTAL KARNATAKA", "NORTH INTERIOR KARNATAKA", "SOUTH INTERIOR KARNATAKA"],
    "Kerala": ["KERALA"],
    "Madhya Pradesh": ["WEST MADHYA PRADESH", "EAST MADHYA PRADESH"],
    "Maharashtra": ["MADHYA MAHARASHTRA", "MARATWADA", "VIDARBHA"],
    "Nagaland": ["NAGALAND, MANIPUR, MIZORAM,TRIPURA"],
    "Manipur": ["NAGALAND, MANIPUR, MIZORAM,TRIPURA"],
    "Mizoram": ["NAGALAND, MANIPUR, MIZORAM,TRIPURA"],
    "Tripura": ["NAGALAND, MANIPUR, MIZORAM,TRIPURA"],
    "Orissa": ["ORISSA"],
    "Punjab": ["PUNJAB"],
    "Rajasthan": ["WEST RAJASTHAN", "EAST  RAJASTHAN"],
    "Sikkim": ["SUB-HIMALAYAN W BENGAL & SIKKIM"],
    "West Bengal": ["SUB-HIMALAYAN W BENGAL & SIKKIM", "GANGETIC WEST BENGAL"],
    "Tamil Nadu": ["TAMIL NADU & PONDICHERRY"],
    "Uttar Pradesh": ["EAST UTTAR PRADESH", "WEST UTTAR PRADESH"],
    "Uttaranchal": ["UTTARANCHAL"]
};

/*
    Source: http://www.outlookindia.com/article/india-the-history-of-drought/209341
*/
var yearEvents = {
"1966": "Drought Affected areas: Bihar and Orissa People affected: 50 million",
"1969": "Drought Affected areas: Rajasthan, Gujarat, Tamil Nadu, UP, Andhra Pradesh, Haryana, Karnataka, and Madhya Pradesh. People affected: 15 million",
"1970": "Drought Affected areas: Bihar and Rajasthan People affected: 17.2 million",
"1972": "Drought Affected areas: Rajasthan, Himachal and Uttar Pradesh. People affected: 50 million",
"1979": "Drought Affected areas: Eastern Rajasthan, Himachal Pradesh, Punjab and Uttar Pradesh. People affected: 200 million",
"1987": "The drought of 1987 was caused by the failure of the SW monsoons over large parts of India. Affected Areas: Entire North-West and Eastern India",
"1992": "Drought Affected areas: Rajasthan, Orissa, Gujarat, Bihar and Madhya Pradesh. People affected: Figures not available",
"2000": "Drought Affected areas: Rajasthan, Gujarat, Orissa, Andhra and MP. People affected: Over 100 million "
};