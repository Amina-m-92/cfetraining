
//to get the first values that will have the operations +,- etc. e.g 9+9 
function getHistory(){
    return document.getElementById("history-value").innerText;
}
//to get the value after the operation e.g. 9+9 = 18, to get the 18 value, you use the code below 
function printHistory(num){
    document.getElementById("history-value").innerText=num;
}
//this allows you to have values below the history value 
function getOutput(){
    return document.getElementById("output-value").innerText;
}
//this allows the value to be printed out and visible by the user 
function printOutput(num){
    //if the value is empty, we set the value to empty
    if(num==""){
        document.getElementById("output-value").innerText=num;
    }
    //otherwise, it gets converted to the comma separated value for ease of reading
    else{
        document.getElementById("output-value").innerText=getFormattedNumber(num);
    }
}
//for negative number, the backspace operator produces error NaN (not a number). To solve this we return an empty value
function getFormattedNumber(num){
    if(num=="-"){
        return "";
    }
    var n= Number(num);
    var value= n.toLocaleString("en");
    return value;
}
/*this allows the number to replace the comma with nothing (removing the comma)
in order to revert number to original format to perform delete function*/
function reverseNumberFormat(num){
    return Number(num.replace(/,/g,''));
}
// this allows to manipulate the operations i.e. +,-,* etc
var operator = document.getElementsByClassName("operator");
//use the for loop to access the operations one by one
for(var i =0;i<operator.length;i++){
    //the event listener by click allows a function to take place when the button is clicked by the user 
	operator[i].addEventListener('click',function(){
        //the clear (C) button, it clears both the history value (9+9) and the output value (18) 
        if(this.id=="clear"){
            printHistory("");
            printOutput("");
        }
        /*the backspace (CE)button, deletes single digits on clicking by reversing the number 
        to a string (without commas), then using subtr. to remove the last digit as well. Then more clicks digits other digits as well */    
        else if(this.id=="backspace"){
            var 
            output=reverseNumberFormat(getOutput()).toString();
            if(output){//if output has a value
                output= output.substr(0,output.length-1);
                printOutput(output);
            }
        }
        //operators don't work if value is empty
        else{
            //declare the output and history values first
            var output=getOutput();
            var history=getHistory();
            //if output is empty and history is not empty
            if(output==""&&history!=""){
                //statement checking if last character is an operator
                if(isNaN(history[history.length-1])){
                    //remove last character using substring function
                    history=history.substr(0,history.length-1);
                }
            }
            //if output is not empty and history is not empty
            if(output!="" || history!=""){
                //set the output to an empty value               
                output= output==""?
                //converted to a number format only if output has a value
                output:reverseNumberFormat(output);
                //to add the operator to the history value as well as another digit before clicking =
                history=history+output;
                /*once the operator (=)is clicked, result is printed and history is left empty.
                    this is why you have only one value left after getting the total value i.e only 18 appears instead of 9+9=18*/
                if(this.id=="="){                    
                    var result=eval(history);
                    printOutput(result);
                    printHistory("");
                }
                /*once the operator i.e +,-,*,/ is clicked,operator is added to the history to show e.g 9+
                 and the output is left empty until a number is clicked*/
                else{
                    history=history+this.id;
                    printHistory(history);
                    printOutput("");                
                }
            }
        }            
    });
}
//to display the numbers
var number = document.getElementsByClassName("number");
for(var i=0; i<number.length; i++){
    //displaying the number is through the function of clicking through use of eventListner
    number[i].addEventListener('click',function(){
        var output=reverseNumberFormat(getOutput())
        if(output!=NaN){//if output is a number
        output=output+this.id;
        printOutput(output);}               
    });
} 
