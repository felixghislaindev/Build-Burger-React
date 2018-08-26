import React from 'react';
import Classes from './Input.css'

const Input = (props) => {
    let inputEl = null
    const inputClasses = [Classes.InputEl]
    let errormsg = null
    
    

    if (props.invalid && props.shouldvalidate && props.touched) {
        inputClasses.push(Classes.Invalid)
        console.log(inputClasses)
    }

    if(props.invalid && props.touched){
        errormsg = <p>please enter valid data</p>
    }

    

     
   
    switch (props.elType){
        
        case ('input'):
        inputEl = <input 
                    className={inputClasses.join(' ')} 
                    {...props.elConfig} 
                    value={props.elValue}
                    onChange={props.changed} />
        break
        case ('textarea'):
        inputEl = <textarea 
                    className={inputClasses.join(' ')} 
                    {...props.elConfig} 
                    value={props.elValue}
                    onChange={props.changed} />
        break
        case ('select'):
        
        inputEl = (
            <select 
                    className={inputClasses.join(' ')} 
                    value={props.elValue} 
                    onChange={props.changed}>
                    {props.elConfig.options.map(option => (
                        
                        <option key={option.value}
                         value={option.value}
                         >

                        {option.displayValue}
                        
                        </option>
                     )
                    
                    )}

                </select>
                
            )
            
        break
        default: 
        inputEl = <input 
                    className={Classes.InputEl} 
                    {...props.elConfig} 
                    value={props.elValue} />
    }
    return (
        <div className={Classes.Input}>
            <label className={Classes.label} >{props.label}</label>
           
            {inputEl}
            {errormsg}
        </div>
    );
};

export default Input;