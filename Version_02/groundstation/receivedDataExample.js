const dataArray = [
  2019,12,20,09,51,22,4.10172,4.11149,3.875,0.06875,2.82125,0.001332,0.268768,0.010212,0,0.173012,
  0.00754801,4.30408,1.23311,3.69696,1,"","","","","","","","","","","","","","","",13.6149,"-","DK3WN","JN49lr"

];


//First section of the code will verify if the received data is according to expected

for (let i = 0; i < 20; i++) {
    if (typeof data[i] === 'number') {
      console.log(`Element at index ${i} is a number: ${data[i]}`);
    } else {
      console.log(`Element at index ${i} is not a number: ${data[i]}`);
    }
}

  