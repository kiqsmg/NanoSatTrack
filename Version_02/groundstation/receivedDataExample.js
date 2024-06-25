const dataArray = [
    2019,12,20,19,16,19,61376,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    -0.0629883,0,0.0488281,0,0,-233.818,1.06771,3.0022,2.81319,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-280,0,0,0,0,0,0,0,0,0,0,0,0,0,
    -259.74,-259.74,-259.74,-259.74,-259.74,-259.74,-259.74,0,
    1407200,"OZ7SAT","JO65hp"
];

for (let i = 0; i < data.length; i++) {
    if (typeof data[i] === 'number') {
      console.log(`Element at index ${i} is a number: ${data[i]}`);
    } else {
      console.log(`Element at index ${i} is not a number: ${data[i]}`);
    }
  }