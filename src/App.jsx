import { useState } from 'react'

export default function FormSteps() {

    let [formData, setFormData] = useState(new Array(3).fill(false))
    let [currentStep, setCurrentStep] = useState(0)
    let [submit, setSubmit] = useState(false)

    let next = (last) => {
        let copy = formData.slice()
        copy[currentStep] = true
        setFormData(copy)
        if (last) {
            setSubmit(true)
        }
        else {
            setCurrentStep(p => p + 1)
        }
    }

    let prev = () => {
        setCurrentStep(p => p - 1)
    }

    let step = (num) => {
        if (!submit) {
            if (currentStep === num) return
            if (formData.every(el => el === true)) {
                setCurrentStep(num)
                return
            }
            if (num <= formData.indexOf(false)) {
                setCurrentStep(num)
                return
            }
        }
    }

    let content1 = (
        <div className="content">
            <div className="p">Choose Title</div>
            <div className="buttons">
                <button className="next" onClick={() => next()}>Submit Title</button>
            </div>
        </div>)

    let content2 = (
        <div className="content">
            <div className="p">Choose Description Content</div>
            <div className="buttons">
                <button className="prev" onClick={prev}>Back</button>
                <button className="next" onClick={() => next()}>Submit Description</button>
            </div>
        </div>)

    let content3 = (
        <div className="content">
            <div className="p">Are you happy now?</div>
            <div className="buttons">
                <button className="prev" onClick={prev}>No, go back</button>
                <button className="next" onClick={() => next("last")}>Yes, go ahead</button>
            </div>
        </div>)

    let contents = [content1, content2, content3]

    return (
        <div className="container">
            <div className="steps">
                <div className={currentStep >= 0 ? "active step" : "step"} onClick={() => step(0)}>
                    <div className="number">1</div>
                    <div className="title">Choose Title</div>
                </div>
                <div className={currentStep >= 1 ? "active step" : "step"} onClick={() => step(1)}>
                    <div className="number" >2</div>
                    <div className="title">Choose Description</div>
                </div>
                <div className={currentStep >= 2 ? "active step" : "step"} onClick={() => step(2)}>
                    <div className="number" >3</div>
                    <div className="title">Confirm Data</div>
                </div>
            </div>
            {submit ?
                <div className="content">
                    <p>Ok we're done. Thanks for sending your data!</p>
                </div>
                : contents[currentStep]}
        </div>
    )
}
