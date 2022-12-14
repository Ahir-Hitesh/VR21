console.log (" My script is successfully linked");
const myName = "Hitesh";
const myZipcode = 75071;
const myStreetNum = 2112;
const myStreet = "Tilden drive";
const myCity = "Plano"
const myState = "TX"

console.log("My name: ". myName);
console.log( "My address is ", myStreetNum + myStreet + "," +  myCity +"," + myState + "," + myZipcode )
const myNum1 = 12;
console.log(myNum1 + 9);

const myNum2 = myNum1 - 10;
console.log(myNum1 * myNum2);
console.log(myNum1/myNum2);
console.log(myNum2%myNum1);
console.log(2 + 4 * 5 -1 / 4);
console.log("hi there".length); 
console.log("Hello".endsWith("o")); 
console.log("Hello".indexOf("2"));
console.log("Hi, There".split(","));
console.log("Hi, There".startsWith("h"));
console.log("Hi, There".startsWith("H"));
console.log("Hi, There".substring(3));
console.log("Hi, There".substring(3, 6));


const sentence = "I am new to learning JavaScript";

console.log(sentence.slice(7, 30));

const theAge = prompt("What is your age?") ;
if (theAge > 21){
    console.log("you are okay to enter")

} else{
    console.log("Go home!")
}
