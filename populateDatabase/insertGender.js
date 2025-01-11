
function insertGender() {
    let queryString = '';

    for(let i = 0; i < 40; i++) {

        const setVal = Math.random() < 0.5;

        //Male or Female
        let val = '';
        
        if(setVal) {
            // const isNull = Math.random() < 0.5;
            const isMale = Math.random() < 0.5;

            if(isMale) {
                val = 'male';
            } else {
                val = 'female';
            };
            
            queryString += `UPDATE users SET gender = '${val}' WHERE username = 'user${i}'; 
            `;
        };
    };

    return queryString;
};

console.log(insertGender());

