import { useState, useRef } from "react"
import styles from './Otpinput.module.css'

const OTPinput = ({length = 4, onComplete}) => {
    const [otp, setOtp] = useState(new Array(length).fill(""))
    const inputRefs = useRef([])

    const handleChange = (index, value) => {
        if (!/^\d$/.test(value) && value !== "") return;
        
        const newOtp = [...otp]
        newOtp[index] = value.toUpperCase()
        setOtp(newOtp)
        


        if (value !== "" && index < length - 1) {
            inputRefs.current[index + 1].focus();
        }

        if (newOtp.every((num) => num !== "") && onComplete) {
            onComplete(newOtp.join(""))
        }
    }

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace") {
            const newOtp = [...otp]
            newOtp[index] = "";
            setOtp(newOtp)

            // Move para o campo anterior
            if (index > 0) {
                inputRefs.current[index - 1].focus()
            }
        }
    };


  return (
    <div className={styles.otpContainer}>
        {otp.map((digit, index) => (
            <input
                key={index}
                type="text"
                ref={(el) => (inputRefs.current[index] = el)}
                maxLength="1"
                className={styles.otpInput}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onFocus={(e) => e.target.select()} // Seleciona o campo ao clicar
            />
        ))}
    </div>
  )
}

export default OTPinput