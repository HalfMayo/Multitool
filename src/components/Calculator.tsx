import { useState, useRef } from 'react'
import { buttonsInfo } from '../data/buttonsInfo';

function Calculator() {
  //input = infix expression
  const numRef = useRef(["0"]);
  const [numbers, setNumbers] = useState(["0"]);
  const [currEl, setCurrEl] = useState(["0"]);
  
  //Shunting-yard algorithm (infix -> RPN)
  function toRPN(expr: RegExpMatchArray|null) {
    if(expr) {
      let output: string[] = [];
      const stack: string[] = [];
      
      for(let i = 0; i < expr.length; i++) {
        let op = expr[i];
        
        if(op === "+" || op === "-" || op === "*" || op === "/") {
          while(stack.length !== 0 && (getPrecedence(stack[stack.length - 1]) as number) >= (getPrecedence(op) as number)) {
            output.push(stack.pop() as string);
          }
          stack.push(op);
        } else {
          output.push(op)
        }
      }
      while(stack.length > 0) {
        output.push(stack.pop() as string);
      }
      return output;
    }    
  }
  
  //operators precedence
  function getPrecedence(token: string) {
    if(token === "+" || token === "-") {
      return 1;
    }
    
    if(token === "*" || token === "/") {
      return 2;
    }
  }
    
  //RPN parsing algorithm
  function rpnParser(expr:string[]|undefined) {
    if(expr)
    {
      const stack = [];
    
      for(let i = 0; i < expr.length; i++) {
        let op = expr[i];
        let a, b;
        
        switch(op) {
          case "+":
            b = parseFloat(stack.pop() as string);
            a = parseFloat(stack.pop() as string);
            stack.push(a+b);
            break;
          case "-":
            b = parseFloat(stack.pop() as string);
            a = parseFloat(stack.pop() as string);
            stack.push(a-b);
            break;
          case "*":
            b = parseFloat(stack.pop() as string);
            a = parseFloat(stack.pop() as string);
            stack.push(a*b);
            break;
          case "/":
            b = parseFloat(stack.pop() as string);
            a = parseFloat(stack.pop() as string);
            stack.push(a/b);
            break;
          default:
            stack.push(op);
        }
      }
      return stack.join("");
    }
  }

  function handleClick(e:any) {
    if(e.target.value === "AC") handleClickClear()
    else if (e.target.value === "=") handleClickResult()
    else if (/[0-9.]/.test(e.target.value)) handleClickNumbers(e)
    else handleClickOperators(e);
  }
  
  function handleClickNumbers(e:any) {
    //per non aggiungere più di uno "0" all'inizio
    if(numRef.current.length === 1 && numRef.current[0] === "0" && e.target.value === "0") {
      return;
    }
    //per non aggiungere più di una virgola
    if((/[.]/.test(numRef.current.join("")) || /[.]/.test(currEl.join(""))) && e.target.value === "." ) {
      return;
    }
    //per sostituire lo "0" di default con un numero
    if(numRef.current.length === 1 && numRef.current[0] === "0" && /[1-9]/.test(e.target.value)) {
      numRef.current = [e.target.value];
      setCurrEl([e.target.value]);
      const copyArr = [...numbers];
      copyArr.pop();
      setNumbers([...copyArr, e.target.value]);
    
      return;
    }
    //se l'ultimo elemento di numRef è un operatore, si resetta il valore di numRef...
    if(/[-\+\*\/]/.test(numRef.current[numRef.current.length - 1])) {
      if(e.target.value === ".") return;
      numRef.current = [e.target.value];
      setCurrEl([e.target.value]);
      setNumbers(prev => [...prev, e.target.value]);
    } else 
    //...altrimenti si aggiunge e.target.value in coda
    {
      numRef.current = [...numRef.current, e.target.value];
      setCurrEl([...currEl, e.target.value]);
      setNumbers(prev => [...prev, e.target.value]);
    }
  }
  
  function handleClickOperators(e:any) {
    //per evitare di mettere operatori dopo una virgola
    if(/[.]/.test(numRef.current[numRef.current.length - 1])) {
      return;
    }
    //per impedire di aggiungere più di 2 "-" (un operatore seguito dal "-" di un numero negativo) o più di un "-" all'inizio dell'espressione
    if(numRef.current.length === 2 && numRef.current.every(el => el === "-") || numbers.length === 1 && numbers[0].split("").every(el => /-/.test(el)) && e.target.value === "-") {
      return;
    }
    //per poter aggiungere più "-" (un operatore seguito dal "-" di un numero negativo) all'interno dell'espressione
    if(numRef.current[0] === "-" && e.target.value === "-") {
      numRef.current = [...numRef.current, e.target.value];
      setCurrEl([...currEl, e.target.value]);
      setNumbers(prev => [...prev, e.target.value]);
      return;
    }
  //per impedire di aggiungere più di 2 operatori consecutivi
    if(numRef.current.length === 2 && numRef.current.every(el => /[-\+\*\/]/.test(el)) && /[-\+\*\/]/.test(e.target.value)) {
      numRef.current = [e.target.value];
      setCurrEl([e.target.value]);
      const copyArr = [...numbers];
      copyArr.pop();
      copyArr.pop();
      setNumbers([...copyArr, e.target.value]);  
    } 
    //per sostituire l'ultimo operatore inserito con un altro, a meno che non sia un "-", e per sostituire lo "0" con un "-" se è il primo elemento dell'espressione
    else if(/[-\+\*\/]/.test(numRef.current[0]) && /[\+\*\/]/.test(e.target.value) || numbers.length === 1 && numbers[0].split("").every(el => /-/.test(el)) && numRef.current[0] === "0" && e.target.value === "-") {
      numRef.current = [e.target.value];
      setCurrEl([e.target.value]);
      const copyArr = [...numbers];
      copyArr.pop();
      setNumbers([...copyArr, e.target.value]);
    }
    //per resettare il valore di numRef.current se è un numero
    else if(/[0-9]/.test(numRef.current[numRef.current.length - 1])) {
      numRef.current = [e.target.value];
      setCurrEl([e.target.value]);
      setNumbers(prev => [...prev, e.target.value]);
    }
    //per aggiungere gli operatori a numRef.current
    else {
      numRef.current = [...numRef.current, e.target.value];
      setCurrEl([...currEl, e.target.value]);
      setNumbers(prev => [...prev, e.target.value]);
    }
  }
  
  function handleClickResult() {
    const correctNumbers = [...numbers];

    if(/[.]/.test(numbers[numbers.length - 1])) {
      correctNumbers.pop();
    }
    const tempResult = correctNumbers.join("").match(/(?<=[0-9])\W(?=[0-9])|-?\d+\.?\d+|-?\d+|\W/g);
    const rpnExpr:string[]|undefined = toRPN(tempResult);
    const result:string|undefined = rpnParser(rpnExpr);
    if(result) {
      numRef.current = ["0"];
      setCurrEl([result]);
      setNumbers([result]);
    }
  }
  
  function handleClickClear() {
    numRef.current = ["0"];
    setCurrEl(["0"]);
    setNumbers(["0"]);
  }
  
  return(
    <div className="grid grid-cols-[1fr_1fr_1fr_1.2fr] w-80">
    <div className="col-start-1 col-end-5 px-2 py-1.5 bg-surface">
      <p>{numbers}</p>
    </div>   
    <div className="col-start-1 col-end-5 px-2 py-1.5 text-2xl mb-2 bg-surface-container">
      <p>{currEl}</p>
    </div>
      {buttonsInfo.map(button => 
        <button key={button.id} className={`${button.class} bg-surface p-4 rounded-sm`} value={button.value} onClick={(e) => handleClick(e)}>
            {button.value}
        </button>)}
  </div>
  );
}

export default Calculator
