import { useState, useContext, useEffect } from "react";
import '../css/ChatBox.css'
import {IoIosArrowUp, IoIosArrowDown} from 'react-icons/io'
import {FiSend} from 'react-icons/fi'
import DataContext from "../context/DataContext";
import AuthContext from "../context/AuthContext";

const ChatBox = () => {

    const { instructor, instructorLoggedIn } = useContext(AuthContext)
    const { messages, setMessages, studentId, setStudentId, fetchUrl, student, selectedStudent} = useContext(DataContext)
    
    useEffect(() => {
        const div = document.querySelector('.chat-div')
        if (visible) {
            div.scrollTop = div.scrollHeight
        }
    })

    const [visible, setVisible] = useState(false)
    const [value, setValue] = useState('')
    const [student_originated, setStudent_originated] = useState(false)

    const newDate = new Date()
    const monthDate = newDate.getMonth() < 10 ? `0${newDate.getMonth()}` : newDate.getMonth()
    const dayDate = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate()
    const yearDate = newDate.getFullYear()
    const hourDate = newDate.getHours() > 12 ? newDate.getHours() - 12 : newDate.getHours()
    const minDate = newDate.getMinutes() < 10 ? `0${newDate.getMinutes()}` : newDate.getMinutes()
    const amPm = newDate.getHours() < 12 ? 'AM' : 'PM'
    const date = `${monthDate}` + '/' + `${dayDate}`+ '/' + `${yearDate}`+ ' ' + `${hourDate}` + ':' + `${minDate}` + ' ' + `${amPm}`  

    const handleClick = () => {
        setVisible(true)
        
        if (instructorLoggedIn) {
            setStudentId(selectedStudent.id)
        }
        
        if (!instructorLoggedIn) {
            setStudent_originated(true)
        }
    }
    
    const handleClick2 = () => {
        setVisible(false)
    }
    
    const handleChange = (e) => {
        setValue(e.target.value)
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()


        const messageObj = {}
        messageObj.student_originated = student_originated
        messageObj.date_sent = date
        messageObj.content = value
        messageObj.student_id = studentId
        
        const response = await fetch(`${fetchUrl}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(messageObj)
        })
        const data = await response.json()
        setMessages([...messages, data])
        setValue('')
    }    

    if (!visible) {

        return (
            <>
                <div className="messages-div" onClick={handleClick}>
                    <div className="messages">Messages</div>
                    <div className="dropdown-icon"><IoIosArrowUp size={20} /></div>
                </div>
            </>
        )
    }
    
    if (instructorLoggedIn) {
        
        return (
            <>
                <div className="popup-div">
                    <div className="messages-div2" onClick={handleClick2}>
                        <div className="messages2">Messages</div>
                        <div className="dropdown-icon"><IoIosArrowDown size={20} /></div>
                    </div>
                    <div className="chat-div">{messages.map((message, index) => (
                        message &&
                        <div key={index}>
                        {message.student_originated ? (
                            <>
                                <div className="student-name-div">{selectedStudent.name}</div>
                                <div className="student-bubble">
                                    <div className="student-triangle"></div>
                                    <div className="student-content">{message.content}</div>
                                </div>
                                <div className="student-sent">{message.date_sent}</div>
                            </> 
                        ) : (
                            <>
                                <div align="right" className="instructor-message">
                                <div className="instructor-name-div">{instructor ? instructor.name : "Loading..."}</div>
                                    <div className="instructor-bubble">
                                        <div className="instructor-content">{message.content}</div>
                                        <div className="instructor-triangle"></div>
                                    </div>
                                    <div className="instructor-sent">{message.date_sent}</div>
                                </div> 
                            </>
                        )} 
                        </div>
                    ))}
                    </div>
                    <div className="bottom-div">
                        <form onSubmit={handleSubmit}>
                            <input className="message-input" type="text" placeholder="send a message..." onChange={handleChange} value={value}/>
                            <button className="send-icon" type="submit"><FiSend size={20} /></button>
                        </form>
                    </div>
                </div>
            </>
        )
    }
        return (
            <>
                    <div className="popup-div">
                        <div className="messages-div2" onClick={handleClick2}>
                            <div className="messages2">Messages</div>
                            <div className="dropdown-icon"><IoIosArrowDown size={20} /></div>
                        </div>
                        <div className="chat-div">{messages.map((message, index) => (
                            message &&
                            <div key={index}>
                            {message.student_originated ? (
                                <>
                                    <div align="right" className="instructor-message">
                                        <div className="instructor-name-div">{student[0].student_name}</div>
                                        <div className="instructor-bubble">
                                            <div className="instructor-content">{message.content}</div>
                                            <div className="instructor-triangle"></div>
                                        </div>
                                        <div className="instructor-sent">{message.date_sent}</div>
                                    </div> 
                                </>
                            ) : (
                                <>
                                    <div className="student-name-div">{student ? student[0].instructor_name + ' (Instructor)' : "Loading..."}</div>
                                    <div className="student-bubble">
                                        <div className="student-triangle"></div>
                                        <div className="student-content">{message.content}</div>
                                    </div>
                                    <div className="student-sent">{message.date_sent}</div>
                                </> 
                            )} 
                            </div>
                        ))}
                        </div>
                        <div className="bottom-div">
                            <form onSubmit={handleSubmit}>
                                <input className="message-input" type="text" placeholder="send a message..." onChange={handleChange} value={value}/>
                                <button className="send-icon" type="submit"><FiSend size={20} /></button>
                            </form>
                        </div>
                    </div>
                </>
        )       
}

export default ChatBox