function createUserCurl() {
    const url = 'http://localhost:3000/register';
    let curl = '';
    for(let i = 0; i < 40; i++) {
      const user = 'user' + (i + 1);
      curl += 
      `
      curl -H 'Content-Type: application/json' \
      -d '{ "username": "${user}", "email": "${user}@example.com", "password": "${user}", "confirmPassword": "${user}" }' \
      -X POST ${url}
      `
    };
    return curl;
};

console.log(createUserCurl());